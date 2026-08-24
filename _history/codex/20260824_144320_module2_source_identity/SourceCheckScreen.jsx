import React, { useState } from 'react';
import { evidenceSources } from '../../verificationData';
import VerificationPageNav from '../../components/VerificationPageNav';
import VerificationChoiceFork from '../../components/VerificationChoiceFork';
import VerificationExperienceStage from '../../components/VerificationExperienceStage';
import VerificationWorkLabels from '../../components/VerificationWorkLabels';

function getSourceSet(claim) {
  return claim.sourceOptionIds
    .map(id => evidenceSources.find(source => source.id === id))
    .filter(Boolean);
}

export default function SourceCheckScreen({ claim, selectedSourceIds, onToggleSource, onNext, onPrev }) {
  const sources = getSourceSet(claim);
  const [pageIndex, setPageIndex] = useState(0);
  const [openedIds, setOpenedIds] = useState(() => new Set(selectedSourceIds.filter(id => sources.some(source => source.id === id))));
  const [sourceChoices, setSourceChoices] = useState(() => Object.fromEntries(selectedSourceIds.map(id => [id, true])));
  const source = sources[pageIndex];
  const opened = openedIds.has(source.id);
  const selected = selectedSourceIds.includes(source.id);
  const answered = Object.prototype.hasOwnProperty.call(sourceChoices, source.id);
  const allAnswered = sources.every(item => Object.prototype.hasOwnProperty.call(sourceChoices, item.id));
  const hasEnoughSources = selectedSourceIds.length >= 2;

  const openSource = () => setOpenedIds(current => new Set([...current, source.id]));
  const chooseSource = choiceId => {
    const keep = choiceId === 'keep';
    if (keep !== selected) onToggleSource(source.id);
    setSourceChoices(current => ({ ...current, [source.id]: keep }));
  };

  return (
    <section className="card verification-screen verification-story-page verification-experience-screen" aria-labelledby="source-check-title">
      <span className="verification-kicker">자료 봉투 열기</span>
      <h2 id="source-check-title">어떤 자료가 이 문장을 확인하는 데 도움이 될까요?</h2>
      <div className="verification-focus-claim"><span>지금 확인하는 문장</span><strong>{claim.text}</strong></div>
      <p>자료를 한 장씩 열어 작성자, 날짜, 실제 내용을 확인한 뒤 비교할 자료로 남길지 정하세요.</p>

      <VerificationWorkLabels
        actor="AI 초안"
        actorDetail={`AI 금쪽이 · 확인할 문장 ${claim.number}`}
        status="사람 확인 중"
        statusDetail={`자료 ${Object.keys(sourceChoices).length}/${sources.length}개를 판단했어요.`}
        statusTone="working"
      />

      <VerificationExperienceStage sceneKey={`${source.id}:${opened ? 'open' : 'closed'}`}>
        <article className={`verification-source-envelope ${opened ? 'is-open' : ''}`}>
          {!opened ? (
            <button type="button" onClick={openSource} className="verification-envelope-closed verification-primary-action">
              <span aria-hidden="true">✉️</span>
              <small>자료 {pageIndex + 1}</small>
              <strong>{source.title}</strong>
              <em>봉투 열어 보기</em>
            </button>
          ) : (
            <>
              <header>
                <span aria-hidden="true">{source.icon}</span>
                <div><strong>{source.title}</strong><small>{source.publisher}</small></div>
              </header>
              <p className="verification-source-meta">{source.type} · {source.dateLabel}</p>
              <blockquote>{source.excerpt}</blockquote>
              <VerificationChoiceFork
                options={[
                  { id: 'keep', title: '비교할 자료로 남긴다', note: '이 문장을 확인하는 데 직접 도움이 되는 자료예요.', result: '다른 자료와 나란히 놓고 내용과 날짜를 비교해요.' },
                  { id: 'skip', title: '이번 비교에서는 뺀다', note: '관련성이 낮거나 지금 주장에 맞지 않는 자료예요.', result: '자료를 읽은 기록은 남지만 최종 비교에는 넣지 않아요.' }
                ]}
                selectedId={answered ? sourceChoices[source.id] ? 'keep' : 'skip' : ''}
                onSelect={chooseSource}
                prompt="이 자료를 최종 비교에 남길지 A 또는 B로 정하세요."
                resultLabel="이 자료에 대한 내 결정"
              />
            </>
          )}
        </article>
      </VerificationExperienceStage>

      <VerificationPageNav
        current={pageIndex}
        total={sources.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(sources.length - 1, index + 1))}
        prevLabel="이전 자료"
        nextLabel="다음 자료"
        disableNext={!opened || !answered}
      />

      <div className="verification-selection-summary" aria-live="polite">
        자료 {Object.keys(sourceChoices).length}/{sources.length}개 판단 · 비교할 자료 {selectedSourceIds.length}개 남김
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 문장 다시 고르기</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!allAnswered || !hasEnoughSources}>
          {allAnswered && hasEnoughSources ? '남긴 자료를 바로 비교하기 →' : '세 자료를 판단하고 비교 자료 두 개를 남겨 주세요'}
        </button>
      </div>
    </section>
  );
}
