import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RoleLabPage from './RoleLabPage';
import { rolePrinciples } from './roleData';
import RoleWorksheet from './print/RoleWorksheet';
import PersonaCompareScreen from './screens/persona/PersonaCompareScreen';
import PersonaFeedbackScreen from './screens/persona/PersonaFeedbackScreen';
import PersonaScenarioScreen from './screens/persona/PersonaScenarioScreen';
import TaskAnalysisScreen from './screens/task/TaskAnalysisScreen';
import TaskClassifyScreen from './screens/task/TaskClassifyScreen';

describe('모듈 3 초보자용 페이지 흐름', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.scrollTo = vi.fn();
  });
  afterEach(() => window.localStorage.clear());

  it('차시 번호와 교사 도구 없이 두 활동의 목적을 먼저 보여 준다', () => {
    render(<RoleLabPage />);
    expect(screen.getAllByText('AI에게 무엇을 맡길까?').length).toBeGreaterThan(0);
    expect(screen.getByText('AI는 이런 때 도울 수 있어요')).toBeInTheDocument();
    expect(screen.getByText('AI에게 어떻게 부탁할까?')).toBeInTheDocument();
    expect(screen.getByText('AI에게 어디까지 맡길까?')).toBeInTheDocument();
    expect(screen.queryByText(/6차시/)).not.toBeInTheDocument();
    expect(screen.queryByText(/교사 도구/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /도움말/ })).toBeInTheDocument();

    const { container } = render(<RoleWorksheet state={{}} />);
    expect(container.textContent).not.toContain('6차시');
  });

  it('활동 A는 네 상황만 보여 주고 한 상황부터 시작하게 한다', () => {
    const onSelect = vi.fn();
    render(<PersonaScenarioScreen userPersonaChoices={{}} onSelectScenario={onSelect} onPrev={() => {}} />);

    expect(screen.getByText('AI에게 이런 부탁도 할 수 있어요')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /이 상황 해보기/ })).toHaveLength(4);
    expect(screen.queryByText(/3개 이상/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /학교 축제 포스터 아이디어/ }));
    expect(onSelect).toHaveBeenCalledWith('sc_02');
  });

  it('같은 부탁은 A/B 두 답을 중심으로 보여 주고 C는 작은 버튼 뒤에 연다', () => {
    render(<PersonaCompareScreen scenarioId="sc_01" onChoosePersona={() => {}} onNext={() => {}} onPrev={() => {}} />);

    expect(screen.getByText('같은 부탁, 다른 답')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /A공감 친구/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /B생각 코치/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /C설명 박사/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다른 선택지를 고르고 싶다면/ }));
    expect(screen.getByRole('button', { name: /C설명 박사/ })).toBeInTheDocument();
  });

  it('두 역할을 묶은 부탁에서 프롬프트 뜻과 스피커 연결을 짧게 보여 준다', () => {
    const { container } = render(
      <PersonaFeedbackScreen
        scenarioId="sc_01"
        userChoice="friend"
        recipeChoice="friend_then_coach"
        onChooseRecipe={() => {}}
        onComplete={() => {}}
        onPrev={() => {}}
      />
    );

    expect(screen.getByText('한 역할보다, 필요한 순서대로')).toBeInTheDocument();
    expect(container.textContent).toContain('역할+할 일+조건과 순서');
    expect(screen.getByText(/‘프롬프트’라고 해요/)).toBeInTheDocument();
    expect(screen.getByText(/금쪽이 스피커가 있다면/)).toBeInTheDocument();
  });

  it('활동 B 도입은 자동화와 AI의 차이를 먼저 설명한다', () => {
    render(
      <TaskClassifyScreen
        introSeen={false}
        currentTaskIndex={0}
        onStart={() => {}}
        onPrev={() => {}}
      />
    );

    expect(screen.getByText('우리도 이미 ‘도구와 일 나누기’를 해요')).toBeInTheDocument();
    expect(screen.getByText('잠깐, 자동화가 모두 AI는 아니에요.')).toBeInTheDocument();
    expect(screen.getByText('문구나 번역 초안')).toBeInTheDocument();
  });

  it('과업 선택 결과는 같은 화면에서 나타나고 다음 버튼을 따로 눌러야 한다', () => {
    const next = vi.fn();
    function Harness() {
      const [classifications, setClassifications] = useState({});
      return (
        <TaskClassifyScreen
          introSeen
          currentTaskIndex={0}
          taskClassifications={classifications}
          onClassifyTask={(taskId, zone) => setClassifications({ [taskId]: zone })}
          onNextTask={next}
          onPrevTask={() => {}}
          onFinish={() => {}}
          onPrev={() => {}}
        />
      );
    }
    render(<Harness />);
    expect(screen.getByRole('button', { name: /다음 일/ })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /A규칙으로 자동 정리/ }));
    expect(screen.getByText(/도구가 할 일/)).toBeInTheDocument();
    expect(screen.getByText(/사람이 확인할 일/)).toBeInTheDocument();
    expect(next).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /다음 일/ }));
    expect(next).toHaveBeenCalledOnce();
  });

  it('역할 지도는 점수와 비율 대신 사람·상황·책임 질문으로 이어진다', () => {
    const classifications = {
      task_01: 'ai_auto',
      task_02: 'collaboration',
      task_03: 'collaboration',
      task_04: 'human_lead'
    };
    const { rerender, container } = render(
      <TaskAnalysisScreen page={0} taskClassifications={classifications} selectedPrinciples={[]} onNextPage={() => {}} onPrevPage={() => {}} onComplete={() => {}} />
    );
    expect(screen.getByText('도구가 시작하고, 사람이 끝내요')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\d+%/);
    expect(container.textContent).not.toContain('인간만의');

    rerender(<TaskAnalysisScreen page={1} taskClassifications={classifications} selectedPrinciples={[]} onNextPage={() => {}} onPrevPage={() => {}} onComplete={() => {}} />);
    expect(screen.getByText('누가 영향을 받을까?')).toBeInTheDocument();
    expect(screen.getByText('AI가 모르는 맥락은?')).toBeInTheDocument();
    expect(screen.getByText('누가 마지막으로 확인할까?')).toBeInTheDocument();

    rerender(<TaskAnalysisScreen page={2} taskClassifications={classifications} selectedPrinciples={[rolePrinciples[0]]} onSelectPrinciple={() => {}} onNextPage={() => {}} onPrevPage={() => {}} onComplete={() => {}} />);
    expect(screen.getByRole('button', { name: /활동 마치기/ })).not.toBeDisabled();
  });

  it('전체 앱에서 활동 선택 후 네 상황 화면으로 이동한다', () => {
    render(<RoleLabPage />);
    fireEvent.click(screen.getByRole('button', { name: /AI에게 어떻게 부탁할까/ }));
    expect(screen.getByText('AI에게 이런 부탁도 할 수 있어요')).toBeInTheDocument();
    expect(screen.getByText('① 상황 고르기')).toBeInTheDocument();
  });
});
