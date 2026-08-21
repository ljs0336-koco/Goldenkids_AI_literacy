import React from 'react';
import geumjjokEmbarrassed from '../../../assets/geumjjok/금쪽이_표정_당황.png';
import { appealConsequences } from '../fairnessLearningData';

const options = [
  { id: 1, title: '이미 추천 결과가 나왔으니 그대로 둔다', note: '이의제기는 기록만 남기고 계산은 다시 하지 않아요.' },
  { id: 2, title: '한결의 기록을 92점으로 바로잡고 같은 기준으로 다시 계산한다', note: '데이터를 정정한 뒤 모든 지원자에게 같은 기준을 적용해요.' },
  { id: 3, title: '기록은 그대로 두고 한결만 대표팀에 추가한다', note: '한결에게만 규칙의 예외를 적용해요.' }
];

export default function AppealScreen({ appealChoice, onSelectChoice, onProceed, onPrev }) {
  const selectedConsequence = appealChoice ? appealConsequences[appealChoice] : null;

  return (
    <div className="card" style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img src={geumjjokEmbarrassed} alt="당황한 표정의 금쪽이" style={{ width: '72px', height: 'auto', marginBottom: '8px' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          “제 협업 기록이 잘못 들어갔어요!”
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', lineHeight: '1.6' }}>
          <strong>한결:</strong> “지난 모둠 프로젝트에서 적극적으로 협력했는데 70점으로 기록되어 있어요. 확인해 주세요.”
        </p>
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#f5efe3', border: '1px solid #d7c19c', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: '#71542d', marginBottom: '4px' }}>기록을 다시 확인한 결과</h3>
        <p style={{ margin: 0, color: '#5f5547', fontSize: 'var(--font-size-base)' }}>
          전산 입력 오류가 확인되었어요. 입력된 점수는 <strong>70점</strong>, 실제 확인된 점수는 <strong>92점</strong>이에요.
        </p>
      </div>

      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '6px' }}>나라면 어떻게 대응할까요?</h3>
      <p style={{ color: 'var(--color-text-muted)', marginTop: 0 }}>먼저 한 가지를 선택해 그 결과를 살펴보세요. 정답을 맞혀야 다음으로 가는 문제는 아니며, 선택을 다시 바꿀 수 있어요.</p>

      <div className="fair-final-grid" role="group" aria-label="이의제기 대응 선택">
        {options.map(option => (
          <button
            key={option.id}
            type="button"
            className={`fair-final-choice ${appealChoice === option.id ? 'is-selected' : ''}`}
            aria-pressed={appealChoice === option.id}
            onClick={() => onSelectChoice(option.id)}
          >
            <strong>{option.id}. {option.title}</strong>
            <span>{option.note}</span>
          </button>
        ))}
      </div>

      {selectedConsequence && (
        <div className={`fair-consequence ${selectedConsequence.tone}`} role="status">
          <h3>{selectedConsequence.title}</h3>
          <p>{selectedConsequence.summary}</p>
          <p><strong>생각할 점:</strong> {selectedConsequence.lesson}</p>
        </div>
      )}

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onProceed} disabled={!appealChoice} style={{ minHeight: '52px' }}>
          {appealChoice ? '이 선택 뒤에 생기는 일 확인하기 →' : '대응 방법을 하나 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
