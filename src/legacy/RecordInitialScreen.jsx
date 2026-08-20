import React from 'react';
import { dataSets } from '../fairnessData';
import geumjjokCurious from '../../../assets/geumjjok/금쪽이_표정_궁금.png';

export default function RecordInitialScreen({ onNext }) {
  const dataset = dataSets.past;

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokCurious} 
          alt="궁금한 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          AI가 처음 받은 기록을 살펴봐요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', lineHeight: '1.5' }}>
          AI는 먼저 <strong>{dataset.title}</strong>을 받았어요.<br />
          어떤 내용이 들어있고 무엇이 빠졌는지 살펴보세요.
        </p>
      </div>

      {/* 과거 학습용 데이터 vs 오늘 지원자 구분 안내 */}
      <div 
        style={{ 
          backgroundColor: '#eff6ff', 
          padding: '16px 20px', 
          borderRadius: 'var(--radius-md)', 
          border: '1.5px solid #bfdbfe', 
          marginBottom: '20px' 
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontWeight: 'bold', color: '#1e40af', fontSize: 'var(--font-size-sm)' }}>
            📘 학습용 데이터: {dataset.title} (12명)
          </span>
          <span style={{ fontSize: '12px', backgroundColor: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
            과거 기록
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: '#1e3a8a', lineHeight: '1.5' }}>
          💡 <strong>구분하기:</strong> 이 12명의 기록은 AI가 규칙을 배우는 데 사용한 <strong>과거 학습용 데이터</strong>예요. 오늘 캠프에 새로 지원한 <strong>8명의 친구들</strong>과는 다른 기록입니다.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {dataset.tileItems.map((item) => (
          <div 
            key={item.id}
            className="flex justify-between items-center p-4"
            style={{
              borderRadius: 'var(--radius-md)',
              border: item.status ? '1.5px solid var(--color-teal)' : '1.5px dashed var(--color-border)',
              backgroundColor: item.status ? '#f0fdfa' : '#ffffff'
            }}
          >
            <span style={{ fontWeight: '600', fontSize: 'var(--font-size-base)', color: item.status ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>
              {item.label}
            </span>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'bold',
                backgroundColor: item.status ? '#ccfbf1' : '#fef3c7',
                color: item.status ? '#0f766e' : '#b45309'
              }}
            >
              {item.status ? '✅ 있음' : '❌ 없음'}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#fffbeb', borderRadius: 'var(--radius-sm)', border: '1px solid #fef08a', color: '#92400e', fontSize: 'var(--font-size-sm)' }}>
        🤔 <strong>생각해 보기:</strong> 과거에 선발되었던 친구들의 코딩 점수만 보여주면, AI는 어떤 규칙을 중요하게 배우게 될까요?
      </div>

      <div className="bottom-nav-bar">
        <div></div>
        <button 
          className="btn-primary" 
          onClick={onNext}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          🧠 이 기록으로 AI 학습시키기
        </button>
      </div>
    </div>
  );
}
