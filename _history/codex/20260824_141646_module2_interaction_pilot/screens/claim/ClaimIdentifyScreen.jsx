import React, { useState } from 'react';
import { claimDecisionOptions, verificationClaims } from '../../verificationData';
import { getClaimProgress } from '../../verificationEngine';
import VerificationPageNav from '../../components/VerificationPageNav';

export default function ClaimIdentifyScreen({ claimDecisions, onSelectClaim, onPrev }) {
  const progress = getClaimProgress(claimDecisions);
  const firstIncomplete = verificationClaims.findIndex(claim => !claimDecisions[claim.id]);
  const [pageIndex, setPageIndex] = useState(firstIncomplete >= 0 ? firstIncomplete : 0);
  const claim = verificationClaims[pageIndex];
  const decision = claimDecisionOptions.find(option => option.id === claimDecisions[claim.id]);

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="claim-identify-title">
      <div className="verification-title-row">
        <div>
          <span className="verification-kicker">확인할 문장 고르기</span>
          <h2 id="claim-identify-title">AI 초안을 세 문장으로 나눴어요</h2>
          <p>한 장씩 넘겨 보며 아직 확인하지 않은 문장을 골라요.</p>
        </div>
        <span className="verification-count" aria-label={`${progress.totalCount}개 중 ${progress.completedCount}개 검증 완료`}>
          검증 {progress.completedCount}/{progress.totalCount}
        </span>
      </div>

      <button type="button" className={`verification-claim-page ${decision ? 'is-complete' : ''}`} onClick={() => onSelectClaim(claim.id)}>
        <span>AI 초안의 문장 {claim.number}</span>
        <strong>{claim.text}</strong>
        <small>{claim.question}</small>
        <em>{decision ? `${decision.icon} ${decision.shortLabel} · 다시 확인하기` : '이 문장의 근거 찾기'}</em>
      </button>

      <VerificationPageNav
        current={pageIndex}
        total={verificationClaims.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(verificationClaims.length - 1, index + 1))}
        prevLabel="이전 문장"
        nextLabel="다음 문장"
      />

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← AI 초안 다시 보기</button>
        <span className="verification-nav-hint">가운데 문장 카드를 누르면 자료 확인이 시작돼요.</span>
      </div>
    </section>
  );
}
