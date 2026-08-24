import { describe, expect, it } from 'vitest';
import { calculateTaskDistribution, evaluateTaskClassifications, getPersonaMatchAnalysis } from './roleEngine';
import { roleScenarios, workTasks } from './roleData';

describe('모듈 3 역할 분석 엔진', () => {
  it('주 역할과 함께 쓰는 역할을 구분한다', () => {
    const scenario = roleScenarios[0];
    const primary = getPersonaMatchAnalysis(scenario, 'friend');
    const secondary = getPersonaMatchAnalysis(scenario, 'coach');
    const other = getPersonaMatchAnalysis(scenario, 'critic');

    expect(primary.fitLevel).toBe('primary');
    expect(primary.primaryPersona.name).toBe('공감 친구');
    expect(primary.secondaryPersona.name).toBe('생각 코치');
    expect(primary.cautionNotice).toContain('실제로 감정을 느끼지는 않아요');
    expect(secondary.fitLevel).toBe('secondary');
    expect(other.fitLevel).toBe('complementary');
  });

  it('네 가지 과업의 역할 분포를 집계한다', () => {
    const distribution = calculateTaskDistribution({
      task_01: 'ai_auto',
      task_02: 'collaboration',
      task_03: 'collaboration'
    });

    expect(distribution.total).toBe(4);
    expect(distribution.classifiedCount).toBe(3);
    expect(distribution.counts.ai_auto).toBe(1);
    expect(distribution.counts.collaboration).toBe(2);
    expect(distribution.counts.unclassified).toBe(1);
    expect(distribution.isAllClassified).toBe(false);
  });

  it('추천 역할은 점수 대신 과업별 근거와 함께 반환한다', () => {
    const classifications = Object.fromEntries(workTasks.map(task => [task.id, task.recommendedZone]));
    const result = evaluateTaskClassifications(classifications);

    expect(result.items).toHaveLength(4);
    expect(result.alignedCount).toBe(4);
    expect(result.items.every(item => item.rationale.length > 0)).toBe(true);
  });
});
