import React, { useState } from 'react';
import { announceLearningGuide } from '../../../utils/learningGuide';

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
  const handleSelect = optionId => {
    onSelect(optionId);
    announceLearningGuide('판단 결과가 아래에 표시됐어요. 이유를 읽고 화면 아래의 다음 버튼을 눌러 이어가세요.');
  };

  const handleAlternative = () => {
    setShowAlternative(current => {
      announceLearningGuide(current ? '제3안을 접었어요. A 또는 B 중 근거에 더 가까운 쪽을 눌러 보세요.' : '제3안 C가 열렸어요. A·B와 비교한 뒤 원하는 카드를 눌러 보세요.');
      return !current;
    });
  };

  return (
    <section className="verification-choice-fork" aria-label="선택하기">
      <p className="verification-fork-prompt">☝ {prompt}</p>
      <div className="verification-fork-primary">
        {primary.map((option, index) => <VerificationChoiceButton key={option.id} option={option} index={index} selectedId={selectedId} onSelect={handleSelect} />)}
      </div>

      {alternative && (
        <>
          <button
            type="button"
            className="verification-fork-more"
            onClick={handleAlternative}
            aria-expanded={showAlternative}
          >
            <span>{moreLabel}</span>
            <strong>{showAlternative ? '제3안 접기' : '제3안 보기'}</strong>
          </button>
          <div className={`verification-fork-alternative-slot ${showAlternative ? 'is-open' : ''}`}>
            {showAlternative ? (
              <div className="verification-fork-alternative">
                <VerificationChoiceButton option={alternative} index={2} alternativeChoice selectedId={selectedId} onSelect={handleSelect} />
              </div>
            ) : (
              <p>제3안은 필요할 때 위의 작은 버튼으로 열 수 있어요.</p>
            )}
          </div>
        </>
      )}

      <div className={`verification-fork-result ${selected ? '' : 'is-empty'}`} role="status">
        <small>{selected ? resultLabel : '판단 결과'}</small>
        <strong>{selected ? selected.title : 'A 또는 B를 누르면 결과가 여기에 나타나요.'}</strong>
        {selected?.result && <p>{selected.result}</p>}
      </div>
    </section>
  );
}
