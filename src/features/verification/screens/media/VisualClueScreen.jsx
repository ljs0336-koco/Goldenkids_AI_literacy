import React, { useState } from 'react';
import VerificationMediaArt from '../../VerificationMediaArt';
import VerificationPageNav from '../../components/VerificationPageNav';
import VerificationChoiceFork from '../../components/VerificationChoiceFork';

export default function VisualClueScreen({ mediaCase, selectedObservationIds, acknowledged, onToggleObservation, onToggleAcknowledged, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Object.fromEntries(selectedObservationIds.map(id => [id, true])));
  const [conclusionChoice, setConclusionChoice] = useState(acknowledged ? 'check' : '');
  const total = mediaCase.visibleClues.length + 2;
  const isIntro = pageIndex === 0;
  const isConclusion = pageIndex === total - 1;
  const clue = !isIntro && !isConclusion ? mediaCase.visibleClues[pageIndex - 1] : null;
  const selected = clue ? selectedObservationIds.includes(clue.id) : false;
  const answered = clue ? Object.prototype.hasOwnProperty.call(answers, clue.id) : true;
  const canContinue = isConclusion && selectedObservationIds.length > 0 && acknowledged;

  const chooseObservation = choiceId => {
    const keep = choiceId === 'keep';
    if (keep !== selected) onToggleObservation(clue.id);
    setAnswers(current => ({ ...current, [clue.id]: keep }));
  };

  const chooseConclusion = choiceId => {
    const shouldCheck = choiceId === 'check';
    if (shouldCheck !== acknowledged) onToggleAcknowledged();
    setConclusionChoice(choiceId);
  };

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
        <section className="verification-action-question">
          <span>관찰 단서 {pageIndex}</span>
          <h3>{clue.text}</h3>
          <VerificationChoiceFork
            options={[
              { id: 'keep', title: '확인할 단서로 남긴다', note: '출처와 제작 과정을 확인할 때 다시 살펴봐요.', result: '조사 기록에 단서로 남겼어요. 아직 결론은 아니에요.' },
              { id: 'skip', title: '결정적인 단서로 쓰지 않는다', note: '느낌만으로 진짜·가짜를 판단하지 않아요.', result: '최종 결론의 근거에서는 제외했어요.' }
            ]}
            selectedId={answered ? answers[clue.id] ? 'keep' : 'skip' : ''}
            onSelect={chooseObservation}
            prompt="이 내용을 조사 단서로 남길지 A 또는 B로 정하세요."
            resultLabel="이 단서에 대한 내 판단"
          />
        </section>
      )}

      {isConclusion && (
        <section className="verification-observation-conclusion">
          <div><small>지금 말할 수 있는 것</small><strong>화면과 설명에서 확인이 필요한 단서가 있어요.</strong></div>
          <div><small>아직 말할 수 없는 것</small><strong>합성인지, 사용해도 되는지는 아직 확정할 수 없어요.</strong></div>
          <VerificationChoiceFork
            options={[
              { id: 'check', title: '출처와 제작 정보를 더 확인한다', note: '첫인상은 단서로만 남기고 파일 밖의 정보를 찾아요.', result: '다음 단계에서 출처·제작자·동의 기록을 확인해요.' },
              { id: 'stop', title: '첫인상만으로 지금 결론낸다', note: '화면이 이상해 보인다는 느낌만으로 판단해요.', result: '이 선택만으로는 근거가 부족해 다음 단계로 갈 수 없어요.' }
            ]}
            selectedId={conclusionChoice}
            onSelect={chooseConclusion}
            prompt="지금 결론낼지, 더 확인할지 A 또는 B로 정하세요."
            resultLabel="내가 정한 다음 행동"
          />
        </section>
      )}

      <VerificationPageNav
        current={pageIndex}
        total={total}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(total - 1, index + 1))}
        prevLabel="이전 단서"
        nextLabel={pageIndex === total - 2 ? '관찰 정리' : '다음 단서'}
        disableNext={Boolean(clue) && !answered}
      />

      <p className="verification-selection-summary">조사 기록에 남긴 단서 {selectedObservationIds.length}개</p>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 사건 파일</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!canContinue}>
          {canContinue ? '출처와 제작 과정 확인하기 →' : isConclusion && selectedObservationIds.length === 0 ? '확인할 단서를 하나 이상 남겨 주세요' : isConclusion ? 'A: 더 확인하기를 골라 주세요' : '단서를 차례로 판단해 주세요'}
        </button>
      </div>
    </section>
  );
}
