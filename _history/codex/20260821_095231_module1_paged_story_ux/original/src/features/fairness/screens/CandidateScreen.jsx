import React, { useState } from 'react';
import { projectTeamCandidates } from '../fairnessData';
import SpeakerBridgeCard from '../components/SpeakerBridgeCard';
import { teamSpeakerPrompt } from '../fairnessLearningData';

export default function CandidateScreen({ hasViewedAll, onViewAll, speakerPath, onSpeakerPath, onNext, onPrev }) {
  const [showAll, setShowAll] = useState(hasViewedAll || false);

  const displayedCandidates = showAll ? projectTeamCandidates : projectTeamCandidates.slice(0, 4);

  const handleShowMore = () => {
    setShowAll(true);
    if (onViewAll) {
      onViewAll();
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          프로젝트 대표팀 지원자 8명의 기록을 살펴봐요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          우리 학교 프로젝트 대회를 위해 지원한 친구들의 다양한 강점과 역량을 확인해 보세요.
        </p>
      </div>

      {/* 가상 데이터 안내 */}
      <div className="p-3 mb-6 text-center" style={{ backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        ℹ️ <strong>안내:</strong> 화면의 학생 이름과 기록은 개인정보가 아닌 프로젝트 팀 구성을 위한 교육용 가상 데이터입니다.
      </div>

      <SpeakerBridgeCard prompt={teamSpeakerPrompt} value={speakerPath} onChange={onSpeakerPath} />

      <div className="candidate-grid mb-6">
        {displayedCandidates.map((candidate) => (
          <div 
            key={candidate.id} 
            className="card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              marginBottom: 0,
              border: '1.5px solid var(--color-border)'
            }}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold' }}>
                  👤 {candidate.name}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '12px', backgroundColor: '#efede5', color: '#56605b' }}>
                  🎟️ 이전 대회 참여 경험: {candidate.previousParticipationCount}회
                </span>
              </div>

              {/* 4대 역량 점수 막대 */}
              <div className="flex flex-col gap-2 mb-4" style={{ fontSize: 'var(--font-size-sm)' }}>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>🔎 문제 발견·기획</span>
                    <strong>{candidate.problemDiscovery}점</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${candidate.problemDiscovery}%`, height: '100%', backgroundColor: 'var(--color-blue)' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>💻 디지털 제작</span>
                    <strong>{candidate.digitalMaking}점</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${candidate.digitalMaking}%`, height: '100%', backgroundColor: 'var(--color-orange)' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>🤝 의사소통·협력</span>
                    <strong>{candidate.communicationCollaboration}점</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${candidate.communicationCollaboration}%`, height: '100%', backgroundColor: 'var(--color-green)' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>🎤 발표·표현</span>
                    <strong>{candidate.presentation}점</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${candidate.presentation}%`, height: '100%', backgroundColor: 'var(--color-purple)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 주요 강점 및 보완할 점 */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '10px', fontSize: '15px' }}>
              <div style={{ color: 'var(--color-primary-hover)', fontWeight: 'bold' }}>주요 강점: {candidate.keyStrength}</div>
              <div style={{ color: 'var(--color-text-muted)' }}>보완할 점: {candidate.weakness}</div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="text-center mb-6">
          <button 
            type="button" 
            className="btn-outline" 
            onClick={handleShowMore}
            style={{ padding: '12px 24px', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}
          >
            👥 다른 친구 4명 더 보기 (총 8명)
          </button>
        </div>
      )}

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 처음으로
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!showAll || !speakerPath}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {!speakerPath
            ? '대화 방법을 먼저 골라 주세요'
            : showAll
              ? '팀 구성 기준 정하러 가기 →'
              : '지원자 8명을 모두 확인해 주세요'}
        </button>
      </div>

      <style>{`
        .candidate-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
      `}</style>
    </div>
  );
}
