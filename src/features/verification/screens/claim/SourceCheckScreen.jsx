import React, { useState } from 'react';
import { evidenceSources } from '../../verificationData';
import VerificationPageNav from '../../components/VerificationPageNav';

function getSourceSet(claim) {
  return claim.sourceOptionIds
    .map(id => evidenceSources.find(source => source.id === id))
    .filter(Boolean);
}

export default function SourceCheckScreen({ claim, selectedSourceIds, onToggleSource, onNext, onPrev }) {
  const sources = getSourceSet(claim);
  const [pageIndex, setPageIndex] = useState(0);
  const [openedIds, setOpenedIds] = useState(() => new Set(selectedSourceIds.filter(id => sources.some(source => source.id === id))));
  const source = sources[pageIndex];
  const opened = openedIds.has(source.id);
  const selected = selectedSourceIds.includes(source.id);
  const allOpened = sources.every(item => openedIds.has(item.id));
  const hasEnoughSources = selectedSourceIds.length >= 2;

  const openSource = () => setOpenedIds(current => new Set([...current, source.id]));

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="source-check-title">
      <span className="verification-kicker">자료 봉투 열기</span>
      <h2 id="source-check-title">어떤 자료가 이 문장을 확인하는 데 도움이 될까요?</h2>
      <div className="verification-focus-claim"><span>지금 확인하는 문장</span><strong>{claim.text}</strong></div>
      <p>자료를 한 장씩 열어 작성자, 날짜, 실제 내용을 확인한 뒤 비교할 자료로 남길지 정하세요.</p>

      <article className={`verification-source-envelope ${opened ? 'is-open' : ''}`}>
        {!opened ? (
          <button type="button" onClick={openSource} className="verification-envelope-closed">
            <span aria-hidden="true">✉️</span>
            <small>자료 {pageIndex + 1}</small>
            <strong>{source.title}</strong>
            <em>봉투 열어 보기</em>
          </button>
        ) : (
          <>
            <header>
              <span aria-hidden="true">{source.icon}</span>
              <div><strong>{source.title}</strong><small>{source.publisher}</small></div>
            </header>
            <p className="verification-source-meta">{source.type} · {source.dateLabel}</p>
            <blockquote>{source.excerpt}</blockquote>
            <button type="button" className={selected ? 'btn-outline' : 'btn-primary'} onClick={() => onToggleSource(source.id)}>
              {selected ? '비교할 자료에서 빼기' : '이 자료를 비교에 포함하기'}
            </button>
          </>
        )}
      </article>

      <VerificationPageNav
        current={pageIndex}
        total={sources.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(sources.length - 1, index + 1))}
        prevLabel="이전 자료"
        nextLabel="다음 자료"
        disableNext={!opened}
      />

      <div className="verification-selection-summary" aria-live="polite">
        자료 {openedIds.size}/{sources.length}개 열어 봄 · 비교할 자료 {selectedSourceIds.length}개 선택
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 문장 다시 고르기</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!allOpened || !hasEnoughSources}>
          {allOpened && hasEnoughSources ? '선택한 자료 차례로 비교하기 →' : '자료를 모두 열고 두 개 이상 남겨 주세요'}
        </button>
      </div>
    </section>
  );
}
