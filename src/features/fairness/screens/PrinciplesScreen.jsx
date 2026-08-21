import React from 'react';
import { principles } from '../fairnessData';
import FairChoiceFork from '../components/FairChoiceFork';

export default function PrinciplesScreen({ selectedPrinciples = [], setSelectedPrinciples, onComplete, onPrev }) {
  const selectedPrinciple = selectedPrinciples[0] || '';
  const choices = principles.map((principle, index) => ({
    id: principle,
    title: principle,
    note: index === 0 ? '선택 전에 모두가 같은 목표와 기준을 알아요.' : index === 1 ? '잘못된 입력을 고친 뒤 같은 절차로 다시 살펴요.' : '결과에 질문하고 다시 확인할 길을 남겨요.',
    result: '다음 AI 추천에서 이 약속을 가장 먼저 확인해요.'
  }));

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <span className="fair-eyebrow">다음 선택을 위한 약속</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>가장 먼저 지킬 약속 하나를 골라요</h2>
        <p className="fair-one-line-help">A와 B를 비교하고, 다음 팀 구성에서 가장 먼저 확인할 약속을 선택하세요.</p>
      </div>

      <FairChoiceFork
        options={choices}
        selectedId={selectedPrinciple}
        onSelect={id => setSelectedPrinciples([id])}
        prompt="A는 기준을 먼저 공개하고, B는 잘못된 기록부터 바로잡는 약속이에요."
        moreLabel="결과에 다시 질문하는 약속을 고르고 싶다면?"
        resultLabel="내가 가장 먼저 지킬 약속"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onComplete} disabled={!selectedPrinciple} style={{ minHeight: '52px' }}>
          {selectedPrinciple ? '이 약속을 저장하고 결과 보기 →' : 'A 또는 B를 먼저 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
