import React from 'react';
import rightsGeumjjok from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';
import { mediaCaseById, mediaDecisionOptions } from '../../verificationData';
import { getMediaProgress } from '../../verificationEngine';

export default function VerificationCompletionScreen({ mediaDecisions, caseId, onOpenRecord, onExploreAnother, onRestart, onBackToActivities }) {
  const progress = getMediaProgress(mediaDecisions);
  const mediaCase = mediaCaseById[caseId] || mediaCaseById[progress.completedIds[0]];
  const choice = mediaDecisionOptions.find(option => option.id === mediaDecisions[mediaCase?.id]);

  return (
    <section className="card verification-screen verification-completion" aria-labelledby="media-completion-title">
      <img src={rightsGeumjjok} alt="게시 전 확인을 마친 AI 금쪽이" className="verification-completion-character" />
      <span className="verification-kicker">게시 전 확인 완료</span>
      <h2 id="media-completion-title">합성처럼 보이는지보다, 사용할 근거가 있는지 확인했어요</h2>
      <p>출처와 제작 과정, 맥락과 당사자 동의를 확인해 최종 게시 결정을 남겼어요.</p>

      {mediaCase && choice && (
        <section className="verification-media-before-after" aria-label="게시 요청과 최종 결정 비교">
          <article>
            <small>처음 게시 요청</small>
            <h3>{mediaCase.title}</h3>
            <p>{mediaCase.postText}</p>
          </article>
          <div aria-hidden="true">→</div>
          <article className="is-after">
            <small>확인한 뒤의 결정</small>
            <h3 style={{ color: choice.color }}>{choice.icon} {choice.label}</h3>
            <p>{mediaCase.decisionReason}</p>
          </article>
        </section>
      )}

      {mediaCase && (
        <section className="verification-final-conditions">
          <small>게시하거나 다시 검토하기 전에 남긴 조건</small>
          <ol>{mediaCase.repairSteps.map(step => <li key={step}>{step}</li>)}</ol>
        </section>
      )}

      <p className="verification-closing-sentence">다음에 미디어를 공유할 때도, <strong>보이는 단서에서 멈추지 않고 출처·맥락·동의를 확인할 거예요.</strong></p>

      <div className="verification-completion-actions">
        <button type="button" className="btn-outline" onClick={onOpenRecord}>내 확인 기록 보기</button>
        {progress.completedCount < progress.totalCount && <button type="button" className="btn-primary" onClick={onExploreAnother}>다른 사건 파일 열기</button>}
        <button type="button" className="btn-outline" onClick={onRestart}>미디어 활동 처음부터</button>
        <button type="button" className="btn-ghost" onClick={onBackToActivities}>다른 이야기 고르기</button>
      </div>
    </section>
  );
}
