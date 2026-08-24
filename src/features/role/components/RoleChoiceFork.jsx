import React, { useState } from 'react';

export default function RoleChoiceFork({ options, alternative, value, onChange, prompt = 'A와 B 중 더 알맞은 쪽을 골라보세요.' }) {
  const [showAlternative, setShowAlternative] = useState(value === alternative?.id);

  const renderOption = (option, kind) => {
    const selected = value === option.id;
    return (
      <button
        key={option.id}
        type="button"
        className={`role-choice-card role-choice-${kind} ${selected ? 'is-selected' : ''}`}
        onClick={() => onChange(option.id)}
        aria-pressed={selected}
      >
        <span className="role-choice-letter">{option.label.split('.')[0]}</span>
        <span>
          <strong>{option.label.replace(/^[ABC]\.\s*/, '')}</strong>
          {option.note && <small>{option.note}</small>}
        </span>
        <span className="role-choice-check" aria-hidden="true">{selected ? '✓' : ''}</span>
      </button>
    );
  };

  return (
    <section className="role-choice-fork" aria-label="선택하기">
      <h3>{prompt}</h3>
      <div className="role-choice-primary">
        {options.slice(0, 2).map((option, index) => renderOption(option, index === 0 ? 'a' : 'b'))}
      </div>

      {alternative && (
        <div className="role-choice-alternative">
          {!showAlternative ? (
            <button type="button" className="role-choice-more" onClick={() => setShowAlternative(true)}>
              다른 선택지를 고르고 싶다면?
            </button>
          ) : renderOption(alternative, 'c')}
        </div>
      )}
    </section>
  );
}
