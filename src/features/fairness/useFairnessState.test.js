import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFairnessState, initialFairnessState, validateAndSanitizeState } from './useFairnessState';

describe('useFairnessState Hook Tests (v5)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('1. v5 기본 상태로 초기화되며 이전 v1, v2, v3, v4 데이터를 자동 정리한다', () => {
    window.localStorage.setItem('ai-literacy-lab:v1', JSON.stringify({ old: 1 }));
    window.localStorage.setItem('ai-literacy-lab:v2', JSON.stringify({ old: 2 }));
    window.localStorage.setItem('ai-literacy-lab:v3', JSON.stringify({ old: 3 }));
    window.localStorage.setItem('ai-literacy-lab:v4', JSON.stringify({ old: 4 }));

    const { result } = renderHook(() => useFairnessState());

    expect(result.current.state.version).toBe('v5');
    expect(result.current.state.mode).toBeNull();
    expect(window.localStorage.getItem('ai-literacy-lab:v1')).toBeNull();
    expect(window.localStorage.getItem('ai-literacy-lab:v2')).toBeNull();
    expect(window.localStorage.getItem('ai-literacy-lab:v3')).toBeNull();
    expect(window.localStorage.getItem('ai-literacy-lab:v4')).toBeNull();
  });

  it('2. 화이트리스트 검증을 통해 알 수 없는 주입 필드를 안전하게 제거한다', () => {
    const maliciousRawState = {
      version: 'v5',
      mode: 'growth',
      growthStep: 2,
      growthViewedStudentIds: ['onyu', 'seojun'],
      unknownHackedField: 'HACKED_PAYLOAD',
      injectedCode: () => {}
    };

    const sanitized = validateAndSanitizeState(maliciousRawState);

    expect(sanitized.version).toBe('v5');
    expect(sanitized.mode).toBe('growth');
    expect(sanitized.growthStep).toBe(2);
    expect(sanitized.growthViewedStudentIds).toEqual(['onyu', 'seojun']);
    expect(sanitized.unknownHackedField).toBeUndefined();
    expect(sanitized.injectedCode).toBeUndefined();
  });

  it('3. 모드 전환(growth, team) 시 단계 및 진행 상태가 올바르게 설정된다', () => {
    const { result } = renderHook(() => useFairnessState());

    act(() => {
      result.current.selectMode('growth');
    });

    expect(result.current.state.mode).toBe('growth');
    expect(result.current.state.growthStep).toBe(0);

    act(() => {
      result.current.updateState({ growthStep: 3, growthViewedStudentIds: ['onyu'] });
    });

    expect(result.current.state.growthStep).toBe(3);
    expect(result.current.state.growthViewedStudentIds).toContain('onyu');

    act(() => {
      result.current.selectMode('team');
    });

    expect(result.current.state.mode).toBe('team');
    expect(result.current.state.teamStep).toBe(0);
  });

  it('4. resetState 호출 시 초기 v5 상태로 깨끗하게 초기화된다', () => {
    const { result } = renderHook(() => useFairnessState());

    act(() => {
      result.current.updateState({ mode: 'team', teamStep: 3 });
    });

    expect(result.current.state.mode).toBe('team');

    act(() => {
      result.current.resetState();
    });

    expect(result.current.state).toEqual(initialFairnessState);
  });

  it('5. 학생 대화 경로와 질문·최종 선택은 허용된 값만 저장한다', () => {
    const sanitized = validateAndSanitizeState({
      ...initialFairnessState,
      mode: 'growth',
      growthSpeakerPath: 'sample',
      growthQuestionId: 'missing',
      growthCareerChoices: ['environmentalEngineering', 'greenTech'],
      growthFinalChoice: 'ask_and_research',
      teamSpeakerPath: 'speaker',
      teamQuestionId: 'roles',
      teamAppealChoice: 2,
      teamSelectedPrinciples: [
        '팀의 목표와 선택 기준을 먼저 공개한다.',
        '빠지거나 잘못된 기록은 고친 뒤 같은 기준으로 다시 살핀다.',
        '결과에 질문하고 다시 검토할 수 있는 방법을 마련한다.'
      ]
    });

    expect(sanitized.growthSpeakerPath).toBe('sample');
    expect(sanitized.growthQuestionId).toBe('missing');
    expect(sanitized.growthCareerChoices).toEqual(['environmentalEngineering', 'greenTech']);
    expect(sanitized.growthFinalChoice).toBe('ask_and_research');
    expect(sanitized.teamSpeakerPath).toBe('speaker');
    expect(sanitized.teamQuestionId).toBe('roles');
    expect(sanitized.teamAppealChoice).toBe(2);
    expect(sanitized.teamSelectedPrinciples).toHaveLength(2);

    const rejected = validateAndSanitizeState({
      ...initialFairnessState,
      growthSpeakerPath: 'microphone_recording',
      growthQuestionId: 'injected-question',
      growthCareerChoices: ['software', 'software', 'not-a-career', 'greenTech', 'scienceCommunication'],
      growthFinalChoice: 'ai_decides',
      teamAppealChoice: 9,
      teamSelectedPrinciples: ['판단 기준을 미리 공개한다.', '<script>']
    });
    expect(rejected.growthSpeakerPath).toBeNull();
    expect(rejected.growthQuestionId).toBeNull();
    expect(rejected.growthCareerChoices).toEqual(['software', 'greenTech']);
    expect(rejected.growthFinalChoice).toBeNull();
    expect(rejected.teamAppealChoice).toBeNull();
    expect(rejected.teamSelectedPrinciples).toEqual([]);
  });
});
