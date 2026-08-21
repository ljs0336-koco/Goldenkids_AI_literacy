import React, { useState } from 'react';
import VerificationMediaArt from '../../VerificationMediaArt';
import VerificationPageNav from '../../components/VerificationPageNav';

export default function VisualClueScreen({ mediaCase, selectedObservationIds, acknowledged, onToggleObservation, onToggleAcknowledged, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const total = mediaCase.visibleClues.length + 2;
  const isIntro = pageIndex === 0;
  const isConclusion = pageIndex === total - 1;
  const clue = !isIntro && !isConclusion ? mediaCase.visibleClues[pageIndex - 1] : null;
  const selected = clue ? selectedObservationIds.includes(clue.id) : false;
  const canContinue = isConclusion && selectedObservationIds.length > 0 && acknowledged;

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="visual-clue-title">
      <span className="verification-kicker">보이는 것과 아직 모르는 것</span>
      <h2 id="visual-clue-title">
        {isIntro ? '사건 파일의 게시 화면부터 살펴봐요' : isConclusion ? '첫인상만으로 결론 낼 수 있을까요?' : '이 화면에서 말할 수 있는 사실일까요?'}
      </h2>
      <p>{isIntro ? '콘텐츠가 어떤 상황에서 사용되려는지 먼저 확인하세요.' : isConclusion ? '관찰한 단서는 출처와 제작 과정을 더 확인하라는 신호예요.' : '문장을 읽고 조사 기록에 남길지 선택하세요.'}</p>

      {isIntro && (
        <div className="verification-media-focus">
          <VerificationMediaArt mediaCase={mediaCase} />
          <div><span className="verification-media-type">{mediaCase.mediaType}</span><h3>{mediaCase.title}</h3><p>{mediaCase.postText}</p></div>
        </div>
      )}

      {clue && (
        <button type="button" className={`verification-observation-page ${selected ? 'is-selected' : ''}`} onClick={() => onToggleObservation(clue.id)} aria-pressed={selected}>
          <span>관찰 단서 {pageIndex}</span>
          <strong>{clue.text}</strong>
          <small>{selected ? '조사 기록에 남겼어요' : '이 단서를 조사 기록에 남기기'}</small>
        </button>
      )}

      {isConclusion && (
        <section className="verification-observation-conclusion">
          <div><small>지금 말할 수 있는 것</small><strong>화면과 설명에서 확인이 필요한 단서가 있어요.</strong></div>
          <div><small>아직 말할 수 없는 것</small><strong>합성인지, 사용해도 되는지는 아직 확정할 수 없어요.</strong></div>
          <button type="button" className={acknowledged ? 'is-selected' : ''} onClick={onToggleAcknowledged} aria-pressed={acknowledged}>
            {acknowledged ? '출처와 제작 정보를 더 확인하기로 했어요' : '첫인상으로 결론 내리지 않고 더 확인하기'}
          </button>
        </section>
      )}

      <VerificationPageNav
        current={pageIndex}
        total={total}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(total - 1, index + 1))}
        prevLabel="이전 단서"
        nextLabel={pageIndex === total - 2 ? '관찰 정리' : '다음 단서'}
      />

      <p className="verification-selection-summary">조사 기록에 남긴 단서 {selectedObservationIds.length}개</p>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 사건 파일</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!canContinue}>출처와 제작 과정 확인하기 →</button>
      </div>
    </section>
  );
}
