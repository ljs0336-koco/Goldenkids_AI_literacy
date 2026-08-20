import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AgentLabPage from './AgentLabPage';
import MissionSelectScreen from './screens/mission/MissionSelectScreen';
import MissionPlanScreen from './screens/mission/MissionPlanScreen';
import MissionApprovalScreen from './screens/mission/MissionApprovalScreen';
import GuardrailSetupScreen from './screens/control/GuardrailSetupScreen';
import KillSwitchSimScreen from './screens/control/KillSwitchSimScreen';
import AgentWorksheet from './print/AgentWorksheet';

describe('AgentLab Module 4 UI & Flow Integration Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  /* 1. 차시 표기 미노출 검증 */
  it('1. [공통] 학생 화면 및 인쇄 활동지에 "7차시", "8차시" 등 차시 번호가 전혀 노출되지 않는다', () => {
    render(<AgentLabPage />);

    expect(screen.queryByText(/7차시/)).not.toBeInTheDocument();
    expect(screen.queryByText(/8차시/)).not.toBeInTheDocument();
    expect(screen.getByText(/도구 실행 & 인간 승인 · 약 10분/)).toBeInTheDocument();
    expect(screen.getByText(/가드레일 & 킬스위치 · 약 15분/)).toBeInTheDocument();

    const { container } = render(<AgentWorksheet state={{ mode: 'mission' }} />);
    expect(container.textContent).not.toContain('7차시');
    expect(container.textContent).not.toContain('8차시');
  });

  /* 2. 메인 선택 화면 */
  it('2. [선택 화면] 모듈 4 메인 선택 화면에 미션 실행소와 안전 통제실 카드가 렌더링된다', () => {
    render(<AgentLabPage />);

    expect(screen.getByText('AI 금쪽이와 함께하는 AI 에이전트 통제실')).toBeInTheDocument();
    expect(screen.getByText('자율 에이전트의 도구 실행과 인간 승인')).toBeInTheDocument();
    expect(screen.getByText('가드레일 설정과 비상 킬스위치(Kill-Switch)')).toBeInTheDocument();
  });

  /* 3. 미션 1단계: MissionSelectScreen */
  it('3. [미션 1단계] MissionSelectScreen: 3가지 학급 에이전트 미션 카드가 렌더링된다', () => {
    render(
      <MissionSelectScreen 
        selectedMissionId="mission_invite" 
        onSelectMission={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText('자율 AI 에이전트 미션을 골라주세요 🤖')).toBeInTheDocument();
    expect(screen.getByText('학예회 초대장 자동 발송 미션')).toBeInTheDocument();
    expect(screen.getByText(/과학 탐구자료 자동 수집/)).toBeInTheDocument();
    expect(screen.getByText(/우리 반 분실물 스마트 매칭/)).toBeInTheDocument();
  });

  /* 4. 미션 2단계: MissionPlanScreen & 도구 실행 루프 */
  it('4. [미션 2단계] MissionPlanScreen: 에이전트의 단계별 생각 및 도구 호출 타임라인이 렌더링된다', () => {
    render(
      <MissionPlanScreen 
        missionId="mission_invite" 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText('학예회 초대장 자동 발송 미션')).toBeInTheDocument();
    expect(screen.getByText(/AI 에이전트의 자율 실행 루프/)).toBeInTheDocument();
    expect(screen.getByText(/1단계 \[생각\]/)).toBeInTheDocument();
  });

  /* 5. 미션 3단계: MissionApprovalScreen & 인간 승인 검문소 */
  it('5. [미션 3단계] MissionApprovalScreen: 고위험 도구 호출 전 인간 승인/반려 인터랙션이 정상 작동한다', () => {
    render(
      <MissionApprovalScreen 
        missionId="mission_invite" 
        decision={null} 
        onDecide={() => {}} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText(/인간 승인 검문소/)).toBeInTheDocument();
    expect(screen.getByText(/발송을 최종 승인하시겠습니까/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /승인 또는 반려를 선택해 주세요/i })).toBeDisabled();

    // Select approve
    const approveBtn = screen.getByText(/내용 확인 완료: 발송 승인/);
    fireEvent.click(approveBtn);

    expect(screen.getByRole('button', { name: /미션 결과 요약 보기/i })).not.toBeDisabled();
  });

  /* 6. 통제 1단계: GuardrailSetupScreen */
  it('6. [통제 1단계] GuardrailSetupScreen: 4대 안전 가드레일 설정 및 지수 집계가 렌더링된다', () => {
    render(
      <GuardrailSetupScreen 
        guardrailChoices={{
          guard_permission: 'minimal',
          guard_budget: 'limit_10',
          guard_hitl: 'hitl_strict',
          guard_killswitch: 'kill_enabled'
        }}
        onSelectGuardrail={() => {}} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText(/4대 안전 가드레일/)).toBeInTheDocument();
    expect(screen.getByText(/100점 \/ 100점 · 완벽한 안전 사령관/)).toBeInTheDocument();
    expect(screen.getByText(/1. 권한 스코프 제한/)).toBeInTheDocument();
  });

  /* 7. 통제 2단계: KillSwitchSimScreen */
  it('7. [통제 2단계] KillSwitchSimScreen: 비상 정지 킬스위치 버튼 클릭 시 차단 완료 상태로 전환된다', () => {
    render(
      <KillSwitchSimScreen 
        killSwitchTriggered={false} 
        onTriggerKillSwitch={() => {}} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText(/비상 상황! 킬스위치/)).toBeInTheDocument();
    const killBtn = screen.getByRole('button', { name: /비상 정지 누르기 \(KILL-SWITCH\)/i });
    expect(killBtn).toBeInTheDocument();

    fireEvent.click(killBtn);

    expect(screen.getByText(/에이전트 비상 차단 성공/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /안전 사령관 헌장 발급받기/i })).not.toBeDisabled();
  });
});
