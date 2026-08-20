import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';

const activities = [
  {
    id: 'mission',
    icon: '🤖',
    eyebrow: '목표·도구·인간 확인',
    badge: '판단 미션 · 약 10분',
    title: '에이전트의 실행 요청, 승인해도 될까?',
    description: '초대장 발송, 자료 구매, 보관함 열기 요청에서 근거를 확인하고 승인 또는 보류를 결정해요.',
    image: geumjjokIdea,
    imageAlt: '실행 계획을 살펴보는 금쪽이',
    accent: 'var(--color-primary)',
    pale: '#f0fdfa'
  },
  {
    id: 'control',
    icon: '🚨',
    eyebrow: '권한·한도·중단·복구',
    badge: '안전 운영 실험 · 약 15분',
    title: '이상 행동을 어디서 멈추고 어떻게 복구할까?',
    description: '네 가지 통제 층을 설정하고 중복 결제 위험을 중단한 뒤, 권한 회수와 결과 확인까지 연습해요.',
    image: geumjjokDoctor,
    imageAlt: '안전 설정을 점검하는 금쪽이',
    accent: '#dc2626',
    pale: '#fef2f2'
  }
];

export default function AgentModeSelectScreen({ onSelectMode }) {
  return (
    <div className="agent-page-narrow">
      <div className="text-center mb-6">
        <img src={geumjjokMain} alt="AI 에이전트 금쪽이" className="agent-hero-character" />
        <h2 className="agent-page-title">AI 금쪽이와 함께하는 AI 에이전트 통제실</h2>
        <p className="agent-page-lead">대답만 받는 데서 한 걸음 더 나아가, AI가 도구를 쓰기 전과 후에 사람이 무엇을 확인해야 하는지 실험해요.</p>
      </div>

      <aside className="agent-concept-note" aria-label="AI 에이전트 개념 설명">
        <img src={geumjjokIdea} alt="" aria-hidden="true" />
        <p>
          <strong>AI 에이전트란?</strong> 목표를 받아 다음 행동을 정하고, 허용된 도구를 사용해 여러 단계를 수행하는 시스템이에요.
          자율성의 범위는 시스템마다 다르며, 영향이 큰 실행일수록 권한 제한·사람 확인·기록·복구 절차가 중요합니다.
        </p>
      </aside>

      <div className="mode-grid">
        {activities.map(activity => (
          <button
            key={activity.id}
            type="button"
            className="card interactive-card mode-card agent-card-button"
            onClick={() => onSelectMode(activity.id)}
            aria-label={`${activity.title} 시작하기`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="mode-icon-circle" style={{ backgroundColor: activity.pale, color: activity.accent }} aria-hidden="true">
                {activity.icon}
              </span>
              <span className="mode-badge" style={{ backgroundColor: activity.pale, color: activity.accent }}>
                {activity.badge}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="flex items-center gap-3 mb-2">
                <img src={activity.image} alt={activity.imageAlt} className="agent-card-character" />
                <span className="agent-card-eyebrow" style={{ color: activity.accent }}>{activity.eyebrow}</span>
              </div>
              <h3 className="agent-card-title">{activity.title}</h3>
              <p className="agent-card-description">{activity.description}</p>
            </div>
            <div className="agent-card-action" style={{ color: activity.accent }}>
              활동 시작하기 <span aria-hidden="true">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
