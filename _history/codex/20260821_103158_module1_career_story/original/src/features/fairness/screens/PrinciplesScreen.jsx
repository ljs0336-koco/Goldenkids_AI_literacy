import React, { useState } from 'react';
import { principles } from '../fairnessData';
import PageTurnNav from '../components/PageTurnNav';

export default function PrinciplesScreen({ selectedPrinciples = [], setSelectedPrinciples, onComplete, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const principle = principles[pageIndex];
  const isSelected = selectedPrinciples.includes(principle);
  const isFull = selectedPrinciples.length >= 3 && !isSelected;
  const isExactThree = selectedPrinciples.length === 3;

  const toggle = () => {
    if (isFull) return;
    setSelectedPrinciples(current => current.includes(principle)
      ? current.filter(item => item !== principle)
      : [...current, principle]);
  };

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '0 0 8px' }}>지키고 싶은 원칙 3개를 골라요</h2>
        <p className="fair-one-line-help">원칙을 한 장씩 넘겨 보고, 가장 중요하다고 생각하는 세 장을 저장하세요.</p>
      </div>

      <button
        type="button"
        className={`fair-question-page ${isSelected ? 'is-selected' : ''}`}
        onClick={toggle}
        disabled={isFull}
        aria-pressed={isSelected}
        style={{ minHeight: '220px', opacity: isFull ? .6 : 1 }}
      >
        <span>운영 원칙 {pageIndex + 1}</span>
        <strong style={{ fontSize: '25px' }}>{principle}</strong>
        <small>{isSelected ? '선택했어요 · 다시 누르면 취소' : isFull ? '이미 세 개를 골랐어요' : '이 원칙 선택하기'}</small>
      </button>

      <PageTurnNav
        current={pageIndex}
        total={principles.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(principles.length - 1, index + 1))}
        prevLabel="이전 원칙"
        nextLabel="다음 원칙"
      />

      <p className="text-center" style={{ fontWeight: 800, color: isExactThree ? 'var(--color-primary-hover)' : 'var(--color-text-muted)' }}>
        내가 고른 원칙 {selectedPrinciples.length} / 3개
      </p>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onComplete} disabled={!isExactThree} style={{ minHeight: '52px' }}>
          {isExactThree ? '원칙 3개 저장하고 마치기 →' : '원칙을 3개 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
