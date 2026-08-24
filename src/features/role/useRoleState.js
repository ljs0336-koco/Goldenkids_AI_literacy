import { useLocalStorage } from '../../hooks/useLocalStorage';
import { aiPersonas, rolePrinciples, roleScenarios, workTasks } from './roleData';

export const ROLE_STORAGE_KEY = 'ai-literacy-lab-role:v3';

export const initialRoleState = {
  version: 'v3',
  mode: null,
  personaStep: 0,
  currentScenarioId: 'sc_01',
  userPersonaChoices: {},
  personaRecipeChoices: {},
  taskStep: 0,
  taskIntroSeen: false,
  currentTaskIndex: 0,
  taskAnalysisPage: 0,
  taskClassifications: {},
  selectedPrinciples: [],
  isPersonaCompleted: false,
  isTaskCompleted: false
};

const ALLOWED_KEYS = new Set(Object.keys(initialRoleState));
const VALID_MODES = new Set(['persona', 'task', null]);
const VALID_SCENARIO_IDS = new Set(roleScenarios.map(scenario => scenario.id));
const VALID_TASK_IDS = new Set(workTasks.map(task => task.id));
const VALID_PERSONAS = new Set(aiPersonas.map(persona => persona.id));
const VALID_ZONES = new Set(['ai_auto', 'collaboration', 'human_lead']);
const VALID_PRINCIPLES = new Set(rolePrinciples);
const VALID_RECIPES = new Map(roleScenarios.map(scenario => [
  scenario.id,
  new Set(scenario.recipes.map(recipe => recipe.id))
]));

export function validateAndSanitizeRoleState(rawState) {
  if (!rawState || typeof rawState !== 'object' || Array.isArray(rawState) || rawState.version !== 'v3') {
    return { ...initialRoleState };
  }

  const sanitized = { ...initialRoleState };

  for (const key of Object.keys(rawState)) {
    if (!ALLOWED_KEYS.has(key)) continue;
    const value = rawState[key];

    switch (key) {
      case 'mode':
        sanitized.mode = VALID_MODES.has(value) ? value : null;
        break;
      case 'personaStep':
        sanitized.personaStep = Number.isInteger(value) && value >= 0 && value <= 3 ? value : 0;
        break;
      case 'currentScenarioId':
        sanitized.currentScenarioId = VALID_SCENARIO_IDS.has(value) ? value : 'sc_01';
        break;
      case 'userPersonaChoices': {
        if (!value || typeof value !== 'object' || Array.isArray(value)) break;
        const choices = {};
        for (const [scenarioId, personaId] of Object.entries(value)) {
          if (VALID_SCENARIO_IDS.has(scenarioId) && VALID_PERSONAS.has(personaId)) choices[scenarioId] = personaId;
        }
        sanitized.userPersonaChoices = choices;
        break;
      }
      case 'personaRecipeChoices': {
        if (!value || typeof value !== 'object' || Array.isArray(value)) break;
        const choices = {};
        for (const [scenarioId, recipeId] of Object.entries(value)) {
          if (VALID_SCENARIO_IDS.has(scenarioId) && VALID_RECIPES.get(scenarioId)?.has(recipeId)) choices[scenarioId] = recipeId;
        }
        sanitized.personaRecipeChoices = choices;
        break;
      }
      case 'taskStep':
        sanitized.taskStep = Number.isInteger(value) && value >= 0 && value <= 2 ? value : 0;
        break;
      case 'taskIntroSeen':
        sanitized.taskIntroSeen = Boolean(value);
        break;
      case 'currentTaskIndex':
        sanitized.currentTaskIndex = Number.isInteger(value) && value >= 0 && value < workTasks.length ? value : 0;
        break;
      case 'taskAnalysisPage':
        sanitized.taskAnalysisPage = Number.isInteger(value) && value >= 0 && value <= 2 ? value : 0;
        break;
      case 'taskClassifications': {
        if (!value || typeof value !== 'object' || Array.isArray(value)) break;
        const classifications = {};
        for (const [taskId, zone] of Object.entries(value)) {
          if (VALID_TASK_IDS.has(taskId) && VALID_ZONES.has(zone)) classifications[taskId] = zone;
        }
        sanitized.taskClassifications = classifications;
        break;
      }
      case 'selectedPrinciples':
        if (Array.isArray(value)) {
          sanitized.selectedPrinciples = value
            .filter(principle => typeof principle === 'string' && VALID_PRINCIPLES.has(principle))
            .slice(0, 1);
        }
        break;
      case 'isPersonaCompleted':
      case 'isTaskCompleted':
        sanitized[key] = Boolean(value);
        break;
      default:
        break;
    }
  }

  return sanitized;
}

export function useRoleState() {
  if (typeof window !== 'undefined' && window.localStorage) {
    ['ai-literacy-lab-role:v1', 'ai-literacy-lab-role:v2'].forEach(key => window.localStorage.removeItem(key));
  }

  const [rawState, setRawState] = useLocalStorage(ROLE_STORAGE_KEY, initialRoleState);
  const state = validateAndSanitizeRoleState(rawState);

  const updateState = updates => {
    setRawState(previous => validateAndSanitizeRoleState({ ...previous, ...updates }));
  };

  const selectMode = mode => {
    if (mode === 'persona') updateState({ mode, personaStep: 0 });
    else if (mode === 'task') updateState({ mode, taskStep: 0, currentTaskIndex: 0, taskAnalysisPage: 0 });
    else updateState({ mode: null });
  };

  const resetState = () => setRawState(initialRoleState);

  return { state, updateState, selectMode, resetState };
}
