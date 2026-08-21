import { useLocalStorage } from '../../hooks/useLocalStorage';

const allowedTeamPrinciples = [
  '팀의 목표와 선택 기준을 먼저 공개한다.',
  '빠지거나 잘못된 기록은 고친 뒤 같은 기준으로 다시 살핀다.',
  '결과에 질문하고 다시 검토할 수 있는 방법을 마련한다.'
];

export const initialFairnessState = {
  version: 'v5',
  mode: null, // 'growth'(꿈·진로 탐색 내부 호환 키) | 'team' | null
  growthStep: 0, // 기존 화면 구조 유지: 0 Initial ~ 5 Completion
  teamStep: 0, // 0: Candidate, 1: Criteria, 2: Result, 3: Appeal, 4: AppealResult, 5: Principles, 6: Completion
  growthViewedStudentIds: [],
  growthChecklist: [],
  growthQuizAnswer: null,
  growthSpeakerPath: null,
  growthQuestionId: null,
  growthCareerChoices: [],
  growthFinalChoice: null,
  teamCriteriaWeights: null,
  teamHasViewedAll: false,
  teamSpeakerPath: null,
  teamQuestionId: null,
  teamAppealChoice: null,
  teamSelectedPrinciples: [],
  isGrowthCompleted: false,
  isTeamCompleted: false
};

// Strict whitelist validator and sanitizer
export function validateAndSanitizeState(rawState) {
  if (!rawState || typeof rawState !== 'object' || rawState.version !== 'v5') {
    return initialFairnessState;
  }

  const validGrowthStep = typeof rawState.growthStep === 'number' && rawState.growthStep >= 0 && rawState.growthStep <= 5
    ? rawState.growthStep
    : 0;

  const validTeamStep = typeof rawState.teamStep === 'number' && rawState.teamStep >= 0 && rawState.teamStep <= 6
    ? rawState.teamStep
    : 0;

  const validMode = rawState.mode === 'growth' || rawState.mode === 'team' ? rawState.mode : null;
  const validGrowthSpeakerPath = rawState.growthSpeakerPath === 'speaker' || rawState.growthSpeakerPath === 'sample'
    ? rawState.growthSpeakerPath
    : null;
  const validGrowthQuestionId = ['why', 'missing', 'alternatives'].includes(rawState.growthQuestionId)
    ? rawState.growthQuestionId
    : null;
  const validGrowthFinalChoice = ['ask_and_research', 'try_project', 'explore_more'].includes(rawState.growthFinalChoice)
    ? rawState.growthFinalChoice
    : null;
  const validGrowthCareerChoices = Array.isArray(rawState.growthCareerChoices)
    ? rawState.growthCareerChoices.filter((id, index, values) => (
      ['software', 'environmentalEngineering', 'scienceCommunication', 'greenTech'].includes(id)
      && values.indexOf(id) === index
    )).slice(0, 2)
    : [];
  const validTeamSpeakerPath = rawState.teamSpeakerPath === 'speaker' || rawState.teamSpeakerPath === 'sample'
    ? rawState.teamSpeakerPath
    : null;
  const validTeamQuestionId = ['why', 'roles', 'opportunity'].includes(rawState.teamQuestionId)
    ? rawState.teamQuestionId
    : null;

  const validTeamCriteriaWeights = rawState.teamCriteriaWeights && typeof rawState.teamCriteriaWeights === 'object'
    ? rawState.teamCriteriaWeights
    : null;

  return {
    version: 'v5',
    mode: validMode,
    growthStep: validGrowthStep,
    teamStep: validTeamStep,
    growthViewedStudentIds: Array.isArray(rawState.growthViewedStudentIds) ? rawState.growthViewedStudentIds : [],
    growthChecklist: Array.isArray(rawState.growthChecklist) ? rawState.growthChecklist : [],
    growthQuizAnswer: typeof rawState.growthQuizAnswer === 'boolean' ? rawState.growthQuizAnswer : null,
    growthSpeakerPath: validGrowthSpeakerPath,
    growthQuestionId: validGrowthQuestionId,
    growthCareerChoices: validGrowthCareerChoices,
    growthFinalChoice: validGrowthFinalChoice,
    teamCriteriaWeights: validTeamCriteriaWeights,
    teamHasViewedAll: Boolean(rawState.teamHasViewedAll),
    teamSpeakerPath: validTeamSpeakerPath,
    teamQuestionId: validTeamQuestionId,
    teamAppealChoice: [1, 2, 3].includes(rawState.teamAppealChoice) ? rawState.teamAppealChoice : null,
    teamSelectedPrinciples: Array.isArray(rawState.teamSelectedPrinciples)
      ? rawState.teamSelectedPrinciples.filter((item, index, values) => (
        allowedTeamPrinciples.includes(item) && values.indexOf(item) === index
      )).slice(0, 2)
      : [],
    isGrowthCompleted: Boolean(rawState.isGrowthCompleted),
    isTeamCompleted: Boolean(rawState.isTeamCompleted)
  };
}

export function useFairnessState() {
  // Clear obsolete storage. v4 used the same internal key for the former growth-award scenario.
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      ['ai-literacy-lab:v1', 'ai-literacy-lab:v2', 'ai-literacy-lab:v3', 'ai-literacy-lab:v4'].forEach(k => {
        if (window.localStorage.getItem(k)) {
          window.localStorage.removeItem(k);
        }
      });
    }
  } catch {
    // Ignore storage errors
  }

  const [rawState, setRawState] = useLocalStorage('ai-literacy-lab:v5', initialFairnessState);
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
        growthSpeakerPath: null,
        growthQuestionId: null,
        growthCareerChoices: [],
        growthFinalChoice: null,
        isGrowthCompleted: false
      });
    } else if (mode === 'team') {
      updateState({
        mode: 'team',
        teamStep: 0,
        teamCriteriaWeights: null,
        teamHasViewedAll: false,
        teamSpeakerPath: null,
        teamQuestionId: null,
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
