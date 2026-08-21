import React from 'react';
import FairChoiceFork from './FairChoiceFork';

export default function AiExchangePanel({ title = 'AI 금쪽이에게 되묻기', questions, selectedId, onSelect }) {
  const selectedQuestion = questions.find(question => question.id === selectedId);
  const choices = questions.slice(0, 3).map(question => ({
    id: question.id,
    title: question.label,
    note: question.id === 'why' ? 'AI가 어떤 기록을 연결했는지 들어요.' : question.id === 'missing' || question.id === 'roles' ? 'AI가 보지 못했거나 빠뜨린 것을 찾아요.' : '다른 가능성도 열어 봐요.'
  }));

  return (
    <section className="fair-exchange fair-story-section" aria-labelledby="fair-exchange-title">
      <span className="fair-eyebrow">나 ↔ AI</span>
      <h3 id="fair-exchange-title">{title}</h3>
      <FairChoiceFork
        options={choices}
        selectedId={selectedId}
        onSelect={onSelect}
        prompt="먼저 묻고 싶은 질문을 A 또는 B에서 고르세요. 다른 질문은 아래에서 열 수 있어요."
        moreLabel="다른 질문을 하고 싶다면?"
        resultLabel="AI에게 보낸 질문"
      />

      <div className={`fair-ai-response ${selectedQuestion ? '' : 'is-empty'}`} role="status">
        {selectedQuestion ? (
          <>
            <strong>AI 금쪽이의 답</strong>
            <p>{selectedQuestion.response}</p>
            <small>학습을 위해 미리 만든 응답이에요.</small>
          </>
        ) : (
          <p>A 또는 B 질문을 누르면 AI 금쪽이의 답이 이 자리에 나타나요.</p>
        )}
      </div>
    </section>
  );
}
