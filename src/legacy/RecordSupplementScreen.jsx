import React, { useState } from 'react';
import { dataSets } from '../fairnessData';

export default function RecordSupplementScreen({ 
  viewedCardIds = [], 
  onCardViewed, 
  onNext, 
  onPrev 
}) {
  const cards = dataSets.supplemented.supplementCards;
  const [openCardId, setOpenCardId] = useState(null);

  const handleCardClick = (cardId) => {
    // Toggle accordion state
    setOpenCardId(prev => prev === cardId ? null : cardId);
    // Mark as viewed permanently
    if (onCardViewed) {
      onCardViewed(cardId);
    }
  };

  const isAllConfirmed = cards.every(c => viewedCardIds.includes(c.id));

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          AI가 보지 못한 기록을 더해 볼까요?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', lineHeight: '1.5' }}>
          지난 3년간 <strong>같은 기간에 지원한 학생 36명 전체의 기록</strong>을 보충해요.<br />
          카드를 눌러 각 기록이 왜 필요한지 확인해 보세요. (3가지 모두 확인 시 학습 가능)
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {cards.map((card) => {
          const isOpen = openCardId === card.id;
          const isViewed = viewedCardIds.includes(card.id);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="card interactive-card"
              style={{
                padding: '20px',
                border: isOpen ? '2px solid var(--color-primary)' : isViewed ? '1.5px solid #99f6e4' : '1.5px solid var(--color-border)',
                backgroundColor: isOpen ? '#f0fdfa' : isViewed ? '#fafffd' : 'white',
                marginBottom: 0
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(card.id); }}
              aria-expanded={isOpen}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '28px' }}>{card.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', margin: 0, color: 'var(--color-text-main)' }}>
                      {card.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    style={{ 
                      fontSize: 'var(--font-size-sm)', 
                      fontWeight: 'bold',
                      padding: '4px 10px', 
                      borderRadius: '12px',
                      backgroundColor: isViewed ? '#ccfbf1' : '#f1f5f9',
                      color: isViewed ? 'var(--color-primary-hover)' : 'var(--color-text-muted)'
                    }}
                  >
                    {isViewed ? '✅ 확인 완료' : '👆 눌러서 확인'}
                  </span>
                </div>
              </div>

              {/* Expanded reason explanation */}
              {isOpen && (
                <div 
                  className="mt-3 pt-3" 
                  style={{ 
                    borderTop: '1px dashed #99f6e4', 
                    color: 'var(--color-text-main)', 
                    fontSize: 'var(--font-size-sm)', 
                    lineHeight: '1.6' 
                  }}
                >
                  💡 <strong>왜 필요할까요?</strong> {card.reason}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
        🔒 <strong>개인정보 보호 안내:</strong> 학생이 제공에 동의하지 않은 개인정보는 AI에게 보여 주지 않아요.
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!isAllConfirmed}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {isAllConfirmed ? "🔄 기록을 더해 다시 학습시키기" : `카드를 모두 확인해 주세요 (${viewedCardIds.length}/3)`}
        </button>
      </div>
    </div>
  );
}
