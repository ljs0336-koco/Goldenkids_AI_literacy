import React from 'react';
import curiousGeumjjok from '../../../../assets/geumjjok/금쪽이_표정_궁금.png';
import { claimCase } from '../../verificationData';

export default function ClaimIntroScreen({ onNext, onPrev }) {
  return (
    <section className="card verification-screen" aria-labelledby="claim-intro-title">
      <div className="verification-screen-heading">
        <img src={curiousGeumjjok} alt="궁금한 표정의 AI 금쪽이" />
        <div>
          <span className="verification-kicker">정보 검증 탐구</span>
          <h2 id="claim-intro-title">AI 답변이 자연스러워도 사실이라는 뜻은 아니에요</h2>
          <p>학교신문에 넣기 전에, 확인할 수 있는 주장부터 하나씩 나누어 살펴봅시다.</p>
        </div>
      </div>

      <div className="verification-prompt-box">
        <strong>학생이 AI 금쪽이에게 한 질문</strong>
        <p>“{claimCase.prompt}”</p>
      </div>

      <div className="verification-ai-answer" aria-label="AI 금쪽이 답변">
        <span className="verification-ai-label">AI 금쪽이 답변</span>
        {claimCase.aiAnswer.map((sentence, index) => (
          <p key={sentence}><strong>{index + 1}.</strong> {sentence}</p>
        ))}
      </div>

      <div className="verification-info-banner" role="note">
        <strong>오늘의 원칙</strong>
        <p>답변 전체를 한 번에 믿거나 의심하지 말고, 확인할 수 있는 주장으로 나누어요.</p>
      </div>
      <p className="verification-fiction-note">※ {claimCase.note}</p>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 활동 고르기</button>
        <button type="button" className="btn-primary" onClick={onNext}>검증할 주장 나누기 →</button>
      </div>
    </section>
  );
}
