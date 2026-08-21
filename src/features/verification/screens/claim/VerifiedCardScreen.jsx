import React from 'react';
import verifiedGeumjjok from '../../../../assets/geumjjok/금쪽이_표정_감동.png';
import { claimCase, claimDecisionOptions, verificationClaims } from '../../verificationData';

export default function VerifiedCardScreen({ onOpenRecord, onRestart, onBackToActivities }) {
  return (
    <section className="card verification-screen verification-completion" aria-labelledby="verified-card-title">
      <img src={verifiedGeumjjok} alt="검증을 마친 AI 금쪽이" className="verification-completion-character" />
      <span className="verification-kicker">학교신문 발행 준비 완료</span>
      <h2 id="verified-card-title">AI 초안을 근거가 보이는 기사로 바꿨어요</h2>
      <p>문장마다 출처와 날짜를 확인하니 그대로 쓸 문장, 고칠 문장, 근거가 더 필요한 문장이 구분됐어요.</p>

      <section className="verification-article-before-after" aria-label="검증 전후 학교신문 비교">
        <article>
          <small>검증 전 · AI 초안</small>
          <h3>우리 학교숲을 소개합니다</h3>
          {claimCase.aiAnswer.map(sentence => <p key={sentence}>{sentence}</p>)}
        </article>
        <div aria-hidden="true">→</div>
        <article className="is-after">
          <small>검증 후 · 발행할 기사</small>
          <h3>근거를 확인한 학교숲 안내</h3>
          {verificationClaims.map(claim => {
            const expected = claimDecisionOptions.find(option => option.id === claim.expectedDecision);
            return <p key={claim.id}><span style={{ color: expected.color }}>{expected.icon}</span> {claim.verifiedText}</p>;
          })}
        </article>
      </section>

      <p className="verification-closing-sentence">다음에 AI의 답을 사용할 때도, <strong>자연스러운 문장보다 먼저 출처와 날짜를 확인할 거예요.</strong></p>

      <div className="verification-completion-actions">
        <button type="button" className="btn-outline" onClick={onOpenRecord}>내 검증 기록 보기</button>
        <button type="button" className="btn-outline" onClick={onRestart}>학교신문 다시 검증하기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities}>다른 이야기 고르기</button>
      </div>
    </section>
  );
}
