import React from 'react';
import { growthAwardCompetencies } from '../fairnessData';
import geumjjokCurious from '../../../assets/geumjjok/금쪽이_표정_궁금.png';

export default function GrowthInitialScreen({ onNext }) {
  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokCurious} 
          alt="궁금한 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          12월의 현재 기록만 도착했어요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', lineHeight: '1.5' }}>
          AI 금쪽이가 1년 동안 가장 많이 성장한 학생에게 줄 <strong>성장상</strong> 후보를 추천하려 해요.<br />
          그런데 지금은 어떤 데이터가 들어와 있는지 확인해 보세요.
        </p>
      </div>

      {/* 데이터 상태 요약 카드 */}
      <div 
        style={{ 
          backgroundColor: '#eff6ff', 
          padding: '18px 20px', 
          borderRadius: 'var(--radius-md)', 
          border: '1.5px solid #bfdbfe', 
          marginBottom: '24px' 
        }}
      >
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: '#1e40af', margin: '0 0 12px 0' }}>
          📊 현재 도착한 데이터 상태
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center p-3" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid #dbeafe' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>📅 12월 현재 역량 기록 (6명)</span>
            <span style={{ fontSize: '13px', backgroundColor: '#ccfbf1', color: '#0f766e', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
              ✅ 기록됨
            </span>
          </div>
          <div className="flex justify-between items-center p-3" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid #fee2e2' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>🌱 3월 시작 당시 역량 기록</span>
            <span style={{ fontSize: '13px', backgroundColor: '#fee2e2', color: '#b91c1c', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
              ⚠️ 누락됨
            </span>
          </div>
          <div className="flex justify-between items-center p-3" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid #fef3c7' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>📈 1년간의 실제 성장 변화량</span>
            <span style={{ fontSize: '13px', backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
              ❓ 확인할 수 없음
            </span>
          </div>
        </div>
      </div>

      {/* 평가 역량 3가지 설명 */}
      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '12px', color: 'var(--color-secondary)' }}>
        🎯 성장상 평가 역량 (3가지)
      </h3>
      <div className="flex flex-col gap-3 mb-6">
        {growthAwardCompetencies.map(comp => (
          <div 
            key={comp.key}
            className="p-4"
            style={{
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border)',
              backgroundColor: '#f8fafc'
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)', color: comp.color }}>
                {comp.name}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              {comp.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#fffbeb', borderRadius: 'var(--radius-sm)', border: '1px solid #fef08a', color: '#92400e', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
        💡 <strong>생각해 보기:</strong> 현재 점수가 높다는 것과 1년 동안 많이 성장했다는 것은 달라요. 3월 기록이 빠진 상태에서 AI 금쪽이는 누구를 추천할까요?
      </div>

      <div className="bottom-nav-bar">
        <div></div>
        <button 
          className="btn-primary" 
          onClick={onNext}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          🤖 AI 금쪽이의 임시 추천 보기 →
        </button>
      </div>
    </div>
  );
}
