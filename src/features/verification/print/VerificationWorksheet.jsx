import React from 'react';
import {
  claimDecisionOptions,
  evidenceSources,
  mediaCaseById,
  mediaDecisionOptions,
  verificationClaims
} from '../verificationData';

export default function VerificationWorksheet({ state }) {
  const selectedMediaCase = mediaCaseById[state.selectedMediaCaseId];

  return (
    <div className="verification-print-only" style={{ display: 'none', padding: '20px' }}>
      <style>{`
        @media print {
          .verification-print-only { display: block !important; color: #111; }
          .verification-print-only table { width: 100%; border-collapse: collapse; margin: 10px 0 18px; }
          .verification-print-only th, .verification-print-only td { border: 1px solid #333; padding: 6px; font-size: 10.5pt; vertical-align: top; }
          .verification-print-only h1 { font-size: 18pt; text-align: center; border-bottom: 2px solid #111; padding-bottom: 8px; }
          .verification-print-only h2 { font-size: 13pt; margin: 16px 0 6px; }
          .verification-print-only p, .verification-print-only li { font-size: 10.5pt; line-height: 1.45; }
          .verification-print-page { break-after: page; }
          .verification-print-page:last-child { break-after: auto; }
        }
      `}</style>

      <section className="verification-print-page">
        <h1>AI 답변 정보 검증 활동지</h1>
        <p style={{ textAlign: 'right' }}>___학년 ___반 ___번 이름: _______________</p>
        <p><strong>검증 순서:</strong> 주장 찾기 → 출처·날짜 확인 → 근거 비교 → 판단하고 설명</p>
        <table>
          <thead><tr><th>주장</th><th>내 판단</th><th>확인한 근거와 날짜</th><th>검증해 다시 쓴 문장</th></tr></thead>
          <tbody>
            {verificationClaims.map(claim => {
              const chosen = claimDecisionOptions.find(option => option.id === state.claimDecisions[claim.id]);
              const sources = (state.claimSelectedSourceIds[claim.id] || []).map(id => evidenceSources.find(source => source.id === id)).filter(Boolean);
              return (
                <tr key={claim.id}>
                  <td>{claim.text}</td>
                  <td>{chosen ? `${chosen.icon} ${chosen.label}` : '________________'}</td>
                  <td>{sources.length ? sources.map(source => `${source.title} (${source.publishedAt})`).join(', ') : '____________________________'}</td>
                  <td>{state.claimDecisions[claim.id] ? claim.verifiedText : '____________________________________________'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2>사람의 최종 확인</h2>
        <p>AI 답변에서 가장 먼저 확인해야 할 부분과 그 이유:</p>
        <p>________________________________________________________________________________</p>
        <p>________________________________________________________________________________</p>
      </section>

      <section className="verification-print-page">
        <h1>합성 미디어·인권 CSI 활동지</h1>
        <p style={{ textAlign: 'right' }}>___학년 ___반 ___번 이름: _______________</p>
        <p><strong>조사 사례:</strong> {selectedMediaCase?.title || '____________________________'}</p>
        <table>
          <tbody>
            <tr><th style={{ width: '24%' }}>첫 의심 단서</th><td>____________________________________________________________</td></tr>
            <tr><th>원래 출처와 맥락</th><td>____________________________________________________________</td></tr>
            <tr><th>제작·수정 이력</th><td>____________________________________________________________</td></tr>
            <tr><th>동의를 받아야 할 사람</th><td>____________________________________________________________</td></tr>
            <tr><th>피해를 막을 조건</th><td>____________________________________________________________</td></tr>
            <tr>
              <th>나의 최종 판단</th>
              <td>
                {selectedMediaCase && state.mediaDecisions[selectedMediaCase.id]
                  ? mediaDecisionOptions.find(option => option.id === state.mediaDecisions[selectedMediaCase.id])?.label
                  : '□ 사용 가능  □ 조건부 사용  □ 사용하면 안 됨  □ 정보가 더 필요함'}
              </td>
            </tr>
          </tbody>
        </table>
        <h2>안전하게 사용하기 위한 수정·확인 조건</h2>
        <p>1. ______________________________________________________________________________</p>
        <p>2. ______________________________________________________________________________</p>
        <p>3. ______________________________________________________________________________</p>
        <p><strong>기억하기:</strong> 눈으로 이상한 점을 찾는 것은 첫 단계일 뿐입니다. 출처, 맥락, 제작 이력, 동의와 권리를 함께 확인해야 합니다.</p>
      </section>
    </div>
  );
}
