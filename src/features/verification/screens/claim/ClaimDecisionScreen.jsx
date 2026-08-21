import React, { useState } from 'react';
import { claimDecisionOptions } from '../../verificationData';
import { evaluateClaimDecision } from '../../verificationEngine';
import VerificationPageNav from '../../components/VerificationPageNav';

export default function ClaimDecisionScreen({ claim, decisionId, reasonId, onChangeDecision, onChangeReason, onSave, onContinue, onPrev }) {
  const initialDecisionIndex = Math.max(0, claimDecisionOptions.findIndex(option => option.id === decisionId));
  const initialReasonIndex = Math.max(0, claim.reasonOptions.findIndex(reason => reason.id === reasonId));
  const [stage, setStage] = useState('decision');
  const [decisionPage, setDecisionPage] = useState(initialDecisionIndex);
  const [reasonPage, setReasonPage] = useState(initialReasonIndex);
  const [showFeedback, setShowFeedback] = useState(false);
  const decision = claimDecisionOptions[decisionPage];
  const reason = claim.reasonOptions[reasonPage];
  const evaluation = showFeedback ? evaluateClaimDecision(claim.id, decisionId, reasonId) : null;

  const handleCheck = () => {
    onSave();
    setShowFeedback(true);
  };

  if (showFeedback) {
    return (
      <section className="card verification-screen verification-story-page" aria-labelledby="claim-feedback-title">
        <span className="verification-kicker">문장 판정 결과</span>
        <h2 id="claim-feedback-title">근거를 확인하니 문장을 이렇게 고칠 수 있어요</h2>
        <div className={`verification-feedback ${evaluation.isEvidenceAligned ? 'is-aligned' : 'needs-review'}`} role="status">
          <span>자료가 가리키는 상태</span>
          <h3>{evaluation.expectedOption.icon} {evaluation.expectedOption.label}</h3>
          <p>{evaluation.evidenceSummary}</p>
          {!evaluation.isEvidenceAligned && <p>내 첫 판단과 달라도 괜찮아요. 날짜와 조사 조건을 근거로 공개할 문장을 고치면 돼요.</p>}
        </div>
        <section className="verification-sentence-rewrite">
          <article><small>AI 초안</small><p>{claim.text}</p></article>
          <div aria-hidden="true">→</div>
          <article className="is-verified"><small>검증해 고친 문장</small><p>{claim.verifiedText}</p></article>
        </section>
        <div className="bottom-nav-bar">
          <button type="button" className="btn-outline" onClick={() => { setShowFeedback(false); setStage('decision'); }}>← 판정 다시 고르기</button>
          <button type="button" className="btn-primary" onClick={onContinue}>이 문장을 기사에 반영하기 →</button>
        </div>
      </section>
    );
  }

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="claim-decision-title">
      <span className="verification-kicker">판정 도장과 이유</span>
      <h2 id="claim-decision-title">{stage === 'decision' ? '이 문장의 근거 상태를 골라요' : '왜 그렇게 판단했는지 근거를 연결해요'}</h2>
      <div className="verification-focus-claim"><span>문장 {claim.number}</span><strong>{claim.text}</strong></div>

      {stage === 'decision' ? (
        <>
          <button
            type="button"
            className={`verification-decision-page ${decisionId === decision.id ? 'is-selected' : ''}`}
            style={{ '--decision-color': decision.color, '--decision-bg': decision.background }}
            onClick={() => onChangeDecision(decision.id)}
            aria-pressed={decisionId === decision.id}
          >
            <span aria-hidden="true">{decision.icon}</span>
            <strong>{decision.label}</strong>
            <small>{decisionId === decision.id ? '이 판정 도장을 골랐어요' : '이 판정 도장 선택하기'}</small>
          </button>
          <VerificationPageNav
            current={decisionPage}
            total={claimDecisionOptions.length}
            onPrev={() => setDecisionPage(index => Math.max(0, index - 1))}
            onNext={() => setDecisionPage(index => Math.min(claimDecisionOptions.length - 1, index + 1))}
            prevLabel="이전 판정"
            nextLabel="다음 판정"
          />
        </>
      ) : (
        <>
          <button type="button" className={`verification-reason-page ${reasonId === reason.id ? 'is-selected' : ''}`} onClick={() => onChangeReason(reason.id)} aria-pressed={reasonId === reason.id}>
            <span>판단 이유 {reasonPage + 1}</span>
            <strong>{reason.text}</strong>
            <small>{reasonId === reason.id ? '이 이유를 골랐어요' : '이 이유 선택하기'}</small>
          </button>
          <VerificationPageNav
            current={reasonPage}
            total={claim.reasonOptions.length}
            onPrev={() => setReasonPage(index => Math.max(0, index - 1))}
            onNext={() => setReasonPage(index => Math.min(claim.reasonOptions.length - 1, index + 1))}
            prevLabel="이전 이유"
            nextLabel="다음 이유"
          />
        </>
      )}

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={stage === 'decision' ? onPrev : () => setStage('decision')}>
          {stage === 'decision' ? '← 자료 비교' : '← 판정 도장'}
        </button>
        {stage === 'decision' ? (
          <button type="button" className="btn-primary" onClick={() => setStage('reason')} disabled={!decisionId}>판정 이유 고르기 →</button>
        ) : (
          <button type="button" className="btn-primary" onClick={handleCheck} disabled={!reasonId}>근거와 대조해 문장 고치기 →</button>
        )}
      </div>
    </section>
  );
}
