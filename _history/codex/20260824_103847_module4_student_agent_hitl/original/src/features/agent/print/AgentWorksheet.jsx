import React from 'react';
import { agentMissions, safetyGuardrails } from '../agentData';

export default function AgentWorksheet({ state }) {
  return (
    <div className="agent-worksheet">
      <style>{`
        .agent-worksheet { padding: 24px; max-width: 800px; margin: 0 auto; font-family: sans-serif; color: #111; background: #fff; }
        .agent-worksheet table { width: 100%; border-collapse: collapse; font-size: 11px; text-align: left; }
        .agent-worksheet th, .agent-worksheet td { border: 1px solid #94a3b8; padding: 7px 8px; vertical-align: top; }
        .agent-worksheet th { background: #f1f5f9; }
        .agent-worksheet h2 { font-size: 14px; border-left: 4px solid #0d9488; padding-left: 8px; margin: 20px 0 10px; }
        @media print { .agent-worksheet { max-width: none; padding: 12mm; } }
      `}</style>

      <header style={{ borderBottom: '2px solid #111', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>AI 리터러시 실험실 활동지</span>
          <h1 style={{ fontSize: '20px', margin: '4px 0 0' }}>AI 에이전트 감독 활동지</h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px' }}>___학년 ___반 ___번<br />이름: _______________</div>
      </header>

      <p style={{ fontSize: '12px', lineHeight: 1.5, margin: '0 0 14px' }}>
        <strong>탐구 순서:</strong> 목표 확인 → 도구와 권한 확인 → 실행 전 근거 판단 → 실행 중단과 사후 확인
      </p>

      <section>
        <h2>1. 실행 요청의 인간 확인 지점</h2>
        <table>
          <thead><tr><th>미션</th><th>영향이 큰 실행</th><th>내 결정</th><th>확인해야 할 근거</th></tr></thead>
          <tbody>
            {agentMissions.map(mission => {
              const decision = state?.humanApprovalDecisions?.[mission.id];
              return (
                <tr key={mission.id}>
                  <td>{mission.icon} {mission.title}</td>
                  <td>{mission.humanCheckpoint.actionLabel}</td>
                  <td>{decision === 'approve' ? '조건부 승인' : decision === 'reject' ? '실행 보류' : '____________'}</td>
                  <td>{mission.humanCheckpoint.reviewChecks.map(check => check.label).join(' / ')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2>2. 내가 설정한 네 가지 통제 층</h2>
        <table>
          <thead><tr><th>통제 층</th><th>내 설정</th><th>이 설정이 줄이는 위험</th></tr></thead>
          <tbody>
            {safetyGuardrails.map(guard => {
              const chosen = guard.options.find(option => option.id === state?.guardrailChoices?.[guard.id]);
              return (
                <tr key={guard.id}>
                  <td>{guard.icon} {guard.title.replace(/^\d+\.\s*/, '')}</td>
                  <td>{chosen?.label || '____________________________'}</td>
                  <td>________________________________________</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2>3. 이상 행동 대응: 멈춘 뒤 무엇을 해야 할까?</h2>
        <p style={{ fontSize: '12px', lineHeight: 1.7 }}>
          □ 새 실행 중단 확인　 □ 임시 권한과 예약 작업 회수　 □ 이미 일어난 결과 확인<br />
          □ 담당자에게 알림　 □ 실행 로그 보존　 □ 필요한 복구·취소 절차 진행
        </p>
        <p style={{ fontSize: '12px' }}><strong>킬스위치만으로 해결되지 않는 일:</strong></p>
        <div style={{ height: '34px', borderBottom: '1px solid #999' }} />
      </section>

      <section style={{ border: '1.5px solid #111', borderRadius: '6px', padding: '12px', marginTop: '18px' }}>
        <strong style={{ fontSize: '13px' }}>AI 감독관의 한 문장 원칙</strong>
        <p style={{ fontSize: '12px', margin: '8px 0 4px' }}>“나는 AI 에이전트를 사용할 때 ________________________________________________.”</p>
        <div style={{ height: '32px', borderBottom: '1px solid #999' }} />
      </section>
    </div>
  );
}
