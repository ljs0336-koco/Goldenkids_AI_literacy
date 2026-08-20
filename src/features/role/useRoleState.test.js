import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoleState, initialRoleState, validateAndSanitizeRoleState } from './useRoleState';

describe('useRoleState Hook Tests (v2)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('1. 초기 상태가 v2 기본값으로 설정되며 이전 v1 스토리지를 정리한다', () => {
    window.localStorage.setItem('ai-literacy-lab-role:v1', JSON.stringify({ old: true }));

    const { result } = renderHook(() => useRoleState());

    expect(result.current.state.version).toBe('v2');
    expect(result.current.state.mode).toBeNull();
    expect(result.current.state.personaStep).toBe(0);
    expect(result.current.state.taskStep).toBe(0);
    expect(window.localStorage.getItem('ai-literacy-lab-role:v1')).toBeNull();
  });

  it('2. 알 수 없는 주입 필드 및 유효하지 않은 시나리오/업무 ID를 엄격하게 정제한다', () => {
    const malicious = {
      version: 'v2',
      mode: 'persona',
      personaStep: 2,
      currentScenarioId: 'invalid_scenario_999',
      userPersonaChoices: { 
        sc_01: 'friend', 
        sc_02: 'invalid_persona',
        hacked_sc_99: 'coach'
      },
      taskClassifications: {
        task_01: 'ai_auto',
        task_999: 'ai_auto',
        task_02: 'invalid_zone'
      },
      hackedKey: 'injected_code'
    };

    const sanitized = validateAndSanitizeRoleState(malicious);

    expect(sanitized.mode).toBe('persona');
    expect(sanitized.personaStep).toBe(2);
    expect(sanitized.currentScenarioId).toBe('sc_01'); // fallback to default
    expect(sanitized.userPersonaChoices.sc_01).toBe('friend');
    expect(sanitized.userPersonaChoices.sc_02).toBeUndefined();
    expect(sanitized.userPersonaChoices.hacked_sc_99).toBeUndefined();
    expect(sanitized.taskClassifications.task_01).toBe('ai_auto');
    expect(sanitized.taskClassifications.task_999).toBeUndefined();
    expect(sanitized.taskClassifications.task_02).toBeUndefined();
    expect(sanitized.hackedKey).toBeUndefined();
  });

  it('3. 모드 전환(persona, task) 및 resetState가 올바르게 작동한다', () => {
    const { result } = renderHook(() => useRoleState());

    act(() => {
      result.current.selectMode('persona');
    });

    expect(result.current.state.mode).toBe('persona');
    expect(result.current.state.personaStep).toBe(0);

    act(() => {
      result.current.updateState({ personaStep: 2, currentScenarioId: 'sc_05' });
    });

    expect(result.current.state.personaStep).toBe(2);
    expect(result.current.state.currentScenarioId).toBe('sc_05');

    act(() => {
      result.current.selectMode('task');
    });

    expect(result.current.state.mode).toBe('task');
    expect(result.current.state.taskStep).toBe(0);

    act(() => {
      result.current.resetState();
    });

    expect(result.current.state).toEqual(initialRoleState);
  });
});
