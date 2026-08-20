import { useLocalStorage } from '../../hooks/useLocalStorage';
import { agentMissions, safetyGuardrails } from './agentData';

export const AGENT_STORAGE_KEY = 'ai-literacy-lab-agent:v1';

export const initialAgentState = {
  version: 'v1',
  mode: null, // 'mission' | 'control' | null
  missionStep: 0, // 0: 미션 선택, 1: 생각/도구실행, 2: 인간 승인 검문소, 3: 완료
  selectedMissionId: 'mission_invite',
  humanApprovalDecisions: {}, // { [missionId]: 'approve' | 'reject' }
  controlStep: 0, // 0: 가드레일 설정, 1: 킬스위치 시뮬레이터, 2: 안전 헌장 발급
  guardrailChoices: {
    guard_permission: 'minimal',
    guard_budget: 'limit_10',
    guard_hitl: 'hitl_strict',
    guard_killswitch: 'kill_enabled'
  },
  killSwitchTriggered: false,
  isMissionCompleted: false,
  isControlCompleted: false
};

const ALLOWED_KEYS = new Set(Object.keys(initialAgentState));
const VALID_MODES = new Set(['mission', 'control', null]);
const VALID_MISSION_IDS = new Set(agentMissions.map(m => m.id));
const VALID_GUARD_IDS = new Set(safetyGuardrails.map(g => g.id));

export function validateAndSanitizeAgentState(rawState) {
  if (!rawState || typeof rawState !== 'object' || Array.isArray(rawState)) {
    return { ...initialAgentState };
  }

  if (rawState.version !== 'v1') {
    return { ...initialAgentState };
  }

  const sanitized = { ...initialAgentState };

  for (const key of Object.keys(rawState)) {
    if (!ALLOWED_KEYS.has(key)) continue;

    const val = rawState[key];

    switch (key) {
      case 'mode':
        sanitized.mode = VALID_MODES.has(val) ? val : null;
        break;
      case 'missionStep':
        sanitized.missionStep = typeof val === 'number' && val >= 0 && val <= 3 ? val : 0;
        break;
      case 'selectedMissionId':
        sanitized.selectedMissionId = typeof val === 'string' && VALID_MISSION_IDS.has(val) ? val : 'mission_invite';
        break;
      case 'humanApprovalDecisions':
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          const decisions = {};
          for (const [mId, dec] of Object.entries(val)) {
            if (VALID_MISSION_IDS.has(mId) && (dec === 'approve' || dec === 'reject')) {
              decisions[mId] = dec;
            }
          }
          sanitized.humanApprovalDecisions = decisions;
        }
        break;
      case 'controlStep':
        sanitized.controlStep = typeof val === 'number' && val >= 0 && val <= 2 ? val : 0;
        break;
      case 'guardrailChoices':
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          const choices = { ...initialAgentState.guardrailChoices };
          for (const [gId, optId] of Object.entries(val)) {
            if (VALID_GUARD_IDS.has(gId) && typeof optId === 'string') {
              choices[gId] = optId;
            }
          }
          sanitized.guardrailChoices = choices;
        }
        break;
      case 'killSwitchTriggered':
      case 'isMissionCompleted':
      case 'isControlCompleted':
        sanitized[key] = Boolean(val);
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

  const updateState = (updates) => {
    setRawState(prev => {
      const nextRaw = { ...prev, ...updates };
      return validateAndSanitizeAgentState(nextRaw);
    });
  };

  const selectMode = (mode) => {
    if (mode === 'mission') {
      updateState({ mode: 'mission', missionStep: 0 });
    } else if (mode === 'control') {
      updateState({ mode: 'control', controlStep: 0, killSwitchTriggered: false });
    } else {
      updateState({ mode: null });
    }
  };

  const resetState = () => {
    setRawState(initialAgentState);
  };

  return {
    state,
    updateState,
    selectMode,
    resetState
  };
}
