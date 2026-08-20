import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AGENT_STORAGE_KEY, initialAgentState, useAgentState, validateAndSanitizeAgentState } from './useAgentState';

describe('useAgentState v2', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('모듈 전용 v2 저장소와 빈 통제 설정으로 시작한다', () => {
    const { result } = renderHook(() => useAgentState());
    expect(AGENT_STORAGE_KEY).toBe('ai-literacy-lab-agent:v2');
    expect(result.current.state.version).toBe('v2');
    expect(result.current.state.mode).toBeNull();
    expect(result.current.state.guardrailChoices).toEqual({});
    expect(result.current.state.incidentResponseChecks).toEqual([]);
  });

  it('알 수 없는 필드와 유효하지 않은 미션·옵션·체크 ID를 제거한다', () => {
    const sanitized = validateAndSanitizeAgentState({
      version: 'v2',
      mode: 'mission',
      selectedMissionId: 'invalid',
      approvalReviewChecks: {
        mission_invite: ['schedule', 'fake_check'],
        fake_mission: ['schedule']
      },
      humanApprovalDecisions: {
        mission_invite: 'reject',
        fake_mission: 'approve'
      },
      guardrailChoices: {
        guard_permission: 'invalid_option',
        guard_budget: 'bounded',
        fake_guard: 'full'
      },
      incidentResponseChecks: ['stop', 'fake_response'],
      injected: true
    });

    expect(sanitized.selectedMissionId).toBe('mission_invite');
    expect(sanitized.approvalReviewChecks.mission_invite).toEqual(['schedule']);
    expect(sanitized.approvalReviewChecks.fake_mission).toBeUndefined();
    expect(sanitized.humanApprovalDecisions).toEqual({ mission_invite: 'reject' });
    expect(sanitized.guardrailChoices).toEqual({ guard_budget: 'bounded' });
    expect(sanitized.incidentResponseChecks).toEqual(['stop']);
    expect(sanitized.injected).toBeUndefined();
  });

  it('통제 활동을 다시 시작하면 이전 중단 기록과 설정을 초기화한다', () => {
    const { result } = renderHook(() => useAgentState());
    act(() => result.current.updateState({
      mode: 'control',
      guardrailChoices: { guard_permission: 'scoped' },
      killSwitchTriggered: true,
      incidentResponseChecks: ['stop']
    }));
    act(() => result.current.selectMode('control'));
    expect(result.current.state.guardrailChoices).toEqual({});
    expect(result.current.state.killSwitchTriggered).toBe(false);
    expect(result.current.state.incidentResponseChecks).toEqual([]);
    act(() => result.current.resetState());
    expect(result.current.state).toEqual(initialAgentState);
  });
});
