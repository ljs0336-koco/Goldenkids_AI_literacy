import React, { useState } from 'react';
import { projectTeamPresets } from '../fairnessData';
import PageTurnNav from '../components/PageTurnNav';

function matchesWeights(preset, weights) {
  if (!weights) return false;
  return Object.keys(preset.weights).every(key => preset.weights[key] === weights[key]);
}

export default function CriteriaScreen({ weights, setWeights, onCalculate, onPrev }) {
  const selectedIndex = Math.max(0, projectTeamPresets.findIndex(preset => matchesWeights(preset, weights)));
  const [pageIndex, setPageIndex] = useState(selectedIndex);
  const preset = projectTeamPresets[pageIndex];
  const isSelected = matchesWeights(preset, weights);
  const weightItems = [
    ['기획', preset.weights.problemDiscovery],
    ['제작', preset.weights.digitalMaking],
    ['협업', preset.weights.communicationCollaboration],
    ['발표', preset.weights.presentation],
    ['참여 기회', preset.weights.opportunity]
  ];

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '0 0 8px' }}>팀을 보는 기준을 한 장씩 비교해요</h2>
        <p className="fair-one-line-help">정답은 없어요. 대회의 목표에 가장 잘 맞는 기준 한 장을 골라 보세요.</p>
      </div>

      <button
        type="button"
        className={`fair-question-page ${isSelected ? 'is-selected' : ''}`}
        onClick={() => setWeights(preset.weights)}
        aria-pressed={isSelected}
        style={{ minHeight: '250px' }}
      >
        <span>기준 {pageIndex + 1}</span>
        <strong style={{ fontSize: '27px' }}>{preset.name}</strong>
        <small style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>{preset.desc}</small>
        <div className="flex gap-2" style={{ marginTop: '14px', flexWrap: 'wrap' }}>
          {weightItems.filter(([, value]) => value > 0).map(([label, value]) => (
            <span key={label} style={{ padding: '5px 9px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-soft)', color: 'var(--color-text-main)' }}>
              {label} {value}%
            </span>
          ))}
        </div>
        <small>{isSelected ? '이 기준을 선택했어요' : '이 기준 선택하기'}</small>
      </button>

      <PageTurnNav
        current={pageIndex}
        total={projectTeamPresets.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(projectTeamPresets.length - 1, index + 1))}
        prevLabel="이전 기준"
        nextLabel="다음 기준"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onCalculate} disabled={!weights} style={{ minHeight: '52px' }}>
          {weights ? '이 기준으로 AI 추천 보기 →' : '마음에 드는 기준을 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
