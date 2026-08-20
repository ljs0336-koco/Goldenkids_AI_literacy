import React from 'react';
import { getSourceQualitySummary } from '../../verificationEngine';

const trustTone = {
  high: { label: '현재 확인에 강한 자료', className: 'is-high' },
  medium: { label: '조건을 살펴볼 자료', className: 'is-medium' },
  low: { label: '추가 확인이 필요한 자료', className: 'is-low' }
};

export default function EvidenceCompareScreen({ claim, selectedSourceIds, onNext, onPrev }) {
  const summary = getSourceQualitySummary(selectedSourceIds);

  return (
    <section className="card verification-screen" aria-labelledby="evidence-compare-title">
      <span className="verification-kicker">③ 근거 비교</span>
      <h2 id="evidence-compare-title">날짜와 근거를 나란히 놓고 읽어 보세요</h2>
      <div className="verification-focus-claim"><span>확인할 주장</span><strong>{claim.text}</strong></div>

      <div className="verification-evidence-stack">
        {summary.selected.map((source, index) => {
          const tone = trustTone[source.trustLevel];
          return (
            <article key={source.id} className="verification-evidence-card">
              <div className="verification-evidence-topline">
                <span className="verification-evidence-order">자료 {index + 1}</span>
                <span className={`verification-trust-chip ${tone.className}`}>{tone.label}</span>
              </div>
              <h3>{source.icon} {source.title}</h3>
              <p className="verification-source-meta">{source.publisher} · {source.dateLabel}</p>
              <blockquote>{source.excerpt}</blockquote>
              <ul>{source.checkPoints.map(point => <li key={point}>{point}</li>)}</ul>
            </article>
          );
        })}
      </div>

      <div className="verification-question-box">
        <strong>비교할 때 스스로 물어보기</strong>
        <ul>
          <li>이 자료를 누가, 언제 만들었나요?</li>
          <li>주장을 직접 뒷받침하는 내용이 있나요?</li>
          <li>현재 정보라면 더 최신 자료가 있나요?</li>
        </ul>
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 자료 다시 고르기</button>
        <button type="button" className="btn-primary" onClick={onNext}>나의 판단 정하기 →</button>
      </div>
    </section>
  );
}
