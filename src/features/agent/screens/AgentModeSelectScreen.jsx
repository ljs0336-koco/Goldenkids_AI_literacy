import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';

export default function AgentModeSelectScreen({ onSelectMode }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokMain} 
          alt="AI 에이전트 금쪽이" 
          style={{ width: '72px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-secondary)' }}>
          AI 금쪽이와 함께하는 AI 에이전트 통제실
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          스스로 판단하고 외부 도구를 사용하는 자율 AI 에이전트를 안전하게 통제하는 사령관이 되어보세요.
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
          💡 <strong>에이전트란?</strong> 단순 챗봇을 넘어 스스로 계획을 세우고, 검색·메일 발송·결제 등 외부 도구를 실행하는 자율 AI입니다. 강력한 능력을 가진 만큼, 반드시 <strong>사람의 최종 승인과 비상 정지 장치(킬스위치)</strong>가 필요해요!
        </p>
      </div>

      {/* 2대 활동 선택 카드 그리드 */}
      <div className="mode-grid">
        {/* 카드 1: 에이전트 미션 실행소 */}
        <div 
          className="card interactive-card mode-card"
          onClick={() => onSelectMode('mission')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectMode('mission'); }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="mode-icon-circle" style={{ backgroundColor: '#ccfbf1', color: 'var(--color-primary-hover)' }}>
              🤖
            </div>
            <span className="mode-badge" style={{ backgroundColor: '#f0fdfa', color: 'var(--color-primary)' }}>
              도구 실행 & 인간 승인 · 약 10분
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={geumjjokIdea} 
                alt="미션 금쪽이" 
                style={{ width: '48px', height: 'auto' }} 
              />
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                에이전트 미션 실행소
              </span>
            </div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', margin: '4px 0 10px 0', color: 'var(--color-text-main)' }}>
              자율 에이전트의 도구 실행과 인간 승인
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
              초대장 발송, 자료 수집, 분실물 매칭 등 에이전트의 [생각-도구호출] 과정을 관찰하고 위험한 행동을 인간이 승인해요.
            </p>
          </div>

          <div className="flex justify-end items-center mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <span className="mode-btn-text" style={{ color: 'var(--color-primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-base)' }}>
              미션 실행 시작하기 <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>

        {/* 카드 2: 안전 가드레일 & 킬스위치 통제실 */}
        <div 
          className="card interactive-card mode-card"
          onClick={() => onSelectMode('control')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectMode('control'); }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="mode-icon-circle" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
              🚨
            </div>
            <span className="mode-badge" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
              가드레일 & 킬스위치 · 약 15분
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={geumjjokDoctor} 
                alt="안전 사령관 금쪽이" 
                style={{ width: '48px', height: 'auto' }} 
              />
              <span style={{ fontSize: 'var(--font-size-sm)', color: '#dc2626', fontWeight: 'bold' }}>
                안전 통제실 & 비상 정지
              </span>
            </div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', margin: '4px 0 10px 0', color: 'var(--color-text-main)' }}>
              가드레일 설정과 비상 킬스위치(Kill-Switch)
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
              4대 안전 가드레일을 구축하고, 에이전트가 오작동할 때 0.1초 만에 시스템을 차단하는 킬스위치 시뮬레이션을 체험해요.
            </p>
          </div>

          <div className="flex justify-end items-center mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <span className="mode-btn-text" style={{ color: '#dc2626', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-base)' }}>
              안전 통제 시작하기 <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
