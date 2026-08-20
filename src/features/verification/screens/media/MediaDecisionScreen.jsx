import React, { useState } from 'react';
import { mediaDecisionOptions } from '../../verificationData';
import { evaluateMediaDecision } from '../../verificationEngine';

export default function MediaDecisionScreen({ mediaCase, selectedRightIds, decisionId, onChangeDecision, onSave, onContinue, onPrev }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const evaluation = showFeedback ? evaluateMediaDecision(mediaCase.id, decisionId, selectedRightIds) : null;

  const handleCheck = () => {
    onSave();
    setShowFeedback(true);
  };

  return (
    <section className="card verification-screen" aria-labelledby="media-decision-title">
      <span className="verification-kicker">⑤ 사람이 최종 판단</span>
      <h2 id="media-decision-title">현재 확인한 정보로 이 콘텐츠를 사용해도 될까요?</h2>
      <div className="verification-focus-claim"><span>{mediaCase.mediaType}</span><strong>{mediaCase.title}</strong></div>

      <fieldset className="verification-fieldset" disabled={showFeedback}>
        <legend>나의 최종 판단</legend>
        <div className="verification-media-decision-grid">
          {mediaDecisionOptions.map(option => (
            <label key={option.id} className={`verification-decision-option ${decisionId === option.id ? 'is-selected' : ''}`} style={{ '--decision-color': option.color, '--decision-bg': option.background }}>
              <input type="radio" name="media-decision" value={option.id} checked={decisionId === option.id} onChange={() => onChangeDecision(option.id)} />
              <span aria-hidden="true">{option.icon}</span>
              <strong>{option.label}</strong>
            </label>
          ))}
        </div>
      </fieldset>

      {evaluation && (
        <div className={`verification-feedback ${evaluation.isEvidenceAligned ? 'is-aligned' : 'needs-review'}`} role="status">
          <h3>{evaluation.isEvidenceAligned ? '출처·이력·권리를 함께 연결했어요' : '판단 조건을 조금 더 살펴봅시다'}</h3>
          <p><strong>현재 증거가 가리키는 판단:</strong> {evaluation.expectedOption.icon} {evaluation.expectedOption.label}</p>
          <p>{evaluation.decisionReason}</p>
          <div className="verification-repair-list">
            <strong>안전하게 사용하려면</strong>
            <ul>{evaluation.repairSteps.map(step => <li key={step}>{step}</li>)}</ul>
          </div>
          {evaluation.selectedHarmfulChoice && <p>선택한 행동 중에는 오해나 피해를 키울 수 있는 행동이 포함되어 있어요. 공개 전에 다시 검토하세요.</p>}
        </div>
      )}

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 권리 조건</button>
        {!showFeedback ? (
          <button type="button" className="btn-primary" onClick={handleCheck} disabled={!decisionId}>증거와 대조하기</button>
        ) : (
          <button type="button" className="btn-primary" onClick={onContinue}>CSI 판결문 완성 →</button>
        )}
      </div>
    </section>
  );
}
