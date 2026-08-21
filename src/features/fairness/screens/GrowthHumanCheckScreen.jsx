import React from 'react';
import { activityRecommendationChecklist } from '../fairnessData';
import { growthFinalChoices } from '../fairnessLearningData';
import ConceptBridge from '../components/ConceptBridge';

export default function GrowthHumanCheckScreen({
  checklist = [],
  onToggleCheck,
  finalChoice,
  onFinalChoice,
  onNext,
  onPrev
}) {
  const isAllChecked = activityRecommendationChecklist.every(item => checklist.includes(item.id));
  const canComplete = isAllChecked && Boolean(finalChoice);

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          확인을 마친 뒤, 내가 다음 행동을 정해요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          정답 하나를 맞히는 문제가 아니에요. AI 추천을 참고하되, 하늘이의 상황을 더 잘 확인할 수 있는 선택을 해 보세요.
        </p>
      </div>

      <section className="mb-6 p-5" style={{ backgroundColor: '#f4f1e9', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)' }}>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '14px', color: 'var(--color-secondary)' }}>
          먼저, 내가 확인한 것에 표시해요
        </h3>
        <div className="flex flex-col gap-2">
          {activityRecommendationChecklist.map(item => {
            const isChecked = checklist.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onToggleCheck(item.id)}
                style={{
                  backgroundColor: isChecked ? '#e9f0ec' : 'white',
                  border: isChecked ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  padding: '13px 16px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onToggleCheck(item.id);
                  }
                }}
              >
                <input type="checkbox" checked={isChecked} readOnly style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }} />
                <span style={{ fontSize: 'var(--font-size-base)', fontWeight: isChecked ? 'bold' : '500' }}>{item.text}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="growth-final-choice-title">
        <h3 id="growth-final-choice-title" style={{ fontSize: 'var(--font-size-lg)', marginBottom: '6px' }}>이제 나는 어떻게 할까요?</h3>
        <p style={{ marginTop: 0, color: 'var(--color-text-muted)' }}>어떤 선택이든 이유를 읽고 결정할 수 있어요. 선택은 나중에 다시 바꿔도 괜찮아요.</p>
        <div className="fair-final-grid" role="group" aria-label="최종 행동 선택">
          {growthFinalChoices.map(choice => (
            <button
              key={choice.id}
              type="button"
              className={`fair-final-choice ${finalChoice === choice.id ? 'is-selected' : ''}`}
              aria-pressed={finalChoice === choice.id}
              onClick={() => onFinalChoice(choice.id)}
            >
              <strong>{choice.title}</strong>
              <span>{choice.note}</span>
            </button>
          ))}
        </div>
      </section>

      <ConceptBridge>
        AI에게 추천을 받는 능력만큼, 추천의 근거를 확인하고 당사자의 목소리를 들어 최종 행동을 정하는 능력도 AI 리터러시예요.
      </ConceptBridge>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onNext} disabled={!canComplete} style={{ minHeight: '52px' }}>
          {canComplete ? '내 선택으로 탐구 마치기 →' : '확인 4개와 나의 선택을 완료해 주세요'}
        </button>
      </div>
    </div>
  );
}
