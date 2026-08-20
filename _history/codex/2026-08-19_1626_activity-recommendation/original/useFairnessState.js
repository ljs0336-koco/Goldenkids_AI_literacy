import { useLocalStorage } from '../../hooks/useLocalStorage';

export const initialFairnessState = {
  version: 'v4',
  mode: null, // 'growth' | 'team' | null
  growthStep: 0, // 0: Initial, 1: TempRec, 2: Supplement, 3: Delta, 4: HumanCheck, 5: Completion
  teamStep: 0, // 0: Candidate, 1: Criteria, 2: Result, 3: Appeal, 4: AppealResult, 5: Principles, 6: Completion
  growthViewedStudentIds: [],
  growthChecklist: [],
  growthQuizAnswer: null,
  teamCriteriaWeights: null,
  teamHasViewedAll: false,
  teamAppealChoice: null,
  teamSelectedPrinciples: [],
  isGrowthCompleted: false,
  isTeamCompleted: false
};

// Strict whitelist validator and sanitizer
export function validateAndSanitizeState(rawState) {
  if (!rawState || typeof rawState !== 'object' || rawState.version !== 'v4') {
    return initialFairnessState;
  }

  const validGrowthStep = typeof rawState.growthStep === 'number' && rawState.growthStep >= 0 && rawState.growthStep <= 5
    ? rawState.growthStep
    : 0;

  const validTeamStep = typeof rawState.teamStep === 'number' && rawState.teamStep >= 0 && rawState.teamStep <= 6
    ? rawState.teamStep
    : 0;

  const validMode = rawState.mode === 'growth' || rawState.mode === 'team' ? rawState.mode : null;

  const validTeamCriteriaWeights = rawState.teamCriteriaWeights && typeof rawState.teamCriteriaWeights === 'object'
    ? rawState.teamCriteriaWeights
    : null;

  return {
    version: 'v4',
    mode: validMode,
    growthStep: validGrowthStep,
    teamStep: validTeamStep,
    growthViewedStudentIds: Array.isArray(rawState.growthViewedStudentIds) ? rawState.growthViewedStudentIds : [],
    growthChecklist: Array.isArray(rawState.growthChecklist) ? rawState.growthChecklist : [],
    growthQuizAnswer: typeof rawState.growthQuizAnswer === 'boolean' ? rawState.growthQuizAnswer : null,
    teamCriteriaWeights: validTeamCriteriaWeights,
    teamHasViewedAll: Boolean(rawState.teamHasViewedAll),
    teamAppealChoice: typeof rawState.teamAppealChoice === 'number' ? rawState.teamAppealChoice : null,
    teamSelectedPrinciples: Array.isArray(rawState.teamSelectedPrinciples) ? rawState.teamSelectedPrinciples : [],
    isGrowthCompleted: Boolean(rawState.isGrowthCompleted),
    isTeamCompleted: Boolean(rawState.isTeamCompleted)
  };
}

export function useFairnessState() {
  // Clear obsolete v1, v2, and v3 storage if present
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      ['ai-literacy-lab:v1', 'ai-literacy-lab:v2', 'ai-literacy-lab:v3'].forEach(k => {
        if (window.localStorage.getItem(k)) {
          window.localStorage.removeItem(k);
        }
      });
    }
  } catch (e) {
    // Ignore storage errors
  }

  const [rawState, setRawState] = useLocalStorage('ai-literacy-lab:v4', initialFairnessState);
  const state = validateAndSanitizeState(rawState);

  const updateState = (updates) => {
    setRawState(prev => {
      const sanitizedPrev = validateAndSanitizeState(prev);
      const next = typeof updates === 'function' ? updates(sanitizedPrev) : { ...sanitizedPrev, ...updates };
      return validateAndSanitizeState(next);
    });
  };

  const resetState = () => {
    setRawState(initialFairnessState);
  };

  const selectMode = (mode) => {
    if (mode === 'growth') {
      updateState({
        mode: 'growth',
        growthStep: 0,
        growthViewedStudentIds: [],
        growthChecklist: [],
        growthQuizAnswer: null,
        isGrowthCompleted: false
      });
    } else if (mode === 'team') {
      updateState({
        mode: 'team',
        teamStep: 0,
        teamCriteriaWeights: null,
        teamHasViewedAll: false,
        teamAppealChoice: null,
        teamSelectedPrinciples: [],
        isTeamCompleted: false
      });
    } else {
      updateState({ mode: null });
    }
  };

  return { state, updateState, resetState, selectMode };
}
