import React, { useState } from 'react';
import PageTurnNav from './PageTurnNav';

export default function AiExchangePanel({ title = 'AI 금쪽이에게 되묻기', questions, selectedId, onSelect }) {
  const selectedIndex = Math.max(0, questions.findIndex(question => question.id === selectedId));
  const [pageOverride, setPageOverride] = useState(null);
  const pageIndex = pageOverride ?? (selectedId ? selectedIndex : 0);
  const question = questions[pageIndex];
  const isSelected = selectedId === question.id;

  return (
    <section className="fair-exchange fair-story-section" aria-labelledby="fair-exchange-title">
      <span className="fair-eyebrow">나 ↔ AI</span>
      <h3 id="fair-exchange-title">{title}</h3>
      <p className="fair-one-line-help">질문을 넘겨 보고, 지금 가장 궁금한 한 가지를 눌러 보세요.</p>

      <button
        type="button"
        className={`fair-question-page ${isSelected ? 'is-selected' : ''}`}
        aria-pressed={isSelected}
        onClick={() => onSelect(question.id)}
      >
        <span>내가 물어볼 말</span>
        <strong>{question.label}</strong>
        <small>{isSelected ? '선택했어요' : '이 질문을 AI에게 묻기'}</small>
      </button>

      {isSelected && (
        <div className="fair-ai-response" role="status">
          <strong>AI 금쪽이의 준비된 응답</strong>
          <p>{question.response}</p>
          <small>학습을 위해 미리 만든 응답이에요.</small>
        </div>
      )}

      <PageTurnNav
        current={pageIndex}
        total={questions.length}
        onPrev={() => setPageOverride(Math.max(0, pageIndex - 1))}
        onNext={() => setPageOverride(Math.min(questions.length - 1, pageIndex + 1))}
        prevLabel="이전 질문"
        nextLabel="다음 질문"
      />
    </section>
  );
}
