import React, { useState } from 'react';
import { mediaDecisionOptions } from '../../verificationData';
import { evaluateMediaDecision } from '../../verificationEngine';
import VerificationChoiceFork from '../../components/VerificationChoiceFork';

export default function MediaDecisionScreen({ mediaCase, selectedRightIds, decisionId, onChangeDecision, onContinue, onPrev }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const evaluation = showFeedback ? evaluateMediaDecision(mediaCase.id, decisionId, selectedRightIds) : null;
  const choices = mediaDecisionOptions.map(option => ({
    id: option.id,
    title: `${option.icon} ${option.label}`,
    note: option.id === 'allowed' ? '출처·제작 정보·동의 조건이 확인됐어요.' : option.id === 'not_allowed' ? '현재 상태로 게시하면 오해나 피해가 생길 수 있어요.' : '고칠 조건이나 확인할 정보가 남아 있어요.',
    result: '사건 파일의 정보와 대조한 결과를 바로 확인합니다.'
  }));

  const handleDecisionSelect = nextDecisionId => {
    onChangeDecision(nextDecisionId);
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
          {!evaluation.hasAllRequiredActions && <p>게시 전에 필요한 행동 {evaluation.requiredCount}개 중 {evaluation.selectedRequiredCount}개만 남겼어요. 빠진 조치도 다시 확인해요.</p>}
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

      <VerificationChoiceFork
        options={choices}
        selectedId={decisionId}
        onSelect={handleDecisionSelect}
        prompt="A는 지금 사용해도 될 때, B는 현재 사용하지 않아야 할 때 선택해요."
        moreLabel="조건을 고치거나 더 확인하고 싶다면?"
        resultLabel="나의 게시 결정"
      />

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 게시 전 행동</button>
        <span className="verification-nav-hint">선택하면 사건 파일과 대조한 결과가 바로 나타나요.</span>
      </div>
    </section>
  );
}
