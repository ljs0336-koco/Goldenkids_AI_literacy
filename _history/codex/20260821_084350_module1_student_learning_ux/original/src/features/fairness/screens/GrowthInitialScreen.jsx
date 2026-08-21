import React from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationStudent
} from '../fairnessData';
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
          AI 금쪽이는 온라인 기록만 보고 있어요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', lineHeight: '1.5' }}>
          AI 금쪽이가 가상의 학생 <strong>{activityRecommendationStudent.name}</strong>에게 체험 활동 하나를 추천하려 해요.<br />
          먼저 어떤 데이터가 들어와 있고 무엇이 빠져 있는지 확인해 보세요.
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
          📊 AI가 현재 보고 있는 데이터
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center p-3" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid #dbeafe' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>💻 최근 온라인 학습 기록 ({activityRecommendationInitialRecords.length}개)</span>
            <span style={{ fontSize: '13px', backgroundColor: '#ccfbf1', color: '#0f766e', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
              ✅ 기록됨
            </span>
          </div>
          <div className="flex justify-between items-center p-3" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid #fee2e2' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>🏫 오프라인 수업 활동과 학생 관심 기록</span>
            <span style={{ fontSize: '13px', backgroundColor: '#fee2e2', color: '#b91c1c', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
              ⚠️ 누락됨
            </span>
          </div>
          <div className="flex justify-between items-center p-3" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid #fef3c7' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>🧭 여러 가능성을 고려한 활동 추천</span>
            <span style={{ fontSize: '13px', backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
              ❓ 확인할 수 없음
            </span>
          </div>
        </div>
      </div>

      {/* 평가 역량 3가지 설명 */}
      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '12px', color: 'var(--color-secondary)' }}>
        🎯 AI가 추천할 수 있는 활동 (4가지)
      </h3>
      <div className="flex flex-col gap-3 mb-6">
        {activityRecommendationOptions.map(option => (
          <div 
            key={option.key}
            className="p-4"
            style={{
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border)',
              backgroundColor: '#f8fafc'
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)', color: option.color }}>
                {option.name}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              {option.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 mb-6" style={{ backgroundColor: '#fffbeb', borderRadius: 'var(--radius-sm)', border: '1px solid #fef08a', color: '#92400e', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
        💡 <strong>생각해 보기:</strong> AI는 기록된 데이터만 비교할 수 있어요. 온라인 기록만 본 AI는 {activityRecommendationStudent.name}에게 어떤 활동을 추천할까요?
      </div>

      <div className="bottom-nav-bar">
        <div></div>
        <button 
          className="btn-primary" 
          onClick={onNext}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          🤖 AI 금쪽이의 첫 추천 보기 →
        </button>
      </div>
    </div>
  );
}
