import React, { useState } from 'react';
import VerificationPageNav from '../../components/VerificationPageNav';

export default function ConsentRightsScreen({ mediaCase, selectedRightIds, onToggleRight, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const choice = mediaCase.rightsChoices[pageIndex];
  const selected = selectedRightIds.includes(choice.id);
  const ready = pageIndex === mediaCase.rightsChoices.length - 1 && selectedRightIds.length > 0;

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="consent-rights-title">
      <span className="verification-kicker">진짜인가와 별도로 확인할 것</span>
      <h2 id="consent-rights-title">게시 전에 어떤 행동이 필요할까요?</h2>
      <p>동의, 표시, 맥락, 공개 범위를 한 장씩 읽고 필요하다고 생각하는 행동을 남기세요.</p>

      <div className="verification-rights-tags" aria-label="영향을 받을 수 있는 권리와 가치">
        {mediaCase.affectedRights.map(item => <span key={item}>{item}</span>)}
      </div>

      <button type="button" className={`verification-right-page ${selected ? 'is-selected' : ''}`} onClick={() => onToggleRight(choice.id)} aria-pressed={selected}>
        <span>게시 전 행동 {pageIndex + 1}</span>
        <strong>{choice.text}</strong>
        <small>{selected ? '필요한 행동으로 남겼어요' : '이 행동이 필요하다고 선택하기'}</small>
      </button>

      <VerificationPageNav
        current={pageIndex}
        total={mediaCase.rightsChoices.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(mediaCase.rightsChoices.length - 1, index + 1))}
        prevLabel="이전 행동"
        nextLabel="다음 행동"
      />

      <p className="verification-selection-summary">필요하다고 남긴 행동 {selectedRightIds.length}개</p>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 제작 정보</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!ready}>이 콘텐츠의 사용 여부 결정하기 →</button>
      </div>
    </section>
  );
}
