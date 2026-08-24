import { describe, expect, it } from 'vitest';
import { evaluateSafetySetup, getMissionById, getToolById } from './agentEngine';

describe('agentEngine', () => {
  it('학생 동아리 초대 미션과 필요한 도구를 ID로 조회한다', () => {
    expect(getMissionById('club_invite').title).toContain('공연 초대');
    expect(getToolById('tool_message').riskLevel).toBe('high');
  });

  it('선택하지 않은 안전 설정을 완료로 세지 않는다', () => {
    const result = evaluateSafetySetup({});
    expect(result.configuredCount).toBe(0);
    expect(result.recommendedCount).toBe(0);
    expect(result.isConfigured).toBe(false);
    expect(result.analysisItems.every(item => item.chosenOption === null)).toBe(true);
  });

  it('네 가지 권장 설정을 모두 확인한다', () => {
    const result = evaluateSafetySetup({
      guard_original: 'copy_only',
      guard_uncertain: 'needs_review',
      guard_preview: 'preview_hitl',
      guard_delete_share: 'ask_again'
    });
    expect(result.configuredCount).toBe(4);
    expect(result.recommendedCount).toBe(4);
    expect(result.hasRecommendedBaseline).toBe(true);
  });

  it('안전을 백분율이나 무사고 보증으로 계산하지 않는다', () => {
    const result = evaluateSafetySetup({
      guard_original: 'copy_only',
      guard_uncertain: 'needs_review',
      guard_preview: 'preview_hitl',
      guard_delete_share: 'ask_again'
    });
    expect(result).not.toHaveProperty('readinessScore');
    expect(JSON.stringify(result)).not.toMatch(/완벽|무사고|안전 확률/);
  });
});
