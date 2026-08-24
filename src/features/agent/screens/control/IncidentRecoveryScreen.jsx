import React from 'react';
import { museumIncident } from '../../agentData';
import AgentPageCue from '../../components/AgentPageCue';
import AgentPageNav from '../../components/AgentPageNav';

export default function IncidentRecoveryScreen({
  incidentResponseChecks = [],
  onToggleIncidentCheck,
  onNext,
  onPrev
}) {
  const allDone = museumIncident.responseChecks.every(check => incidentResponseChecks.includes(check.id));

  return (
    <section className="agent-shell agent-stage" aria-labelledby="incident-recovery-title">
      <AgentPageCue
        action="멈춘 뒤 해야 할 세 가지를 눌러, 이미 바뀐 파일과 권한을 복구하세요."
        reason="비상 정지는 새 행동을 막는 시작점이에요. 이미 일어난 결과는 확인·복구·기록까지 이어져야 해요."
      />

      <header className="agent-page-head">
        <span className="agent-eyebrow">멈춤은 끝이 아니에요</span>
        <h1 id="incident-recovery-title">이미 바뀐 것은 사람이 되돌려요</h1>
        <p>AI가 더 움직이지 않는지 확인하고, 원본과 권한을 원래대로 돌려놓으세요.</p>
      </header>

      <div className="agent-before-after">
        <article>
          <small>비상 정지로 막은 것</small>
          <strong>{museumIncident.stopResult.stopped}</strong>
        </article>
        <article className="needs-recovery">
          <small>직접 복구할 것</small>
          <strong>{museumIncident.stopResult.notReversed}</strong>
        </article>
      </div>

      <fieldset className="agent-recovery-checks">
        <legend>하나씩 눌러 복구를 마치세요</legend>
        {museumIncident.responseChecks.map((check, index) => {
          const checked = incidentResponseChecks.includes(check.id);
          return (
            <label key={check.id} className={checked ? 'is-checked' : ''}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleIncidentCheck(check.id)}
                aria-label={check.label}
              />
              <span className="agent-check-number">{checked ? '✓' : index + 1}</span>
              <strong>{check.label}</strong>
            </label>
          );
        })}
      </fieldset>

      <aside className={`agent-recovery-result ${allDone ? 'is-complete' : ''}`} aria-live="polite">
        {allDone
          ? '복구 완료 · 원본을 되찾고, 필요하지 않은 권한을 회수하고, 작업 기록까지 확인했어요.'
          : `복구할 일 ${museumIncident.responseChecks.length - incidentResponseChecks.length}개가 남았어요.`}
      </aside>

      <AgentPageNav
        onPrev={onPrev}
        onNext={onNext}
        prevLabel="비상 정지 결과 보기"
        nextLabel="안전하게 다시 맡기기"
        disabled={!allDone}
      />
    </section>
  );
}
