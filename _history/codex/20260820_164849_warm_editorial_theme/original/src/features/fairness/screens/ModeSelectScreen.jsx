import React from 'react';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';

export default function ModeSelectScreen({ onSelectMode }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '8px' }}>
          AI 금쪽이와 함께하는 공정한 AI 실험실
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          AI 금쪽이에게 어떤 데이터를 보여 주고 어떤 판단 기준을 적용하느냐에 따라 결과가 어떻게 달라지는지 살펴봐요.
        </p>
      </div>

      {/* 금쪽이 캐릭터가 안내하는 배너 */}
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
          💡 <strong>금쪽이의 안내:</strong> 데이터의 범위를 바꾸어 보고, 공정한 기준을 세워 AI 추천을 비교해 보세요. 마지막에는 항상 사람이 결과를 확인해야 해요!
        </p>
      </div>

      <div className="mode-grid">
        {/* 첫 번째 활동: AI 금쪽이 맞춤 활동 추천 */}
        <div 
          className="card interactive-card mode-card"
          onClick={() => onSelectMode('growth')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectMode('growth'); }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="mode-icon-circle" style={{ backgroundColor: '#ccfbf1', color: 'var(--color-primary-hover)' }}>
              🌱
            </div>
            <span className="mode-badge" style={{ backgroundColor: '#f0fdfa', color: 'var(--color-primary)' }}>
              학습 데이터 탐구 · 약 10분
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={geumjjokDoctor} 
                alt="활동 기록을 살펴보는 AI 금쪽이" 
                style={{ width: '48px', height: 'auto' }} 
              />
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                맞춤 활동 추천
              </span>
            </div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', margin: '4px 0 10px 0', color: 'var(--color-text-main)' }}>
              AI 금쪽이의 활동 추천, 그대로 따라도 될까?
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
              온라인 기록만 볼 때와 빠진 오프라인 활동·관심 기록을 함께 볼 때, AI 금쪽이의 추천이 어떻게 달라지는지 비교해요.
            </p>
          </div>

          <div className="flex justify-end items-center mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <span className="mode-btn-text" style={{ color: 'var(--color-primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-base)' }}>
              활동 추천 실험 시작하기 <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>

        {/* 두 번째 활동: 프로젝트 대표팀 구성 */}
        <div 
          className="card interactive-card mode-card"
          onClick={() => onSelectMode('team')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectMode('team'); }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="mode-icon-circle" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
              👥
            </div>
            <span className="mode-badge" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
              AI 공정성 탐구 · 약 15분
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={geumjjokMain} 
                alt="학생들과 함께 있는 AI 금쪽이" 
                style={{ width: '48px', height: 'auto' }} 
              />
              <span style={{ fontSize: 'var(--font-size-sm)', color: '#9333ea', fontWeight: 'bold' }}>
                프로젝트 대표팀 구성
              </span>
            </div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', margin: '4px 0 10px 0', color: 'var(--color-text-main)' }}>
              우리 학교 프로젝트 대표팀을 만들어라!
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
              지원자 8명의 서로 다른 강점을 살펴보고, 프로젝트 대회에 참가할 대표팀 4명을 공정하게 구성해요.
            </p>
          </div>

          <div className="flex justify-end items-center mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <span className="mode-btn-text" style={{ color: '#9333ea', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-base)' }}>
              대표팀 구성 시작하기 <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .mode-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .mode-card {
          display: flex;
          flex-direction: column;
          padding: 28px;
          border-radius: var(--radius-lg);
          background-color: white;
          text-align: left;
        }
        .mode-icon-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }
        .mode-badge {
          font-size: var(--font-size-sm);
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid currentColor;
        }
        @media (max-width: 720px) {
          .mode-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
