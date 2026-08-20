import React from 'react';
import { candidates, dataSets } from '../fairnessData';
import { evaluateCandidates } from '../fairnessEngine';

export default function FirstRecommendationScreen({ onNext, onPrev }) {
  const recommendedCandidates = evaluateCandidates(candidates, dataSets.past.learnedWeights);

  return (
    <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          🤖 AI가 처음 추천한 4명이에요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          과거의 12명 기록과 배운 규칙을 바탕으로 AI가 대표 학생 4명을 추천했어요.
        </p>
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#eff6ff', borderRadius: 'var(--radius-sm)', border: '1px solid #bfdbfe', color: '#1e40af', fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>
        ⚠️ <strong>주의:</strong> AI의 추천은 최종 선발이 아니에요. 어떤 기록과 규칙을 사용했는지 사람이 반드시 확인해야 해요.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {recommendedCandidates.map((c) => (
          <div 
            key={c.id} 
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-primary)',
              backgroundColor: '#f0fdfa',
              textAlign: 'center'
            }}
          >
            <div 
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'bold',
                margin: '0 auto 12px auto'
              }}
            >
              {c.name[0]}
            </div>
            <strong style={{ fontSize: 'var(--font-size-lg)', display: 'block', color: 'var(--color-text-main)', marginBottom: '8px' }}>
              {c.name}
            </strong>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>💻 코딩 도구: {c.experience}점</span>
              <span>🧩 미션 해결: {c.problemSolving}점</span>
            </div>
            <div style={{ marginTop: '12px', padding: '4px 8px', backgroundColor: '#ccfbf1', color: 'var(--color-primary-hover)', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
              추천 후보
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
        💡 <strong>발견하기:</strong> 추천된 친구들은 모두 <strong>💻 코딩 도구 익숙함</strong> 점수가 매우 높은 편이에요. 다른 장점을 가진 친구들은 왜 추천되지 못했을까요?
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
          📚 빠진 기록 더하러 가기
        </button>
      </div>
    </div>
  );
}
