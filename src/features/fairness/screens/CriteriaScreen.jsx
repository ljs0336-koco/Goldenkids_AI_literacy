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

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <span className="fair-eyebrow">같은 기록, 다른 기준</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>이 프로젝트에서 무엇을 중요하게 볼까요?</h2>
        <p className="fair-one-line-help">기준을 한 장씩 읽고 프로젝트의 목표에 가장 알맞다고 생각하는 한 장을 고르세요.</p>
      </div>

      <button
        type="button"
        className={`fair-question-page ${isSelected ? 'is-selected' : ''}`}
        onClick={() => setWeights(preset.weights)}
        aria-pressed={isSelected}
        style={{ minHeight: '280px' }}
      >
        <span>기준 {pageIndex + 1}</span>
        <strong style={{ fontSize: '27px' }}>{preset.name}</strong>
        <small style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>{preset.desc}</small>
        <div className="fair-focus-tags" aria-label="이 기준이 중요하게 보는 것">
          {preset.focus.map(item => <b key={item}>{item}</b>)}
        </div>
        <p className="fair-criterion-tradeoff"><strong>함께 생각할 점</strong>{preset.tradeoff}</p>
        <em>{isSelected ? '우리 팀의 기준으로 선택했어요' : '이 기준 선택하기'}</em>
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
