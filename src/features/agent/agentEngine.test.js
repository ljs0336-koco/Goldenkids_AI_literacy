import { describe, expect, it } from 'vitest';
import { evaluateGuardrailReadiness, getMissionById, getToolById } from './agentEngine';

describe('agentEngine', () => {
  it('미션과 도구를 ID로 조회한다', () => {
    expect(getMissionById('mission_invite').title).toContain('학예회');
    expect(getToolById('tool_pay').riskLevel).toBe('critical');
  });

  it('선택하지 않은 설정에 점수를 주지 않는다', () => {
    const result = evaluateGuardrailReadiness({});
    expect(result.readinessScore).toBe(0);
    expect(result.configuredCount).toBe(0);
    expect(result.isConfigured).toBe(false);
    expect(result.analysisItems.every(item => item.chosenOption === null)).toBe(true);
  });

  it('네 권장 설정을 모두 고르면 기본 통제 준비 완료로 평가한다', () => {
    const result = evaluateGuardrailReadiness({
      guard_permission: 'scoped',
      guard_budget: 'bounded',
      guard_hitl: 'risk_based',
      guard_killswitch: 'containment'
    });
    expect(result.readinessScore).toBe(100);
    expect(result.configuredCount).toBe(4);
    expect(result.hasRecommendedBaseline).toBe(true);
    expect(result.readinessLevel).toBe('기본 통제 준비 완료');
  });

  it('설정 점검도를 안전 확률이나 완벽함으로 표현하지 않는다', () => {
    const result = evaluateGuardrailReadiness({
      guard_permission: 'scoped',
      guard_budget: 'bounded',
      guard_hitl: 'risk_based',
      guard_killswitch: 'containment'
    });
    expect(JSON.stringify(result)).not.toMatch(/완벽|사고 확률|원천 차단/);
  });
});
