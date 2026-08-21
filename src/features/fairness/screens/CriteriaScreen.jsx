import React from 'react';
import { projectTeamPresets } from '../fairnessData';
import FairChoiceFork from '../components/FairChoiceFork';

function matchesWeights(preset, weights) {
  if (!weights) return false;
  return Object.keys(preset.weights).every(key => preset.weights[key] === weights[key]);
}

export default function CriteriaScreen({ weights, setWeights, onCalculate, onPrev }) {
  const visiblePresets = projectTeamPresets.slice(0, 3);
  const selectedPreset = visiblePresets.find(preset => matchesWeights(preset, weights));
  const choices = visiblePresets.map(preset => ({
    id: preset.id,
    title: preset.name,
    note: preset.desc,
    result: `${preset.focus.join(' · ')}을 중요하게 보는 기준이에요.`
  }));

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <span className="fair-eyebrow">같은 기록, 다른 기준</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>이 프로젝트에서 무엇을 중요하게 볼까요?</h2>
        <p className="fair-one-line-help">서로 다른 두 기준을 바로 비교한 뒤, 프로젝트 목표에 더 맞는 쪽을 고르세요.</p>
      </div>

      <FairChoiceFork
        options={choices}
        selectedId={selectedPreset?.id || ''}
        onSelect={id => setWeights(visiblePresets.find(preset => preset.id === id)?.weights)}
        prompt="A는 현재 수행을, B는 서로 다른 역할의 균형을 더 중요하게 봐요."
        moreLabel="여러 조건을 함께 보고 싶다면?"
        resultLabel="우리 팀의 기준"
      />

      <section className={`fair-choice-detail ${selectedPreset ? '' : 'is-empty'}`} role="status">
        {selectedPreset ? (
          <>
            <strong>이 기준으로 결과를 다시 계산해요</strong>
            <div className="fair-focus-tags" aria-label="이 기준이 중요하게 보는 것">
              {selectedPreset.focus.map(item => <b key={item}>{item}</b>)}
            </div>
            <p className="fair-criterion-tradeoff"><strong>함께 생각할 점</strong>{selectedPreset.tradeoff}</p>
          </>
        ) : (
          <p>A 또는 B를 누르면 이 기준이 중요하게 보는 내용이 여기에 나타나요.</p>
        )}
      </section>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onCalculate} disabled={!selectedPreset} style={{ minHeight: '52px' }}>
          {selectedPreset ? '이 기준으로 달라진 팀 바로 보기 →' : 'A 또는 B를 먼저 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
