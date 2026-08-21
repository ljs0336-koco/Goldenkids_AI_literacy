import React, { useState } from 'react';

function FairChoiceButton({ option, index, alternativeChoice, selectedId, onSelect }) {
  return (
    <button
      type="button"
      className={`fair-fork-option fair-fork-option--${alternativeChoice ? 'c' : index === 0 ? 'a' : 'b'} ${selectedId === option.id ? 'is-selected' : ''}`}
      onClick={() => onSelect(option.id)}
      aria-pressed={selectedId === option.id}
    >
      <span className="fair-fork-letter" aria-hidden="true">{alternativeChoice ? 'C' : index === 0 ? 'A' : 'B'}</span>
      <span className="fair-fork-copy">
        <strong>{option.title}</strong>
        {option.note && <small>{option.note}</small>}
      </span>
      <span className="fair-fork-check" aria-hidden="true">{selectedId === option.id ? '✓' : '선택'}</span>
    </button>
  );
}

export default function FairChoiceFork({
  options,
  selectedId,
  onSelect,
  prompt = 'A와 B 중 지금 생각에 더 가까운 쪽을 눌러 보세요.',
  moreLabel = '다른 선택을 하고 싶다면?',
  resultLabel = '내 선택'
}) {
  const [showAlternative, setShowAlternative] = useState(() => options.slice(2).some(option => option.id === selectedId));
  const primary = options.slice(0, 2);
  const alternative = options[2];
  const selected = options.find(option => option.id === selectedId);

  return (
    <section className="fair-choice-fork" aria-label="선택하기">
      <p className="fair-fork-prompt">☝ {prompt}</p>
      <div className="fair-fork-primary">
        {primary.map((option, index) => <FairChoiceButton key={option.id} option={option} index={index} selectedId={selectedId} onSelect={onSelect} />)}
      </div>

      {alternative && (
        <>
          <button
            type="button"
            className="fair-fork-more"
            onClick={() => setShowAlternative(current => !current)}
            aria-expanded={showAlternative}
          >
            <span>{moreLabel}</span>
            <strong>{showAlternative ? '제3안 접기' : '제3안 보기'}</strong>
          </button>
          {showAlternative && (
            <div className="fair-fork-alternative">
              <FairChoiceButton option={alternative} index={2} alternativeChoice selectedId={selectedId} onSelect={onSelect} />
            </div>
          )}
        </>
      )}

      {selected && (
        <div className="fair-fork-result" role="status">
          <small>{resultLabel}</small>
          <strong>{selected.title}</strong>
          {selected.result && <p>{selected.result}</p>}
        </div>
      )}
    </section>
  );
}
