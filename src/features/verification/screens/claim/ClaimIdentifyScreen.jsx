import React from 'react';
import { claimDecisionOptions, verificationClaims } from '../../verificationData';
import { getClaimProgress } from '../../verificationEngine';

export default function ClaimIdentifyScreen({ claimDecisions, onSelectClaim, onPrev }) {
  const progress = getClaimProgress(claimDecisions);

  return (
    <section className="card verification-screen" aria-labelledby="claim-identify-title">
      <div className="verification-title-row">
        <div>
          <span className="verification-kicker">① 주장 찾기</span>
          <h2 id="claim-identify-title">검증할 문장을 하나씩 선택하세요</h2>
          <p>각 문장은 서로 다른 종류의 확인이 필요합니다.</p>
        </div>
        <span className="verification-count" aria-label={`${progress.totalCount}개 중 ${progress.completedCount}개 검증 완료`}>
          {progress.completedCount}/{progress.totalCount} 완료
        </span>
      </div>

      <div className="verification-claim-list">
        {verificationClaims.map(claim => {
          const decision = claimDecisionOptions.find(option => option.id === claimDecisions[claim.id]);
          return (
            <button key={claim.id} type="button" className="verification-claim-card" onClick={() => onSelectClaim(claim.id)}>
              <span className="verification-claim-number">주장 {claim.number}</span>
              <strong>{claim.text}</strong>
              <small>{claim.question}</small>
              <span className={decision ? 'verification-status-chip is-complete' : 'verification-status-chip'}>
                {decision ? `${decision.icon} ${decision.shortLabel} · 다시 보기` : '자료 확인하기 →'}
              </span>
            </button>
          );
        })}
      </div>

      {progress.isComplete && (
        <div className="verification-success-banner" role="status">
          ✅ 세 주장을 모두 근거와 함께 검토했어요. 결과 카드에서 문장을 다시 정리할 수 있어요.
        </div>
      )}

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← AI 답변 다시 보기</button>
        <span className="verification-nav-hint">주장 카드를 눌러 출처 확인을 시작하세요.</span>
      </div>
    </section>
  );
}
