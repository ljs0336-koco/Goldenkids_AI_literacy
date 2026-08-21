import React, { useState } from 'react';
import { projectTeamCandidates } from '../fairnessData';
import { teamSpeakerPrompt } from '../fairnessLearningData';
import MiniSpeakerNote from '../components/MiniSpeakerNote';
import PageTurnNav from '../components/PageTurnNav';

const metrics = [
  { key: 'problemDiscovery', label: '문제 발견·기획', color: 'var(--color-blue)' },
  { key: 'digitalMaking', label: '디지털 제작', color: 'var(--color-orange)' },
  { key: 'communicationCollaboration', label: '의사소통·협력', color: 'var(--color-green)' },
  { key: 'presentation', label: '발표·표현', color: 'var(--color-purple)' }
];

export default function CandidateScreen({ hasViewedAll, onViewAll, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const candidate = projectTeamCandidates[pageIndex];
  const reachedLast = hasViewedAll || pageIndex === projectTeamCandidates.length - 1;

  const goNextCandidate = () => {
    const nextIndex = Math.min(projectTeamCandidates.length - 1, pageIndex + 1);
    setPageIndex(nextIndex);
    if (nextIndex === projectTeamCandidates.length - 1) onViewAll?.();
  };

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '0 0 8px' }}>지원자를 한 명씩 만나 봐요</h2>
        <p className="fair-one-line-help">점수 하나만 보지 말고 강점과 보완할 점까지 읽어 보세요.</p>
      </div>

      <MiniSpeakerNote prompt={teamSpeakerPrompt} />

      <article className="fair-record-page">
        <div className="flex justify-between items-center" style={{ gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <span className="fair-eyebrow">지원자 {pageIndex + 1}</span>
            <h3 style={{ margin: '3px 0' }}>{candidate.name}</h3>
          </div>
          <span style={{ padding: '6px 10px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-soft)', fontWeight: 700 }}>
            이전 대회 참여 {candidate.previousParticipationCount}회
          </span>
        </div>

        <div className="flex flex-col gap-3" style={{ marginTop: '18px' }}>
          {metrics.map(metric => (
            <div key={metric.key}>
              <div className="flex justify-between"><span>{metric.label}</span><strong>{candidate[metric.key]}점</strong></div>
              <div style={{ height: '7px', marginTop: '4px', borderRadius: '4px', background: 'var(--color-surface-muted)', overflow: 'hidden' }}>
                <div style={{ width: `${candidate[metric.key]}%`, height: '100%', background: metric.color }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ margin: '0 0 4px', color: 'var(--color-primary-hover)' }}><strong>주요 강점</strong> · {candidate.keyStrength}</p>
          <p style={{ margin: 0 }}><strong>더 살펴볼 점</strong> · {candidate.weakness}</p>
        </div>
      </article>

      <PageTurnNav
        current={pageIndex}
        total={projectTeamCandidates.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={goNextCandidate}
        prevLabel="이전 지원자"
        nextLabel="다음 지원자"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 처음으로</button>
        <button className="btn-primary" onClick={onNext} disabled={!reachedLast} style={{ minHeight: '52px' }}>
          {reachedLast ? '팀 구성 기준 정하기 →' : '지원자를 끝까지 만나 보세요'}
        </button>
      </div>
    </div>
  );
}
