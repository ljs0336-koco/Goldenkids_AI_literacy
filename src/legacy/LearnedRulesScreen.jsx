import React from 'react';
import { dataSets } from '../fairnessData';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function LearnedRulesScreen({ isSupplemented = false, onNext, onPrev }) {
  const initialWeights = dataSets.past.learnedWeights;
  const supplementedWeights = dataSets.supplemented.learnedWeights;

  const ruleItems = [
    { 
      key: 'experience', 
      label: '💻 코딩 도구 익숙함', 
      color: 'var(--color-blue)', 
      initial: initialWeights.experience, 
      supplemented: supplementedWeights.experience, 
      changeNote: '📉 덜 중요하게 봄' 
    },
    { 
      key: 'problemSolving', 
      label: '🧩 미션 해결하기', 
      color: 'var(--color-orange)', 
      initial: initialWeights.problemSolving, 
      supplemented: supplementedWeights.problemSolving, 
      changeNote: '⚖️ 그대로 중요하게 봄' 
    },
    { 
      key: 'collaboration', 
      label: '🤝 친구와 함께하기', 
      color: 'var(--color-green)', 
      initial: initialWeights.collaboration, 
      supplemented: supplementedWeights.collaboration, 
      changeNote: '✨ 새로 살펴봄' 
    },
    { 
      key: 'opportunity', 
      label: '🌱 처음 도전할 기회', 
      color: 'var(--color-purple)', 
      initial: initialWeights.opportunity, 
      supplemented: supplementedWeights.opportunity, 
      changeNote: '✨ 새로 살펴봄' 
    }
  ];

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokDoctor} 
          alt="박사 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          {isSupplemented 
            ? "기록이 달라지자 AI가 배운 규칙도 달라졌어요" 
            : "AI는 무엇을 중요하게 배웠을까요?"}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', lineHeight: '1.5' }}>
          {isSupplemented
            ? dataSets.supplemented.ruleExplanation
            : dataSets.past.ruleExplanation}
        </p>
      </div>

      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '16px', color: 'var(--color-secondary)' }}>
          {isSupplemented ? "📊 배운 규칙 전후 비교" : "📊 데이터에서 배운 가상 중요도 규칙"}
        </h3>

        <div className="flex flex-col gap-4">
          {ruleItems.map((item) => {
            const currentVal = isSupplemented ? item.supplemented : item.initial;
            return (
              <div key={item.key} style={{ backgroundColor: 'white', padding: '14px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)' }}>{item.label}</span>
                  <div className="flex items-center gap-2">
                    {isSupplemented ? (
                      <>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                          처음 {item.initial}점 ➔ <strong>{item.supplemented}점</strong>
                        </span>
                        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: item.color }}>
                          {item.changeNote}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontWeight: 'bold', color: item.color, fontSize: 'var(--font-size-base)' }}>
                        {item.initial}점 / 100점
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div 
                  style={{ width: '100%', backgroundColor: '#e2e8f0', height: '14px', borderRadius: '7px', overflow: 'hidden' }}
                  role="progressbar"
                  aria-valuenow={currentVal}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div 
                    style={{ 
                      width: `${currentVal}%`, 
                      backgroundColor: item.color, 
                      height: '100%', 
                      borderRadius: '7px',
                      transition: 'width 0.5s ease'
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#f0fdfa', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-primary)', color: 'var(--color-primary-hover)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
        ℹ️ <strong>안내:</strong> 이 실험에서는 실제 AI 학습을 네 개의 중요도로 단순하게 나타냈어요. 화면의 숫자는 교육용 가상 규칙이며, 실제 AI의 규칙은 학습 목표와 방법에 따라서도 달라져요.
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
          {isSupplemented ? "🤖 바뀐 AI 추천 결과 보기" : "🤖 첫 번째 AI 추천 결과 보기"}
        </button>
      </div>
    </div>
  );
}
