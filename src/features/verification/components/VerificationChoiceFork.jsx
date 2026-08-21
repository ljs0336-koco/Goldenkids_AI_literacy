import React, { useState } from 'react';

function VerificationChoiceButton({ option, index, alternativeChoice, selectedId, onSelect }) {
  return (
    <button
      type="button"
      className={`verification-fork-option verification-fork-option--${alternativeChoice ? 'c' : index === 0 ? 'a' : 'b'} ${selectedId === option.id ? 'is-selected' : ''}`}
      onClick={() => onSelect(option.id)}
      aria-pressed={selectedId === option.id}
    >
      <span className="verification-fork-letter" aria-hidden="true">{alternativeChoice ? 'C' : index === 0 ? 'A' : 'B'}</span>
      <span className="verification-fork-copy">
        <strong>{option.title}</strong>
        {option.note && <small>{option.note}</small>}
      </span>
      <span className="verification-fork-check" aria-hidden="true">{selectedId === option.id ? '✓' : '선택'}</span>
    </button>
  );
}

export default function VerificationChoiceFork({
  options,
  selectedId,
  onSelect,
  prompt = 'A와 B 중 근거에 더 가까운 쪽을 눌러 보세요.',
  moreLabel = '다른 판단을 하고 싶다면?',
  resultLabel = '내 선택'
}) {
  const [showAlternative, setShowAlternative] = useState(() => options.slice(2).some(option => option.id === selectedId));
  const primary = options.slice(0, 2);
  const alternative = options[2];
  const selected = options.find(option => option.id === selectedId);

  return (
    <section className="verification-choice-fork" aria-label="선택하기">
      <p className="verification-fork-prompt">☝ {prompt}</p>
      <div className="verification-fork-primary">
        {primary.map((option, index) => <VerificationChoiceButton key={option.id} option={option} index={index} selectedId={selectedId} onSelect={onSelect} />)}
      </div>

      {alternative && (
        <>
          <button
            type="button"
            className="verification-fork-more"
            onClick={() => setShowAlternative(current => !current)}
            aria-expanded={showAlternative}
          >
            <span>{moreLabel}</span>
            <strong>{showAlternative ? '제3안 접기' : '제3안 보기'}</strong>
          </button>
          {showAlternative && (
            <div className="verification-fork-alternative">
              <VerificationChoiceButton option={alternative} index={2} alternativeChoice selectedId={selectedId} onSelect={onSelect} />
            </div>
          )}
        </>
      )}

      {selected && (
        <div className="verification-fork-result" role="status">
          <small>{resultLabel}</small>
          <strong>{selected.title}</strong>
          {selected.result && <p>{selected.result}</p>}
        </div>
      )}
    </section>
  );
}
