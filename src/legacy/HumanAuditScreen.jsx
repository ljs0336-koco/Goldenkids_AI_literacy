import React from 'react';
import { session2Reasons, session2ExitQuiz } from '../fairnessData';

export default function HumanAuditScreen({ 
  selectedReasons = [], 
  onToggleReason, 
  quizAnswer, 
  onAnswerQuiz, 
  onNext, 
  onPrev 
}) {
  const correctReasonIds = session2Reasons.filter(r => r.isCorrect).map(r => r.id);
  const distractorId = session2Reasons.find(r => !r.isCorrect)?.id;

  // Must select all 3 correct reasons AND NOT select distractor
  const hasSelectedAllCorrect = correctReasonIds.every(id => selectedReasons.includes(id));
  const hasSelectedDistractor = selectedReasons.includes(distractorId);
  const isReasonsPassed = hasSelectedAllCorrect && !hasSelectedDistractor;

  // Quiz must be answered and correct (false)
  const isQuizPassed = quizAnswer === false;

  const isReadyToComplete = isReasonsPassed && isQuizPassed;

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          🔍 사람이 확인하기
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          왜 AI의 추천 결과가 달라졌을까요? 직접적인 원인을 모두 찾아보세요.
        </p>
      </div>

      <div className="mb-8">
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-secondary)' }}>
          1. 추천이 달라진 직접적인 원인 선택
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '12px' }}>
          올바른 직접 원인 3가지를 모두 고르고, 잘못된 설명은 제외해 주세요.
        </p>

        <div className="flex flex-col gap-3 mb-4">
          {session2Reasons.map((reason) => {
            const isSelected = selectedReasons.includes(reason.id);
            return (
              <div
                key={reason.id}
                onClick={() => onToggleReason(reason.id)}
                className="card interactive-card"
                style={{
                  padding: '16px 20px',
                  border: isSelected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                  backgroundColor: isSelected ? '#f0fdfa' : 'white',
                  marginBottom: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggleReason(reason.id); }}
                aria-pressed={isSelected}
              >
                <span style={{ fontSize: 'var(--font-size-base)', fontWeight: isSelected ? 'bold' : '500', color: isSelected ? 'var(--color-primary-hover)' : 'var(--color-text-main)' }}>
                  {reason.text}
                </span>
                <span 
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? '#ccfbf1' : '#f1f5f9',
                    color: isSelected ? 'var(--color-primary-hover)' : 'var(--color-text-muted)'
                  }}
                >
                  {isSelected ? '✅ 선택됨' : '선택하기'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reasons Feedback message */}
        {selectedReasons.length > 0 && (
          <div 
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)',
              backgroundColor: isReasonsPassed ? '#f0fdfa' : '#fffbeb',
              border: isReasonsPassed ? '1px solid var(--color-primary)' : '1px solid #fef08a',
              color: isReasonsPassed ? 'var(--color-primary-hover)' : '#92400e'
            }}
          >
            {isReasonsPassed ? (
              <span>✅ <strong>훌륭해요!</strong> 데이터 범위 확장과 새로운 평가 항목 추가가 직접 원인임을 정확히 찾았어요.</span>
            ) : hasSelectedDistractor ? (
              <span>💡 <strong>주의:</strong> 단순히 데이터 양이 많아진다고 AI가 저절로 똑똑해지거나 공정해지는 것은 아니에요.</span>
            ) : (
              <span>💡 <strong>안내:</strong> 추천이 바뀐 직접적인 원인 3가지를 모두 골라보세요.</span>
            )}
          </div>
        )}
      </div>

      {/* 2. 출구 퀴즈 */}
      <div className="mb-6" style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-secondary)' }}>
          2. 생각 넓히기 퀴즈
        </h3>
        
        <p style={{ fontSize: 'var(--font-size-base)', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-main)' }}>
          Q. {session2ExitQuiz.question}
        </p>

        <div className="flex gap-4 mb-4">
          <button
            type="button"
            className="btn-outline"
            onClick={() => onAnswerQuiz(true)}
            style={{
              flex: 1,
              minHeight: '48px',
              border: quizAnswer === true ? '2px solid var(--color-warning)' : '1px solid var(--color-border)',
              backgroundColor: quizAnswer === true ? '#fffbeb' : 'white',
              fontWeight: 'bold',
              fontSize: 'var(--font-size-base)'
            }}
          >
            그렇다 (O)
          </button>
          <button
            type="button"
            className="btn-outline"
            onClick={() => onAnswerQuiz(false)}
            style={{
              flex: 1,
              minHeight: '48px',
              border: quizAnswer === false ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: quizAnswer === false ? '#f0fdfa' : 'white',
              fontWeight: 'bold',
              fontSize: 'var(--font-size-base)'
            }}
          >
            그렇지 않다 (X)
          </button>
        </div>

        {quizAnswer !== null && (
          <div 
            style={{
              padding: '14px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: quizAnswer === false ? '#f0fdfa' : '#fffbeb',
              border: quizAnswer === false ? '1px solid var(--color-primary)' : '1px solid #fef08a',
              color: quizAnswer === false ? 'var(--color-primary-hover)' : '#92400e',
              fontSize: 'var(--font-size-sm)',
              lineHeight: '1.5'
            }}
          >
            <strong>{quizAnswer === false ? "🎉 정답이에요! (정답: 그렇지 않다)" : "💡 다시 생각해 보세요! (정답: 그렇지 않다)"}</strong>
            <p style={{ marginTop: '4px', marginBottom: 0 }}>
              {session2ExitQuiz.explanation}
            </p>
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
          disabled={!isReadyToComplete}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {isReadyToComplete 
            ? "🎉 미션 완료하기" 
            : !isReasonsPassed 
              ? "원인 3가지를 정확히 찾아주세요" 
              : "퀴즈에 정답을 선택해 주세요"}
        </button>
      </div>
    </div>
  );
}
