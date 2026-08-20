import React from 'react';
import { roleScenarios, aiPersonas, workTasks, rolePrinciples } from '../roleData';

export default function RoleWorksheet({ state }) {
  const isPersona = state?.mode === 'persona';
  const isTask = state?.mode === 'task';

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#111' }}>
      {/* 워크시트 헤더 */}
      <div style={{ borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>AI 리터러시 실험실 활동지</span>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0 0 0' }}>
            {isPersona ? '🎭 [활동 1] 나에게 맞는 AI 페르소나 탐구' : isTask ? '🔀 [활동 2] 미래 업무 3구역 분류 & 공존 설계' : '✨ AI 역할 선택소 탐구 활동지'}
          </h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: '13px' }}>
          <div>___학년 ___반 ___번</div>
          <div style={{ marginTop: '4px' }}>이름: _______________</div>
        </div>
      </div>

      {/* 활동 1: 페르소나 탐구 기록 */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 'bold', borderLeft: '4px solid #0d9488', paddingLeft: '8px', marginBottom: '12px' }}>
          1. 4색 AI 금쪽이 페르소나 매칭 기록
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th style={{ border: '1px solid #cbd5e1', padding: '6px 8px', width: '35%' }}>탐구한 일상 상황</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '6px 8px', width: '25%' }}>내가 선택한 역할</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '6px 8px', width: '40%' }}>선택한 이유 & 배운 점</th>
            </tr>
          </thead>
          <tbody>
            {roleScenarios.slice(0, 4).map(sc => {
              const choiceId = state?.userPersonaChoices?.[sc.id];
              const choicePersona = aiPersonas.find(p => p.id === choiceId);
              return (
                <tr key={sc.id}>
                  <td style={{ border: '1px solid #cbd5e1', padding: '6px 8px' }}>
                    {sc.icon} {sc.situationTitle}
                  </td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '6px 8px', fontWeight: 'bold' }}>
                    {choicePersona ? `${choicePersona.icon} ${choicePersona.name}` : '(선택 안 됨)'}
                  </td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '6px 8px', color: '#475569' }}>
                    {choicePersona ? sc.roleGuidance : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 활동 2: 업무 3구역 분류 기록 */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 'bold', borderLeft: '4px solid #7c3aed', paddingLeft: '8px', marginBottom: '12px' }}>
          2. 미래 업무 3구역 분류 결과
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '11px', marginBottom: '12px' }}>
          <div style={{ border: '1px solid #bfdbfe', borderRadius: '4px', padding: '8px', backgroundColor: '#eff6ff' }}>
            <strong>🤖 AI 주로 수행:</strong>
            <ul style={{ paddingLeft: '14px', margin: '4px 0 0 0' }}>
              {workTasks.filter(t => state?.taskClassifications?.[t.id] === 'ai_auto').map(t => (
                <li key={t.id}>{t.title}</li>
              ))}
            </ul>
          </div>
          <div style={{ border: '1px solid #99f6e4', borderRadius: '4px', padding: '8px', backgroundColor: '#f0fdfa' }}>
            <strong>🤝 인간-AI 협업:</strong>
            <ul style={{ paddingLeft: '14px', margin: '4px 0 0 0' }}>
              {workTasks.filter(t => state?.taskClassifications?.[t.id] === 'collaboration').map(t => (
                <li key={t.id}>{t.title}</li>
              ))}
            </ul>
          </div>
          <div style={{ border: '1px solid #e9d5ff', borderRadius: '4px', padding: '8px', backgroundColor: '#faf5ff' }}>
            <strong>👤 인간 최종 결정:</strong>
            <ul style={{ paddingLeft: '14px', margin: '4px 0 0 0' }}>
              {workTasks.filter(t => state?.taskClassifications?.[t.id] === 'human_lead').map(t => (
                <li key={t.id}>{t.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 활동 3: 인간 고유의 3대 가치 성찰 및 서약 */}
      <div style={{ border: '1.5px solid #000', borderRadius: '6px', padding: '14px', backgroundColor: '#fcfcfc' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          3. 나의 AI 공존 서약 및 성찰
        </h2>
        <div style={{ fontSize: '12px', lineHeight: '1.6', marginBottom: '10px' }}>
          <strong>내가 지키기로 약속한 공존 원칙:</strong>
          <ul style={{ paddingLeft: '18px', margin: '4px 0' }}>
            {(state?.selectedPrinciples && state.selectedPrinciples.length > 0 ? state.selectedPrinciples : rolePrinciples.slice(0, 2)).map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
        <div style={{ borderTop: '1px dashed #ccc', paddingTop: '8px', fontSize: '12px' }}>
          <strong>💡 배운 점과 다짐:</strong>
          <div style={{ height: '45px', borderBottom: '1px solid #ccc', marginTop: '6px' }}></div>
        </div>
      </div>
    </div>
  );
}
