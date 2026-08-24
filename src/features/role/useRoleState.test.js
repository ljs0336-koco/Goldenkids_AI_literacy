import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { initialRoleState, useRoleState, validateAndSanitizeRoleState } from './useRoleState';

describe('useRoleState v3', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('새 스키마로 시작하고 이전 역할 저장 기록을 정리한다', () => {
    window.localStorage.setItem('ai-literacy-lab-role:v1', '{}');
    window.localStorage.setItem('ai-literacy-lab-role:v2', '{}');
    const { result } = renderHook(() => useRoleState());

    expect(result.current.state.version).toBe('v3');
    expect(result.current.state.currentTaskIndex).toBe(0);
    expect(result.current.state.personaRecipeChoices).toEqual({});
    expect(window.localStorage.getItem('ai-literacy-lab-role:v1')).toBeNull();
    expect(window.localStorage.getItem('ai-literacy-lab-role:v2')).toBeNull();
  });

  it('네 상황·네 과업·상황별 부탁 조합만 허용한다', () => {
    const sanitized = validateAndSanitizeRoleState({
      version: 'v3',
      mode: 'persona',
      personaStep: 2,
      currentScenarioId: 'sc_99',
      userPersonaChoices: { sc_01: 'friend', sc_05: 'coach', sc_02: 'fake' },
      personaRecipeChoices: { sc_01: 'friend_then_coach', sc_02: 'fake_recipe' },
      taskClassifications: { task_01: 'ai_auto', task_05: 'human_lead', task_02: 'fake_zone' },
      selectedPrinciples: ['AI의 초안은 사실과 상황을 확인한 뒤 사용해요.', '가짜 원칙'],
      injected: true
    });

    expect(sanitized.mode).toBe('persona');
    expect(sanitized.currentScenarioId).toBe('sc_01');
    expect(sanitized.userPersonaChoices).toEqual({ sc_01: 'friend' });
    expect(sanitized.personaRecipeChoices).toEqual({ sc_01: 'friend_then_coach' });
    expect(sanitized.taskClassifications).toEqual({ task_01: 'ai_auto' });
    expect(sanitized.selectedPrinciples).toHaveLength(1);
    expect(sanitized.injected).toBeUndefined();
  });

  it('모드 전환과 초기화가 새 상태를 유지한다', () => {
    const { result } = renderHook(() => useRoleState());
    act(() => result.current.selectMode('persona'));
    act(() => result.current.updateState({ personaStep: 2, currentScenarioId: 'sc_04' }));
    expect(result.current.state.currentScenarioId).toBe('sc_04');

    act(() => result.current.selectMode('task'));
    expect(result.current.state.taskStep).toBe(0);
    expect(result.current.state.currentTaskIndex).toBe(0);

    act(() => result.current.resetState());
    expect(result.current.state).toEqual(initialRoleState);
  });
});
