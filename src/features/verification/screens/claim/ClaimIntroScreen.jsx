import React from 'react';
import curiousGeumjjok from '../../../../assets/geumjjok/금쪽이_표정_궁금.png';
import { claimCase } from '../../verificationData';
import { verificationSpeakerPrompt } from '../../verificationLearningData';
import VerificationSpeakerNote from '../../components/VerificationSpeakerNote';

export default function ClaimIntroScreen({ onNext, onPrev }) {
  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="claim-intro-title">
      <div className="verification-deadline-banner">
        <span>학교신문 마감까지</span>
        <strong>15분</strong>
        <p>AI 금쪽이가 쓴 학교숲 소개문이 방금 도착했어요.</p>
      </div>

      <div className="verification-screen-heading verification-screen-heading--compact">
        <img src={curiousGeumjjok} alt="기사 확인을 기다리는 AI 금쪽이" />
        <div>
          <span className="verification-kicker">오늘은 학교신문의 마지막 편집자</span>
          <h2 id="claim-intro-title">이 글을 그대로 실어도 될까요?</h2>
          <p>문장은 자연스럽고 숫자도 자세하지만, 아직 출처를 확인하지 않았어요.</p>
        </div>
      </div>

      <article className="verification-draft-paper" aria-label="AI가 쓴 학교숲 소개문 초안">
        <header><small>{claimCase.publication}</small><strong>우리 학교숲을 소개합니다</strong></header>
        {claimCase.aiAnswer.map(sentence => <p key={sentence}>{sentence}</p>)}
        <footer>초안 작성 도움: AI 금쪽이 · 사실 확인: 아직 하지 않음</footer>
      </article>

      <p className="verification-editor-question">기사를 발행하기 전에 <strong>확인할 수 있는 문장으로 나누고 근거를 찾아야 해요.</strong></p>
      <VerificationSpeakerNote prompt={verificationSpeakerPrompt} />
      <p className="verification-fiction-note">※ {claimCase.note}</p>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 활동 고르기</button>
        <button type="button" className="btn-primary" onClick={onNext}>이대로 싣기 전에 확인하기 →</button>
      </div>
    </section>
  );
}
