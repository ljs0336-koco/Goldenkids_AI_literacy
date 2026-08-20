import React, { useState } from 'react';
import { claimDecisionOptions } from '../../verificationData';
import { evaluateClaimDecision } from '../../verificationEngine';

export default function ClaimDecisionScreen({ claim, decisionId, reasonId, onChangeDecision, onChangeReason, onSave, onContinue, onPrev }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const evaluation = showFeedback ? evaluateClaimDecision(claim.id, decisionId, reasonId) : null;

  const handleCheck = () => {
    onSave();
    setShowFeedback(true);
  };

  return (
    <section className="card verification-screen" aria-labelledby="claim-decision-title">
      <span className="verification-kicker">④ 판단하고 설명</span>
      <h2 id="claim-decision-title">근거를 바탕으로 이 주장을 어떻게 기록할까요?</h2>
      <div className="verification-focus-claim"><span>주장 {claim.number}</span><strong>{claim.text}</strong></div>

      <fieldset className="verification-fieldset" disabled={showFeedback}>
        <legend>판단 상태 선택</legend>
        <div className="verification-decision-grid">
          {claimDecisionOptions.map(option => (
            <label key={option.id} className={`verification-decision-option ${decisionId === option.id ? 'is-selected' : ''}`} style={{ '--decision-color': option.color, '--decision-bg': option.background }}>
              <input type="radio" name="claim-decision" value={option.id} checked={decisionId === option.id} onChange={() => onChangeDecision(option.id)} />
              <span aria-hidden="true">{option.icon}</span>
              <strong>{option.label}</strong>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="verification-fieldset" disabled={showFeedback}>
        <legend>그렇게 판단한 이유</legend>
        <div className="verification-reason-list">
          {claim.reasonOptions.map(reason => (
            <label key={reason.id} className={reasonId === reason.id ? 'is-selected' : ''}>
              <input type="radio" name="claim-reason" value={reason.id} checked={reasonId === reason.id} onChange={() => onChangeReason(reason.id)} />
              <span>{reason.text}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {evaluation && (
        <div className={`verification-feedback ${evaluation.isEvidenceAligned ? 'is-aligned' : 'needs-review'}`} role="status">
          <h3>{evaluation.isEvidenceAligned ? '근거를 정확히 연결했어요' : '자료의 조건을 한 번 더 연결해 봅시다'}</h3>
          <p><strong>이 사례의 근거가 가리키는 상태:</strong> {evaluation.expectedOption.icon} {evaluation.expectedOption.label}</p>
          <p>{evaluation.evidenceSummary}</p>
          {!evaluation.isEvidenceAligned && <p>틀렸다는 점수 대신, 어떤 날짜와 조사 조건을 놓쳤는지 다시 확인해 보세요.</p>}
        </div>
      )}

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>{showFeedback ? '← 근거 다시 보기' : '← 근거 비교'}</button>
        {!showFeedback ? (
          <button type="button" className="btn-primary" onClick={handleCheck} disabled={!decisionId || !reasonId}>근거와 대조하기</button>
        ) : (
          <button type="button" className="btn-primary" onClick={onContinue}>판단 기록하기 →</button>
        )}
      </div>
    </section>
  );
}
