import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AGENT_STORAGE_KEY, initialAgentState, useAgentState, validateAndSanitizeAgentState } from './useAgentState';

describe('useAgentState v3', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('모듈 전용 v3 저장소와 빈 학생 활동 기록으로 시작한다', () => {
    const { result } = renderHook(() => useAgentState());
    expect(AGENT_STORAGE_KEY).toBe('ai-literacy-lab-agent:v3');
    expect(result.current.state.version).toBe('v3');
    expect(result.current.state.mode).toBeNull();
    expect(result.current.state.approvalReviewChecks).toEqual([]);
    expect(result.current.state.guardrailChoices).toEqual({});
  });

  it('알 수 없는 필드와 유효하지 않은 선택·체크 ID를 제거한다', () => {
    const sanitized = validateAndSanitizeAgentState({
      version: 'v3',
      mode: 'mission',
      missionStep: 9,
      approvalReviewChecks: ['recipients', 'fake_check'],
      humanApprovalDecision: 'invalid',
      controlStep: 2,
      incidentResponseChecks: ['restore', 'fake_response'],
      guardrailChoices: {
        guard_original: 'copy_only',
        guard_preview: 'invalid_option',
        fake_guard: 'ask_again'
      },
      injected: true
    });

    expect(sanitized.missionStep).toBe(0);
    expect(sanitized.approvalReviewChecks).toEqual(['recipients']);
    expect(sanitized.humanApprovalDecision).toBeNull();
    expect(sanitized.incidentResponseChecks).toEqual(['restore']);
    expect(sanitized.guardrailChoices).toEqual({ guard_original: 'copy_only' });
    expect(sanitized.injected).toBeUndefined();
  });

  it('각 활동을 다시 시작하면 그 활동의 이전 기록을 초기화한다', () => {
    const { result } = renderHook(() => useAgentState());
    act(() => result.current.updateState({
      mode: 'control',
      controlStep: 3,
      killSwitchTriggered: true,
      incidentResponseChecks: ['restore'],
      guardrailChoices: { guard_original: 'copy_only' }
    }));
    act(() => result.current.selectMode('control'));
    expect(result.current.state.controlStep).toBe(0);
    expect(result.current.state.killSwitchTriggered).toBe(false);
    expect(result.current.state.incidentResponseChecks).toEqual([]);
    expect(result.current.state.guardrailChoices).toEqual({});
    act(() => result.current.resetState());
    expect(result.current.state).toEqual(initialAgentState);
  });
});
