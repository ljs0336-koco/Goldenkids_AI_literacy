import React from 'react';
import { evidenceSources } from '../../verificationData';

export default function SourceCheckScreen({ claim, selectedSourceIds, onToggleSource, onNext, onPrev }) {
  const hasEnoughSources = selectedSourceIds.length >= 2;

  return (
    <section className="card verification-screen" aria-labelledby="source-check-title">
      <span className="verification-kicker">② 출처·날짜 확인</span>
      <h2 id="source-check-title">어떤 자료 두 개를 비교해 볼까요?</h2>
      <div className="verification-focus-claim">
        <span>지금 확인하는 주장</span>
        <strong>{claim.text}</strong>
      </div>
      <p>기관 이름만 보지 말고 작성자, 게시 날짜, 실제 근거가 있는지 살펴보세요. 두 개 이상 선택할 수 있어요.</p>

      <div className="verification-source-grid">
        {evidenceSources.map(source => {
          const selected = selectedSourceIds.includes(source.id);
          return (
            <button
              key={source.id}
              type="button"
              className={`verification-source-card ${selected ? 'is-selected' : ''}`}
              onClick={() => onToggleSource(source.id)}
              aria-pressed={selected}
            >
              <div className="verification-source-header">
                <span aria-hidden="true">{source.icon}</span>
                <div>
                  <strong>{source.title}</strong>
                  <small>{source.publisher}</small>
                </div>
                <span className="verification-checkmark" aria-hidden="true">{selected ? '✓' : ''}</span>
              </div>
              <span className="verification-source-meta">{source.type} · {source.dateLabel}</span>
              <p>{source.excerpt}</p>
            </button>
          );
        })}
      </div>

      <div className="verification-selection-summary" aria-live="polite">
        선택한 자료 {selectedSourceIds.length}개 {hasEnoughSources ? '· 비교할 준비가 됐어요.' : '· 서로 다른 자료를 2개 이상 골라 보세요.'}
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 주장 목록</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!hasEnoughSources}>선택한 근거 비교하기 →</button>
      </div>
    </section>
  );
}
