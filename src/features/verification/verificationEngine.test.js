import { describe, expect, it } from 'vitest';
import {
  evaluateClaimDecision,
  evaluateMediaDecision,
  getClaimProgress,
  getMediaProgress,
  getSourceComparison,
  getSourceQualitySummary
} from './verificationEngine';

describe('verificationEngine', () => {
  it('확인된 개장일 주장을 두 공식 기록과 연결한다', () => {
    const result = evaluateClaimDecision('claim_opening', 'confirmed', 'opening_two_records');
    expect(result.isEvidenceAligned).toBe(true);
    expect(result.expectedDecision).toBe('confirmed');
    expect(result.verifiedText).toContain('2024년 4월 22일');
  });

  it('오래된 이용 시간은 최신 자료와 맞지 않는 것으로 분석한다', () => {
    const result = evaluateClaimDecision('claim_hours', 'confirmed', 'hours_current_wins');
    expect(result.isEvidenceAligned).toBe(false);
    expect(result.expectedDecision).toBe('contradicted');
  });

  it('근거가 부족한 35% 주장은 추가 근거 필요 상태로 분석한다', () => {
    const result = evaluateClaimDecision('claim_focus', 'needs_evidence', 'focus_small_no_method');
    expect(result.isEvidenceAligned).toBe(true);
    expect(result.evidenceSummary).toContain('18명');
  });

  it('선택한 출처를 최신 날짜부터 비교하고 품질 조건을 요약한다', () => {
    const sources = getSourceComparison(['source_newsletter_old', 'source_notice_current']);
    expect(sources.map(source => source.id)).toEqual(['source_notice_current', 'source_newsletter_old']);
    expect(getSourceQualitySummary(sources.map(source => source.id)).hasCurrentOfficialSource).toBe(true);
  });

  it('세 주장 모두 판단했을 때만 정보 검증을 완료한다', () => {
    expect(getClaimProgress({ claim_opening: 'confirmed' }).isComplete).toBe(false);
    expect(getClaimProgress({
      claim_opening: 'confirmed',
      claim_hours: 'contradicted',
      claim_focus: 'needs_evidence'
    }).isComplete).toBe(true);
  });

  it('목소리 합성 사례는 동의와 표시가 없는 현재 상태에서 사용 불가로 안내한다', () => {
    const result = evaluateMediaDecision('media_voice', 'not_allowed', ['voice_consent', 'synthetic_label', 'purpose_check']);
    expect(result.isEvidenceAligned).toBe(true);
    expect(result.requiredCount).toBe(3);
  });

  it('AI 제작물도 출처·이력·이용 조건이 갖춰지면 사용 가능할 수 있다', () => {
    const result = evaluateMediaDecision('media_poster', 'allowed', ['keep_label', 'check_license', 'teacher_review']);
    expect(result.isEvidenceAligned).toBe(true);
    expect(result.decisionReason).toContain('제작 이력');
  });

  it('최종 판단이 맞아도 필요한 게시 전 행동을 빼면 다시 검토하게 한다', () => {
    const result = evaluateMediaDecision('media_voice', 'not_allowed', ['voice_consent']);
    expect(result.isEvidenceAligned).toBe(false);
    expect(result.hasAllRequiredActions).toBe(false);
    expect(result.selectedRequiredCount).toBe(1);
  });

  it('조사한 미디어 사례 수를 점수가 아닌 진행 상태로 계산한다', () => {
    const progress = getMediaProgress({ media_voice: 'not_allowed', unknown: 'allowed' });
    expect(progress.completedIds).toEqual(['media_voice']);
    expect(progress.hasCompletedCase).toBe(true);
  });
});
