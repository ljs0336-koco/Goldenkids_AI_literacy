import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function RoleModeSelectScreen({ onSelectMode }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokMain} 
          alt="AI 금쪽이" 
          style={{ width: '72px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-secondary)' }}>
          AI 금쪽이와 함께하는 AI 역할 선택소
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          상황에 맞는 최적의 AI 역할을 고르고, 미래 사회에서 인간과 AI가 공존하는 협업 방식을 탐구해요.
        </p>
      </div>

      {/* 안내 배너 */}
      <div 
        style={{ 
          backgroundColor: '#f8fafc', 
          border: '1.5px solid var(--color-border)', 
          borderRadius: 'var(--radius-md)', 
          padding: '16px 20px', 
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <img 
          src={geumjjokIdea} 
          alt="아이디어 금쪽이" 
          style={{ width: '56px', height: 'auto', flexShrink: 0 }} 
        />
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)', lineHeight: '1.6', fontWeight: '500' }}>
          💡 <strong>금쪽이의 안내:</strong> 같은 질문이라도 AI에게 어떤 역할(친구, 코치, 박사, 비판자)을 부여하느냐에 따라 응답이 완전히 달라져요. 상황에 맞는 똑똑한 AI 활용법을 알아보고, 미래의 일들을 공정하게 분담해 보세요!
        </p>
      </div>

      {/* 2대 활동 선택 카드 그리드 */}
      <div className="mode-grid">
        {/* 카드 1: 4색 AI 페르소나 매칭 */}
        <div 
          className="card interactive-card mode-card"
          onClick={() => onSelectMode('persona')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectMode('persona'); }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="mode-icon-circle" style={{ backgroundColor: '#ccfbf1', color: 'var(--color-primary-hover)' }}>
              🎭
            </div>
            <span className="mode-badge" style={{ backgroundColor: '#f0fdfa', color: 'var(--color-primary)' }}>
              상황별 AI 역할 탐구 · 약 10분
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={geumjjokIdea} 
                alt="페르소나 탐구 금쪽이" 
                style={{ width: '48px', height: 'auto' }} 
              />
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                4색 AI 페르소나 매칭
              </span>
            </div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', margin: '4px 0 10px 0', color: 'var(--color-text-main)' }}>
              나에게 맞는 AI 페르소나 매칭
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
              시험 고민, 포스터 아이디어, 친구 갈등 등 8가지 일상 상황에서 4색 AI 금쪽이의 응답을 실시간 비교하고 최적의 역할을 선택해요.
            </p>
          </div>

          <div className="flex justify-end items-center mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <span className="mode-btn-text" style={{ color: 'var(--color-primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-base)' }}>
              페르소나 매칭 시작하기 <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>

        {/* 카드 2: 미래 업무 3구역 분류소 */}
        <div 
          className="card interactive-card mode-card"
          onClick={() => onSelectMode('task')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectMode('task'); }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="mode-icon-circle" style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>
              🔀
            </div>
            <span className="mode-badge" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
              AI와 인간의 역할 분담 · 약 15분
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={geumjjokDoctor} 
                alt="업무 분류 금쪽이" 
                style={{ width: '48px', height: 'auto' }} 
              />
              <span style={{ fontSize: 'var(--font-size-sm)', color: '#4f46e5', fontWeight: 'bold' }}>
                미래 업무 3구역 분류소
              </span>
            </div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', margin: '4px 0 10px 0', color: 'var(--color-text-main)' }}>
              미래 업무 3구역 분류소
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
              12가지 학교와 사회의 일들을 [AI 주로 수행], [인간과 협력], [인간 최종 결정] 3개 구역으로 분류하고 인간 고유의 가치를 찾아봐요.
            </p>
          </div>

          <div className="flex justify-end items-center mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <span className="mode-btn-text" style={{ color: '#4f46e5', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-base)' }}>
              업무 분류 시작하기 <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
