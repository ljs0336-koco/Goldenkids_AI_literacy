import React, { useState } from 'react';
import { mediaDecisionOptions } from '../../verificationData';
import { evaluateMediaDecision } from '../../verificationEngine';
import VerificationPageNav from '../../components/VerificationPageNav';

export default function MediaDecisionScreen({ mediaCase, selectedRightIds, decisionId, onChangeDecision, onSave, onContinue, onPrev }) {
  const initialIndex = Math.max(0, mediaDecisionOptions.findIndex(option => option.id === decisionId));
  const [pageIndex, setPageIndex] = useState(initialIndex);
  const [showFeedback, setShowFeedback] = useState(false);
  const option = mediaDecisionOptions[pageIndex];
  const selected = decisionId === option.id;
  const evaluation = showFeedback ? evaluateMediaDecision(mediaCase.id, decisionId, selectedRightIds) : null;

  const handleCheck = () => {
    onSave();
    setShowFeedback(true);
  };

  if (showFeedback) {
    return (
      <section className="card verification-screen verification-story-page" aria-labelledby="media-feedback-title">
        <span className="verification-kicker">게시 전 최종 기록</span>
        <h2 id="media-feedback-title">확인한 정보가 가리키는 사용 조건이에요</h2>
        <div className={`verification-feedback ${evaluation.isEvidenceAligned ? 'is-aligned' : 'needs-review'}`} role="status">
          <span>현재 사건 파일의 판단</span>
          <h3>{evaluation.expectedOption.icon} {evaluation.expectedOption.label}</h3>
          <p>{evaluation.decisionReason}</p>
          {!evaluation.isEvidenceAligned && <p>내 첫 판단과 달라도 괜찮아요. 출처·제작 이력·동의 기록을 근거로 게시 조건을 고치면 돼요.</p>}
        </div>

        <section className="verification-repair-page">
          <small>게시하거나 다시 검토하기 전에</small>
          <h3>필요한 조치</h3>
          <ol>{evaluation.repairSteps.map(step => <li key={step}>{step}</li>)}</ol>
          {evaluation.selectedHarmfulChoice && <p>선택한 행동 중 오해나 피해를 키울 수 있는 행동이 있어요. 게시 전 목록에서 빼야 해요.</p>}
        </section>

        <div className="bottom-nav-bar">
          <button type="button" className="btn-outline" onClick={() => setShowFeedback(false)}>← 사용 판단 다시 보기</button>
          <button type="button" className="btn-primary" onClick={onContinue}>최종 게시 결정 남기기 →</button>
        </div>
      </section>
    );
  }

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="media-decision-title">
      <span className="verification-kicker">사람이 내리는 최종 결정</span>
      <h2 id="media-decision-title">현재 확인한 정보로 이 콘텐츠를 어떻게 처리할까요?</h2>
      <div className="verification-focus-claim"><span>{mediaCase.mediaType}</span><strong>{mediaCase.title}</strong></div>

      <button
        type="button"
        className={`verification-decision-page ${selected ? 'is-selected' : ''}`}
        style={{ '--decision-color': option.color, '--decision-bg': option.background }}
        onClick={() => onChangeDecision(option.id)}
        aria-pressed={selected}
      >
        <span aria-hidden="true">{option.icon}</span>
        <strong>{option.label}</strong>
        <small>{selected ? '나의 결정으로 골랐어요' : '이 결정 선택하기'}</small>
      </button>

      <VerificationPageNav
        current={pageIndex}
        total={mediaDecisionOptions.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(mediaDecisionOptions.length - 1, index + 1))}
        prevLabel="이전 결정"
        nextLabel="다음 결정"
      />

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 게시 전 행동</button>
        <button type="button" className="btn-primary" onClick={handleCheck} disabled={!decisionId}>확인한 정보와 대조하기 →</button>
      </div>
    </section>
  );
}
