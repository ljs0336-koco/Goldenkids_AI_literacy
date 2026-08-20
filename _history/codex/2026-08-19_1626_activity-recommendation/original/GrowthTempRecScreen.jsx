import React from 'react';
import { growthAwardCandidates } from '../fairnessData';
import { calculateDecemberAvg, getTempGrowthRecommendation } from '../fairnessEngine';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function GrowthTempRecScreen({ onNext, onPrev }) {
  const tempStudent = getTempGrowthRecommendation(growthAwardCandidates);

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokDoctor} 
          alt="박사 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          AI 금쪽이의 12월 임시 추천 결과예요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          AI 금쪽이는 12월 현재 기록만 보고 다음과 같이 성장상 후보를 추천했어요.
        </p>
      </div>

      {/* 임시 추천 카드 */}
      <div 
        style={{
          backgroundColor: '#eff6ff',
          border: '2px solid #3b82f6',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px'
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '4px' }}>
          ⭐ 12월 현재 기록 기준 임시 추천
        </div>
        <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 12px 0' }}>
          {tempStudent.name} 학생 (12월 평균 {calculateDecemberAvg(tempStudent)}점)
        </h3>

        <div className="flex justify-center gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'var(--font-size-sm)', backgroundColor: 'white', padding: '6px 12px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
            💻 디지털 도구: {tempStudent.december.digitalToolUse}점
          </span>
          <span style={{ fontSize: 'var(--font-size-sm)', backgroundColor: 'white', padding: '6px 12px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
            🧩 문제해결: {tempStudent.december.problemSolving}점
          </span>
          <span style={{ fontSize: 'var(--font-size-sm)', backgroundColor: 'white', padding: '6px 12px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
            🤝 의사소통·협력: {tempStudent.december.communicationCollaboration}점
          </span>
        </div>

        <p style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-base)', fontWeight: '600', color: '#1e40af' }}>
          "현재 역량이 가장 높아 보여요."
        </p>

        {/* 경고 박스 */}
        <div 
          style={{
            backgroundColor: '#fef2f2',
            border: '1.5px solid #f87171',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            color: '#991b1b',
            fontSize: 'var(--font-size-sm)',
            lineHeight: '1.5',
            textAlign: 'left'
          }}
        >
          ⚠️ <strong>주의:</strong> 하지만 3월 시작 기록이 누락되어 있어, 서준 학생이 실제로 1년 동안 <strong>가장 많이 성장했는지</strong>는 아직 알 수 없어요!
        </div>
      </div>

      {/* 6명 학생의 12월 점수 현황 요약 */}
      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '12px', color: 'var(--color-secondary)' }}>
        📋 12월 현재 점수 현황 (6명)
      </h3>
      <div className="flex flex-col gap-2 mb-6">
        {growthAwardCandidates.map(s => {
          const isSelected = s.id === tempStudent.id;
          const avg = calculateDecemberAvg(s);
          return (
            <div 
              key={s.id}
              style={{
                backgroundColor: isSelected ? '#eff6ff' : 'white',
                border: isSelected ? '1.5px solid #3b82f6' : '1px solid var(--color-border)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'var(--font-size-sm)'
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontWeight: isSelected ? 'bold' : '500' }}>• {s.name}</span>
                {isSelected && (
                  <span style={{ fontSize: '11px', backgroundColor: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                    12월 1위
                  </span>
                )}
              </div>
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 'bold' }}>
                12월 평균: {avg}점
              </span>
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
          onClick={onNext}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          🔍 3월 시작 기록 찾아보기 →
        </button>
      </div>
    </div>
  );
}
