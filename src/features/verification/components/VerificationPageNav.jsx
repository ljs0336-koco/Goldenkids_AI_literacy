import React from 'react';

export default function VerificationPageNav({ current, total, onPrev, onNext, prevLabel = '이전 장', nextLabel = '다음 장', disableNext = false }) {
  return (
    <nav className="verification-page-nav" aria-label="내용 페이지 넘기기">
      <button type="button" onClick={onPrev} disabled={current === 0}>← {prevLabel}</button>
      <div className="verification-page-progress" aria-label={`${total}장 중 ${current + 1}장`}>
        {Array.from({ length: total }, (_, index) => <span key={index} className={index === current ? 'is-active' : ''} aria-hidden="true" />)}
        <strong>{current + 1} / {total}</strong>
      </div>
      <button type="button" onClick={onNext} disabled={current === total - 1 || disableNext}>{nextLabel} →</button>
    </nav>
  );
}
