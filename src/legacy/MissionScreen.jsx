import React from 'react';

export default function MissionScreen({ onNext, mode }) {
  const isExplore = mode === 'explore';

  return (
    <div className="card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="mb-4">
        {isExplore ? "👀 미션: AI는 무엇을 보고 배울까?" : "⚖️ 미션: AI의 선택은 공정할까?"}
      </h2>
      
      <div className="mb-6" style={{ fontSize: 'var(--font-size-lg)', lineHeight: '1.6' }}>
        {isExplore ? (
          <>
            <p className="mb-2">우리가 만든 AI가 새 캠프에 참가할 친구들을 추천하려고 해요.</p>
            <p>AI가 어떤 기록을 보고 배우는지에 따라 추천하는 친구가 달라집니다.</p>
            <p><strong>어떤 기록을 보여주는 것이 가장 좋을지 찾아보세요!</strong></p>
          </>
        ) : (
          <>
            <p className="mb-2">AI가 친구들을 추천했어요!</p>
            <p>하지만 AI는 스스로 기준을 정하지 못해요. 우리가 기준을 정해줘야 합니다.</p>
            <p><strong>누구를 뽑는 것이 공정할지 기준을 정하고 다시 확인해 보세요!</strong></p>
          </>
        )}
      </div>

      <button className="btn-primary" onClick={onNext} style={{ padding: '12px 32px', fontSize: 'var(--font-size-lg)' }}>
        미션 시작하기
      </button>
    </div>
  );
}
