import React, { useState } from 'react';
import VerificationMediaArt from '../../VerificationMediaArt';
import { mediaCases, mediaDecisionOptions } from '../../verificationData';
import VerificationPageNav from '../../components/VerificationPageNav';

export default function MediaIntroScreen({ mediaDecisions, onSelectCase, onPrev }) {
  const completedCount = Object.keys(mediaDecisions).length;
  const canBrowseCases = completedCount > 0;
  const [pageIndex, setPageIndex] = useState(0);
  const mediaCase = mediaCases[canBrowseCases ? pageIndex : 0];
  const chosen = mediaDecisionOptions.find(option => option.id === mediaDecisions[mediaCase.id]);

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="media-intro-title">
      <div className="verification-upload-alert">
        <span aria-hidden="true">●</span>
        <div><small>새 게시 요청</small><strong>공개하기 전에 사용 가능 여부를 확인해 주세요</strong></div>
      </div>

      <span className="verification-kicker">{canBrowseCases ? '다른 사건 파일도 열어 보기' : '첫 번째 사건 파일'}</span>
      <h2 id="media-intro-title">{canBrowseCases ? '어떤 콘텐츠를 더 확인해 볼까요?' : '동아리 진행자의 목소리를 본뜬 광고가 곧 게시돼요'}</h2>
      <p>{canBrowseCases ? '완료한 사건은 다시 볼 수 있고, 새로운 사건도 선택할 수 있어요.' : '합성처럼 들리는지만 찾지 말고, 누가 만들었고 당사자가 동의했는지까지 확인해야 해요.'}</p>

      <button type="button" className="verification-case-file" onClick={() => onSelectCase(mediaCase.id)}>
        <VerificationMediaArt mediaCase={mediaCase} decorative />
        <div>
          <span className="verification-media-type">사건 {mediaCase.number} · {mediaCase.mediaType}</span>
          <h3>{mediaCase.title}</h3>
          <p>{mediaCase.postText}</p>
          <em>{chosen ? `${chosen.icon} ${chosen.label} · 다시 확인하기` : '사건 파일 열기'}</em>
        </div>
      </button>

      {canBrowseCases && (
        <VerificationPageNav
          current={pageIndex}
          total={mediaCases.length}
          onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
          onNext={() => setPageIndex(index => Math.min(mediaCases.length - 1, index + 1))}
          prevLabel="이전 사건"
          nextLabel="다음 사건"
        />
      )}

      <p className="verification-fiction-note">※ 모든 그림과 인물, 학교·기관 이름은 수업을 위해 만든 가상 사례입니다.</p>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 활동 고르기</button>
        <span className="verification-nav-hint">가운데 사건 파일을 누르면 게시 전 확인이 시작돼요.</span>
      </div>
    </section>
  );
}
