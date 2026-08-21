import React, { useState } from 'react';
import VerificationPageNav from '../../components/VerificationPageNav';

export default function ProvenanceScreen({ mediaCase, reviewedIds, onReview, onNext, onPrev }) {
  const firstUnread = mediaCase.provenance.findIndex(card => !reviewedIds.includes(card.id));
  const [pageIndex, setPageIndex] = useState(firstUnread >= 0 ? firstUnread : 0);
  const card = mediaCase.provenance[pageIndex];
  const reviewed = reviewedIds.includes(card.id);
  const isComplete = reviewedIds.length === mediaCase.provenance.length;

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="provenance-title">
      <span className="verification-kicker">콘텐츠 밖의 제작 정보</span>
      <h2 id="provenance-title">출처와 제작 과정 카드를 한 장씩 열어요</h2>
      <div className="verification-focus-claim"><span>{mediaCase.title}</span><strong>{mediaCase.postText}</strong></div>
      <p>겉모습이 아니라 누가 만들었고, 무엇을 바꾸었고, 동의를 받았는지 확인하세요.</p>

      <button
        type="button"
        className={`verification-provenance-page ${reviewed ? `is-open tone-${card.tone}` : ''}`}
        onClick={() => onReview(card.id)}
        aria-expanded={reviewed}
      >
        <span>제작 정보 {pageIndex + 1}</span>
        <strong>{card.label}</strong>
        <p>{reviewed ? card.value : '카드를 눌러 확인하세요.'}</p>
        <em>{reviewed ? '확인했어요' : '이 정보 열어 보기'}</em>
      </button>

      <VerificationPageNav
        current={pageIndex}
        total={mediaCase.provenance.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(mediaCase.provenance.length - 1, index + 1))}
        prevLabel="이전 정보"
        nextLabel="다음 정보"
        disableNext={!reviewed}
      />

      <div className="verification-selection-summary" aria-live="polite">확인한 제작 정보 {reviewedIds.length}/{mediaCase.provenance.length}개</div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 보이는 단서</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!isComplete}>동의와 사용 조건 확인하기 →</button>
      </div>
    </section>
  );
}
