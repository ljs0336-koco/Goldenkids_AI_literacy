import React from 'react';
import verifiedGeumjjok from '../../../../assets/geumjjok/금쪽이_표정_감동.png';
import { claimDecisionOptions, verificationClaims, verificationPrinciples } from '../../verificationData';

export default function VerifiedCardScreen({ claimDecisions, onRestart, onBackToActivities }) {
  return (
    <section className="card verification-screen verification-completion" aria-labelledby="verified-card-title">
      <img src={verifiedGeumjjok} alt="검증을 마치고 감동한 AI 금쪽이" className="verification-completion-character" />
      <span className="verification-kicker">진실 검증가 기록 완료</span>
      <h2 id="verified-card-title">검증된 학교신문 정보카드가 완성됐어요</h2>
      <p>AI 답변을 그대로 복사하지 않고, 주장마다 근거를 확인해 문장을 다시 썼습니다.</p>

      <div className="verification-result-list">
        {verificationClaims.map(claim => {
          const chosen = claimDecisionOptions.find(option => option.id === claimDecisions[claim.id]);
          const expected = claimDecisionOptions.find(option => option.id === claim.expectedDecision);
          return (
            <article key={claim.id}>
              <div className="verification-result-title">
                <span>주장 {claim.number}</span>
                <span style={{ color: expected.color }}>{expected.icon} {expected.label}</span>
              </div>
              <p className="verification-original-text"><strong>원래 답변:</strong> {claim.text}</p>
              <p><strong>검증해 다시 쓴 문장:</strong> {claim.verifiedText}</p>
              {chosen && chosen.id !== expected.id && <small>내 첫 판단은 ‘{chosen.label}’이었지만 근거를 확인해 정보를 보완했어요.</small>}
            </article>
          );
        })}
      </div>

      <div className="verification-principle-box">
        <strong>내가 가져갈 검증 원칙</strong>
        <ul>{verificationPrinciples.slice(0, 3).map(principle => <li key={principle}>{principle}</li>)}</ul>
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onBackToActivities}>← 다른 활동 고르기</button>
        <button type="button" className="btn-primary" onClick={onRestart}>주장 검증 다시 하기</button>
      </div>
    </section>
  );
}
