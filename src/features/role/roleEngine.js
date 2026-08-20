import { aiPersonas, workTasks } from './roleData';

/**
 * 페르소나 선택 다각적 분석 및 가이드 반환
 * (단일 정답 판정 대신 주 역할, 보조 역할, 활용 조건과 이유 제공)
 */
export function getPersonaMatchAnalysis(scenario, chosenPersonaId) {
  if (!scenario || !chosenPersonaId) return null;

  const chosenPersona = aiPersonas.find(p => p.id === chosenPersonaId);
  const primaryPersona = aiPersonas.find(p => p.id === scenario.primaryRole);
  const secondaryPersona = aiPersonas.find(p => p.id === scenario.secondaryRole);

  const isPrimary = chosenPersonaId === scenario.primaryRole;
  const isSecondary = chosenPersonaId === scenario.secondaryRole;

  let fitLevel = "complementary"; // "primary" | "secondary" | "complementary"
  if (isPrimary) fitLevel = "primary";
  else if (isSecondary) fitLevel = "secondary";

  return {
    fitLevel,
    isPrimary,
    isSecondary,
    chosenPersona,
    primaryPersona,
    secondaryPersona,
    scenarioTitle: scenario.situationTitle,
    roleGuidance: scenario.roleGuidance,
    pedagogicalTakeaway: scenario.pedagogicalTakeaway,
    cautionNotice: chosenPersona?.caution || null
  };
}

/**
 * 12개 업무의 3구역 분류 분포 계산
 */
export function calculateTaskDistribution(taskClassifications = {}) {
  const counts = {
    ai_auto: 0,
    collaboration: 0,
    human_lead: 0,
    unclassified: 0
  };

  workTasks.forEach(task => {
    const zone = taskClassifications[task.id];
    if (zone && counts[zone] !== undefined) {
      counts[zone]++;
    } else {
      counts.unclassified++;
    }
  });

  const total = workTasks.length;
  const classifiedCount = total - counts.unclassified;

  return {
    counts,
    percentages: {
      ai_auto: Math.round((counts.ai_auto / total) * 100),
      collaboration: Math.round((counts.collaboration / total) * 100),
      human_lead: Math.round((counts.human_lead / total) * 100),
      unclassified: Math.round((counts.unclassified / total) * 100)
    },
    total,
    classifiedCount,
    isAllClassified: counts.unclassified === 0
  };
}

/**
 * 12개 업무 분류 상세 교육적 분석
 * (단순 정답/점수 매기기 배제, 분류 이유와 가치 중심 해설 제공)
 */
export function evaluateTaskClassifications(taskClassifications = {}) {
  const items = workTasks.map(task => {
    const userZone = taskClassifications[task.id] || null;
    const isAligned = userZone === task.recommendedZone;

    return {
      taskId: task.id,
      title: task.title,
      category: task.category,
      icon: task.icon,
      userZone,
      recommendedZone: task.recommendedZone,
      isAligned,
      rationale: task.rationale
    };
  });

  const alignedCount = items.filter(i => i.isAligned).length;

  return {
    items,
    alignedCount,
    totalCount: workTasks.length
  };
}
