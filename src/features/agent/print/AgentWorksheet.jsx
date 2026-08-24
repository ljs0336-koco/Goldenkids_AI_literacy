import React from 'react';
import { clubInviteMission, museumIncident, safetyGuardrails } from '../agentData';

export default function AgentWorksheet({ state }) {
  const decision = clubInviteMission.humanCheckpoint.options.find(
    option => option.id === state?.humanApprovalDecision
  );

  return (
    <div className="agent-worksheet">
      <style>{`
        .agent-worksheet { padding: 24px; max-width: 800px; margin: 0 auto; font-family: sans-serif; color: #111; background: #fff; }
        .agent-worksheet table { width: 100%; border-collapse: collapse; font-size: 11px; text-align: left; }
        .agent-worksheet th, .agent-worksheet td { border: 1px solid #94a3b8; padding: 7px 8px; vertical-align: top; }
        .agent-worksheet th { background: #f1f5f9; }
        .agent-worksheet h2 { font-size: 14px; border-left: 4px solid #4f7567; padding-left: 8px; margin: 20px 0 10px; }
        @media print { .agent-worksheet { max-width: none; padding: 12mm; } }
      `}</style>

      <header style={{ borderBottom: '2px solid #111', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>AI 리터러시 체험 기록</span>
          <h1 style={{ fontSize: '20px', margin: '4px 0 0' }}>AI가 대신 움직인다면?</h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px' }}>___학년 ___반 ___번<br />이름: _______________</div>
      </header>

      <p style={{ fontSize: '12px', lineHeight: 1.5, margin: '0 0 14px' }}>
        <strong>기억할 흐름:</strong> AI가 준비 → 사람이 확인·결정 → AI가 실행 → 사람이 결과 확인
      </p>

      <section>
        <h2>1. 공연 초대를 보내기 전 확인</h2>
        <table>
          <thead><tr><th>확인할 것</th><th>발견한 문제</th></tr></thead>
          <tbody>
            {clubInviteMission.humanCheckpoint.reviewChecks.map(check => (
              <tr key={check.id}>
                <td>{check.label}</td>
                <td>{check.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: '12px' }}><strong>내 선택:</strong> {decision?.label || '____________________________'}</p>
      </section>

      <section>
        <h2>2. 견학 자료를 멈추고 복구하기</h2>
        <p style={{ fontSize: '12px', lineHeight: 1.7 }}>
          <strong>비상 정지로 멈춘 일:</strong> {museumIncident.stopResult.stopped}<br />
          <strong>직접 복구할 일:</strong> {museumIncident.stopResult.notReversed}
        </p>
        <p style={{ fontSize: '12px', lineHeight: 1.7 }}>
          {museumIncident.responseChecks.map(check => `□ ${check.label}`).join('　')}
        </p>
      </section>

      <section>
        <h2>3. 다시 맡길 때의 안전 설정</h2>
        <table>
          <thead><tr><th>확인 질문</th><th>내가 고른 설정</th></tr></thead>
          <tbody>
            {safetyGuardrails.map(guard => {
              const chosen = guard.options.find(option => option.id === state?.guardrailChoices?.[guard.id]);
              return (
                <tr key={guard.id}>
                  <td>{guard.title}</td>
                  <td>{chosen?.label || '____________________________'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section style={{ border: '1.5px solid #111', borderRadius: '6px', padding: '12px', marginTop: '18px' }}>
        <strong style={{ fontSize: '13px' }}>HITL을 내 말로 설명해 보기</strong>
        <p style={{ fontSize: '12px', margin: '8px 0 4px' }}>“AI가 행동하는 과정에서 사람은 ________________________________________________.”</p>
        <div style={{ height: '32px', borderBottom: '1px solid #999' }} />
      </section>
    </div>
  );
}
