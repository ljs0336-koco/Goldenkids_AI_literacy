import { agentMissions, agentTools, safetyGuardrails } from './agentData';

export function getMissionById(missionId) {
  return agentMissions.find(m => m.id === missionId) || agentMissions[0];
}

export function getToolById(toolId) {
  return agentTools.find(t => t.id === toolId) || null;
}

/**
 * 4대 가드레일 설정에 대한 안전성 분석 및 피드백
 */
export function evaluateGuardrailSafety(guardrailChoices = {}) {
  let safetyScore = 0;
  const analysisItems = [];

  safetyGuardrails.forEach(guard => {
    const chosenOptionId = guardrailChoices[guard.id];
    const option = guard.options.find(o => o.id === chosenOptionId) || guard.options[0];
    const isRecommended = option.recommended;

    if (isRecommended) {
      safetyScore += 25;
    }

    analysisItems.push({
      guardId: guard.id,
      title: guard.title,
      chosenOption: option.label,
      isRecommended,
      feedback: isRecommended 
        ? "✅ 안전: 에이전트의 오작동 및 피해를 원천 차단하는 올바른 설정입니다."
        : "⚠️ 주의: 에이전트에게 너무 과도한 자율권을 주어 위험한 사고가 발생할 수 있습니다."
    });
  });

  let safetyLevel = "위험";
  if (safetyScore >= 100) safetyLevel = "완벽한 안전 사령관";
  else if (safetyScore >= 75) safetyLevel = "양호한 통제 상태";
  else if (safetyScore >= 50) safetyLevel = "부분적 취약점 존재";

  return {
    safetyScore,
    safetyLevel,
    analysisItems,
    isFullySafe: safetyScore === 100
  };
}
