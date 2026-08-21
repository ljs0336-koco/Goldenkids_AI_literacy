import React, { useState } from 'react';
import geumjjokEmbarrassed from '../../../assets/geumjjok/금쪽이_표정_당황.png';

export default function AppealScreen({ appealChoice, onSelectChoice, onProceed, onPrev }) {
  const [selectedOption, setSelectedOption] = useState(appealChoice || null);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
    if (onSelectChoice) {
      onSelectChoice(optionId);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokEmbarrassed} 
          alt="당황한 표정의 금쪽이" 
          style={{ width: '72px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          “선생님, 제 협업 기록이 잘못 들어갔어요!”
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', lineHeight: '1.6' }}>
          <strong>한결:</strong> "저번 모둠 프로젝트에서 친구들과 적극적으로 소통하고 협력했는데, 의사소통·협력 점수가 70점으로 잘못 기록되어 있어요. 확인해 주세요!"
        </p>
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde047', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: '#b45309', marginBottom: '4px' }}>
          🔍 선생님의 확인 결과
        </h3>
        <p style={{ margin: 0, color: '#92400e', fontSize: 'var(--font-size-sm)' }}>
          확인해 보니 전산 입력 오류가 맞았어요! 
          <br />(잘못 입력된 점수: <strong>70점</strong> ➔ 실제 확인된 정확한 점수: <strong>92점</strong>)
        </p>
      </div>

      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center', color: 'var(--color-secondary)' }}>
        선생님(관리자)으로서 어떻게 결정해야 할까요?
      </h3>

      <div className="flex flex-col gap-3 mb-6">
        {/* Option 1 */}
        <div
          className="card interactive-card"
          onClick={() => handleOptionClick(1)}
          style={{
            padding: '16px 20px',
            border: selectedOption === 1 ? '2px solid #ef4444' : '1px solid var(--color-border)',
            backgroundColor: selectedOption === 1 ? '#fef2f2' : 'white',
            marginBottom: 0
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOptionClick(1); }}
        >
          <div className="flex justify-between items-center">
            <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}>
              1. 이미 추천 결과가 나왔으니 넘어간다. (이의제기 무시하기)
            </span>
            {selectedOption === 1 && <span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: 'var(--font-size-sm)' }}>선택됨</span>}
          </div>
          {selectedOption === 1 && (
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #fca5a5', color: '#b91c1c', fontSize: 'var(--font-size-sm)' }}>
              ❌ <strong>공정하지 않아요:</strong> 기록에 명백한 오류가 있다면 확인하고 바로잡아야 해요. 다른 선택지를 골라보세요.
            </div>
          )}
        </div>

        {/* Option 2 (Correct) */}
        <div
          className="card interactive-card"
          onClick={() => handleOptionClick(2)}
          style={{
            padding: '16px 20px',
            border: selectedOption === 2 ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
            backgroundColor: selectedOption === 2 ? '#f0fdfa' : 'white',
            marginBottom: 0
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOptionClick(2); }}
        >
          <div className="flex justify-between items-center">
            <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}>
              2. 한결이의 기록을 92점으로 바로잡고 같은 기준으로 다시 추천을 계산한다.
            </span>
            {selectedOption === 2 && <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: 'var(--font-size-sm)' }}>선택됨</span>}
          </div>
          {selectedOption === 2 && (
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #99f6e4', color: 'var(--color-primary-hover)', fontSize: 'var(--font-size-sm)' }}>
              ✅ <strong>올바른 결정이에요!</strong> 잘못된 기록을 정정하고 같은 기준으로 다시 공정하게 평가해요.
            </div>
          )}
        </div>

        {/* Option 3 */}
        <div
          className="card interactive-card"
          onClick={() => handleOptionClick(3)}
          style={{
            padding: '16px 20px',
            border: selectedOption === 3 ? '2px solid #ef4444' : '1px solid var(--color-border)',
            backgroundColor: selectedOption === 3 ? '#fef2f2' : 'white',
            marginBottom: 0
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOptionClick(3); }}
        >
          <div className="flex justify-between items-center">
            <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}>
              3. 한결이만 특별히 대표팀에 포함시킨다. (규칙 예외 적용)
            </span>
            {selectedOption === 3 && <span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: 'var(--font-size-sm)' }}>선택됨</span>}
          </div>
          {selectedOption === 3 && (
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #fca5a5', color: '#b91c1c', fontSize: 'var(--font-size-sm)' }}>
              ❌ <strong>공정하지 않아요:</strong> 특정인에게만 예외를 두는 것은 다른 지원자들에게 불공정해요. 정해진 기준에 따라 다시 공정하게 계산해야 해요.
            </div>
          )}
        </div>
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button
          className="btn-primary"
          onClick={onProceed}
          disabled={selectedOption !== 2}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {selectedOption === 2 ? "수정된 대표팀 결과 확인하러 가기 →" : "올바른 결정을 선택해 주세요"}
        </button>
      </div>
    </div>
  );
}
