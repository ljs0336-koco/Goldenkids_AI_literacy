import React, { useState } from 'react';
import { appealConsequences } from '../fairnessLearningData';
import PageTurnNav from '../components/PageTurnNav';
import geumjjokEmbarrassed from '../../../assets/geumjjok/금쪽이_표정_당황.png';

const options = [
  { id: 1, title: '이미 결과가 나왔으니 그대로 둔다', note: '이의제기는 기록만 하고 계산은 다시 하지 않아요.' },
  { id: 2, title: '기록을 92점으로 고치고 다시 계산한다', note: '데이터를 정정한 뒤 모두에게 같은 기준을 적용해요.' },
  { id: 3, title: '기록은 그대로 두고 한결만 추가한다', note: '한결에게만 규칙의 예외를 적용해요.' }
];

export default function AppealScreen({ appealChoice, onSelectChoice, onProceed, onPrev }) {
  const initialIndex = Math.max(0, options.findIndex(option => option.id === appealChoice));
  const [pageIndex, setPageIndex] = useState(initialIndex);
  const option = options[pageIndex];
  const isSelected = appealChoice === option.id;
  const consequence = isSelected ? appealConsequences[option.id] : null;

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokEmbarrassed} alt="당황한 금쪽이" style={{ width: '64px', height: 'auto' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>“제 협업 기록이 잘못 들어갔어요!”</h2>
        <p className="fair-one-line-help">한결의 협업 기록은 70점으로 입력됐지만 확인된 실제 점수는 92점이에요.</p>
      </div>

      <button
        type="button"
        className={`fair-question-page ${isSelected ? 'is-selected' : ''}`}
        onClick={() => onSelectChoice(option.id)}
        aria-pressed={isSelected}
        style={{ minHeight: '210px' }}
      >
        <span>대응 방법 {option.id}</span>
        <strong>{option.title}</strong>
        <small>{option.note}</small>
        <small>{isSelected ? '이 대응을 선택했어요' : '이 대응을 선택해 결과 보기'}</small>
      </button>

      {consequence && (
        <div className={`fair-consequence ${consequence.tone}`} role="status" style={{ marginTop: '16px' }}>
          <h3>{consequence.title}</h3>
          <p>{consequence.summary}</p>
          <p><strong>생각할 점:</strong> {consequence.lesson}</p>
        </div>
      )}

      <PageTurnNav
        current={pageIndex}
        total={options.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(options.length - 1, index + 1))}
        prevLabel="이전 대응"
        nextLabel="다음 대응"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onProceed} disabled={!appealChoice} style={{ minHeight: '52px' }}>
          {appealChoice ? '내 선택 뒤에 생기는 일 보기 →' : '대응 방법을 하나 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
