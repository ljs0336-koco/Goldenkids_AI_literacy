import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AgentLabPage from './AgentLabPage';
import { clubInviteMission, museumIncident } from './agentData';
import AgentWorksheet from './print/AgentWorksheet';
import GuardrailSetupScreen from './screens/control/GuardrailSetupScreen';
import IncidentRecoveryScreen from './screens/control/IncidentRecoveryScreen';
import KillSwitchSimScreen from './screens/control/KillSwitchSimScreen';
import MissionApprovalScreen from './screens/mission/MissionApprovalScreen';
import MissionPlanScreen from './screens/mission/MissionPlanScreen';
import MissionSummaryScreen from './screens/mission/MissionSummaryScreen';

function ApprovalHarness() {
  const [checks, setChecks] = useState([]);
  const [decision, setDecision] = useState(null);
  return (
    <MissionApprovalScreen
      decision={decision}
      reviewedCheckIds={checks}
      onToggleReviewCheck={id => setChecks(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])}
      onDecide={setDecision}
      onNext={() => {}}
      onPrev={() => {}}
    />
  );
}

function StopHarness() {
  const [triggered, setTriggered] = useState(false);
  return (
    <KillSwitchSimScreen
      killSwitchTriggered={triggered}
      onTriggerKillSwitch={() => setTriggered(true)}
      onNext={() => {}}
      onPrev={() => {}}
    />
  );
}

function RecoveryHarness() {
  const [checks, setChecks] = useState([]);
  return (
    <IncidentRecoveryScreen
      incidentResponseChecks={checks}
      onToggleIncidentCheck={id => setChecks(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])}
      onNext={() => {}}
      onPrev={() => {}}
    />
  );
}

function GuardrailHarness() {
  const [choices, setChoices] = useState({});
  return (
    <GuardrailSetupScreen
      guardrailChoices={choices}
      onSelectGuardrail={(guardId, optionId) => setChoices(current => ({ ...current, [guardId]: optionId }))}
      onNext={() => {}}
      onPrev={() => {}}
    />
  );
}

