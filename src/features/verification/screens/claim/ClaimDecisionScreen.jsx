import React, { useState } from 'react';
import { claimDecisionOptions } from '../../verificationData';
import { evaluateClaimDecision } from '../../verificationEngine';
import VerificationChoiceFork from '../../components/VerificationChoiceFork';

export default function ClaimDecisionScreen({ claim, decisionId, reasonId, onChangeDecision, onChangeReason, onContinue, onPrev }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const evaluation = showFeedback ? evaluateClaimDecision(claim.id, decisionId, reasonId) : null;
  const decisionChoices = claimDecisionOptions.map(option => ({
    id: option.id,
    title: `${option.icon} ${option.label}`,
    note: option.id === 'confirmed' ? '자료들이 이 문장을 같은 내용으로 확인해요.' : option.id === 'contradicted' ? '자료와 다른 부분을 고쳐야 해요.' : '지금 자료만으로는 확정하기 어려워요.',
    result: '이제 이 판단을 뒷받침하는 이유를 고르면 바로 결과가 나와요.'
  }));
  const reasonChoices = claim.reasonOptions.map(reason => ({
    id: reason.id,
    title: reason.text,
    note: reason.isBest ? '자료의 작성자·날짜·조사 조건을 근거로 한 이유예요.' : '이 이유가 자료 내용과 맞는지 다시 생각해 보세요.',
    result: '선택한 판정과 이유를 실제 자료에 바로 대조합니다.'
  }));

  const handleReasonSelect = nextReasonId => {
    onChangeReason(nextReasonId);
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
          <button type="button" className="btn-outline" onClick={() => setShowFeedback(false)}>← 판정 다시 고르기</button>
          <button type="button" className="btn-primary" onClick={onContinue}>이 문장을 기사에 반영하기 →</button>
        </div>
      </section>
    );
  }

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="claim-decision-title">
      <span className="verification-kicker">판정 도장과 이유</span>
      <h2 id="claim-decision-title">자료를 보고 이 문장을 어떻게 처리할까요?</h2>
      <div className="verification-focus-claim"><span>문장 {claim.number}</span><strong>{claim.text}</strong></div>

      <VerificationChoiceFork
        options={decisionChoices}
        selectedId={decisionId}
        onSelect={onChangeDecision}
        prompt="A는 자료로 확인됐을 때, B는 문장을 고쳐야 할 때 선택해요."
        moreLabel="근거가 아직 부족하다고 생각한다면?"
        resultLabel="내 판정"
      />

      {decisionId && (
        <div className="verification-followup-choice">
          <h3>그렇게 판단한 이유는 무엇인가요?</h3>
          <p>이유를 누르면 자료와 대조한 결과가 바로 나와요.</p>
          <VerificationChoiceFork
            options={reasonChoices}
            selectedId={reasonId}
            onSelect={handleReasonSelect}
            prompt="A와 B 중 내 판정을 가장 잘 뒷받침하는 이유를 고르세요."
            moreLabel="다른 이유를 고르고 싶다면?"
            resultLabel="내가 연결한 이유"
          />
        </div>
      )}

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 자료 비교</button>
        <span className="verification-nav-hint">판정 뒤 이유를 고르면 결과가 바로 나타나요.</span>
      </div>
    </section>
  );
}
