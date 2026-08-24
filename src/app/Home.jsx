import React from 'react';
import { Link } from 'react-router-dom';
import geumjjokMain from '../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';
import speakerThumb from '../assets/geumjjok/스피커 썸네일.png';
import thumbMedia from '../assets/geumjjok/thumb_module2_media.png';
import thumbRole from '../assets/geumjjok/thumb_module3_role.png';
import thumbAgent from '../assets/geumjjok/thumb_module4_agent.png';

const modules = [
  {
    id: '01',
    path: '/fairness',
    title: '공정한 AI 실험실',
    description: '데이터와 기준에 따라 AI 추천이 어떻게 달라지는지 비교하고 공정성을 탐구해요.',
    image: speakerThumb
  },
  {
    id: '02',
    path: '/verification',
    title: '진실·미디어 검증소',
    description: 'AI 답변의 주장과 합성 미디어의 출처·제작 이력·동의 조건을 차례로 검증해요.',
    image: thumbMedia
  },
  {
    id: '03',
    path: '/role',
    title: 'AI에게 무엇을 맡길까?',
    description: '생활 속 부탁을 비교하고, 자동화·AI의 도움·사람의 결정을 구별해요.',
    image: thumbRole
  },
  {
    id: '04',
    path: '/agent',
    title: '에이전트 통제실',
    description: '실행 전 근거를 확인하고 권한·한도·중단·복구 절차를 설계하며 AI 감독관의 역할을 익혀요.',
    image: thumbAgent
  }
];

export default function Home() {
  return (
    <main className="container home-page">
      <header className="home-hero">
        <img src={geumjjokMain} alt="금쪽이 마스코트" />
        <div>
          <span className="home-kicker">AI LITERACY LEARNING LAB</span>
          <h1>금쪽이 AI 리터러시 탐험대</h1>
          <p>AI의 작동 원리를 차근차근 살펴보고, 더 나은 질문과 판단을 연습하는 네 가지 학습 활동입니다.</p>
        </div>
      </header>

      <section className="home-module-list" aria-label="AI 리터러시 학습 모듈">
        {modules.map(module => (
          <Link key={module.id} to={module.path} className="home-module-link">
            <article className="card interactive-card home-module-card">
              <div className="home-module-media">
                <img src={module.image} alt="" aria-hidden="true" />
              </div>
              <div className="home-module-copy">
                <div className="home-module-meta">
                  <span className="home-module-number">MODULE {module.id}</span>
                  <span className="home-module-status">학습 가능</span>
                </div>
                <h2>{module.id.replace(/^0/, '')}. {module.title}</h2>
                <p>{module.description}</p>
              </div>
              <span className="home-module-action" aria-hidden="true">활동 살펴보기 →</span>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
