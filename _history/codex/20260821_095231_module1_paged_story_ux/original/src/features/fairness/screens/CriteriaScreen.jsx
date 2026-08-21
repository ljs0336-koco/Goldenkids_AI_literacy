import React from 'react';
import { projectTeamPresets } from '../fairnessData';

export default function CriteriaScreen({ weights, setWeights, onCalculate, onPrev }) {
  const handleSelectPreset = (preset) => {
    setWeights(preset.weights);
  };

  const getActivePresetId = () => {
    if (!weights) return null;
    const match = projectTeamPresets.find(p => 
      p.weights.problemDiscovery === weights.problemDiscovery &&
      p.weights.digitalMaking === weights.digitalMaking &&
      p.weights.communicationCollaboration === weights.communicationCollaboration &&
      p.weights.presentation === weights.presentation &&
      p.weights.opportunity === weights.opportunity
    );
    return match ? match.id : null;
  };

  const activePresetId = getActivePresetId();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          프로젝트 대표팀 4명을 구성할 기준을 정해요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          어떤 역량과 가치를 가장 중요하게 볼 것인지 팀 구성 기준 카드를 선택해 주세요.
        </p>
      </div>

      {/* 안내 배너 */}
      <div 
        style={{
          backgroundColor: '#edf0ed',
          border: '1.5px solid #c7d2cc',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '24px',
          color: '#405e55',
          fontSize: 'var(--font-size-sm)',
          lineHeight: '1.6'
        }}
      >
        💡 <strong>생각해 보기:</strong> 정답은 하나가 아니에요. 우리 학교 프로젝트 대회의 목표에 맞는 기준을 정하고, 그 이유를 친구들에게 설명할 수 있는 기준을 골라보세요.
      </div>

      {/* 4대 기준 카드 목록 */}
      <div className="flex flex-col gap-3 mb-6">
        {projectTeamPresets.map((preset) => {
          const isSelected = activePresetId === preset.id;

          return (
            <div
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="card interactive-card"
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                backgroundColor: isSelected ? '#edf2ee' : 'white',
                marginBottom: 0,
                cursor: 'pointer'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectPreset(preset); }}
              aria-pressed={isSelected}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', margin: 0, color: isSelected ? 'var(--color-primary-hover)' : 'var(--color-text-main)' }}>
                  {preset.name}
                </h3>
                <span 
                  style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? '#dce9e3' : 'var(--color-surface-soft)',
                    color: isSelected ? 'var(--color-primary-hover)' : 'var(--color-text-muted)'
                  }}
                >
                  {isSelected ? '✅ 선택됨' : '선택하기'}
                </span>
              </div>

              <p style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                {preset.desc}
              </p>

              {/* 기준별 반영 가중치 요약 */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '14px' }}>
                <span style={{ backgroundColor: '#e8edef', color: '#405e69', padding: '3px 8px', borderRadius: '6px' }}>
                  기획 {preset.weights.problemDiscovery}%
                </span>
                <span style={{ backgroundColor: '#f2e9e2', color: '#87583e', padding: '3px 8px', borderRadius: '6px' }}>
                  제작 {preset.weights.digitalMaking}%
                </span>
                <span style={{ backgroundColor: '#e9efe8', color: '#58725e', padding: '3px 8px', borderRadius: '6px' }}>
                  협업 {preset.weights.communicationCollaboration}%
                </span>
                <span style={{ backgroundColor: '#ece9ef', color: '#655d70', padding: '3px 8px', borderRadius: '6px' }}>
                  발표 {preset.weights.presentation}%
                </span>
                {preset.weights.opportunity > 0 && (
                  <span style={{ backgroundColor: '#f4eddf', color: '#806235', padding: '3px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    🌱 참여 기회 {preset.weights.opportunity}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onCalculate}
          disabled={!weights}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {weights ? "🤖 대표팀 추천 결과 계산하기 →" : "기준 카드를 먼저 선택해 주세요"}
        </button>
      </div>
    </div>
  );
}
