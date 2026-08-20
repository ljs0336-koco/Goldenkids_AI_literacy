import React from 'react';
import { projectTeamCandidates, projectTeamPresets } from '../fairnessData';
import { calculateTeamCandidateScore, evaluateTeamCandidates } from '../fairnessEngine';
import geumjjokTouched from '../../../assets/geumjjok/금쪽이_표정_감동.png';

export default function AppealResultScreen({ criteriaWeights, onNext, onPrev }) {
  const activeWeights = criteriaWeights || projectTeamPresets[1].weights; // fallback preset2

  const hangyeolBefore = projectTeamCandidates.find(c => c.id === 'hangyeol');
  const hangyeolAfter = { ...hangyeolBefore, communicationCollaboration: 92 };

  const hangyeolScoreBefore = calculateTeamCandidateScore(hangyeolBefore, activeWeights);
  const hangyeolScoreAfter = calculateTeamCandidateScore(hangyeolAfter, activeWeights);

  // 1. Before appeal (Hangyeol collab 70)
  const beforeResults = evaluateTeamCandidates(projectTeamCandidates, activeWeights);

  // 2. After appeal (Hangyeol collab 92)
  const modifiedCandidates = projectTeamCandidates.map(c => 
    c.id === 'hangyeol' ? hangyeolAfter : c
  );
  const afterResults = evaluateTeamCandidates(modifiedCandidates, activeWeights);

  const wasHangyeolSelectedBefore = beforeResults.some(c => c.id === 'hangyeol');
  const isHangyeolSelectedNow = afterResults.some(c => c.id === 'hangyeol');

  // Determine Hangyeol's badge text and explanation based on the 3 cases
  let hangyeolBadge = '';
  let outcomeExplanation = '';

  if (!wasHangyeolSelectedBefore && isHangyeolSelectedNow) {
    // Case A: 새로 포함됨
    hangyeolBadge = '✨ 정정 후 대표팀 포함';
    outcomeExplanation = `한결 학생의 협업 기록을 정정한 결과, 총점이 ${hangyeolScoreBefore}점에서 ${hangyeolScoreAfter}점으로 올라 대표팀 4명에 새롭게 포함되었어요!`;
  } else if (wasHangyeolSelectedBefore && isHangyeolSelectedNow) {
    // Case B: 수정 전후 모두 포함됨
    hangyeolBadge = '점수 상승 · 대표팀 유지';
    outcomeExplanation = `한결 학생의 총점이 ${hangyeolScoreBefore}점에서 ${hangyeolScoreAfter}점으로 올랐으며, 기존과 마찬가지로 대표팀 명단에 안정적으로 포함되었어요.`;
  } else {
    // Case C: 점수는 올랐으나 대표팀 명단에는 미진입
    hangyeolBadge = '점수 정정 완료';
    outcomeExplanation = `한결 학생의 총점이 ${hangyeolScoreBefore}점에서 ${hangyeolScoreAfter}점으로 올랐지만, 이번 기준의 최종 대표팀 4명 명단에는 들지 못했습니다.`;
  }

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokTouched} 
          alt="감동한 표정의 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          🔄 바뀐 기록으로 다시 계산한 대표팀 결과예요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          한결이의 의사소통·협력 기록을 바로잡고, 정해진 기준에 따라 대표팀을 다시 계산했어요.
        </p>
      </div>

      {/* 점수 및 AI 계산 총점 수정 내역 */}
      <div style={{ backgroundColor: '#f8fafc', padding: '18px 20px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', marginBottom: '20px' }}>
        <div className="flex justify-between items-center mb-2" style={{ flexWrap: 'wrap', gap: '8px' }}>
          <div className="flex items-center gap-2">
            <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)' }}>
              👤 한결 학생의 기록 및 총점 정정
            </span>
            <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', backgroundColor: isHangyeolSelectedNow ? 'var(--color-primary)' : '#64748b', color: 'white', fontWeight: 'bold' }}>
              {hangyeolBadge}
            </span>
          </div>
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-primary-hover)' }}>
            의사소통·협력: {hangyeolBefore.communicationCollaboration}점 ➔ <strong>92점</strong> (정정 완료)
          </span>
        </div>
        <div style={{ backgroundColor: 'white', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-sm)' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>AI 계산 총점 변화:</span>
          <span style={{ fontWeight: 'bold' }}>
            수정 전 {hangyeolScoreBefore}점 ➔ <strong style={{ color: 'var(--color-primary-hover)' }}>수정 후 {hangyeolScoreAfter}점</strong> (+{(hangyeolScoreAfter - hangyeolScoreBefore).toFixed(1)}점)
          </span>
        </div>
      </div>

      {/* 대표팀 명단 비교 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        {/* 수정 전 명단 */}
        <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '12px' }}>
            수정 전 대표팀 명단
          </h3>
          <div className="flex flex-col gap-2">
            {beforeResults.map(c => (
              <div key={c.id} style={{ padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ fontWeight: '500' }}>• {c.name}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{c.score}점</span>
              </div>
            ))}
          </div>
        </div>

        {/* 수정 후 명단 */}
        <div style={{ backgroundColor: '#f0fdfa', padding: '18px', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-primary-hover)', textAlign: 'center', marginBottom: '12px' }}>
            수정 후 대표팀 명단
          </h3>
          <div className="flex flex-col gap-2">
            {afterResults.map(c => {
              const isHangyeol = c.id === 'hangyeol';
              return (
                <div 
                  key={c.id} 
                  style={{ 
                    padding: '10px 14px', 
                    backgroundColor: isHangyeol ? '#ccfbf1' : 'white', 
                    borderRadius: 'var(--radius-sm)', 
                    border: isHangyeol ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: isHangyeol ? 'bold' : '500',
                    color: isHangyeol ? 'var(--color-primary-hover)' : 'inherit',
                    fontSize: 'var(--font-size-sm)'
                  }}
                >
                  <span>• {c.name}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '13px' }}>{c.score}점</span>
                    {isHangyeol && (
                      <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '10px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                        {hangyeolBadge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 결과 분석 및 교육적 핵심 메시지 */}
      <div className="p-4 mb-6" style={{ backgroundColor: '#f0fdfa', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-primary)', color: 'var(--color-primary-hover)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
          💡 {outcomeExplanation}
        </p>
        <p style={{ margin: 0, borderTop: '1px dashed #99f6e4', paddingTop: '8px' }}>
          ⚖️ <strong>핵심 원칙:</strong> 대표팀 명단이 바뀌든 바뀌지 않든, 잘못된 기록은 사실대로 바로잡는 것이 공정한 절차의 기본이에요. 오류를 바로잡는 절차가 있어야 AI의 선택을 신뢰할 수 있어요.
        </p>
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          우리가 지킬 운영 원칙 정하기 →
        </button>
      </div>
    </div>
  );
}
