import React from 'react';
import { announceLearningGuide } from '../../../utils/learningGuide';

export default function VerificationPageNav({ current, total, onPrev, onNext, prevLabel = '이전 장', nextLabel = '다음 장', disableNext = false }) {
  const movePage = (onMove, direction) => {
    onMove();
    announceLearningGuide(`${direction} 내용이 열렸어요. 가운데 내용을 확인하고, 표시된 버튼을 눌러 판단을 남겨 보세요.`);
  };

  return (
    <nav className="verification-page-nav" aria-label="내용 페이지 넘기기">
      <button type="button" onClick={() => movePage(onPrev, '이전')} disabled={current === 0}>← {prevLabel}</button>
      <div className="verification-page-progress" aria-label={`${total}장 중 ${current + 1}장`}>
        {Array.from({ length: total }, (_, index) => <span key={index} className={index === current ? 'is-active' : ''} aria-hidden="true" />)}
        <strong>{current + 1} / {total}</strong>
      </div>
      <button type="button" onClick={() => movePage(onNext, '다음')} disabled={current === total - 1 || disableNext}>{nextLabel} →</button>
    </nav>
  );
}
