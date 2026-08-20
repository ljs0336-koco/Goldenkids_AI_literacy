import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoleLabPage from './RoleLabPage';
import PersonaScenarioScreen from './screens/persona/PersonaScenarioScreen';
import PersonaCompareScreen from './screens/persona/PersonaCompareScreen';
import PersonaFeedbackScreen from './screens/persona/PersonaFeedbackScreen';
import TaskClassifyScreen from './screens/task/TaskClassifyScreen';
import TaskAnalysisScreen from './screens/task/TaskAnalysisScreen';
import RoleWorksheet from './print/RoleWorksheet';

describe('RoleLab Module 3 UI & Flow Integration Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  /* 1. 차시 표기 미노출 검증 */
  it('1. [공통] 학생 화면 및 인쇄 활동지에 "6차시" 등 차시 번호가 전혀 노출되지 않는다', () => {
    render(<RoleLabPage />);

    expect(screen.queryByText(/6차시/)).not.toBeInTheDocument();
    expect(screen.getByText(/상황별 AI 역할 탐구 · 약 10분/)).toBeInTheDocument();
    expect(screen.getByText(/AI와 인간의 역할 분담 · 약 15분/)).toBeInTheDocument();

    const { container } = render(<RoleWorksheet state={{ mode: 'persona' }} />);
    expect(container.textContent).not.toContain('6차시');
  });

  /* 2. 활동 선택 화면 */
  it('2. [선택 화면] 모듈 3 메인 선택 화면에 페르소나 매칭과 업무 분류 카드가 렌더링된다', () => {
    render(<RoleLabPage />);

    expect(screen.getByText('AI 금쪽이와 함께하는 AI 역할 선택소')).toBeInTheDocument();
    expect(screen.getByText('나에게 맞는 AI 페르소나 매칭')).toBeInTheDocument();
    expect(screen.getAllByText('미래 업무 3구역 분류소').length).toBeGreaterThan(0);
    expect(screen.getByText(/페르소나 매칭 시작하기/)).toBeInTheDocument();
    expect(screen.getByText(/업무 분류 시작하기/)).toBeInTheDocument();
  });

  /* 3. 페르소나 1단계: PersonaScenarioScreen & 3개 권장 가이드 */
  it('3. [페르소나 1단계] PersonaScenarioScreen: 3개 상황 권장 가이드와 8가지 일상 상황 카드가 렌더링된다', () => {
    render(
      <PersonaScenarioScreen 
        currentScenarioId="sc_01" 
        userPersonaChoices={{}} 
        onSelectScenario={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText('탐구할 일상·학습 상황을 골라주세요')).toBeInTheDocument();
    expect(screen.getByText(/3개 이상/)).toBeInTheDocument();
    expect(screen.getByText('친구 금쪽이')).toBeInTheDocument();
    expect(screen.getByText('성장 코치 금쪽이')).toBeInTheDocument();
    expect(screen.getByText(/수학 시험 점수 고민/)).toBeInTheDocument();
  });

  /* 4. 페르소나 2단계: PersonaCompareScreen */
  it('4. [페르소나 2단계] PersonaCompareScreen: 상황에 대한 4색 AI 금쪽이의 실시간 응답이 비교 렌더링된다', () => {
    render(
      <PersonaCompareScreen 
        scenarioId="sc_01" 
        userChoice="friend" 
        onChoosePersona={() => {}} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText('4색 AI 금쪽이의 실시간 응답을 비교해요')).toBeInTheDocument();
    expect(screen.getByText(/수학 시험을 망쳐서 너무 속상해/)).toBeInTheDocument();
    expect(screen.getByText(/정말 속상했겠다... 열심히 준비했을 텐데/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /피드백 & 교육적 교훈 보기/i })).not.toBeDisabled();
  });

  /* 5. 페르소나 3단계: PersonaFeedbackScreen & 다각적 역할 조합 & 안전 경계 */
  it('5. [페르소나 3단계] PersonaFeedbackScreen: 다각적 2단계 역할 조합, 안전 경계 주의사항 및 프롬프트 팁이 표시된다', () => {
    render(
      <PersonaFeedbackScreen 
        scenarioId="sc_01" 
        userChoice="friend" 
        onChooseOtherScenario={() => {}} 
        onComplete={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText(/친구 금쪽이를 선택하셨네요!/)).toBeInTheDocument();
    expect(screen.getByText(/권장되는 2단계 역할 조합/)).toBeInTheDocument();
    expect(screen.getByText(/진짜 사람 친구나 전문 상담사를 대신할 수 없어요/)).toBeInTheDocument();
    expect(screen.getByText(/실전 프롬프트 꿀팁 보기/)).toBeInTheDocument();

    // Click to expand prompt tip
    fireEvent.click(screen.getByText(/실전 프롬프트 꿀팁 보기/));
    expect(screen.getByText(/마법의 프롬프트/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /페르소나 탐구 마무리하기/i })).toBeInTheDocument();
  });

  /* 6. 업무 분류 1단계: TaskClassifyScreen & 말풍선 힌트 */
  it('6. [업무 분류 1단계] TaskClassifyScreen: 12개 업무 중 12개 전체 분류 전에는 완료 버튼이 비활성화된다', () => {
    const { rerender } = render(
      <TaskClassifyScreen 
        taskClassifications={{ task_01: 'ai_auto' }} 
        onClassifyTask={() => {}} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByRole('button', { name: /12개 업무를 모두 분류해 주세요/i })).toBeDisabled();

    // Click hint button
    const hintBtn = screen.getByText(/금쪽이 힌트/);
    fireEvent.click(hintBtn);
    expect(screen.getByText(/금쪽이의 힌트/)).toBeInTheDocument();

    // All 12 classified
    const all = {
      task_01: 'ai_auto', task_02: 'human_lead', task_03: 'collaboration',
      task_04: 'ai_auto', task_05: 'ai_auto', task_06: 'human_lead',
      task_07: 'collaboration', task_08: 'collaboration', task_09: 'human_lead',
      task_10: 'ai_auto', task_11: 'collaboration', task_12: 'human_lead'
    };

    rerender(
      <TaskClassifyScreen 
        taskClassifications={all} 
        onClassifyTask={() => {}} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByRole('button', { name: /분류 결과 & 가치 분석 보기/i })).not.toBeDisabled();
  });

  /* 7. 업무 분류 2단계: TaskAnalysisScreen */
  it('7. [업무 분류 2단계] TaskAnalysisScreen: 3구역 분포도와 인간 고유 가치 성찰 및 원칙 2개 이상 선택 요구', () => {
    const all = {
      task_01: 'ai_auto', task_02: 'human_lead', task_03: 'collaboration',
      task_04: 'ai_auto', task_05: 'ai_auto', task_06: 'human_lead',
      task_07: 'collaboration', task_08: 'collaboration', task_09: 'human_lead',
      task_10: 'ai_auto', task_11: 'collaboration', task_12: 'human_lead'
    };

    const { rerender } = render(
      <TaskAnalysisScreen 
        taskClassifications={all} 
        selectedPrinciples={['목적에 맞는 AI 역할 선택: 단순 위로가 필요할 땐 친구형, 생각을 키울 땐 코치형 AI를 선택해요.']} 
        onSelectPrinciples={() => {}} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText('미래 업무 분류 결과와 인간의 고유 가치')).toBeInTheDocument();
    expect(screen.getByText(/AI에게 넘길 수 없는 인간만의 3가지 고유 가치/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /공존 원칙을 2개 이상 선택해 주세요/i })).toBeDisabled();

    rerender(
      <TaskAnalysisScreen 
        taskClassifications={all} 
        selectedPrinciples={[
          '목적에 맞는 AI 역할 선택: 단순 위로가 필요할 땐 친구형, 생각을 키울 땐 코치형 AI를 선택해요.',
          '생각의 주도권 유지: AI에게 완성된 정답을 요구하기보다, 질문을 던져 스스로 해결하는 힘을 길러요.'
        ]} 
        onSelectPrinciples={() => {}} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByRole('button', { name: /공존 설계도 완성하기/i })).not.toBeDisabled();
  });

  /* 8. 전체 앱 내비게이션 및 모드 전환 */
  it('8. [전체 앱] 모듈 3 진입 및 페르소나/업무 모드 전환이 정상 작동한다', () => {
    render(<RoleLabPage />);

    // Click '페르소나 매칭 시작하기'
    const personaBtn = screen.getByText(/페르소나 매칭 시작하기/);
    fireEvent.click(personaBtn);

    expect(screen.getByText('탐구할 일상·학습 상황을 골라주세요')).toBeInTheDocument();
    expect(screen.getByText('① 상황 탐색')).toBeInTheDocument();

    // Click '활동 고르기'
    const backBtn = screen.getByRole('button', { name: /활동 고르기/i });
    fireEvent.click(backBtn);

    expect(screen.getByText('AI 금쪽이와 함께하는 AI 역할 선택소')).toBeInTheDocument();
  });
});
