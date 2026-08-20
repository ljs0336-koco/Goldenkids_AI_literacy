import React from 'react';
import rightsGeumjjok from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';
import { mediaCaseById, mediaDecisionOptions, verificationPrinciples } from '../../verificationData';
import { getMediaProgress } from '../../verificationEngine';

export default function VerificationCompletionScreen({ mediaDecisions, onExploreAnother, onRestart, onBackToActivities }) {
  const progress = getMediaProgress(mediaDecisions);

  return (
    <section className="card verification-screen verification-completion" aria-labelledby="media-completion-title">
      <img src={rightsGeumjjok} alt="인권 수호자 활동을 마친 AI 금쪽이" className="verification-completion-character" />
      <span className="verification-kicker">인권 수호자 CSI 기록 완료</span>
      <h2 id="media-completion-title">합성 여부와 사용 가능 여부를 따로 판단했어요</h2>
      <p>이미지가 실제인지 AI인지보다, 출처·맥락·제작 이력·당사자 동의를 함께 확인하는 것이 중요합니다.</p>

      <div className="verification-media-summary">
        {progress.completedIds.map(caseId => {
          const mediaCase = mediaCaseById[caseId];
          const choice = mediaDecisionOptions.find(option => option.id === mediaDecisions[caseId]);
          return (
            <article key={caseId}>
              <strong>사례 {mediaCase.number}. {mediaCase.title}</strong>
              <span style={{ color: choice.color }}>{choice.icon} 나의 판단: {choice.label}</span>
              <p>{mediaCase.decisionReason}</p>
            </article>
          );
        })}
      </div>

      <div className="verification-principle-box">
        <strong>미디어를 공유하기 전 세 가지 약속</strong>
        <ul>{verificationPrinciples.slice(3).map(principle => <li key={principle}>{principle}</li>)}</ul>
      </div>

      <div className="verification-completion-actions">
        {progress.completedCount < progress.totalCount && (
          <button type="button" className="btn-primary" onClick={onExploreAnother}>다른 가상 사례도 조사하기</button>
        )}
        <button type="button" className="btn-outline" onClick={onRestart}>현재 활동 처음부터</button>
        <button type="button" className="btn-ghost" onClick={onBackToActivities}>활동 고르기로</button>
      </div>
    </section>
  );
}
