import React from 'react';
import { agentMissions } from '../../agentData';

export default function MissionSelectScreen({ selectedMissionId, onSelectMission, onPrev }) {
  return (
    <div className="agent-content-width">
      <div className="text-center mb-6">
        <h2 className="agent-page-title">사람의 판단이 필요한 미션을 골라주세요 🤖</h2>
        <p className="agent-page-lead">세 사례는 모두 수업용 가상 상황입니다. 에이전트의 실행 요청을 증거와 조건으로 판단해 보세요.</p>
      </div>

      <div className="agent-mission-grid">
        {agentMissions.map(mission => {
          const isSelected = mission.id === selectedMissionId;
          return (
            <button
              key={mission.id}
              type="button"
              onClick={() => onSelectMission(mission.id)}
              className="card interactive-card agent-card-button agent-mission-card"
              style={{
                border: isSelected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                backgroundColor: isSelected ? '#f0fdfa' : 'white'
              }}
              aria-pressed={isSelected}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="agent-category-chip">{mission.category}</span>
                <span className="agent-selection-label" style={{ color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                  {isSelected ? '현재 선택 ✅' : '선택하기'}
                </span>
              </div>
              <div className="agent-mission-icon" aria-hidden="true">{mission.icon}</div>
              <h3 className="agent-mission-title">{mission.title}</h3>
              <p className="agent-card-description">{mission.goal}</p>
              <div className="agent-card-action" style={{ color: 'var(--color-primary)' }}>
                실행 과정 살펴보기 <span aria-hidden="true">→</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 활동 고르기</button>
        <span />
      </div>
    </div>
  );
}
