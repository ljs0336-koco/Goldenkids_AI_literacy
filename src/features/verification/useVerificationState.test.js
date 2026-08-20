import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  initialVerificationState,
  useVerificationState,
  validateAndSanitizeVerificationState,
  VERIFICATION_STORAGE_KEY
} from './useVerificationState';

describe('useVerificationState', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('모듈 2 전용 v1 키만 사용한다', () => {
    const { result } = renderHook(() => useVerificationState());
    act(() => result.current.selectMode('claim'));
    expect(result.current.state.mode).toBe('claim');
    expect(window.localStorage.getItem(VERIFICATION_STORAGE_KEY)).toContain('"mode":"claim"');
    expect(window.localStorage.getItem('ai-literacy-lab-fairness:v5')).toBeNull();
    expect(window.localStorage.getItem('ai-literacy-lab-role:v2')).toBeNull();
  });

  it('알 수 없는 필드와 허용되지 않은 주장·출처 ID를 제거한다', () => {
    const sanitized = validateAndSanitizeVerificationState({
      ...initialVerificationState,
      mode: 'claim',
      selectedClaimId: 'hacked_claim',
      claimSelectedSourceIds: { claim_opening: ['source_notice_current', 'evil_source'], evil_claim: ['source_notice_current'] },
      injectedCode: 'payload'
    });
    expect(sanitized.selectedClaimId).toBe('claim_opening');
    expect(sanitized.claimSelectedSourceIds).toEqual({ claim_opening: ['source_notice_current'] });
    expect(sanitized.injectedCode).toBeUndefined();
  });

  it('미디어 관찰·권리 선택도 해당 사례에 정의된 ID만 보존한다', () => {
    const sanitized = validateAndSanitizeVerificationState({
      ...initialVerificationState,
      mediaObservations: { media_voice: ['voice_wave', 'unknown_clue'] },
      mediaRightsSelections: { media_voice: ['voice_consent', 'delete_everything'] },
      mediaDecisions: { media_voice: 'not_allowed', unknown_case: 'allowed' }
    });
    expect(sanitized.mediaObservations.media_voice).toEqual(['voice_wave']);
    expect(sanitized.mediaRightsSelections.media_voice).toEqual(['voice_consent']);
    expect(sanitized.mediaDecisions).toEqual({ media_voice: 'not_allowed' });
  });

  it('저장된 변조 상태도 훅에서 읽을 때 즉시 정제한다', () => {
    window.localStorage.setItem(VERIFICATION_STORAGE_KEY, JSON.stringify({
      ...initialVerificationState,
      mode: 'evil-mode',
      selectedMediaCaseId: 'not-real'
    }));
    const { result } = renderHook(() => useVerificationState());
    expect(result.current.state.mode).toBeNull();
    expect(result.current.state.selectedMediaCaseId).toBe('media_voice');
  });

  it('초기화하면 모듈 2 상태만 기본값으로 되돌린다', () => {
    const { result } = renderHook(() => useVerificationState());
    act(() => result.current.updateState({ mode: 'media', mediaStep: 3 }));
    act(() => result.current.resetState());
    expect(result.current.state).toEqual(initialVerificationState);
  });
});
