import React, { useState } from 'react';
import { clubInviteMission } from '../../agentData';
import { getToolById } from '../../agentEngine';
import AgentPageCue from '../../components/AgentPageCue';
import AgentPageNav from '../../components/AgentPageNav';

const stepMeta = {
  plan_summary: { label: '준비 순서', tone: 'plan' },
  tool_request: { label: '도구 사용', tone: 'tool' },
  observation: { label: '확인된 결과', tone: 'result' },
  approval_needed: { label: '사람 확인', tone: 'stop' }
};

export default function MissionPlanScreen({ onNext, onPrev }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const step = clubInviteMission.steps[currentStepIndex];
  const meta = stepMeta[step.type];
  const tool = step.toolId ? getToolById(step.toolId) : null;
  const isLast = currentStepIndex === clubInviteMission.steps.length - 1;

  const handleNext = () => {
    if (isLast) onNext?.();
    else setCurrentStepIndex(index => index + 1);
  };

  return (
    <section className="agent-shell agent-stage" aria-labelledby="mission-plan-title">
      <AgentPageCue
        action="카드의 ‘다음 행동’을 눌러 AI가 무엇을 준비하고 어떤 도구를 쓰는지 확인하세요."
        reason="AI의 숨겨진 생각을 보는 것이 아니라, 사람이 확인할 수 있는 계획·도구 요청·결과 기록을 살펴보는 거예요."
      />

      <header className="agent-page-head">
        <span className="agent-eyebrow">공유된 행동 기록</span>
        <h1 id="mission-plan-title">AI는 이렇게 보내려고 해요</h1>
        <p>한 장씩 넘기며 전송 직전까지 따라가 보세요.</p>
      </header>

      <div className="agent-record-progress" aria-label={`행동 기록 ${currentStepIndex + 1} / ${clubInviteMission.steps.length}`}>
        {clubInviteMission.steps.map((item, index) => (
          <span key={item.stepIndex} className={index <= currentStepIndex ? 'is-seen' : ''} />
        ))}
      </div>

      <article className={`agent-record-card is-${meta.tone}`} aria-live="polite">
        <div className="agent-record-meta">
          <span>{currentStepIndex + 1} / {clubInviteMission.steps.length}</span>
          <strong>{meta.label}</strong>
        </div>
        <h2>{step.title}</h2>
        <p>{step.text}</p>
        {tool && (
          <div className="agent-tool-note">
            <span>{tool.icon}</span>
            <div>
              <strong>{tool.name} · {tool.riskLabel}</strong>
              <small>{tool.desc}</small>
            </div>
          </div>
        )}
        {step.warningMessage && <aside className="agent-warning-note">{step.warningMessage}</aside>}
      </article>

      <div className="agent-record-history" aria-label="지금까지 본 행동">
        <small>지금까지 본 행동</small>
        <strong>{clubInviteMission.steps.slice(0, currentStepIndex + 1).map(item => item.title).join(' → ')}</strong>
      </div>

      <AgentPageNav
        onPrev={currentStepIndex === 0 ? onPrev : () => setCurrentStepIndex(index => index - 1)}
        onNext={handleNext}
        prevLabel={currentStepIndex === 0 ? '상황 다시 보기' : '이전 행동'}
        nextLabel={isLast ? '보내기 전 확인하기' : '다음 행동'}
      />
    </section>
  );
}
