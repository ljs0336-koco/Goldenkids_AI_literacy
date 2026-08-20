import React from 'react';
import VerificationMediaArt from '../../VerificationMediaArt';
import { mediaCases, mediaDecisionOptions } from '../../verificationData';

export default function MediaIntroScreen({ mediaDecisions, onSelectCase, onPrev }) {
  return (
    <section className="card verification-screen" aria-labelledby="media-intro-title">
      <span className="verification-kicker">합성 미디어·인권 탐구</span>
      <h2 id="media-intro-title">겉모습보다 먼저 출처와 맥락을 추적해요</h2>
      <p>AI로 만든 콘텐츠가 모두 나쁜 것도, 실제 사진이 언제나 진실인 것도 아니에요. 조사할 가상 사례를 고르세요.</p>

      <div className="verification-content-credentials" role="note">
        <span aria-hidden="true">🥣</span>
        <div>
          <strong>콘텐츠 자격증명은 ‘콘텐츠 영양성분표’와 같아요</strong>
          <p>누가 만들었는지, 언제 만들어졌는지, 무엇을 수정했는지 확인하도록 도와줍니다.</p>
        </div>
      </div>

      <div className="verification-media-case-grid">
        {mediaCases.map(mediaCase => {
          const chosen = mediaDecisionOptions.find(option => option.id === mediaDecisions[mediaCase.id]);
          return (
            <button key={mediaCase.id} type="button" className="verification-media-case-card" onClick={() => onSelectCase(mediaCase.id)}>
              <VerificationMediaArt mediaCase={mediaCase} decorative />
              <div>
                <span className="verification-media-type">사례 {mediaCase.number} · {mediaCase.mediaType}</span>
                <h3>{mediaCase.title}</h3>
                <p>{mediaCase.postText}</p>
                <span className={chosen ? 'verification-status-chip is-complete' : 'verification-status-chip'}>
                  {chosen ? `${chosen.icon} ${chosen.label} · 다시 조사` : '출처 추적 시작 →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="verification-fiction-note">※ 모든 그림과 인물, 학교·기관 이름은 수업을 위해 만든 가상 사례입니다.</p>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 활동 고르기</button>
        <span className="verification-nav-hint">사례 하나를 골라 네 단계로 조사하세요.</span>
      </div>
    </section>
  );
}
