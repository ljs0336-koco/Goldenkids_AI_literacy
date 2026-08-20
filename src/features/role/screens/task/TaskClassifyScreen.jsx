import React, { useState } from 'react';
import { workTasks } from '../../roleData';
import { calculateTaskDistribution } from '../../roleEngine';
import geumjjokDoctor from '../../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function TaskClassifyScreen({ taskClassifications = {}, onClassifyTask, onNext, onPrev }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const currentTask = workTasks[currentIndex];

  const distribution = calculateTaskDistribution(taskClassifications);
  const userZone = taskClassifications[currentTask?.id] || null;

  const handleZoneClick = (zone) => {
    if (onClassifyTask && currentTask) {
      onClassifyTask(currentTask.id, zone);
    }
    setShowHint(false);
    if (currentIndex < workTasks.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      {/* 헤더 타이틀 */}
      <div className="text-center mb-5">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px', color: 'var(--color-text-main)' }}>
          미래 업무 3구역 분류소 🔀
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          12가지 일들을 살펴보고, 가장 잘 맞는 역할을 골라주세요!
        </p>
      </div>

      {/* 진행 상황 컴팩트 바 */}
      <div 
        style={{ 
          backgroundColor: '#f8fafc', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--color-border)',
          padding: '12px 18px',
          marginBottom: '20px'
        }}
      >
        <div className="flex justify-between items-center mb-1.5" style={{ fontSize: '13px' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--color-primary-hover)' }}>
            📋 분류 진행: {distribution.classifiedCount} / {distribution.total}개
          </span>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
            업무 {currentIndex + 1} / {workTasks.length}
          </span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${(distribution.classifiedCount / distribution.total) * 100}%`, 
              height: '100%', 
              backgroundColor: 'var(--color-primary)',
              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
          />
        </div>
      </div>

      {/* 메인 인터랙티브 업무 카드 */}
      <div 
        className="card"
        style={{
          padding: '24px 28px',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--color-border)',
          backgroundColor: 'white',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          position: 'relative',
          transition: 'transform 0.2s ease'
        }}
      >
        {/* 상단 태그 및 말풍선 힌트 버튼 */}
        <div className="flex justify-between items-center mb-2">
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              padding: '3px 10px', 
              borderRadius: '20px', 
              backgroundColor: '#f1f5f9', 
              color: '#475569' 
            }}
          >
            {currentTask.category}
          </span>

          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 12px',
              borderRadius: '16px',
              border: showHint ? '1.5px solid var(--color-primary)' : '1px solid #cbd5e1',
              backgroundColor: showHint ? '#f0fdfa' : '#f8fafc',
              color: showHint ? 'var(--color-primary-hover)' : '#475569',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span>💬</span> {showHint ? '힌트 닫기' : '금쪽이 힌트'}
          </button>
        </div>

        {/* 팝오버 말풍선 힌트 */}
        {showHint && (
          <div 
            style={{
              backgroundColor: '#eff6ff',
              border: '1.5px solid #bfdbfe',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <img 
              src={geumjjokDoctor} 
              alt="금쪽이 힌트" 
              style={{ width: '40px', height: 'auto', flexShrink: 0 }} 
            />
            <div style={{ fontSize: '13px', color: '#1e3a8a', lineHeight: '1.5', textAlign: 'left' }}>
              <strong>💡 금쪽이의 힌트:</strong> {currentTask.rationale}
            </div>
          </div>
        )}

        {/* 업무 아이콘 & 제목 */}
        <div style={{ textAlign: 'center', margin: '8px 0 16px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px', lineHeight: 1 }}>
            {currentTask.icon}
          </div>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-text-main)', margin: '0 0 6px 0' }}>
            {currentTask.title}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', margin: '0 auto', maxWidth: '520px', lineHeight: '1.5' }}>
            {currentTask.description}
          </p>
        </div>

        {/* 3대 구역 선택 버튼 (크고 터치감 좋은 버튼) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => handleZoneClick('ai_auto')}
            style={{
              padding: '14px 10px',
              border: userZone === 'ai_auto' ? '2.5px solid #2563eb' : '1.5px solid #bfdbfe',
              backgroundColor: userZone === 'ai_auto' ? '#eff6ff' : '#fafafa',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              transform: userZone === 'ai_auto' ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <span style={{ fontSize: '26px' }}>🤖</span>
            <strong style={{ fontSize: '13.5px', color: userZone === 'ai_auto' ? '#1d4ed8' : '#1e3a8a' }}>AI가 주로</strong>
            <span style={{ fontSize: '11px', color: '#64748b' }}>단순 반복·규칙</span>
          </button>

          <button
            type="button"
            onClick={() => handleZoneClick('collaboration')}
            style={{
              padding: '14px 10px',
              border: userZone === 'collaboration' ? '2.5px solid var(--color-primary)' : '1.5px solid #99f6e4',
              backgroundColor: userZone === 'collaboration' ? '#f0fdfa' : '#fafafa',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              transform: userZone === 'collaboration' ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <span style={{ fontSize: '26px' }}>🤝</span>
            <strong style={{ fontSize: '13.5px', color: userZone === 'collaboration' ? 'var(--color-primary-hover)' : '#0f766e' }}>둘이서 협업</strong>
            <span style={{ fontSize: '11px', color: '#64748b' }}>초안·아이디어</span>
          </button>

          <button
            type="button"
            onClick={() => handleZoneClick('human_lead')}
            style={{
              padding: '14px 10px',
              border: userZone === 'human_lead' ? '2.5px solid #7c3aed' : '1.5px solid #e9d5ff',
              backgroundColor: userZone === 'human_lead' ? '#faf5ff' : '#fafafa',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              transform: userZone === 'human_lead' ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <span style={{ fontSize: '26px' }}>👤</span>
            <strong style={{ fontSize: '13.5px', color: userZone === 'human_lead' ? '#6d28d9' : '#7e22ce' }}>사람이 결정</strong>
            <span style={{ fontSize: '11px', color: '#64748b' }}>공감·책임·도덕</span>
          </button>
        </div>
      </div>

      {/* 12개 미니 번호 네비게이터 */}
      <div className="flex justify-center items-center gap-1.5 mb-6" style={{ flexWrap: 'wrap' }}>
        {workTasks.map((t, idx) => {
          const z = taskClassifications[t.id];
          const isCurr = idx === currentIndex;
          const bg = z === 'ai_auto' ? '#dbeafe' : z === 'collaboration' ? '#ccfbf1' : z === 'human_lead' ? '#ede9fe' : 'white';
          const borderColor = isCurr ? 'var(--color-primary)' : z ? '#94a3b8' : '#e2e8f0';

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => { setCurrentIndex(idx); setShowHint(false); }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: isCurr ? `2.5px solid ${borderColor}` : `1px solid ${borderColor}`,
                backgroundColor: bg,
                fontWeight: isCurr ? 'bold' : 'normal',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title={t.title}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* 하단 내비게이션 바 */}
      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 처음으로
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!distribution.isAllClassified}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}
        >
          {distribution.isAllClassified 
            ? "📊 분류 결과 & 가치 분석 보기 →" 
            : `12개 업무를 모두 분류해 주세요 (${distribution.classifiedCount}/12)`}
        </button>
      </div>
    </div>
  );
}
