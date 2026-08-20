import React, { useState } from 'react';
import { getMissionById } from '../../agentEngine';
import geumjjokDoctor from '../../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function MissionApprovalScreen({
  missionId,
  decision,
  reviewedCheckIds = [],
  onToggleReviewCheck,
  onDecide,
  onNext,
  onPrev
}) {
  const mission = getMissionById(missionId);
  const checkpoint = mission.humanCheckpoint;
  const [selectedDecision, setSelectedDecision] = useState(decision || null);

  const allReviewed = checkpoint.reviewChecks.every(check => reviewedCheckIds.includes(check.id));
  const currentOption = checkpoint.options.find(option => option.id === selectedDecision);
  const matchesEvidence = selectedDecision === checkpoint.expectedDecision;

  const handleChoose = optionId => {
    if (!allReviewed) return;
    setSelectedDecision(optionId);
    onDecide?.(mission.id, optionId);
  };

  return (
    <div className="agent-screen-width">
      <div className="text-center mb-5">
        <img src={geumjjokDoctor} alt="실행 조건을 확인하는 금쪽이" className="agent-screen-character" />
        <h2 className="agent-page-title agent-danger-title">사람의 근거 확인 지점</h2>
        <p className="agent-page-lead">승인은 ‘괜찮아 보인다’는 느낌이 아니라, 실행 대상과 근거를 확인한 뒤 남기는 결정입니다.</p>
      </div>

      <section className="agent-draft-card" aria-labelledby="agent-draft-title">
        <div id="agent-draft-title" className="agent-section-kicker">📄 에이전트가 요청한 실행 · {checkpoint.actionLabel}</div>
        <pre>{checkpoint.draftText}</pre>
      </section>

      <fieldset className="agent-review-panel">
        <legend>먼저 세 가지 근거를 직접 확인하세요</legend>
        <div className="agent-review-list">
          {checkpoint.reviewChecks.map(check => {
            const checked = reviewedCheckIds.includes(check.id);
            return (
              <label key={check.id} className={`agent-review-item ${checked ? 'is-checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleReviewCheck?.(mission.id, check.id)}
                />
                <span>
                  <strong>{check.label}</strong>
                  <small className={check.status === 'issue' ? 'is-issue' : 'is-confirmed'}>
                    {check.status === 'issue' ? '확인할 문제 · ' : '확인된 근거 · '}{check.evidence}
                  </small>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <section className="agent-decision-panel" aria-labelledby="agent-decision-title">
        <h3 id="agent-decision-title">{checkpoint.question}</h3>
        {!allReviewed && <p className="agent-decision-guide">위 근거 세 가지를 모두 확인하면 결정 버튼이 열립니다.</p>}
        <div className="agent-decision-grid">
          {checkpoint.options.map(option => {
            const isSelected = selectedDecision === option.id;
            const isApprove = option.id === 'approve';
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleChoose(option.id)}
                disabled={!allReviewed}
                aria-pressed={isSelected}
                className={`agent-decision-button ${isSelected ? 'is-selected' : ''} ${isApprove ? 'is-approve' : 'is-reject'}`}
              >
                {isApprove ? '✅' : '⏸️'} {option.label}
              </button>
            );
          })}
        </div>

        {currentOption && (
          <div className={`agent-feedback ${matchesEvidence ? 'is-aligned' : 'needs-review'}`} role="status">
            <strong>{matchesEvidence ? '근거와 일치하는 판단' : '한 번 더 살펴볼 판단'}</strong>
            <span>{currentOption.feedback}</span>
          </div>
        )}
      </section>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 실행 기록 다시보기</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!selectedDecision || !allReviewed}>
          {!allReviewed
            ? '근거 세 가지를 모두 확인하세요'
            : selectedDecision
              ? '판단 기록 정리하기 →'
              : '승인 또는 보류를 선택하세요'}
        </button>
      </div>
    </div>
  );
}
