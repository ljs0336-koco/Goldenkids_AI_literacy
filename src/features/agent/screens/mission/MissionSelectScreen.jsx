import React from 'react';
import { agentMissions } from '../../agentData';

export default function MissionSelectScreen({ selectedMissionId, onSelectMission, onPrev }) {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px' }}>
          자율 AI 에이전트 미션을 골라주세요 🤖
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          에이전트가 어떤 문제를 해결하고 도구를 실행할지 선택해 보세요.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {agentMissions.map(m => {
          const isSelected = m.id === selectedMissionId;

          return (
            <div
              key={m.id}
              onClick={() => onSelectMission(m.id)}
              className="card interactive-card"
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                backgroundColor: isSelected ? '#f0fdfa' : 'white',
                marginBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectMission(m.id); }}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#475569' }}>
                    {m.category}
                  </span>
                  <span style={{ fontSize: '11px', color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: isSelected ? 'bold' : 'normal' }}>
                    {isSelected ? '선택됨 ✅' : '선택하기'}
                  </span>
                </div>

                <div style={{ fontSize: '36px', margin: '8px 0', textAlign: 'center' }}>
                  {m.icon}
                </div>

                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', margin: '0 0 8px 0', textAlign: 'center' }}>
                  {m.title}
                </h3>

                <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: 0 }}>
                  {m.goal}
                </p>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', textAlign: 'right', fontSize: '12px', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                에이전트 실행 과정 보기 →
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 처음으로
        </button>
        <div></div>
      </div>
    </div>
  );
}
