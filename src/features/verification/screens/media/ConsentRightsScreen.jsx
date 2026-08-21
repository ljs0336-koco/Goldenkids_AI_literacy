import React, { useState } from 'react';
import VerificationPageNav from '../../components/VerificationPageNav';
import VerificationChoiceFork from '../../components/VerificationChoiceFork';

export default function ConsentRightsScreen({ mediaCase, selectedRightIds, onToggleRight, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Object.fromEntries(selectedRightIds.map(id => [id, true])));
  const choice = mediaCase.rightsChoices[pageIndex];
  const selected = selectedRightIds.includes(choice.id);
  const answered = Object.prototype.hasOwnProperty.call(answers, choice.id);
  const allAnswered = mediaCase.rightsChoices.every(item => Object.prototype.hasOwnProperty.call(answers, item.id));

  const chooseNeed = answerId => {
    const needsAction = answerId === 'need';
    if (needsAction !== selected) onToggleRight(choice.id);
    setAnswers(current => ({ ...current, [choice.id]: needsAction }));
  };

  return (
    <section className="card verification-screen verification-story-page" aria-labelledby="consent-rights-title">
      <span className="verification-kicker">진짜인가와 별도로 확인할 것</span>
      <h2 id="consent-rights-title">게시 전에 어떤 행동이 필요할까요?</h2>
      <p>동의, 표시, 맥락, 공개 범위를 한 장씩 읽고 필요하다고 생각하는 행동을 남기세요.</p>

      <div className="verification-rights-tags" aria-label="영향을 받을 수 있는 권리와 가치">
        {mediaCase.affectedRights.map(item => <span key={item}>{item}</span>)}
      </div>

      <section className="verification-action-question">
        <span>게시 전 행동 {pageIndex + 1}</span>
        <h3>{choice.text}</h3>
      </section>

      <VerificationChoiceFork
        options={[
          { id: 'need', title: '이 행동이 필요해요', note: '게시 전에 반드시 확인하거나 처리해요.', result: choice.required ? '사건 파일에 필요한 조치로 기록했어요.' : '선택은 기록했지만, 오해나 피해를 키우지 않는지 다시 확인해요.' },
          { id: 'skip', title: '이 행동은 필요하지 않아요', note: '현재 사건에서는 하지 않아도 된다고 판단해요.', result: choice.required ? '이 조치를 빼면 게시 조건이 충분한지 다시 살펴봐야 해요.' : '피해야 할 행동을 목록에서 제외했어요.' }
        ]}
        selectedId={answered ? answers[choice.id] ? 'need' : 'skip' : ''}
        onSelect={chooseNeed}
        prompt="이 행동이 게시 전에 필요한지 A 또는 B로 정하세요."
        resultLabel="이 행동에 대한 내 판단"
      />

      <VerificationPageNav
        current={pageIndex}
        total={mediaCase.rightsChoices.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(mediaCase.rightsChoices.length - 1, index + 1))}
        prevLabel="이전 행동"
        nextLabel="다음 행동"
        disableNext={!answered}
      />

      <p className="verification-selection-summary">필요하다고 남긴 행동 {selectedRightIds.length}개</p>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 제작 정보</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!allAnswered}>모든 판단을 모아 사용 여부 결정하기 →</button>
      </div>
    </section>
  );
}
