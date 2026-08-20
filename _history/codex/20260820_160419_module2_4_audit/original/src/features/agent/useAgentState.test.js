import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAgentState, initialAgentState, validateAndSanitizeAgentState } from './useAgentState';

describe('useAgentState Hook Tests (v1)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('1. 초기 상태가 올바른 v1 기본값으로 초기화된다', () => {
    const { result } = renderHook(() => useAgentState());

    expect(result.current.state.version).toBe('v1');
    expect(result.current.state.mode).toBeNull();
    expect(result.current.state.missionStep).toBe(0);
    expect(result.current.state.controlStep).toBe(0);
    expect(result.current.state.killSwitchTriggered).toBe(false);
  });

  it('2. 알 수 없는 주입 필드 및 유효하지 않은 미션/가드레일 ID를 엄격히 정제한다', () => {
    const malicious = {
      version: 'v1',
      mode: 'mission',
      missionStep: 2,
      selectedMissionId: 'invalid_mission_999',
      humanApprovalDecisions: {
        mission_invite: 'approve',
        hacked_mission: 'approve'
      },
      guardrailChoices: {
        guard_permission: 'minimal',
        hacked_guard: 'invalid_option'
      },
      hackedField: 'exploit'
    };

    const sanitized = validateAndSanitizeAgentState(malicious);

    expect(sanitized.mode).toBe('mission');
    expect(sanitized.selectedMissionId).toBe('mission_invite');
    expect(sanitized.humanApprovalDecisions.mission_invite).toBe('approve');
    expect(sanitized.humanApprovalDecisions.hacked_mission).toBeUndefined();
    expect(sanitized.guardrailChoices.guard_permission).toBe('minimal');
    expect(sanitized.guardrailChoices.hacked_guard).toBeUndefined();
    expect(sanitized.hackedField).toBeUndefined();
  });

  it('3. 모드 전환(mission, control) 및 resetState가 올바르게 작동한다', () => {
    const { result } = renderHook(() => useAgentState());

    act(() => {
      result.current.selectMode('mission');
    });

    expect(result.current.state.mode).toBe('mission');
    expect(result.current.state.missionStep).toBe(0);

    act(() => {
      result.current.updateState({ missionStep: 2 });
    });

    expect(result.current.state.missionStep).toBe(2);

    act(() => {
      result.current.selectMode('control');
    });

    expect(result.current.state.mode).toBe('control');
    expect(result.current.state.controlStep).toBe(0);

    act(() => {
      result.current.resetState();
    });

    expect(result.current.state).toEqual(initialAgentState);
  });
});