describe('AgentLab module 4 student action experience', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.scrollTo = vi.fn();
  });
  afterEach(() => window.localStorage.clear());

  it('학생 화면과 활동지에 차시 번호·교사 도구·발표 모드를 노출하지 않는다', () => {
    render(<AgentLabPage />);
    expect(screen.getByRole('heading', { name: 'AI가 대신 움직인다면?' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /교사 도구/ })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/[78]차시|발표 화면/);
    const { container } = render(<AgentWorksheet state={{}} />);
    expect(container.textContent).not.toMatch(/[78]차시/);
  });

  it('답을 주는 AI와 실제로 행동하는 AI를 학생 언어로 구별한다', () => {
    render(<AgentLabPage />);
    expect(screen.getByText('답하는 AI')).toBeInTheDocument();
    expect(screen.getByText('행동하는 AI')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /공연 초대를 보내도 될까/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /사라지는 견학 사진을 멈춰라/ })).toBeInTheDocument();
  });

  it('AI의 숨겨진 생각이 아니라 사람이 볼 수 있는 행동 기록을 한 장씩 보여 준다', () => {
    render(<MissionPlanScreen onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByText(/숨겨진 생각을 보는 것이 아니라/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '먼저 할 일을 나눴어요' })).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('[생각]');
    fireEvent.click(screen.getByRole('button', { name: /다음 행동/ }));
    expect(screen.getByText('연락처를 찾았어요')).toBeInTheDocument();
  });

  it('네 자료를 확인한 뒤 A·B와 작은 C 선택지를 제공하고 결과를 바로 보여 준다', () => {
    render(<ApprovalHarness />);
    clubInviteMission.humanCheckpoint.reviewChecks.forEach(() => {
      fireEvent.click(screen.getByRole('button', { name: /확인했어요/ }));
    });
    const send = screen.getByRole('button', { name: /지금 모두 보내기/ });
    const pause = screen.getByRole('button', { name: /멈추고 고치기/ });
    expect(send).toBeEnabled();
    expect(pause).toBeEnabled();
    expect(screen.getByRole('button', { name: /다른 선택지를 고르고 싶다면/ })).toBeInTheDocument();
    fireEvent.click(pause);
    expect(screen.getByText(/전송을 보류하고 네 가지 문제를 고쳤어요/)).toBeInTheDocument();
  });

  it('활동 뒤 HITL을 준비·사람 결정·실행·결과 확인의 구조로 설명한다', () => {
    render(
      <MissionSummaryScreen
        decision="pause_fix"
        onReset={() => {}}
        onBackToActivities={() => {}}
        onOpenRecord={() => {}}
      />
    );
    expect(screen.getByRole('heading', { name: /HITL · Human-in-the-Loop/ })).toBeInTheDocument();
    expect(screen.getByText('사람이 확인·결정')).toBeInTheDocument();
    expect(screen.getByText('사람이 결과 확인')).toBeInTheDocument();
    expect(screen.getByText(/버튼을 눌렀다는 사실만으로 안전해지는 것은 아니에요/)).toBeInTheDocument();
  });

  it('부탁하지 않은 파일 행동을 찾아야 비상 정지를 누를 수 있다', () => {
    render(<StopHarness />);
    fireEvent.click(screen.getByRole('button', { name: /다음 기록/ }));
    fireEvent.click(screen.getByRole('button', { name: /다음 기록/ }));
    fireEvent.click(screen.getByRole('button', { name: /다음 기록/ }));
    fireEvent.click(screen.getByRole('button', { name: /이상 행동 고르기/ }));
    const stop = screen.getByRole('button', { name: '지금 멈추기' });
    expect(stop).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /비슷한 사진을 휴지통으로 옮기기/ }));
    expect(stop).toBeEnabled();
    fireEvent.click(stop);
    expect(screen.getByText(museumIncident.stopResult.stopped)).toBeInTheDocument();
    expect(screen.getByText(museumIncident.stopResult.notReversed)).toBeInTheDocument();
    expect(screen.getByText(/이미 바뀐 파일을 자동으로 되돌리지는 않습니다/)).toBeInTheDocument();
  });

  it('중단 뒤 원본 복원·권한 회수·기록 확인을 모두 해야 다음으로 간다', () => {
    render(<RecoveryHarness />);
    const next = screen.getByRole('button', { name: /안전하게 다시 맡기기/ });
    expect(next).toBeDisabled();
    museumIncident.responseChecks.forEach(check => fireEvent.click(screen.getByLabelText(check.label)));
    expect(next).toBeEnabled();
    expect(screen.getByText(/복구 완료/)).toBeInTheDocument();
  });

  it('안전 점수 없이 네 설정을 한 장씩 고르고 HITL 지점을 보여 준다', () => {
    render(<GuardrailHarness />);
    expect(document.body.textContent).not.toMatch(/%|준비도|안전 점수/);
    fireEvent.click(screen.getByRole('button', { name: /원본은 보기만 하고 새 폴더에 복사/ }));
    fireEvent.click(screen.getByRole('button', { name: /다음 설정/ }));
    fireEvent.click(screen.getByRole('button', { name: /확인 필요.*사람이 분류/ }));
    fireEvent.click(screen.getByRole('button', { name: /다음 설정/ }));
    fireEvent.click(screen.getByRole('button', { name: /바뀔 목록을 먼저 보여 주고 승인받기/ }));
    expect(screen.getByText(/여기에 HITL이 들어갔어요/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 설정/ }));
    fireEvent.click(screen.getByRole('button', { name: /삭제·공유 직전에 다시 묻기/ }));
    expect(screen.getByRole('button', { name: /안전하게 다시 실행하기/ })).toBeEnabled();
  });
});
