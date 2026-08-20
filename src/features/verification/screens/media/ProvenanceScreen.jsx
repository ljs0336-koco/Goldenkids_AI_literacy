import React from 'react';

export default function ProvenanceScreen({ mediaCase, reviewedIds, onReview, onNext, onPrev }) {
  const isComplete = reviewedIds.length === mediaCase.provenance.length;

  return (
    <section className="card verification-screen" aria-labelledby="provenance-title">
      <span className="verification-kicker">② 출처와 맥락 · ③ 제작 이력</span>
      <h2 id="provenance-title">콘텐츠 자격증명 카드 네 장을 열어 보세요</h2>
      <div className="verification-focus-claim"><span>{mediaCase.title}</span><strong>{mediaCase.postText}</strong></div>
      <p>카드를 열 때마다 “누가, 언제, 무엇을 바꾸었고, 동의를 받았는가?”를 확인하세요.</p>

      <div className="verification-provenance-grid">
        {mediaCase.provenance.map(card => {
          const reviewed = reviewedIds.includes(card.id);
          return (
            <button
              key={card.id}
              type="button"
              className={`verification-provenance-card ${reviewed ? `is-open tone-${card.tone}` : ''}`}
              onClick={() => onReview(card.id)}
              aria-expanded={reviewed}
            >
              <span>{reviewed ? '확인 완료' : '눌러서 확인'}</span>
              <strong>{card.label}</strong>
              <p>{reviewed ? card.value : '아직 공개하지 않은 정보예요.'}</p>
            </button>
          );
        })}
      </div>

      <div className="verification-selection-summary" aria-live="polite">
        확인한 자격증명 {reviewedIds.length}/{mediaCase.provenance.length}개
        {isComplete ? ' · 이제 합성 여부뿐 아니라 사용 조건도 판단할 수 있어요.' : ''}
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 첫 단서</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!isComplete}>동의와 권리 확인 →</button>
      </div>
    </section>
  );
}
