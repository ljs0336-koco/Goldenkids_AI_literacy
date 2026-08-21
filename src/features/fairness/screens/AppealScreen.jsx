import React from 'react';
import { appealConsequences } from '../fairnessLearningData';
import FairChoiceFork from '../components/FairChoiceFork';
import geumjjokEmbarrassed from '../../../assets/geumjjok/금쪽이_표정_당황.png';

const options = [
  { id: 1, title: '이미 결과가 나왔으니 그대로 둔다', note: '이의제기는 기록만 하고 계산은 다시 하지 않아요.' },
  { id: 2, title: '기록을 92점으로 고치고 다시 계산한다', note: '데이터를 정정한 뒤 모두에게 같은 기준을 적용해요.' },
  { id: 3, title: '기록은 그대로 두고 한결만 추가한다', note: '한결에게만 규칙의 예외를 적용해요.' }
];

export default function AppealScreen({ appealChoice, onSelectChoice, onProceed, onPrev }) {
  const consequence = appealChoice ? appealConsequences[appealChoice] : null;
  const choices = options;

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokEmbarrassed} alt="당황한 금쪽이" style={{ width: '64px', height: 'auto' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>“제 협업 기록이 잘못 들어갔어요!”</h2>
        <p className="fair-one-line-help">한결의 협업 기록은 70점으로 입력됐지만 확인된 실제 점수는 92점이에요. 어떻게 대응할지 바로 비교해요.</p>
      </div>

      <FairChoiceFork
        options={choices}
        selectedId={appealChoice}
        onSelect={onSelectChoice}
        prompt="A는 결과를 유지하고, B는 잘못된 기록부터 바로잡아요."
        moreLabel="한결만 예외로 넣고 싶다면?"
        resultLabel="이 대응을 선택하면"
      />

      <div className={`fair-consequence-stage ${consequence ? '' : 'is-empty'}`} role="status">
        {consequence ? (
          <div className={`fair-consequence ${consequence.tone}`}>
            <h3>{consequence.title}</h3>
            <p>{consequence.summary}</p>
            <p><strong>생각할 점:</strong> {consequence.lesson}</p>
          </div>
        ) : (
          <p>A 또는 B를 누르면 그 선택이 팀과 기록에 남기는 결과가 이 자리에 나타나요.</p>
        )}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onProceed} disabled={!appealChoice} style={{ minHeight: '52px' }}>
          {appealChoice ? '내 선택이 팀에 남긴 결과 보기 →' : 'A 또는 B를 먼저 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
