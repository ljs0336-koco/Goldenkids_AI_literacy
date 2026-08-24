import React, { useState } from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FairnessLabPage from './FairnessLabPage';
import GrowthInitialScreen from './screens/GrowthInitialScreen';
import GrowthTempRecScreen from './screens/GrowthTempRecScreen';
import GrowthSupplementScreen from './screens/GrowthSupplementScreen';
import GrowthDeltaScreen from './screens/GrowthDeltaScreen';
import GrowthHumanCheckScreen from './screens/GrowthHumanCheckScreen';
import CandidateScreen from './screens/CandidateScreen';
import CriteriaScreen from './screens/CriteriaScreen';
import ResultScreen from './screens/ResultScreen';
import AppealScreen from './screens/AppealScreen';
import AppealResultScreen from './screens/AppealResultScreen';
import PrinciplesScreen from './screens/PrinciplesScreen';
import CompletionScreen from './screens/CompletionScreen';
import FairnessWorksheet from './print/FairnessWorksheet';
import { projectTeamPresets } from './fairnessData';

function GrowthChoiceHarness() {
  const [selected, setSelected] = useState([]);
  const toggle = id => setSelected(current => current.includes(id) ? [] : [id]);
  return <GrowthDeltaScreen selectedCareerIds={selected} onToggleCareer={toggle} onNext={() => {}} onPrev={() => {}} />;
}

function CriteriaHarness() {
  const [weights, setWeights] = useState(null);
  return <CriteriaScreen weights={weights} setWeights={setWeights} onCalculate={() => {}} onPrev={() => {}} />;
}

function PrincipleHarness() {
  const [selected, setSelected] = useState([]);
  return <PrinciplesScreen selectedPrinciples={selected} setSelectedPrinciples={setSelected} onComplete={() => {}} onPrev={() => {}} />;
}

