import React from 'react';
import VerificationMediaArt from '../../VerificationMediaArt';

export default function VisualClueScreen({ mediaCase, selectedObservationIds, acknowledged, onToggleObservation, onToggleAcknowledged, onNext, onPrev }) {
  const canContinue = selectedObservationIds.length > 0 && acknowledged;

  return (
    <section className="card verification-screen" aria-labelledby="visual-clue-title">
      <span className="verification-kicker">① 첫 의심 단서</span>
      <h2 id="visual-clue-title">화면에서 관찰할 수 있는 사실만 골라 보세요</h2>
      <p>“AI 같다”처럼 결론부터 내리지 말고, 지금 보이는 것과 아직 모르는 것을 구분합니다.</p>

      <div className="verification-media-focus">
        <VerificationMediaArt mediaCase={mediaCase} />
        <div>
          <span className="verification-media-type">{mediaCase.mediaType}</span>
          <h3>{mediaCase.title}</h3>
          <p>{mediaCase.postText}</p>
        </div>
      </div>

      <fieldset className="verification-fieldset">
        <legend>관찰하거나 확인이 필요하다고 생각한 단서</legend>
        <div className="verification-observation-list">
          {mediaCase.visibleClues.map(clue => {
            const selected = selectedObservationIds.includes(clue.id);
            return (
              <label key={clue.id} className={selected ? 'is-selected' : ''}>
                <input type="checkbox" checked={selected} onChange={() => onToggleObservation(clue.id)} />
                <span>{clue.text}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className={`verification-acknowledgement ${acknowledged ? 'is-selected' : ''}`}>
        <input type="checkbox" checked={acknowledged} onChange={onToggleAcknowledged} />
        <span><strong>중요:</strong> 화면이나 목소리의 느낌만으로 합성 여부와 사용 가능 여부를 확정하지 않겠습니다.</span>
      </label>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 사례 목록</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!canContinue}>출처와 제작 이력 추적 →</button>
      </div>
    </section>
  );
}
