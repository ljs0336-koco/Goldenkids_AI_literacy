import React from 'react';
import { agentMissions, safetyGuardrails } from '../agentData';

export default function AgentWorksheet({ state }) {
  const isMission = state?.mode === 'mission';
  const isControl = state?.mode === 'control';

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#111' }}>
      {/* 워크시트 헤더 */}
      <div style={{ borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>AI 리터러시 실험실 활동지</span>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0 0 0' }}>
            {isMission ? '🤖 [활동 1] AI 에이전트 미션 & 도구 승인' : isControl ? '🚨 [활동 2] AI 에이전트 안전 가드레일 & 킬스위치' : '🎖️ AI 에이전트 통제실 활동지'}
          </h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: '13px' }}>
          <div>___학년 ___반 ___번</div>
          <div style={{ marginTop: '4px' }}>이름: _______________</div>
        </div>
      </div>

      {/* 활동 1: 에이전트 도구 승인 기록 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderLeft: '4px solid #0d9488', paddingLeft: '8px', marginBottom: '10px' }}>
          1. 에이전트의 도구 실행과 인간 승인(Human-in-the-Loop)
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th style={{ border: '1px solid #cbd5e1', padding: '6px 8px', width: '35%' }}>실행 미션</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '6px 8px', width: '30%' }}>고위험 도구 호출</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '6px 8px', width: '35%' }}>사람의 최종 판단 & 이유</th>
            </tr>
          </thead>
          <tbody>
            {agentMissions.map(m => {
              const decision = state?.humanApprovalDecisions?.[m.id];
              return (
                <tr key={m.id}>
                  <td style={{ border: '1px solid #cbd5e1', padding: '6px 8px' }}>
                    {m.icon} {m.title}
                  </td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '6px 8px', color: '#dc2626', fontWeight: 'bold' }}>
                    {m.steps.find(s => s.type === 'approval_needed')?.text.slice(0, 24)}...
                  </td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '6px 8px' }}>
                    {decision ? (decision === 'approve' ? '✅ 승인' : '❌ 반려') : '_______________'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 활동 2: 4대 가드레일 설정 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderLeft: '4px solid #dc2626', paddingLeft: '8px', marginBottom: '10px' }}>
          2. 내가 구축한 4대 안전 가드레일
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '11px' }}>
          {safetyGuardrails.map(g => (
            <div key={g.id} style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '8px', backgroundColor: '#fafafa' }}>
              <strong>{g.title}</strong>
              <div style={{ color: '#475569', marginTop: '2px' }}>{g.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 활동 3: 비상 정지권과 나의 다짐 */}
      <div style={{ border: '1.5px solid #000', borderRadius: '6px', padding: '14px', backgroundColor: '#fcfcfc' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 6px 0' }}>
          3. AI 에이전트 안전 사령관 서약
        </h2>
        <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
          "나는 자율 AI 에이전트를 활용할 때 무조건적인 신뢰를 지양하고, <strong>필수 승인권과 비상 킬스위치</strong>를 항상 확보하여 안전하게 통제할 것을 서약합니다."
        </div>
        <div style={{ borderTop: '1px dashed #ccc', paddingTop: '8px', marginTop: '8px', fontSize: '12px' }}>
          <strong>💡 실생활에서 AI 도구를 안전하게 쓰기 위한 나의 다짐:</strong>
          <div style={{ height: '40px', borderBottom: '1px solid #ccc', marginTop: '6px' }}></div>
        </div>
      </div>
    </div>
  );
}
