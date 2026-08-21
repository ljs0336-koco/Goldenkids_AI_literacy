import React from 'react';

export default function AiExchangePanel({ title = 'AI 금쪽이에게 되묻기', questions, selectedId, onSelect }) {
  const selected = questions.find(question => question.id === selectedId);

  return (
    <section className="fair-exchange" aria-labelledby="fair-exchange-title">
      <span className="fair-eyebrow">나 ↔ AI 핑퐁</span>
      <h3 id="fair-exchange-title">{title}</h3>
      <p>정답을 맞히는 문제가 아니에요. 지금 가장 궁금한 질문을 하나 골라 AI의 설명을 더 받아 보세요.</p>
      <div className="fair-question-grid" role="group" aria-label="AI에게 물어볼 질문">
        {questions.map(question => (
          <button
            key={question.id}
            type="button"
            className={selectedId === question.id ? 'is-selected' : ''}
            aria-pressed={selectedId === question.id}
            onClick={() => onSelect(question.id)}
          >
            {question.label}
          </button>
        ))}
      </div>
      {selected && (
        <div className="fair-ai-response" role="status">
          <strong>AI 금쪽이의 준비된 응답</strong>
          <p>{selected.response}</p>
          <small>이 응답은 학습을 위해 미리 만든 시뮬레이션이며, 실제 생성형 AI의 실시간 답변이 아니에요.</small>
        </div>
      )}
    </section>
  );
}
