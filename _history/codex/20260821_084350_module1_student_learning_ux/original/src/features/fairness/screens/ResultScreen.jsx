import React from 'react';
import { getRecommendationDiff, evaluateTeamRoleBalance } from '../fairnessEngine';

export default function ResultScreen({ oldResults = [], newResults = [], onNext, onPrev }) {
  const diff = getRecommendationDiff(oldResults, newResults);
  const roleBalance = evaluateTeamRoleBalance(newResults);

  return (
    <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          선택한 기준에 따라 추천된 대표팀 4명이에요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          기존 기준과 비교하여 어떤 친구가 새로 포함되었는지, 그리고 팀의 4대 역할이 고르게 갖춰졌는지 확인해 보세요.
        </p>
      </div>

      {/* 1. 대표팀 명단 비교 (2열 그리드) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* 기존 기준 추천 명단 */}
        <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '12px' }}>
            기존 기준으로 구성한 대표팀
          </h3>
          <div className="flex flex-col gap-2">
            {oldResults.map((c) => (
              <div 
                key={c.id} 
                style={{ 
                  padding: '12px 14px', 
                  backgroundColor: '#f8fafc', 
                  borderRadius: 'var(--radius-sm)', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 'var(--font-size-sm)'
                }}
              >
                <div>
                  <span style={{ fontWeight: '600' }}>• {c.name}</span>
                  <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>({c.keyStrength})</span>
                </div>
                <span style={{ color: 'var(--color-text-muted)', fontWeight: 'bold' }}>{c.score}점</span>
              </div>
            ))}
          </div>
        </div>

        {/* 우리 기준 추천 명단 */}
        <div style={{ backgroundColor: '#f0fdfa', padding: '18px', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-primary-hover)', textAlign: 'center', marginBottom: '12px' }}>
            우리 기준으로 구성한 대표팀
          </h3>
          <div className="flex flex-col gap-2">
            {newResults.map((c) => {
              const isNew = diff.newlyAddedIds.includes(c.id);

              return (
                <div 
                  key={c.id} 
                  style={{ 
                    padding: '12px 14px', 
                    backgroundColor: isNew ? '#ccfbf1' : 'white', 
                    borderRadius: 'var(--radius-sm)', 
                    border: isNew ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    fontWeight: isNew ? 'bold' : '500',
                    fontSize: 'var(--font-size-sm)'
                  }}
                >
                  <div>
                    <span>• {c.name}</span>
                    <span style={{ fontSize: '12px', color: '#0f766e', marginLeft: '6px' }}>({c.keyStrength})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{c.score}점</span>
                    {isNew ? (
                      <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '10px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold' }}>
                        새로 포함
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '10px', backgroundColor: '#e2e8f0', color: '#475569' }}>
                        그대로 포함
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 이번 구성에 포함되지 않은 친구들 안내 */}
      {diff.excluded.length > 0 && (
        <div className="p-3 mb-6" style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: '#64748b' }}>
          ℹ️ <strong>참고:</strong> 기준이 바뀌면서 이번 구성에는 포함되지 않은 친구: {diff.excluded.map(c => c.name).join(', ')}
        </div>
      )}

      {/* 2. 우리 대표팀 역할 구성판 */}
      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '14px', color: 'var(--color-secondary)' }}>
          🧩 우리 대표팀 역할 구성판
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-sm)' }}>
            <span>🔎 문제 발견·기획</span>
            <span style={{ fontWeight: 'bold', color: roleBalance.problemDiscovery ? '#0f766e' : '#b45309' }}>
              {roleBalance.problemDiscovery ? '✅ 담당 있음' : '⚠️ 부족함'}
            </span>
          </div>

          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-sm)' }}>
            <span>💻 디지털 제작</span>
            <span style={{ fontWeight: 'bold', color: roleBalance.digitalMaking ? '#0f766e' : '#b45309' }}>
              {roleBalance.digitalMaking ? '✅ 담당 있음' : '⚠️ 부족함'}
            </span>
          </div>

          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-sm)' }}>
            <span>🤝 의사소통·협력</span>
            <span style={{ fontWeight: 'bold', color: roleBalance.communicationCollaboration ? '#0f766e' : '#b45309' }}>
              {roleBalance.communicationCollaboration ? '✅ 담당 있음' : '⚠️ 부족함'}
            </span>
          </div>

          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-sm)' }}>
            <span>🎤 발표·표현</span>
            <span style={{ fontWeight: 'bold', color: roleBalance.presentation ? '#0f766e' : '#b45309' }}>
              {roleBalance.presentation ? '✅ 담당 있음' : '⚠️ 부족함'}
            </span>
          </div>
        </div>

        {/* 역할 부족 시 질문 */}
        {!roleBalance.isBalanced ? (
          <div style={{ padding: '10px 14px', backgroundColor: '#fffbeb', borderRadius: 'var(--radius-sm)', border: '1px solid #fef08a', color: '#92400e', fontSize: 'var(--font-size-sm)' }}>
            🤔 <strong>생각해 보기:</strong> 개인의 특정 점수는 높지만, 프로젝트 팀 전체에 꼭 필요한 역할(기획/제작/협업/발표) 중 빠진 부분은 없나요?
          </div>
        ) : (
          <div style={{ padding: '10px 14px', backgroundColor: '#f0fdfa', borderRadius: 'var(--radius-sm)', border: '1px solid #99f6e4', color: '#0f766e', fontSize: 'var(--font-size-sm)' }}>
            🎉 <strong>역할 균형 완벽:</strong> 4가지 핵심 역할을 맡을 친구들이 모두 대표팀에 골고루 포함되었어요!
          </div>
        )}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          🙋 이의제기 및 재검토 확인하기 →
        </button>
      </div>
    </div>
  );
}
