import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AgentLabPage from './AgentLabPage';
import { agentMissions, killSwitchAnomaly } from './agentData';
import AgentWorksheet from './print/AgentWorksheet';
import GuardrailSetupScreen from './screens/control/GuardrailSetupScreen';
import KillSwitchSimScreen from './screens/control/KillSwitchSimScreen';
import MissionApprovalScreen from './screens/mission/MissionApprovalScreen';
import MissionPlanScreen from './screens/mission/MissionPlanScreen';

function KillSwitchHarness() {
  const [triggered, setTriggered] = useState(false);
  const [checks, setChecks] = useState([]);
  return (
    <KillSwitchSimScreen
      killSwitchTriggered={triggered}
      incidentResponseChecks={checks}
      onTriggerKillSwitch={() => setTriggered(true)}
      onToggleIncidentCheck={id => setChecks(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])}
      onNext={() => {}}
      onPrev={() => {}}
    />
  );
}

describe('AgentLab module 4', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.scrollTo = vi.fn();
  });
  afterEach(() => window.localStorage.clear());

  it('학생 화면과 인쇄 활동지에 차시 번호를 노출하지 않는다', () => {
    render(<AgentLabPage />);
    expect(screen.getByText(/판단 미션 · 약 10분/)).toBeInTheDocument();
    expect(screen.getByText(/안전 운영 실험 · 약 15분/)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/[78]차시/);
    const { container } = render(<AgentWorksheet state={{}} />);
    expect(container.textContent).not.toMatch(/[78]차시/);
  });

  it('AI 에이전트를 목표·도구·여러 단계 수행으로 설명한다', () => {
    render(<AgentLabPage />);
    expect(screen.getByText(/목표를 받아 다음 행동을 정하고, 허용된 도구를 사용해 여러 단계를 수행/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /에이전트의 실행 요청, 승인해도 될까/ })).toBeInTheDocument();
  });

  it('실행 과정을 숨겨진 생각 대신 계획 요약·도구 요청·관찰 기록으로 보여 준다', () => {
    render(<MissionPlanScreen missionId="mission_invite" onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByText(/숨겨진 생각을 보여 주는 화면이 아니라/)).toBeInTheDocument();
    expect(screen.getByText(/1\. 계획 요약/)).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('[생각]');
  });

  it('근거를 모두 확인하기 전에는 승인과 보류를 선택할 수 없다', () => {
    const mission = agentMissions[0];
    const { rerender } = render(
      <MissionApprovalScreen
        missionId={mission.id}
        reviewedCheckIds={[]}
        onToggleReviewCheck={() => {}}
        onDecide={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /발송 승인/ })).toBeDisabled();
    rerender(
      <MissionApprovalScreen
        missionId={mission.id}
        reviewedCheckIds={mission.humanCheckpoint.reviewChecks.map(check => check.id)}
        onToggleReviewCheck={() => {}}
        onDecide={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /발송 승인/ })).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: /발송 보류 후 수정/ }));
    expect(screen.getByText(/근거와 일치하는 판단/)).toBeInTheDocument();
  });

  it('네 통제 층을 모두 고르기 전에는 다음 단계로 이동할 수 없다', () => {
    const { rerender } = render(
      <GuardrailSetupScreen guardrailChoices={{}} onSelectGuardrail={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByRole('button', { name: /4개 항목을 모두 설정하세요/ })).toBeDisabled();
    rerender(
      <GuardrailSetupScreen
        guardrailChoices={{ guard_permission: 'scoped', guard_budget: 'bounded', guard_hitl: 'risk_based', guard_killswitch: 'containment' }}
        onSelectGuardrail={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByText(/100% · 기본 통제 준비 완료/)).toBeInTheDocument();
    expect(screen.getByText(/안전 확률이 아닙니다/)).toBeInTheDocument();
  });

  it('중단 뒤 권한 회수와 결과 확인 절차까지 완료해야 다음으로 간다', () => {
    render(<KillSwitchHarness />);
    fireEvent.click(screen.getByRole('button', { name: /새 실행 중단 \+ 임시 권한 회수/ }));
    const next = screen.getByRole('button', { name: /중단 후 세 가지 대응/ });
    expect(next).toBeDisabled();
    killSwitchAnomaly.responseChecks.forEach(check => fireEvent.click(screen.getByLabelText(check.label)));
    expect(screen.getByRole('button', { name: /AI 감독관 원칙 정리하기/ })).toBeEnabled();
    expect(screen.getByText(/과거의 실행 결과까지 되돌려 주지는 않습니다/)).toBeInTheDocument();
  });
});
