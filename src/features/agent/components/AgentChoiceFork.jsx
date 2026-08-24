import React, { useState } from 'react';

export default function AgentChoiceFork({ options, alternative, value, onChange, prompt }) {
  const [showAlternative, setShowAlternative] = useState(value === alternative?.id);

  const renderOption = (option, kind) => {
    const selected = value === option.id;
    return (
      <button
        key={option.id}
        type="button"
        className={`agent-choice-card agent-choice-${kind} ${selected ? 'is-selected' : ''}`}
        onClick={() => onChange(option.id)}
        aria-pressed={selected}
      >
        <span className="agent-choice-letter">{option.label.split('.')[0]}</span>
        <span>
          <strong>{option.label.replace(/^[ABC]\.\s*/, '')}</strong>
          {option.note && <small>{option.note}</small>}
        </span>
        <span className="agent-choice-check" aria-hidden="true">{selected ? '✓' : ''}</span>
      </button>
    );
  };

  return (
    <section className="agent-choice-fork" aria-label="선택하기">
      <h3>{prompt}</h3>
      <div className="agent-choice-primary">
        {options.slice(0, 2).map((option, index) => renderOption(option, index === 0 ? 'a' : 'b'))}
      </div>
      {alternative && (
        <div className="agent-choice-alternative">
          {!showAlternative ? (
            <button type="button" className="agent-choice-more" onClick={() => setShowAlternative(true)}>
              다른 선택지를 고르고 싶다면?
            </button>
          ) : renderOption(alternative, 'c')}
        </div>
      )}
    </section>
  );
}
