import React from 'react';
import { growthAwardCandidates } from '../fairnessData';
import { calculateGrowthDeltas, calculateDecemberAvg, getTempGrowthRecommendation, getFinalGrowthRecommendation } from '../fairnessEngine';
import geumjjokTouched from '../../../assets/geumjjok/금쪽이_표정_감동.png';

export default function GrowthDeltaScreen({ onNext, onPrev }) {
  const tempStudent = getTempGrowthRecommendation(growthAwardCandidates);
  const finalStudent = getFinalGrowthRecommendation(growthAwardCandidates);

  const tempDeltas = calculateGrowthDeltas(tempStudent);
  const finalDeltas = calculateGrowthDeltas(finalStudent);

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokTouched} 
          alt="감동한 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          1년간의 변화를 함께 계산한 결과예요!
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          3월 시작 기록과 12월 마지막 기록을 비교하여 학생들의 <strong>진짜 성장량</strong>을 계산했어요.
        </p>
      </div>

      {/* 처음 추천 vs 다시 추천 1:1 비교 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* 처음 추천 (12월 현재 기록만) */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', backgroundColor: '#f1f5f9', color: '#64748b', padding: '3px 8px', borderRadius: '10px' }}>
            처음 추천: 12월 현재 기록만 사용
          </span>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', margin: '12px 0 6px 0' }}>
            {tempStudent.name} 학생
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            12월 점수 평균: <strong>{calculateDecemberAvg(tempStudent)}점</strong> (1위)
          </p>
          <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-sm)', color: '#475569' }}>
            1년간 실제 성장량: <strong>+{tempDeltas.avgDelta}점</strong>
          </div>
        </div>

        {/* 다시 추천 (3월과 12월 기록 함께 사용) */}
        <div style={{ backgroundColor: '#f0fdfa', padding: '20px', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', backgroundColor: '#ccfbf1', color: 'var(--color-primary-hover)', padding: '3px 8px', borderRadius: '10px' }}>
            🏆 다시 추천: 3월과 12월 기록 함께 사용
          </span>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-primary-hover)', margin: '12px 0 6px 0' }}>
            {finalStudent.name} 학생 (성장상 추천!)
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            12월 점수 평균: <strong>{calculateDecemberAvg(finalStudent)}점</strong>
          </p>
          <div style={{ padding: '8px', backgroundColor: '#ccfbf1', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-hover)', fontWeight: 'bold' }}>
            1년간 실제 성장량: <strong>+{finalDeltas.avgDelta}점 (최대 성장!)</strong>
          </div>
        </div>
      </div>

      {/* 6명 학생 전체의 1년간 변화 상세 내역 */}
      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '12px', color: 'var(--color-secondary)' }}>
        📊 학생별 1년간 변화량 상세
      </h3>
      <div className="flex flex-col gap-3 mb-6">
        {growthAwardCandidates.map(student => {
          const deltas = calculateGrowthDeltas(student);
          const isWinner = student.id === finalStudent.id;

          return (
            <div 
              key={student.id}
              style={{
                backgroundColor: isWinner ? '#f0fdfa' : 'white',
                border: isWinner ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                padding: '16px',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)', color: isWinner ? 'var(--color-primary-hover)' : 'inherit' }}>
                    • {student.name} 학생
                  </span>
                  {isWinner && (
                    <span style={{ fontSize: '11px', backgroundColor: 'var(--color-primary)', color: 'white', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                      최대 성장
                    </span>
                  )}
                </div>
                <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)', color: isWinner ? 'var(--color-primary-hover)' : '#0284c7' }}>
                  평균 변화량: +{deltas.avgDelta}점
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                <div>💻 디지털 도구: {student.march.digitalToolUse} → {student.december.digitalToolUse} <strong>(+{deltas.digitalToolUseDelta})</strong></div>
                <div>🧩 문제해결: {student.march.problemSolving} → {student.december.problemSolving} <strong>(+{deltas.problemSolvingDelta})</strong></div>
                <div>🤝 의사소통·협력: {student.march.communicationCollaboration} → {student.december.communicationCollaboration} <strong>(+{deltas.communicationCollaborationDelta})</strong></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 교육적 핵심 메시지 */}
      <div className="p-4 mb-6" style={{ backgroundColor: '#f0fdfa', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-primary)', color: 'var(--color-primary-hover)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
        💡 <strong>핵심 발견:</strong> AI가 같은 질문을 받아도 어떤 데이터(범위)가 들어 있는지에 따라 추천 결과가 완전히 달라질 수 있어요. 따라서 AI의 결과를 그대로 믿기 전에 데이터가 충분한지 사람이 검토해야 해요.
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
          🔍 사람이 다시 확인하러 가기 →
        </button>
      </div>
    </div>
  );
}
