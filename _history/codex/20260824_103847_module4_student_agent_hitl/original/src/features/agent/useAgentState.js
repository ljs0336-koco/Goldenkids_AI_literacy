import { useLocalStorage } from '../../hooks/useLocalStorage';
import { agentMissions, killSwitchAnomaly, safetyGuardrails } from './agentData';

export const AGENT_STORAGE_KEY = 'ai-literacy-lab-agent:v2';

export const initialAgentState = {
  version: 'v2',
  mode: null,
  missionStep: 0,
  selectedMissionId: 'mission_invite',
  approvalReviewChecks: {},
  humanApprovalDecisions: {},
  controlStep: 0,
  guardrailChoices: {},
  killSwitchTriggered: false,
  incidentResponseChecks: [],
  isMissionCompleted: false,
  isControlCompleted: false
};

const ALLOWED_KEYS = new Set(Object.keys(initialAgentState));
const VALID_MODES = new Set(['mission', 'control', null]);
const VALID_MISSION_IDS = new Set(agentMissions.map(mission => mission.id));
const VALID_GUARD_IDS = new Set(safetyGuardrails.map(guard => guard.id));
const VALID_GUARD_OPTIONS = new Map(
  safetyGuardrails.map(guard => [guard.id, new Set(guard.options.map(option => option.id))])
);
const VALID_REVIEW_CHECKS = new Map(
  agentMissions.map(mission => [mission.id, new Set(mission.humanCheckpoint.reviewChecks.map(check => check.id))])
);
const VALID_RESPONSE_CHECKS = new Set(killSwitchAnomaly.responseChecks.map(check => check.id));

function freshInitialState() {
  return {
    ...initialAgentState,
    approvalReviewChecks: {},
    humanApprovalDecisions: {},
    guardrailChoices: {},
    incidentResponseChecks: []
  };
}

export function validateAndSanitizeAgentState(rawState) {
  if (!rawState || typeof rawState !== 'object' || Array.isArray(rawState) || rawState.version !== 'v2') {
    return freshInitialState();
  }

  const sanitized = freshInitialState();

  for (const key of Object.keys(rawState)) {
    if (!ALLOWED_KEYS.has(key)) continue;
    const value = rawState[key];

    switch (key) {
      case 'version':
        break;
      case 'mode':
        sanitized.mode = VALID_MODES.has(value) ? value : null;
        break;
      case 'missionStep':
        sanitized.missionStep = Number.isInteger(value) && value >= 0 && value <= 3 ? value : 0;
        break;
      case 'selectedMissionId':
        sanitized.selectedMissionId = VALID_MISSION_IDS.has(value) ? value : 'mission_invite';
        break;
      case 'approvalReviewChecks':
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          for (const [missionId, checkIds] of Object.entries(value)) {
            if (!VALID_MISSION_IDS.has(missionId) || !Array.isArray(checkIds)) continue;
            const allowed = VALID_REVIEW_CHECKS.get(missionId);
            sanitized.approvalReviewChecks[missionId] = [...new Set(checkIds.filter(checkId => allowed.has(checkId)))];
          }
        }
        break;
      case 'humanApprovalDecisions':
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          for (const [missionId, decision] of Object.entries(value)) {
            if (VALID_MISSION_IDS.has(missionId) && (decision === 'approve' || decision === 'reject')) {
              sanitized.humanApprovalDecisions[missionId] = decision;
            }
          }
        }
        break;
      case 'controlStep':
        sanitized.controlStep = Number.isInteger(value) && value >= 0 && value <= 2 ? value : 0;
        break;
      case 'guardrailChoices':
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          for (const [guardId, optionId] of Object.entries(value)) {
            if (VALID_GUARD_IDS.has(guardId) && VALID_GUARD_OPTIONS.get(guardId).has(optionId)) {
              sanitized.guardrailChoices[guardId] = optionId;
            }
          }
        }
        break;
      case 'killSwitchTriggered':
      case 'isMissionCompleted':
      case 'isControlCompleted':
        sanitized[key] = Boolean(value);
        break;
      case 'incidentResponseChecks':
        if (Array.isArray(value)) {
          sanitized.incidentResponseChecks = [...new Set(value.filter(checkId => VALID_RESPONSE_CHECKS.has(checkId)))];
        }
        break;
      default:
        break;
    }
  }

  return sanitized;
}

export function useAgentState() {
  const [rawState, setRawState] = useLocalStorage(AGENT_STORAGE_KEY, initialAgentState);
  const state = validateAndSanitizeAgentState(rawState);

  const updateState = updates => {
    setRawState(previous => validateAndSanitizeAgentState({ ...previous, ...updates }));
  };

  const selectMode = mode => {
    if (mode === 'mission') {
      updateState({ mode: 'mission', missionStep: 0, isMissionCompleted: false });
    } else if (mode === 'control') {
      updateState({
        mode: 'control',
        controlStep: 0,
        guardrailChoices: {},
        killSwitchTriggered: false,
        incidentResponseChecks: [],
        isControlCompleted: false
      });
    } else {
      updateState({ mode: null });
    }
  };

  const resetState = () => setRawState(freshInitialState());

  return { state, updateState, selectMode, resetState };
}
