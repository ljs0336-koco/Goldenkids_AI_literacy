import React, { useState, useEffect } from 'react';
import { killSwitchAnomaly } from '../../agentData';
import geumjjokEmbarrassed from '../../../../assets/geumjjok/금쪽이_표정_당황.png';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function KillSwitchSimScreen({ killSwitchTriggered, onTriggerKillSwitch, onNext, onPrev }) {
  const [isHalted, setIsHalted] = useState(killSwitchTriggered || false);
  const [logs, setLogs] = useState(() => (killSwitchTriggered ? killSwitchAnomaly.anomalyLog : []));

  useEffect(() => {
    if (isHalted) return;

    let current = 0;
    const interval = setInterval(() => {
      if (current < killSwitchAnomaly.anomalyLog.length) {
        setLogs(prev => [...prev, killSwitchAnomaly.anomalyLog[current]]);
        current++;
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isHalted]);

  const handlePressKillSwitch = () => {
    setIsHalted(true);
    setLogs(killSwitchAnomaly.anomalyLog);
    if (onTriggerKillSwitch) {
      onTriggerKillSwitch();
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      <div className="text-center mb-5">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px', color: isHalted ? '#059669' : '#dc2626' }}>
          {isHalted ? "🛡️ 에이전트 비상 차단 성공!" : "🚨 비상 상황! 킬스위치(Kill-Switch) 작동 훈련"}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          {isHalted 
            ? "비상 정지 버튼이 신속하게 작동하여 시스템 피해를 방지했습니다." 
            : "에이전트가 오작동에 빠졌습니다! 빨간색 비상 정지 버튼을 눌러 즉시 차단하세요!"}
        </p>
      </div>

      {/* 상황 설명 카드 */}
      <div 
        style={{
          backgroundColor: isHalted ? '#f0fdfa' : '#fef2f2',
          border: isHalted ? '1.5px solid #99f6e4' : '1.5px solid #fecaca',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <img 
          src={isHalted ? geumjjokCelebration : geumjjokEmbarrassed} 
          alt="상태 금쪽이" 
          style={{ width: '56px', height: 'auto', flexShrink: 0 }} 
        />
        <div style={{ fontSize: '13px', color: isHalted ? '#0f766e' : '#991b1b', lineHeight: '1.5' }}>
          <strong>{killSwitchAnomaly.title}</strong>
          <p style={{ margin: '4px 0 0 0' }}>
            {isHalted ? killSwitchAnomaly.successMessage : killSwitchAnomaly.scenario}
          </p>
        </div>
      </div>

      {/* 가상 에이전트 실행 로그 터미널 */}
      <div 
        style={{
          backgroundColor: '#0f172a',
          color: '#38bdf8',
          fontFamily: 'monospace',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '24px',
          minHeight: '160px',
          maxHeight: '220px',
          overflowY: 'auto',
          fontSize: '12.5px',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ color: '#94a3b8', borderBottom: '1px solid #334155', paddingBottom: '6px', marginBottom: '10px' }}>
          🖥️ AGENT_RUNTIME_CONSOLE v2.4 [LIVE_STREAM]
        </div>

        {logs.map((log, idx) => (
          <div key={idx} style={{ marginBottom: '4px' }}>
            <span style={{ color: '#64748b' }}>[{log.time}]</span> {log.text}
          </div>
        ))}

        {isHalted && (
          <div style={{ color: '#ef4444', fontWeight: 'bold', marginTop: '10px', animation: 'fadeIn 0.2s ease-out' }}>
            🛑 [EMERGENCY_HALT]: KILL-SWITCH TRIGGERED. ALL THREADS TERMINATED.
          </div>
        )}
      </div>

      {/* 커다란 빨간색 킬스위치 버튼 */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <button
          type="button"
          onClick={handlePressKillSwitch}
          disabled={isHalted}
          style={{
            padding: '20px 48px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: isHalted ? '#94a3b8' : '#dc2626',
            border: isHalted ? '4px solid #cbd5e1' : '4px solid #b91c1c',
            borderRadius: '50px',
            boxShadow: isHalted ? 'none' : '0 8px 25px rgba(220, 38, 38, 0.5)',
            cursor: isHalted ? 'default' : 'pointer',
            transition: 'all 0.15s ease',
            transform: isHalted ? 'none' : 'scale(1.05)'
          }}
        >
          {isHalted ? "✅ 비상 정지 완료 (SAFE)" : "🚨 비상 정지 누르기 (KILL-SWITCH)"}
        </button>
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 가드레일 다시 설정
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!isHalted}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}
        >
          {isHalted ? "📜 안전 사령관 헌장 발급받기 →" : "킬스위치를 눌러 에이전트를 먼저 정지해 주세요"}
        </button>
      </div>
    </div>
  );
}
