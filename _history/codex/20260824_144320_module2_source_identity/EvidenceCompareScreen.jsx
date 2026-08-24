import React, { useState } from 'react';
import { getSourceQualitySummary } from '../../verificationEngine';
import VerificationPageNav from '../../components/VerificationPageNav';
import VerificationExperienceStage from '../../components/VerificationExperienceStage';
import VerificationWorkLabels from '../../components/VerificationWorkLabels';

const trustTone = {
  high: { label: '현재 확인에 알맞은 자료', className: 'is-high' },
  medium: { label: '조건을 함께 볼 자료', className: 'is-medium' },
  low: { label: '원출처를 더 찾을 자료', className: 'is-low' }
};

export default function EvidenceCompareScreen({ claim, selectedSourceIds, onNext, onPrev }) {
  const summary = getSourceQualitySummary(selectedSourceIds);
  const [pageIndex, setPageIndex] = useState(0);
  const isSummary = pageIndex === summary.selected.length;
  const source = isSummary ? null : summary.selected[pageIndex];

  return (
    <section className="card verification-screen verification-story-page verification-experience-screen" aria-labelledby="evidence-compare-title">
      <span className="verification-kicker">자료 내용 비교하기</span>
      <h2 id="evidence-compare-title">{isSummary ? '자료를 함께 놓으니 무엇이 보이나요?' : '선택한 자료를 한 장씩 정확히 읽어요'}</h2>
      <div className="verification-focus-claim"><span>확인할 문장</span><strong>{claim.text}</strong></div>

      <VerificationWorkLabels
        actor="AI 초안"
        actorDetail={`AI 금쪽이 · 확인할 문장 ${claim.number}`}
        status="사람 확인 중"
        statusDetail={isSummary ? '선택한 자료를 모두 읽고 차이를 비교했어요.' : `비교 자료 ${pageIndex + 1}/${summary.selected.length}을 읽는 중이에요.`}
        statusTone="working"
      />

      <VerificationExperienceStage sceneKey={isSummary ? 'summary' : source.id}>
        {!isSummary ? (
          <article className="verification-evidence-page">
            <div className="verification-evidence-topline">
              <span className="verification-evidence-order">비교 자료 {pageIndex + 1}</span>
              <span className={`verification-trust-chip ${trustTone[source.trustLevel].className}`}>{trustTone[source.trustLevel].label}</span>
            </div>
            <h3>{source.icon} {source.title}</h3>
            <p className="verification-source-meta">{source.publisher} · {source.dateLabel}</p>
            <blockquote>{source.excerpt}</blockquote>
            <ul>{source.checkPoints.map(point => <li key={point}>{point}</li>)}</ul>
          </article>
        ) : (
          <section className="verification-compare-summary">
            <small>선택한 자료가 함께 말해 주는 것</small>
            <h3>{claim.evidenceSummary}</h3>
            <div>
              {summary.selected.map(item => <span key={item.id}><strong>{item.title}</strong>{item.dateLabel}</span>)}
            </div>
            <p>이제 이 문장을 `자료로 확인됨`, `고쳐야 함`, `근거가 더 필요함` 중 하나로 기록해요.</p>
          </section>
        )}
      </VerificationExperienceStage>

      <VerificationPageNav
        current={pageIndex}
        total={summary.selected.length + 1}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(summary.selected.length, index + 1))}
        prevLabel="이전 자료"
        nextLabel={pageIndex === summary.selected.length - 1 ? '함께 비교' : '다음 자료'}
      />

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 자료 다시 고르기</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!isSummary}>문장에 판정 도장 찍기 →</button>
      </div>
    </section>
  );
}
