import { agentMissions, agentTools, safetyGuardrails } from './agentData';

export function getMissionById(missionId) {
  return agentMissions.find(mission => mission.id === missionId) || agentMissions[0];
}

export function getToolById(toolId) {
  return agentTools.find(tool => tool.id === toolId) || null;
}

export function evaluateSafetySetup(guardrailChoices = {}) {
  let configuredCount = 0;
  let recommendedCount = 0;

  const analysisItems = safetyGuardrails.map(guard => {
    const chosenOptionId = guardrailChoices[guard.id];
    const option = guard.options.find(candidate => candidate.id === chosenOptionId) || null;
    if (option) configuredCount += 1;
    if (option?.recommended) recommendedCount += 1;

    return {
      guardId: guard.id,
      title: guard.title,
      chosenOption: option?.label || null,
      isConfigured: Boolean(option),
      isRecommended: Boolean(option?.recommended),
      feedback: !option
        ? '아직 선택하지 않았어요.'
        : option.recommended
          ? '원본과 사람의 결정권을 지키는 설정이에요.'
          : 'AI의 행동 범위가 넓어져요. 더 안전한 방법을 다시 골라 보세요.'
    };
  });

  return {
    configuredCount,
    recommendedCount,
    analysisItems,
    isConfigured: configuredCount === safetyGuardrails.length,
    hasRecommendedBaseline: recommendedCount === safetyGuardrails.length
  };
}

export const evaluateGuardrailReadiness = evaluateSafetySetup;
export const evaluateGuardrailSafety = evaluateSafetySetup;
