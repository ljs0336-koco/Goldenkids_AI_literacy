import { agentMissions, agentTools, safetyGuardrails } from './agentData';

export function getMissionById(missionId) {
  return agentMissions.find(mission => mission.id === missionId) || agentMissions[0];
}

export function getToolById(toolId) {
  return agentTools.find(tool => tool.id === toolId) || null;
}

/**
 * 네 통제 층의 설정 여부를 점검합니다.
 * readinessScore는 사고 확률이나 안전 보증이 아니라 권장 설정을 확인한 비율입니다.
 */
export function evaluateGuardrailReadiness(guardrailChoices = {}) {
  let configuredCount = 0;
  let recommendedCount = 0;

  const analysisItems = safetyGuardrails.map(guard => {
    const chosenOptionId = guardrailChoices[guard.id];
    const option = guard.options.find(candidate => candidate.id === chosenOptionId) || null;

    if (option) configuredCount += 1;
    if (option?.recommended) recommendedCount += 1;

    let feedback = '아직 설정하지 않았습니다.';
    if (option?.recommended) {
      feedback = '위험을 줄이는 권장 설정입니다. 실행 중 모니터링과 사후 확인도 계속 필요합니다.';
    } else if (option) {
      feedback = '권한이나 실행 범위가 넓어집니다. 어떤 피해가 생길 수 있는지 다시 검토하세요.';
    }

    return {
      guardId: guard.id,
      title: guard.title,
      chosenOption: option?.label || null,
      isConfigured: Boolean(option),
      isRecommended: Boolean(option?.recommended),
      feedback
    };
  });

  const readinessScore = recommendedCount * 25;
  let readinessLevel = '설정 필요';
  if (readinessScore === 100) readinessLevel = '기본 통제 준비 완료';
  else if (readinessScore >= 75) readinessLevel = '거의 준비됨';
  else if (readinessScore >= 50) readinessLevel = '보완 필요';
  else if (readinessScore >= 25) readinessLevel = '준비 시작';

  return {
    readinessScore,
    readinessLevel,
    configuredCount,
    recommendedCount,
    analysisItems,
    isConfigured: configuredCount === safetyGuardrails.length,
    hasRecommendedBaseline: recommendedCount === safetyGuardrails.length
  };
}

// 이전 프로토타입에서 사용한 이름을 내부 호환용으로만 유지합니다.
export const evaluateGuardrailSafety = evaluateGuardrailReadiness;