describe('Fairness module story-led student flow', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('1. 학생 화면과 활동지에 차시 번호가 노출되지 않는다', () => {
    render(<FairnessLabPage />);
    expect(screen.queryByText(/2차시|5차시/)).not.toBeInTheDocument();
    expect(screen.getByText('꿈·진로 탐색 · 약 10분')).toBeInTheDocument();

    const { container } = render(<FairnessWorksheet state={{ mode: 'growth' }} />);
    expect(container.textContent).not.toMatch(/2차시|5차시/);
  });

  it('2. 활동 선택 화면은 프로그램명이 아니라 학생이 만날 질문을 보여 준다', () => {
    render(<FairnessLabPage />);
    expect(screen.getByRole('heading', { name: 'AI의 선택, 그대로 믿어도 될까?' })).toBeInTheDocument();
    expect(screen.getByText('AI가 하늘이의 꿈을 골라 줘도 될까?')).toBeInTheDocument();
    expect(screen.getByText('프로젝트 팀을 AI에게 맡겨도 될까?')).toBeInTheDocument();
    expect(screen.queryByText('공정한 AI 실험실')).not.toBeInTheDocument();
  });

  it('3. 진로 활동은 점수보다 하늘이의 소개와 고민으로 시작한다', () => {
    render(<GrowthInitialScreen onNext={() => {}} />);
    expect(screen.getByRole('heading', { name: '하늘이를 소개해요' })).toBeInTheDocument();
    expect(screen.getByText(/내가 잘하면서도 즐겁게 할 수 있는 일/)).toBeInTheDocument();
    expect(screen.queryByText('정보 92점')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /하늘이와 AI에게 물어보기/ })).not.toBeDisabled();
  });

  it('4. AI가 받은 자료, 첫 직업, 되묻기를 장면 순서대로 보여 준다', () => {
    render(<GrowthTempRecScreen questionId={null} onQuestion={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByRole('heading', { name: /AI는 하늘이의 모든 모습을 알고 있을까요/ })).toBeInTheDocument();
    expect(screen.getByLabelText('성적표·학습 기록 · AI가 받은 자료')).toBeInTheDocument();
    expect(screen.getByText('정보 92점 · 수학 86점 · 과학 78점 · 국어 74점')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /소프트웨어 개발자/ })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /다음 장면/ }));
    expect(screen.getByRole('heading', { name: /소프트웨어 개발자/ })).toBeInTheDocument();
    expect(screen.getByLabelText('AI 추천 초안 · 사람 확인 전')).toBeInTheDocument();
    expect(screen.queryByText(/단서 점수|적합도/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /다음 장면/ }));
    expect(screen.getByText('AI 금쪽이에게 하나만 더 물어보세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /물어볼 질문 하나를 골라 주세요/ })).toBeDisabled();
  });

  it('5. 성적표 밖의 이야기는 한 장씩 AI에게 알려 준다', () => {
    const { rerender } = render(
      <GrowthSupplementScreen viewedStudentIds={[]} onStudentViewed={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByLabelText('4장 중 1장')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '이 이야기를 AI에게 알려주기' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /다음 이야기/ })).toBeDisabled();

    rerender(
      <GrowthSupplementScreen
        viewedStudentIds={['science_explainer', 'environment_project', 'team_ideas', 'student_voice']}
        onStudentViewed={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /새롭게 보이는 꿈 후보/ })).not.toBeDisabled();
  });

  it('6. 꿈 후보는 A/B로 바로 비교하고 먼저 알아볼 하나를 선택한다', () => {
    render(<GrowthChoiceHarness />);
    expect(screen.getByRole('heading', { name: '처음에는 직업 하나만 보였어요' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /넓어진 꿈 보기/ }));
    expect(screen.getByRole('button', { name: /환경 문제를 해결하는 소프트웨어 개발자/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /환경공학자/ })).toBeInTheDocument();
    expect(screen.queryByText('AI의 첫 제안도 계속 살펴보고 싶다면?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /환경공학자/ }));
    expect(screen.getByText('먼저 알아볼 꿈 선택 완료')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /이 꿈을 실제로 알아볼 방법/ })).not.toBeDisabled();
  });

  it('7. 진로 활동은 반복 체크리스트 대신 실제 다음 행동을 고른다', () => {
    render(
      <GrowthHumanCheckScreen
        selectedCareerIds={['environmentalEngineering', 'greenTech']}
        finalChoice="ask_and_research"
        onFinalChoice={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByText(/환경공학자/)).toBeInTheDocument();
    expect(screen.getByText(/환경 문제를 해결하는 소프트웨어 개발자/)).toBeInTheDocument();
    expect(screen.queryByText(/확인했나요/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /하늘이의 탐색 계획 완성하기/ })).not.toBeDisabled();
  });

  it('8. 팀 활동은 프로젝트 목표와 AI의 첫 명단으로 시작한다', () => {
    render(<CandidateScreen onViewAll={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByRole('heading', { name: '프로젝트 팀을 꾸려야 해요' })).toBeInTheDocument();
    expect(screen.getByText(/학교를 더 편리하게 만들 네 명/)).toBeInTheDocument();
    expect(screen.queryByText(/지원자 1/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'AI의 첫 팀 →' }));
    expect(screen.getByRole('heading', { name: 'AI는 네 명을 아주 빠르게 골랐어요' })).toBeInTheDocument();
    expect(screen.getByLabelText('AI 팀 추천 · 기준 확인 전')).toBeInTheDocument();
    expect(screen.getByText('현재 기록이 높은 학생을 먼저 본 결과')).toBeInTheDocument();
  });

  it('9. 팀 기준은 백분율보다 중요하게 보는 가치와 주의점을 보여 준다', () => {
    render(<CriteriaHarness />);
    expect(screen.getByRole('button', { name: /현재 역량 중심/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /역할 균형 중심/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /여러 조건을 함께 고려/ })).not.toBeInTheDocument();
    expect(screen.queryByText(/기획 30%|제작 35%/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /현재 역량 중심/ }));
    expect(screen.getByText('지금 기록된 수행')).toBeInTheDocument();
    expect(screen.getByText('빠른 결과')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /이 기준으로 달라진 팀 바로 보기/ })).not.toBeDisabled();
  });

  it('10. 팀 결과는 기준 전후, 기회 변화, 역할 확인 순서로 넘긴다', () => {
    const oldTeam = [
      { id: 'narae', name: '나래', keyStrength: '디지털 제작', problemDiscovery: 81, digitalMaking: 95, communicationCollaboration: 70, presentation: 82 },
      { id: 'daon', name: '다온', keyStrength: '기획', problemDiscovery: 90, digitalMaking: 65, communicationCollaboration: 80, presentation: 80 }
    ];
    const newTeam = [
      { id: 'bora', name: '보라', keyStrength: '협업', problemDiscovery: 80, digitalMaking: 85, communicationCollaboration: 90, presentation: 80 },
      { id: 'daon', name: '다온', keyStrength: '기획', problemDiscovery: 90, digitalMaking: 65, communicationCollaboration: 80, presentation: 80 }
    ];
    render(<ResultScreen oldResults={oldTeam} newResults={newTeam} questionId="why" onQuestion={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByText('AI의 처음 기준')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 비교/ }));
    expect(screen.getByText('새로 포함된 학생')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 비교/ }));
    expect(screen.getByText('네 역할이 모두 보이나요?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /잘못된 기록이 발견된 장면/ })).not.toBeDisabled();
  });

  it('11. 기록 오류 대응은 A/B와 접힌 제3안, 즉시 결과를 보여 준다', () => {
    render(<AppealScreen appealChoice={1} onSelectChoice={() => {}} onProceed={() => {}} onPrev={() => {}} />);
    expect(screen.getByRole('button', { name: /이미 결과가 나왔으니 그대로/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /기록을 92점으로 고치고/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /한결만 추가/ })).not.toBeInTheDocument();
    expect(screen.getByText(/잘못된 70점이 데이터에 남고/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /내 선택이 팀에 남긴 결과/ })).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /한결만 예외로 넣고 싶다면/ }));
    expect(screen.getByRole('button', { name: /한결만 추가/ })).toBeInTheDocument();
  });

  it('12. 기록 정정 결과는 기록, 팀, 재검토 원칙을 나눠 보여 준다', () => {
    render(
      <AppealResultScreen
        appealChoice={2}
        criteriaWeights={projectTeamPresets[2].weights}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByText('70점')).toBeInTheDocument();
    expect(screen.getByText('92점')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 결과/ }));
    expect(screen.getByRole('heading', { name: '네 명의 프로젝트 팀' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 결과/ }));
    expect(screen.getByText('기록')).toBeInTheDocument();
    expect(screen.getByText('기준')).toBeInTheDocument();
    expect(screen.getByText('절차')).toBeInTheDocument();
  });

  it('13. 운영 약속도 A/B와 접힌 제3안 중 하나를 고른다', () => {
    render(<PrincipleHarness />);
    expect(screen.getByRole('button', { name: /팀의 목표와 선택 기준/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /빠지거나 잘못된 기록/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /결과에 질문하고/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /팀의 목표와 선택 기준/ }));
    expect(screen.getByRole('button', { name: /이 약속을 저장하고 결과 보기/ })).not.toBeDisabled();
  });

  it('14. 활동 진입 뒤 진행 단계도 이야기 순서로 표시된다', () => {
    render(<FairnessLabPage />);
    fireEvent.click(screen.getByText('하늘이 만나기'));
    expect(screen.getByText('① 하늘이의 고민')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '하늘이를 소개해요' })).toBeInTheDocument();
  });

  it('15. 손가락 행동 지시와 접이식 이유 도움말을 제공한다', () => {
    render(<FairnessLabPage />);
    fireEvent.click(screen.getByText('하늘이 만나기'));
    expect(screen.getByText('이 화면에서는')).toBeInTheDocument();
    expect(screen.getByText(/하늘이의 고민을 읽고/)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('이 활동을 하는 이유 보기'));
    expect(screen.getByText(/실제 사람의 고민과 선택에 영향/)).toBeInTheDocument();
  });

  it('16. 학생 헤더에는 도움말이 있고 교사 도구와 발표 화면은 없다', () => {
    render(<FairnessLabPage />);
    expect(screen.getByRole('button', { name: /현재 활동 도움말 열기/ })).toBeInTheDocument();
    expect(screen.queryByText('교사 도구')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /현재 활동 도움말 열기/ }));
    expect(screen.getByRole('dialog', { name: /무엇을 하면 되나요/ })).toBeInTheDocument();
  });

  it('17. 금쪽이 스피커 대화는 작은 선택 제안이고 진행 조건은 아니다', () => {
    render(<CandidateScreen onViewAll={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.queryByText(/금쪽이 스피커가 곁에 있다면/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'AI의 첫 팀 →' }));
    expect(screen.getByText('금쪽이 스피커가 곁에 있다면')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AI가 사용한 기준/ })).not.toBeDisabled();
  });

  it('18. 완료 화면은 긴 인증서보다 처음과 달라진 결과를 보여 준다', () => {
    render(
      <CompletionScreen
        mode="growth"
        state={{
          growthCareerChoices: ['environmentalEngineering'],
          growthQuestionId: 'missing',
          growthFinalChoice: 'ask_and_research'
        }}
        onOpenRecord={() => {}}
        onReset={() => {}}
        onBackToActivities={() => {}}
      />
    );
    expect(screen.getByText('처음')).toBeInTheDocument();
    expect(screen.getByText('내가 확인한 뒤')).toBeInTheDocument();
    expect(screen.getByText(/환경공학자를 먼저 알아보기/)).toBeInTheDocument();
    expect(screen.getByText(/답보다 먼저 빠진 이야기/)).toBeInTheDocument();
  });
});
