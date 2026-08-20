import { useLocalStorage } from '../../hooks/useLocalStorage';
import { roleScenarios, workTasks, rolePrinciples } from './roleData';

export const ROLE_STORAGE_KEY = 'ai-literacy-lab-role:v2';

export const initialRoleState = {
  version: 'v2',
  mode: null, // 'persona' | 'task' | null
  personaStep: 0, // 0: 시나리오 선택, 1: 4색 비교&선택, 2: 피드백&인사이트, 3: 완료
  currentScenarioId: 'sc_01',
  userPersonaChoices: {}, // { [scenarioId]: 'friend' | 'coach' | 'doctor' | 'critic' }
  taskStep: 0, // 0: 12개 업무 3구역 분류, 1: 분석 및 가치 탐구, 2: 완료
  taskClassifications: {}, // { [taskId]: 'ai_auto' | 'collaboration' | 'human_lead' }
  selectedPrinciples: [],
  isPersonaCompleted: false,
  isTaskCompleted: false
};

const ALLOWED_KEYS = new Set(Object.keys(initialRoleState));
const VALID_MODES = new Set(['persona', 'task', null]);
const VALID_SCENARIO_IDS = new Set(roleScenarios.map(s => s.id));
const VALID_TASK_IDS = new Set(workTasks.map(t => t.id));
const VALID_PERSONAS = new Set(['friend', 'coach', 'doctor', 'critic']);
const VALID_ZONES = new Set(['ai_auto', 'collaboration', 'human_lead']);
const VALID_PRINCIPLES = new Set(rolePrinciples);

export function validateAndSanitizeRoleState(rawState) {
  if (!rawState || typeof rawState !== 'object' || Array.isArray(rawState)) {
    return { ...initialRoleState };
  }

  if (rawState.version !== 'v2') {
    return { ...initialRoleState };
  }

  const sanitized = { ...initialRoleState };

  for (const key of Object.keys(rawState)) {
    if (!ALLOWED_KEYS.has(key)) continue;

    const val = rawState[key];

    switch (key) {
      case 'mode':
        sanitized.mode = VALID_MODES.has(val) ? val : null;
        break;
      case 'personaStep':
        sanitized.personaStep = typeof val === 'number' && val >= 0 && val <= 3 ? val : 0;
        break;
      case 'currentScenarioId':
        sanitized.currentScenarioId = typeof val === 'string' && VALID_SCENARIO_IDS.has(val) ? val : 'sc_01';
        break;
      case 'userPersonaChoices':
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          const choices = {};
          for (const [sId, pId] of Object.entries(val)) {
            if (VALID_SCENARIO_IDS.has(sId) && VALID_PERSONAS.has(pId)) {
              choices[sId] = pId;
            }
          }
          sanitized.userPersonaChoices = choices;
        }
        break;
      case 'taskStep':
        sanitized.taskStep = typeof val === 'number' && val >= 0 && val <= 2 ? val : 0;
        break;
      case 'taskClassifications':
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          const classifications = {};
          for (const [tId, zone] of Object.entries(val)) {
            if (VALID_TASK_IDS.has(tId) && VALID_ZONES.has(zone)) {
              classifications[tId] = zone;
            }
          }
          sanitized.taskClassifications = classifications;
        }
        break;
      case 'selectedPrinciples':
        if (Array.isArray(val)) {
          sanitized.selectedPrinciples = val.filter(item => typeof item === 'string' && VALID_PRINCIPLES.has(item));
        }
        break;
      case 'isPersonaCompleted':
      case 'isTaskCompleted':
        sanitized[key] = Boolean(val);
        break;
      default:
        break;
    }
  }

  return sanitized;
}

export function useRoleState() {
  // Clean legacy v1 storage if present
  if (typeof window !== 'undefined' && window.localStorage) {
    if (window.localStorage.getItem('ai-literacy-lab-role:v1')) {
      window.localStorage.removeItem('ai-literacy-lab-role:v1');
    }
  }

  const [rawState, setRawState] = useLocalStorage(ROLE_STORAGE_KEY, initialRoleState);
  const state = validateAndSanitizeRoleState(rawState);

  const updateState = (updates) => {
    setRawState(prev => {
      const nextRaw = { ...prev, ...updates };
      return validateAndSanitizeRoleState(nextRaw);
    });
  };

  const selectMode = (mode) => {
    if (mode === 'persona') {
      updateState({ mode: 'persona', personaStep: 0 });
    } else if (mode === 'task') {
      updateState({ mode: 'task', taskStep: 0 });
    } else {
      updateState({ mode: null });
    }
  };

  const resetState = () => {
    setRawState(initialRoleState);
  };

  return {
    state,
    updateState,
    selectMode,
    resetState
  };
}
