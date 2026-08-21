import React from 'react';
import { principles } from '../fairnessData';

export default function PrinciplesScreen({ selectedPrinciples = [], setSelectedPrinciples, onComplete, onPrev }) {
  const togglePrinciple = (p) => {
    setSelectedPrinciples(prev => {
      const current = prev || [];
      if (current.includes(p)) {
        return current.filter(item => item !== p);
      } else {
        if (current.length >= 3) {
          // If already 3 selected, don't allow 4th without unselecting
          return current;
        }
        return [...current, p];
      }
    });
  };

  const isExactThree = selectedPrinciples && selectedPrinciples.length === 3;

  return (
    <div className="card" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          가장 중요하다고 생각하는 원칙 3개를 골라요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          공정한 AI 시스템을 운영하기 위해 꼭 지켜야 할 원칙을 <strong>정확히 3개</strong> 선택해 주세요.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {principles.map((p, idx) => {
          const isSelected = selectedPrinciples.includes(p);
          const isFull = selectedPrinciples.length >= 3 && !isSelected;

          return (
            <div
              key={idx}
              onClick={() => togglePrinciple(p)}
              className="card interactive-card"
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                backgroundColor: isSelected ? '#f0fdfa' : isFull ? '#f8fafc' : 'white',
                opacity: isFull ? 0.7 : 1,
                cursor: isFull ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 0
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') togglePrinciple(p); }}
              aria-pressed={isSelected}
            >
              <span style={{ fontSize: 'var(--font-size-base)', fontWeight: isSelected ? 'bold' : '500', color: isSelected ? 'var(--color-primary-hover)' : 'var(--color-text-main)' }}>
                {p}
              </span>
              <span 
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'bold',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? '#ccfbf1' : '#f1f5f9',
                  color: isSelected ? 'var(--color-primary-hover)' : 'var(--color-text-muted)'
                }}
              >
                {isSelected ? '✅ 선택됨' : '선택하기'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-center mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: isExactThree ? 'var(--color-primary)' : 'var(--color-warning)' }}>
        선택 현황: {selectedPrinciples.length} / 3개
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onComplete}
          disabled={!isExactThree}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {isExactThree ? "🎉 원칙 3개 저장하고 미션 완료하기" : `원칙을 3개 골라주세요 (${selectedPrinciples.length}/3)`}
        </button>
      </div>
    </div>
  );
}
