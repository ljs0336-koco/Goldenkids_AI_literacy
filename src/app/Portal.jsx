import React from 'react';
import { Link } from 'react-router-dom';
import './Portal.css';
import geumjjokMain from '../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';

export default function Portal() {
  return (
    <div className="portal-container">
      {/* Background Decorative Blobs */}
      <div className="portal-bg-blob portal-blob-1" aria-hidden="true" />
      <div className="portal-bg-blob portal-blob-2" aria-hidden="true" />
      <div className="portal-bg-blob portal-blob-3" aria-hidden="true" />

      {/* Header Section */}
      <header className="portal-header">
        <div className="portal-badge-pill">
          <span className="portal-pulse-dot" />
          <span>SEUNG AI LABS · INTEGRATED INNOVATION PLATFORM</span>
        </div>
        <h1 className="portal-title">
          Seung AI Labs <span className="portal-highlight">통합 포털</span>
        </h1>
        <p className="portal-subtitle">
          초·중등 <strong>AI 리터러시 실험실</strong>부터 <strong>피지컬 AI 융합교육 허브</strong>,
          그리고 <strong>에이전틱 AI 인사이트 덱</strong>까지<br />
          목적에 맞는 실습 및 연구 환경을 선택하여 바로 시작해보세요.
        </p>
      </header>

      {/* Main 3 Cards Grid */}
      <div className="portal-grid">
        {/* Card 1: AI Literacy Lab */}
        <section className="portal-card portal-card-literacy">
          <div className="portal-card-glow" />
          <div className="portal-card-badge-row">
            <span className="portal-tag tag-primary">AI 윤리 · 비판적 사고</span>
            <span className="portal-version-tag">4개 모듈</span>
          </div>

          <div className="portal-card-header">
            <div className="portal-card-avatar">
              <img src={geumjjokMain} alt="금쪽이 마스코트" className="portal-avatar-img" />
            </div>
            <div>
              <span className="portal-kicker">Interactive Simulation</span>
              <h2 className="portal-card-title">금쪽이 AI 리터러시 실험실</h2>
            </div>
          </div>

          <p className="portal-card-desc">
            학생 눈높이에 맞춘 4단계 참여형 시뮬레이터입니다. 데이터 편향, 미디어 팩트체크,
            역할 위임, 에이전트 안전까지 직접 조작하며 비판적 판단력을 기릅니다.
          </p>

          <ul className="portal-feature-list">
            <li>
              <span className="portal-feature-icon">⚖️</span>
              <div className="portal-feature-text">
                <strong>모듈 01. 공정한 AI 실험실</strong>
                <span>데이터 편향에 따른 추천 결과 비교 및 공정성 탐구</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">🔍</span>
              <div className="portal-feature-text">
                <strong>모듈 02. 진실·미디어 검증소</strong>
                <span>생성형 AI 합성 미디어 출처·진위 3단계 교차 검증</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">🤝</span>
              <div className="portal-feature-text">
                <strong>모듈 03. AI에게 무엇을 맡길까?</strong>
                <span>생활 속 업무 위임 기준 설정 및 인간의 책임 구분</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">🛡️</span>
              <div className="portal-feature-text">
                <strong>모듈 04. AI가 대신 움직인다면?</strong>
                <span>자율 에이전트 권한 통제 및 이상 행동 복구 체험</span>
              </div>
            </li>
          </ul>

          <div className="portal-card-footer">
            <Link to="/literacy" className="portal-btn portal-btn-primary">
              <span>리터러시 실험실 입장</span>
              <span className="portal-btn-arrow">→</span>
            </Link>
          </div>
        </section>

        {/* Card 2: Physical AI Hub */}
        <section className="portal-card portal-card-edutech">
          <div className="portal-card-glow" />
          <div className="portal-card-badge-row">
            <span className="portal-tag tag-secondary">피지컬 AI · 실습 도구</span>
            <span className="portal-version-tag">5주차 허브</span>
          </div>

          <div className="portal-card-header">
            <div className="portal-card-icon-box box-secondary">
              <span className="portal-large-emoji">🐕</span>
            </div>
            <div>
              <span className="portal-kicker kicker-secondary">Edutech Project Hub</span>
              <h2 className="portal-card-title">에듀테크 융합교육 허브</h2>
            </div>
          </div>

          <p className="portal-card-desc">
            서울대학교 에듀테크 연계 융합교육 프로젝트 수업용 허브입니다. 로보독 강화학습 시뮬레이터,
            질문 비교기, 통학 데이터 탐구 등 수업용 웹앱과 8개 팀별 과제 지도를 제공합니다.
          </p>

          <ul className="portal-feature-list">
            <li>
              <span className="portal-feature-icon">🤖</span>
              <div className="portal-feature-text">
                <strong>로보독 강화학습(RL) 실험실</strong>
                <span>Q-Learning vs SARSA 자율주행 미로 경로 탐색 시각화</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">💬</span>
              <div className="portal-feature-text">
                <strong>질문 전후 비교 웹앱</strong>
                <span>모호한 질문과 5단계 고도화 프롬프트 생성물 대조</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">📊</span>
              <div className="portal-feature-text">
                <strong>통학 데이터 탐구 웹앱 v2</strong>
                <span>서울 통학 시간·수단 실데이터 인터랙티브 차트 탐구</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">📋</span>
              <div className="portal-feature-text">
                <strong>8개 팀별 과제 지도 &amp; 실습 키트</strong>
                <span>차시별 교수학습과정안 양식, 가정통신문, 활동지 연동</span>
              </div>
            </li>
          </ul>

          <div className="portal-card-footer">
            <a href="./hub/index.html" className="portal-btn portal-btn-secondary">
              <span>융합교육 허브 입장</span>
              <span className="portal-btn-arrow">→</span>
            </a>
          </div>
        </section>

        {/* Card 3: Agentic AI Editorial Deck */}
        <section className="portal-card portal-card-deck">
          <div className="portal-card-glow" />
          <div className="portal-card-badge-row">
            <span className="portal-tag tag-terracotta">코코아팹 사업부</span>
            <span className="portal-version-tag">8개 슬라이드</span>
          </div>

          <div className="portal-card-header">
            <div className="portal-card-icon-box box-terracotta">
              <span className="portal-large-emoji">📑</span>
            </div>
            <div>
              <span className="portal-kicker kicker-terracotta">Editorial Insight Deck</span>
              <h2 className="portal-card-title">에이전틱 AI 인사이트 덱</h2>
            </div>
          </div>

          <p className="portal-card-desc">
            생각하는 도구에서 행동하는 동료로의 대전환. 에이전틱 AI의 3대 핵심 구조(뇌·도구·기억),
            프롬프트에서 워크플로우로의 전환, 오케스트레이션 및 가드레일 전략을 집약한 프레젠테이션 덱입니다.
          </p>

          <ul className="portal-feature-list">
            <li>
              <span className="portal-feature-icon">⚡</span>
              <div className="portal-feature-text">
                <strong>Part 1. 자율성의 스펙트럼</strong>
                <span>Chatbot ➡️ Copilot ➡️ Agent 진화 단계 분석</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">🔄</span>
              <div className="portal-feature-text">
                <strong>Part 2. 워크플로우 디자인</strong>
                <span>단일 LLM 호출에서 루프 및 도구 실행 구조로 확장</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">🛡️</span>
              <div className="portal-feature-text">
                <strong>인간 참여형(HITL) 제어</strong>
                <span>비가역적 액션 승인 체계 및 비상 정지(Kill Switch)</span>
              </div>
            </li>
            <li>
              <span className="portal-feature-icon">🎯</span>
              <div className="portal-feature-text">
                <strong>16:9 프레젠테이션 &amp; 인쇄 대응</strong>
                <span>키보드 방향키 이동 및 아카이벌 에디토리얼 레이아웃</span>
              </div>
            </li>
          </ul>

          <div className="portal-card-footer">
            <a href="./deck/index.html" className="portal-btn portal-btn-terracotta">
              <span>인사이트 덱 열람</span>
              <span className="portal-btn-arrow">→</span>
            </a>
          </div>
        </section>
      </div>

      {/* Footer Info */}
      <footer className="portal-footer">
        <p>© 2026 Seung AI Labs · 서울대학교 에듀테크 연계 융합교육 프로젝트 × 코코아팹 사업부</p>
        <p className="portal-footer-sub">모든 인터랙티브 시뮬레이션 및 에디토리얼 리포트는 브라우저에서 안전하게 구동됩니다.</p>
      </footer>
    </div>
  );
}
