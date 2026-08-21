import React from 'react';
import { activityRecommendationChecklist, activityRecommendationExitQuiz } from '../fairnessData';

export default function GrowthHumanCheckScreen({ checklist = [], onToggleCheck, quizAnswer, onAnswerQuiz, onNext, onPrev }) {
  const isAllChecked = activityRecommendationChecklist.every(item => checklist.includes(item.id));
  const isQuizCorrect = quizAnswer === activityRecommendationExitQuiz.correctAnswer;
  const canComplete = isAllChecked && isQuizCorrect;

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          사람이 추천을 확인하고 최종 선택해요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          AI의 추천을 그대로 따르지 않고, 학생과 교사가 4가지 항목을 점검한 후 활동을 선택해요.
        </p>
      </div>

      {/* 4가지 체크리스트 */}
      <div className="mb-6 p-5" style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '14px', color: 'var(--color-secondary)' }}>
          📋 사람이 확인해야 할 4가지 점검 항목
        </h3>
        <div className="flex flex-col gap-2">
          {activityRecommendationChecklist.map(item => {
            const isChecked = checklist.includes(item.id);
            return (
              <div 
                key={item.id}
                onClick={() => onToggleCheck(item.id)}
                style={{
                  backgroundColor: isChecked ? '#f0fdfa' : 'white',
                  border: isChecked ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggleCheck(item.id); }}
              >
                <input 
                  type="checkbox" 
                  checked={isChecked} 
                  onChange={() => {}} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }} 
                />
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: isChecked ? 'bold' : '500', color: isChecked ? 'var(--color-primary-hover)' : 'inherit' }}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 출구 퀴즈 */}
      <div className="mb-6 p-5" style={{ backgroundColor: '#eff6ff', borderRadius: 'var(--radius-md)', border: '1.5px solid #bfdbfe' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '8px', color: '#1e40af' }}>
          ❓ 오늘의 탐구 퀴즈
        </h3>
        <p style={{ fontSize: 'var(--font-size-base)', fontWeight: '600', color: '#1e3a8a', marginBottom: '16px' }}>
          "{activityRecommendationExitQuiz.question}"
        </p>

        <div className="flex gap-4 mb-4">
          <button 
            type="button"
            className="btn-outline" 
            onClick={() => onAnswerQuiz(true)}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'bold',
              border: quizAnswer === true ? '2px solid #ef4444' : '1px solid var(--color-border)',
              backgroundColor: quizAnswer === true ? '#fee2e2' : 'white',
              color: quizAnswer === true ? '#dc2626' : 'inherit'
            }}
          >
            ⭕ O (그렇다)
          </button>
          <button 
            type="button"
            className="btn-outline" 
            onClick={() => onAnswerQuiz(false)}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'bold',
              border: quizAnswer === false ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: quizAnswer === false ? '#ccfbf1' : 'white',
              color: quizAnswer === false ? 'var(--color-primary-hover)' : 'inherit'
            }}
          >
            ❌ X (아니다)
          </button>
        </div>

        {quizAnswer !== null && (
          <div 
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: isQuizCorrect ? '#f0fdfa' : '#fef2f2',
              border: isQuizCorrect ? '1px solid var(--color-primary)' : '1px solid #f87171',
              color: isQuizCorrect ? 'var(--color-primary-hover)' : '#991b1b',
              fontSize: 'var(--font-size-sm)',
              lineHeight: '1.5'
            }}
          >
            {isQuizCorrect ? (
              <span>✅ <strong>정답이에요!</strong> {activityRecommendationExitQuiz.explanation}</span>
            ) : (
              <span>❌ <strong>다시 생각해 보세요!</strong> {activityRecommendationExitQuiz.explanation}</span>
            )}
          </div>
        )}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!canComplete}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {canComplete ? "🎉 탐구 완료하기" : "체크리스트와 퀴즈 정답을 완료해 주세요"}
        </button>
      </div>
    </div>
  );
}
