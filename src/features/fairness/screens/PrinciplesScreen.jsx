import React, { useState } from 'react';
import { principles } from '../fairnessData';
import PageTurnNav from '../components/PageTurnNav';

export default function PrinciplesScreen({ selectedPrinciples = [], setSelectedPrinciples, onComplete, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const principle = principles[pageIndex];
  const isSelected = selectedPrinciples.includes(principle);
  const isFull = selectedPrinciples.length >= 2 && !isSelected;
  const isReady = selectedPrinciples.length === 2;

  const toggle = () => {
    if (isFull) return;
    setSelectedPrinciples(current => current.includes(principle)
      ? current.filter(item => item !== principle)
      : [...current, principle]);
  };

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <span className="fair-eyebrow">다음 선택을 위한 약속</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>꼭 지키고 싶은 약속 두 가지를 골라요</h2>
        <p className="fair-one-line-help">세 장을 차례로 읽고 다음 프로젝트 팀을 구성할 때 반드시 지킬 두 장을 선택하세요.</p>
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
        <small>{isSelected ? '선택했어요 · 다시 누르면 취소' : isFull ? '이미 두 개를 골랐어요' : '이 약속 선택하기'}</small>
      </button>

      <PageTurnNav
        current={pageIndex}
        total={principles.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(principles.length - 1, index + 1))}
        prevLabel="이전 원칙"
        nextLabel="다음 원칙"
      />

      <p className="text-center" style={{ fontWeight: 800, color: isReady ? 'var(--color-primary-hover)' : 'var(--color-text-muted)' }}>
        내가 고른 약속 {selectedPrinciples.length} / 2개
      </p>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onComplete} disabled={!isReady} style={{ minHeight: '52px' }}>
          {isReady ? '약속 두 가지 저장하고 결과 보기 →' : '약속을 두 가지 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
