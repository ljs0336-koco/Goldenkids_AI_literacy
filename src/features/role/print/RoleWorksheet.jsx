import React from 'react';
import { aiPersonas, rolePrinciples, roleScenarios, taskZoneOptions, workTasks } from '../roleData';

const cell = { border: '1px solid #bbb7ad', padding: '8px', verticalAlign: 'top' };

export default function RoleWorksheet({ state }) {
  const scenario = roleScenarios.find(item => item.id === state?.currentScenarioId) || roleScenarios[0];
  const persona = aiPersonas.find(item => item.id === state?.userPersonaChoices?.[scenario.id]);
  const recipe = scenario.recipes.find(item => item.id === state?.personaRecipeChoices?.[scenario.id]);
  const principle = state?.selectedPrinciples?.[0] || rolePrinciples[0];

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', color: '#111', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '12px', marginBottom: '20px', borderBottom: '2px solid #222' }}>
        <div>
          <span style={{ color: '#555', fontSize: '12px', fontWeight: 'bold' }}>AI 리터러시 활동 기록</span>
          <h1 style={{ margin: '4px 0 0', fontSize: '21px' }}>AI에게 무엇을 맡길까?</h1>
        </div>
        <div style={{ fontSize: '13px', textAlign: 'right' }}>___학년 ___반 ___번<br />이름: _______________</div>
      </header>

      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ paddingLeft: '8px', borderLeft: '4px solid #2f6b63', fontSize: '16px' }}>1. AI에게 어떻게 부탁할까?</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <tbody>
            <tr><th style={{ ...cell, width: '24%', background: '#f1efe9', textAlign: 'left' }}>내가 고른 상황</th><td style={cell}>{scenario.situationTitle}</td></tr>
            <tr><th style={{ ...cell, background: '#f1efe9', textAlign: 'left' }}>먼저 고른 역할</th><td style={cell}>{persona ? persona.name : '선택하지 않음'}</td></tr>
            <tr><th style={{ ...cell, background: '#f1efe9', textAlign: 'left' }}>완성한 부탁</th><td style={cell}>{recipe?.prompt || '활동에서 부탁 문장을 완성해 보세요.'}</td></tr>
          </tbody>
        </table>
        <p style={{ margin: '9px 0 0', fontSize: '12px' }}><strong>핵심:</strong> 역할 + 할 일 + 조건과 순서를 말하면 AI의 도움을 더 또렷하게 정할 수 있어요.</p>
      </section>

      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ paddingLeft: '8px', borderLeft: '4px solid #526c78', fontSize: '16px' }}>2. AI에게 어디까지 맡길까?</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead><tr style={{ background: '#f1efe9' }}><th style={cell}>학교 축제의 일</th><th style={cell}>내 선택</th><th style={cell}>도구와 사람의 역할</th></tr></thead>
          <tbody>
            {workTasks.map(task => {
              const chosen = taskZoneOptions.find(option => option.id === state?.taskClassifications?.[task.id]);
              return (
                <tr key={task.id}>
                  <td style={cell}><strong>{task.title}</strong></td>
                  <td style={cell}>{chosen?.shortLabel || '선택하지 않음'}</td>
                  <td style={cell}>{task.aiPart} → {task.humanPart}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section style={{ padding: '14px', border: '1.5px solid #222', borderRadius: '6px', background: '#fcfcfa' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: '15px' }}>3. 내가 먼저 지킬 원칙</h2>
        <p style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 'bold' }}>{principle}</p>
        <p style={{ margin: 0, fontSize: '12px' }}><strong>기억할 흐름:</strong> AI·자동화 → 사람 확인 → 수정 → 사람 최종 결정</p>
        <div style={{ height: '46px', marginTop: '10px', borderTop: '1px dashed #bbb' }}><span style={{ fontSize: '11px' }}>다음에 AI를 쓸 때 내가 해 볼 일:</span></div>
      </section>
    </div>
  );
}
