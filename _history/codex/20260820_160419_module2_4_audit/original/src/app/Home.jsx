import React from 'react';
import { Link } from 'react-router-dom';
import geumjjokMain from '../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';
import speakerThumb from '../assets/geumjjok/스피커 썸네일.png';
import thumbMedia from '../assets/geumjjok/thumb_module2_media.png';
import thumbRole from '../assets/geumjjok/thumb_module3_role.png';
import thumbAgent from '../assets/geumjjok/thumb_module4_agent.png';

export default function Home() {
  return (
    <div className="container mt-4" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokMain} 
          alt="금쪽이 마스코트" 
          style={{ width: '88px', height: 'auto', marginBottom: '12px' }} 
        />
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-secondary)', margin: '0 0 8px 0' }}>
          금쪽이 AI 리터러시 탐험대
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', margin: 0 }}>
          AI의 원리를 탐구하고 올바른 디지털 시민성을 배우는 체험관이에요.
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* 모듈 1: 공정한 AI 실험실 (완성) */}
        <Link to="/fairness" style={{ textDecoration: 'none' }}>
          <div 
            className="card interactive-card" 
            style={{ 
              borderLeft: '6px solid var(--color-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px',
              padding: '20px'
            }}
          >
            <img 
              src={speakerThumb} 
              alt="공정한 AI 실험실 썸네일" 
              style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--color-border)' }} 
            />
            <div style={{ flex: 1 }}>
              <div className="flex justify-between items-center mb-1">
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  모듈 1 · 학습 가능
                </span>
                <span style={{ fontSize: '12px', backgroundColor: '#ccfbf1', color: 'var(--color-primary-hover)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                  체험 시작하기 →
                </span>
              </div>
              <h2 style={{ color: 'var(--color-text-main)', fontSize: 'var(--font-size-lg)', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                1. 공정한 AI 실험실
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                데이터와 기준에 따라 AI 추천이 어떻게 달라지는지 비교하고 공정성을 탐구해요.
              </p>
            </div>
          </div>
        </Link>

        {/* 모듈 2: 진실·미디어 검증소 (완성) */}
        <Link to="/verification" style={{ textDecoration: 'none' }}>
          <div 
          className="card interactive-card" 
          style={{ 
            borderLeft: '6px solid #2563eb', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            padding: '20px'
          }}
        >
          <img 
            src={thumbMedia} 
            alt="진실·미디어 검증소 썸네일" 
            style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--color-border)' }} 
          />
          <div style={{ flex: 1 }}>
            <div className="flex justify-between items-center mb-1">
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#2563eb' }}>
                모듈 2 · 학습 가능
              </span>
              <span style={{ fontSize: '12px', backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                체험 시작하기 →
              </span>
            </div>
            <h2 style={{ color: 'var(--color-text-main)', fontSize: 'var(--font-size-lg)', margin: '0 0 4px 0', fontWeight: 'bold' }}>
              2. 진실·미디어 검증소
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
              AI 답변의 주장과 합성 미디어의 출처·제작 이력·동의 조건을 차례로 검증해요.
            </p>
          </div>
          </div>
        </Link>

        {/* 모듈 3: AI 역할 선택소 (완성 & 활성화) */}
        <Link to="/role" style={{ textDecoration: 'none' }}>
          <div 
            className="card interactive-card" 
            style={{ 
              borderLeft: '6px solid #4f46e5', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px',
              padding: '20px'
            }}
          >
            <img 
              src={thumbRole} 
              alt="AI 역할 선택소 썸네일" 
              style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--color-border)' }} 
            />
            <div style={{ flex: 1 }}>
              <div className="flex justify-between items-center mb-1">
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#4f46e5' }}>
                  모듈 3 · 학습 가능
                </span>
                <span style={{ fontSize: '12px', backgroundColor: '#eef2ff', color: '#4338ca', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                  체험 시작하기 →
                </span>
              </div>
              <h2 style={{ color: 'var(--color-text-main)', fontSize: 'var(--font-size-lg)', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                3. AI 역할 선택소
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                상황에 맞는 AI 페르소나를 매칭하고 미래 업무 3구역을 분류하며 공존을 설계해요.
              </p>
            </div>
          </div>
        </Link>

        {/* 모듈 4: 에이전트 통제실 (준비 중) */}
        <div 
          className="card" 
          style={{ 
            opacity: 0.65, 
            borderLeft: '6px solid var(--color-border)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            padding: '20px'
          }}
        >
          <img 
            src={thumbAgent} 
            alt="에이전트 통제실 썸네일" 
            style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--color-border)' }} 
          />
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>
              모듈 4 · 준비 중
            </span>
            <h2 style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)', margin: '0 0 4px 0', fontWeight: 'bold' }}>
              4. 에이전트 통제실
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
              자율적으로 행동하는 AI 에이전트를 인간이 안전하게 통제하는 규칙을 배웁니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
