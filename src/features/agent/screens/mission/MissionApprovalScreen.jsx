import React, { useState } from 'react';
import { getMissionById } from '../../agentEngine';
import geumjjokDoctor from '../../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function MissionApprovalScreen({ missionId, decision, onDecide, onNext, onPrev }) {
  const mission = getMissionById(missionId);
  const [selectedDecision, setSelectedDecision] = useState(decision || null);
  const checkpoint = mission.humanCheckpoint;

  const handleChoose = (optId) => {
    setSelectedDecision(optId);
    if (onDecide) {
      onDecide(mission.id, optId);
    }
  };

  const currentOption = checkpoint.options.find(o => o.id === selectedDecision);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="text-center mb-5">
        <img src={geumjjokDoctor} alt="인간 검문소" style={{ width: '56px', height: 'auto', marginBottom: '6px' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px', color: '#b91c1c' }}>
          🛑 인간 승인 검문소 (Human Checkpoint)
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          외부로 영향을 미치는 고위험 도구 실행 전, 사람이 직접 내용을 확인하고 승인해야 합니다.
        </p>
      </div>

      {/* 에이전트가 작성한 초안 확인 박스 */}
      <div 
        style={{
          backgroundColor: '#fffbeb',
          border: '1.5px solid #fde047',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '20px'
        }}
      >
        <div style={{ fontSize: '12px', color: '#92400e', fontWeight: 'bold', marginBottom: '6px' }}>
          📄 AI 에이전트가 준비한 실행 초안:
        </div>
        <pre 
          style={{ 
            backgroundColor: 'white', 
            border: '1px solid #fef08a', 
            borderRadius: 'var(--radius-sm)', 
            padding: '12px 14px', 
            fontSize: '13px', 
            color: '#1e293b', 
            margin: 0, 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'inherit',
            lineHeight: '1.5'
          }}
        >
          {checkpoint.draftText}
        </pre>
      </div>

      {/* 질문 및 승인/반려 선택 버튼 */}
      <div style={{ backgroundColor: 'white', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '14px', textAlign: 'center' }}>
          {checkpoint.question}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {checkpoint.options.map(opt => {
            const isSelected = selectedDecision === opt.id;
            const isApprove = opt.id === 'approve';

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleChoose(opt.id)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected 
                    ? (isApprove ? '2.5px solid #059669' : '2.5px solid #dc2626') 
                    : '1.5px solid var(--color-border)',
                  backgroundColor: isSelected 
                    ? (isApprove ? '#ecfdf5' : '#fef2f2') 
                    : '#fafafa',
                  color: isSelected 
                    ? (isApprove ? '#065f46' : '#991b1b') 
                    : 'var(--color-text-main)',
                  fontWeight: isSelected ? 'bold' : '500',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* 선택 피드백 */}
        {currentOption && (
          <div 
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: currentOption.id === 'approve' ? '#f0fdfa' : '#fff1f2',
              border: currentOption.id === 'approve' ? '1px solid #99f6e4' : '1px solid #fecdd3',
              fontSize: '13px',
              color: currentOption.id === 'approve' ? '#0f766e' : '#be123c',
              lineHeight: '1.5',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            💡 <strong>판단 피드백:</strong> {currentOption.feedback}
          </div>
        )}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 실행 과정 다시보기
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!selectedDecision}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}
        >
          {selectedDecision ? "미션 결과 요약 보기 →" : "승인 또는 반려를 선택해 주세요"}
        </button>
      </div>
    </div>
  );
}
