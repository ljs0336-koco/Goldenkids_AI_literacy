/**
 * 공정한 AI 실험실 연산 및 평가 엔진
 * 1. AI 금쪽이 활동 추천 연산 엔진
 * 2. 프로젝트 대표팀 구성 연산 엔진
 */

// ==========================================
// 1. AI 금쪽이 활동 추천 연산 엔진
// ==========================================

/**
 * 기록에 포함된 관심 단서를 활동별로 합산한다.
 * 이 점수는 학생의 능력 점수가 아니라 추천 시뮬레이터가 찾은 패턴의 수치다.
 */
export function calculateActivityScores(records, options) {
  const safeRecords = Array.isArray(records) ? records : [];
  const safeOptions = Array.isArray(options) ? options : [];

  return safeOptions.map((option, optionIndex) => ({
    ...option,
    optionIndex,
    score: safeRecords.reduce((total, record) => {
      const value = record?.signals?.[option.key];
      return total + (typeof value === 'number' ? value : 0);
    }, 0)
  }));
}

/**
 * 활동별 관심 단서 점수가 높은 순서로 정렬한다.
 * 동점이면 데이터에 정의된 원래 순서를 유지한다.
 */
export function rankActivityRecommendations(records, options) {
  return calculateActivityScores(records, options)
    .sort((a, b) => (b.score - a.score) || (a.optionIndex - b.optionIndex));
}

/**
 * 현재 데이터 범위에서 가장 높은 활동 추천 한 가지를 반환한다.
 */
export function getTopActivityRecommendation(records, options) {
  return rankActivityRecommendations(records, options)[0] ?? null;
}


// ==========================================
// 2. 프로젝트 대표팀 구성 연산 엔진
// ==========================================

/**
 * 가중치에 따른 지원자 총점 계산
 */
export function calculateTeamCandidateScore(candidate, weights) {
  if (!candidate || !weights) return 0;

  // 이전 참여 기회 반영값 (0회: 100, 1회: 80, 2회: 60)
  const oppCount = candidate.previousParticipationCount ?? 0;
  const opportunityScore = Math.max(0, Math.min(100, 100 - (oppCount * 20)));

  const totalScaled = 
    ((candidate.problemDiscovery || 0) * (weights.problemDiscovery || 0)) + 
    ((candidate.digitalMaking || 0) * (weights.digitalMaking || 0)) + 
    ((candidate.communicationCollaboration || 0) * (weights.communicationCollaboration || 0)) + 
    ((candidate.presentation || 0) * (weights.presentation || 0)) + 
    (opportunityScore * (weights.opportunity || 0));

  return Math.round(totalScaled / 10) / 10;
}

/**
 * 지원자 목록 정렬
 */
export function sortTeamCandidates(candidatesWithScores, originalCandidates) {
  return [...candidatesWithScores].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.problemDiscovery !== a.problemDiscovery) {
      return b.problemDiscovery - a.problemDiscovery;
    }
    if (b.communicationCollaboration !== a.communicationCollaboration) {
      return b.communicationCollaboration - a.communicationCollaboration;
    }
    const idxA = originalCandidates.findIndex(c => c.id === a.id);
    const idxB = originalCandidates.findIndex(c => c.id === b.id);
    return idxA - idxB;
  });
}

/**
 * 기준 가중치에 따라 대표팀 4명 평가 및 선발
 */
export function evaluateTeamCandidates(candidates, weights) {
  if (!candidates || !weights) return [];
  const candidatesWithScores = candidates.map(c => ({
    ...c,
    score: calculateTeamCandidateScore(c, weights)
  }));
  
  const sorted = sortTeamCandidates(candidatesWithScores, candidates);
  return sorted.slice(0, 4);
}

/**
 * 대표팀 4명의 역할 균형 판별
 * (각 역할에 80점 이상의 강점을 가진 학생이 최소 1명 이상 있는지 확인)
 */
export function evaluateTeamRoleBalance(teamMembers) {
  if (!teamMembers || teamMembers.length === 0) {
    return {
      problemDiscovery: false,
      digitalMaking: false,
      communicationCollaboration: false,
      presentation: false,
      isBalanced: false
    };
  }

  const hasProblemDiscovery = teamMembers.some(m => m.problemDiscovery >= 80);
  const hasDigitalMaking = teamMembers.some(m => m.digitalMaking >= 80);
  const hasCollab = teamMembers.some(m => m.communicationCollaboration >= 80);
  const hasPresentation = teamMembers.some(m => m.presentation >= 80);

  const isBalanced = hasProblemDiscovery && hasDigitalMaking && hasCollab && hasPresentation;

  return {
    problemDiscovery: hasProblemDiscovery,
    digitalMaking: hasDigitalMaking,
    communicationCollaboration: hasCollab,
    presentation: hasPresentation,
    isBalanced
  };
}

/**
 * 이전 대표팀 vs 새 대표팀 구성원 변화 비교
 */
export function getRecommendationDiff(oldTeam, newTeam) {
  const oldIds = (oldTeam || []).map(c => typeof c === 'string' ? c : c.id);
  const newIds = (newTeam || []).map(c => typeof c === 'string' ? c : c.id);

  const maintained = (newTeam || []).filter(c => oldIds.includes(typeof c === 'string' ? c : c.id));
  const newlyAdded = (newTeam || []).filter(c => !oldIds.includes(typeof c === 'string' ? c : c.id));
  const excluded = (oldTeam || []).filter(c => !newIds.includes(typeof c === 'string' ? c : c.id));

  return {
    maintained,
    newlyAdded,
    excluded,
    maintainedIds: maintained.map(c => typeof c === 'string' ? c : c.id),
    newlyAddedIds: newlyAdded.map(c => typeof c === 'string' ? c : c.id),
    excludedIds: excluded.map(c => typeof c === 'string' ? c : c.id)
  };
}

// ==========================================
// 3. 성장상 연산 함수들
// ==========================================

export function calculateDecemberAvg(student) {
  if (!student || !student.december) return 0;
  const { digitalToolUse = 0, problemSolving = 0, communicationCollaboration = 0 } = student.december;
  const avg = (digitalToolUse + problemSolving + communicationCollaboration) / 3;
  return Math.round(avg * 10) / 10;
}

export function calculateGrowthDeltas(student) {
  if (!student || !student.march || !student.december) {
    return { digitalToolUseDelta: 0, problemSolvingDelta: 0, communicationCollaborationDelta: 0, avgDelta: 0 };
  }
  const digitalToolUseDelta = student.december.digitalToolUse - student.march.digitalToolUse;
  const problemSolvingDelta = student.december.problemSolving - student.march.problemSolving;
  const communicationCollaborationDelta = student.december.communicationCollaboration - student.march.communicationCollaboration;
  const avgDelta = Math.round(((digitalToolUseDelta + problemSolvingDelta + communicationCollaborationDelta) / 3) * 10) / 10;

  return {
    digitalToolUseDelta,
    problemSolvingDelta,
    communicationCollaborationDelta,
    avgDelta
  };
}

export function getTempGrowthRecommendation(candidates = []) {
  if (!candidates || candidates.length === 0) return null;
  const sorted = [...candidates].sort((a, b) => calculateDecemberAvg(b) - calculateDecemberAvg(a));
  return sorted[0];
}

export function getFinalGrowthRecommendation(candidates = []) {
  if (!candidates || candidates.length === 0) return null;
  const sorted = [...candidates].sort((a, b) => calculateGrowthDeltas(b).avgDelta - calculateGrowthDeltas(a).avgDelta);
  return sorted[0];
}
