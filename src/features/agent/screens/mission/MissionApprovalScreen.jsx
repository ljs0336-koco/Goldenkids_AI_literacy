import React, { useState } from 'react';
import { clubInviteMission } from '../../agentData';
import AgentChoiceFork from '../../components/AgentChoiceFork';
import AgentPageCue from '../../components/AgentPageCue';
import AgentPageNav from '../../components/AgentPageNav';

export default function MissionApprovalScreen({
  decision,
  reviewedCheckIds = [],
  onToggleReviewCheck,
  onDecide,
  onNext,
  onPrev
}) {
  const checkpoint = clubInviteMission.humanCheckpoint;
  const [reviewIndex, setReviewIndex] = useState(0);
  const check = checkpoint.reviewChecks[reviewIndex];
  const allReviewed = checkpoint.reviewChecks.every(item => reviewedCheckIds.includes(item.id));
  const selectedOption = checkpoint.options.find(option => option.id === decision);
  const isChecked = reviewedCheckIds.includes(check.id);

  const markAndContinue = () => {
    if (!isChecked) onToggleReviewCheck?.(check.id);
    if (reviewIndex < checkpoint.reviewChecks.length - 1) setReviewIndex(index => index + 1);
  };

  return (
    <section className="agent-shell agent-stage" aria-labelledby="mission-approval-title">
      <AgentPageCue
        action="네 가지 자료를 한 장씩 확인한 뒤, A와 B 중 지금 할 행동을 고르세요."
        reason="사람이 확인한다는 것은 버튼만 누르는 일이 아니라, 판단에 필요한 정보와 보류 방법을 갖는 일이에요."
      />

      <header className="agent-page-head">
        <span className="agent-eyebrow">보내기 전 마지막 확인</span>
        <h1 id="mission-approval-title">진짜 이대로 보내도 될까?</h1>
        <p>AI가 준비한 초대 내용을 최종 자료와 비교해 보세요.</p>
      </header>

      {!allReviewed ? (
        <div className="agent-review-stage">
          <aside className="agent-draft-card">
            <small>AI가 보내려는 내용</small>
            <pre>{checkpoint.draftText}</pre>
          </aside>

          <article className="agent-review-card" aria-live="polite">
            <div className="agent-review-count">확인 {reviewIndex + 1} / {checkpoint.reviewChecks.length}</div>
            <h2>{check.label}</h2>
            <p>{check.evidence}</p>
            <button type="button" className="btn-primary" onClick={markAndContinue}>
              {reviewIndex === checkpoint.reviewChecks.length - 1 ? '마지막 자료 확인했어요' : '확인했어요 · 다음 자료'}
            </button>
          </article>

          <div className="agent-review-tabs" aria-label="확인할 자료">
            {checkpoint.reviewChecks.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`${reviewedCheckIds.includes(item.id) ? 'is-checked' : ''} ${index === reviewIndex ? 'is-current' : ''}`}
                onClick={() => setReviewIndex(index)}
                aria-label={`${item.label} ${reviewedCheckIds.includes(item.id) ? '확인함' : '확인 전'}`}
              >
                {reviewedCheckIds.includes(item.id) ? '✓' : index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="agent-all-reviewed">
            <strong>네 가지 문제를 모두 찾았어요</strong>
            <span>작년 연락처 · 이전 일정 · 수정 전 포스터 · 연락처 공개 설정</span>
          </div>

          <AgentChoiceFork
            options={checkpoint.options.slice(0, 2)}
            alternative={checkpoint.options[2]}
            value={decision}
            onChange={onDecide}
            prompt={checkpoint.question}
          />

          <aside className={`agent-choice-result ${selectedOption ? '' : 'is-empty'}`} aria-live="polite">
            {selectedOption ? (
              <>
                <strong>내 선택 · {selectedOption.label.replace(/^[ABC]\.\s*/, '')}</strong>
                <span>{selectedOption.feedback}</span>
              </>
            ) : <span>선택하면 바로 결과를 알려 드려요.</span>}
          </aside>
        </>
      )}

      <AgentPageNav
        onPrev={onPrev}
        onNext={onNext}
        prevLabel="행동 기록 다시 보기"
        nextLabel="사람 확인 방법 정리하기"
        disabled={!allReviewed || !decision}
      />
    </section>
  );
}
