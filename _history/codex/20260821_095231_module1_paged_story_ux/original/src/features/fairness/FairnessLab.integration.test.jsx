import React from 'react';
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
import ProgressStepper from '../../components/ProgressStepper';
import FairnessWorksheet from './print/FairnessWorksheet';
import { initialFairnessState } from './useFairnessState';

describe('FairnessLab v5 UI & Flow Integration Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  /* 1. 차시 표기 미노출 검증 */
  it('1. [공통] 학생 화면 및 인쇄 활동지에 "2차시", "5차시" 표기가 전혀 노출되지 않는다', () => {
    render(<FairnessLabPage />);

    // Check main mode selection
    expect(screen.queryByText(/2차시/)).not.toBeInTheDocument();
    expect(screen.queryByText(/5차시/)).not.toBeInTheDocument();
    expect(screen.getByText('학습 데이터 탐구 · 약 10분')).toBeInTheDocument();
    expect(screen.getByText('AI 공정성 탐구 · 약 15분')).toBeInTheDocument();

    // Check worksheet render
    const { container } = render(<FairnessWorksheet state={{ mode: 'growth' }} />);
    expect(container.textContent).not.toContain('2차시');
    expect(container.textContent).not.toContain('5차시');
  });

  /* 2. 활동 선택 화면 */
  it('2. [선택 화면] 모드 선택 화면에 활동 추천과 대표팀 구성 카드가 올바른 제목과 버튼으로 렌더링된다', () => {
    render(<FairnessLabPage />);

    expect(screen.getByText('AI 금쪽이와 함께하는 공정한 AI 실험실')).toBeInTheDocument();
    expect(screen.getByText('AI 금쪽이의 활동 추천, 그대로 따라도 될까?')).toBeInTheDocument();
    expect(screen.getByText('우리 학교 프로젝트 대표팀을 만들어라!')).toBeInTheDocument();
    expect(screen.getByText(/활동 추천 실험 시작하기/)).toBeInTheDocument();
    expect(screen.getByText(/대표팀 구성 시작하기/)).toBeInTheDocument();
  });

  /* 3. 활동 추천 1: GrowthInitialScreen (기존 파일명 유지) */
  it('3. [활동 추천 1단계] 온라인 기록은 포함되고 오프라인·관심 기록은 누락된 상태가 표시된다', () => {
    render(<GrowthInitialScreen onNext={() => {}} />);

    expect(screen.getByText('AI 금쪽이는 온라인 기록만 보고 있어요')).toBeInTheDocument();
    expect(screen.getByText('✅ 기록됨')).toBeInTheDocument();
    expect(screen.getByText('⚠️ 누락됨')).toBeInTheDocument();
    expect(screen.getByText('❓ 확인할 수 없음')).toBeInTheDocument();
  });

  /* 4. 활동 추천 2: GrowthTempRecScreen */
  it('4. [활동 추천 2단계] 온라인 기록만 사용하면 코딩 메이커 교실을 처음 추천하고 누락을 경고한다', () => {
    render(<GrowthTempRecScreen onNext={() => {}} onPrev={() => {}} />);

    expect(screen.getAllByText(/코딩 메이커 교실/).length).toBeGreaterThan(0);
    expect(screen.getByText(/코딩 메이커: 9점/)).toBeInTheDocument();
    expect(screen.getByText(/코딩 활동과 관련된 단서가 가장 많이 보여요/)).toBeInTheDocument();
    expect(screen.getByText(/오프라인 수업 활동과 하늘이 직접 표현한 관심이 빠져 있어요/)).toBeInTheDocument();
  });

  /* 5. 활동 추천 3: GrowthSupplementScreen */
  it('5. [활동 추천 3단계] 빠진 기록 3개를 모두 확인하기 전에는 진행 버튼이 비활성화된다', () => {
    const { rerender } = render(
      <GrowthSupplementScreen viewedStudentIds={['science_notebook']} onNext={() => {}} onPrev={() => {}} />
    );

    const nextBtn = screen.getByRole('button', { name: /빠진 기록 3개를 모두 확인해 주세요/i });
    expect(nextBtn).toBeDisabled();

    // All 3 missing records viewed
    rerender(
      <GrowthSupplementScreen 
        viewedStudentIds={['science_notebook', 'interest_choice', 'team_prototype']} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    const activeBtn = screen.getByRole('button', { name: /같은 규칙으로 추천 다시 계산하기/i });
    expect(activeBtn).not.toBeDisabled();
  });

  /* 6. 활동 추천 4: GrowthDeltaScreen */
  it('6. [활동 추천 4단계] 온라인 기록과 전체 기록의 추천을 비교해 코딩에서 과학으로 변화를 보여 준다', () => {
    render(<GrowthDeltaScreen onNext={() => {}} onPrev={() => {}} />);

    // 1:1 comparison headers
    expect(screen.getByText(/처음 추천: 온라인 기록 3개만 사용/)).toBeInTheDocument();
    expect(screen.getAllByText(/코딩 메이커 교실/).length).toBeGreaterThan(0);
    expect(screen.getByText(/다시 추천: 전체 기록 6개 사용/)).toBeInTheDocument();
    expect(screen.getAllByText(/과학 탐구 교실/).length).toBeGreaterThan(0);
    expect(screen.getByText(/4점 → 16점 \(\+12\)/)).toBeInTheDocument();
  });

  /* 7. 활동 추천 5: GrowthHumanCheckScreen */
  it('7. [활동 추천 5단계] 퀴즈 정답 강요 없이 4개 확인과 학생의 최종 선택으로 완료한다', () => {
    const { rerender } = render(
      <GrowthHumanCheckScreen 
        checklist={['check_sources', 'check_missing']} 
        finalChoice={null}
        onToggleCheck={() => {}} 
        onFinalChoice={() => {}}
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByRole('button', { name: /확인 4개와 나의 선택을 완료해 주세요/i })).toBeDisabled();
    expect(screen.queryByText(/정답이에요!/i)).not.toBeInTheDocument();

    // 모든 확인을 마쳤더라도 학생 선택 전에는 완료하지 않는다.
    rerender(
      <GrowthHumanCheckScreen 
        checklist={['check_sources', 'check_missing', 'check_interest', 'check_human_choice']} 
        finalChoice={null}
        onToggleCheck={() => {}} 
        onFinalChoice={() => {}}
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByRole('button', { name: /확인 4개와 나의 선택을 완료해 주세요/i })).toBeDisabled();

    // 세 선택 중 어느 것이든 이유를 읽고 선택하면 완료할 수 있다.
    rerender(
      <GrowthHumanCheckScreen 
        checklist={['check_sources', 'check_missing', 'check_interest', 'check_human_choice']} 
        finalChoice="ask_student"
        onToggleCheck={() => {}} 
        onFinalChoice={() => {}}
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByRole('button', { name: /내 선택으로 탐구 마치기/i })).not.toBeDisabled();
  });

  /* 8. 대표팀 활동 1: CandidateScreen */
  it('8. [대표팀 1단계] CandidateScreen: 지원자 8명의 4대 역량과 이전 대회 참여 경험(회수 원자료)이 렌더링된다', () => {
    render(<CandidateScreen hasViewedAll={true} speakerPath="sample" onSpeakerPath={() => {}} onNext={() => {}} onPrev={() => {}} />);

    expect(screen.getByText('프로젝트 대표팀 지원자 8명의 기록을 살펴봐요')).toBeInTheDocument();
    expect(screen.getAllByText(/이전 대회 참여 경험:/).length).toBe(8);
    expect(screen.getByRole('button', { name: /팀 구성 기준 정하러 가기/i })).not.toBeDisabled();
  });

  /* 9. 대표팀 활동 2: CriteriaScreen */
  it('9. [대표팀 2단계] CriteriaScreen: 4개 팀 구성 기준 프리셋 카드가 렌더링되며 선택 전에는 진행이 불가하다', () => {
    const { rerender } = render(
      <CriteriaScreen weights={null} setWeights={() => {}} onCalculate={() => {}} onPrev={() => {}} />
    );

    expect(screen.getByRole('button', { name: /기준 카드를 먼저 선택해 주세요/i })).toBeDisabled();

    rerender(
      <CriteriaScreen 
        weights={{ problemDiscovery: 25, digitalMaking: 25, communicationCollaboration: 25, presentation: 25, opportunity: 0 }} 
        setWeights={() => {}} 
        onCalculate={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByRole('button', { name: /대표팀 추천 결과 계산하기/i })).not.toBeDisabled();
  });

  /* 10. 대표팀 활동 3: ResultScreen 및 팀 역할판 */
  it('10. [대표팀 3단계] ResultScreen: 기존 기준 vs 우리 기준 대표팀 비교와 4대 역할판 충족 여부가 표시된다', () => {
    const oldTeam = [
      { id: 'narae', name: '나래', score: 85, keyStrength: '디지털 제작' },
      { id: 'daon', name: '다온', score: 82, keyStrength: '문제 발견' }
    ];
    const newTeam = [
      { id: 'narae', name: '나래', score: 85, keyStrength: '디지털 제작', problemDiscovery: 85, digitalMaking: 90, communicationCollaboration: 85, presentation: 85 },
      { id: 'bora', name: '보라', score: 88, keyStrength: '협업', problemDiscovery: 80, digitalMaking: 85, communicationCollaboration: 90, presentation: 80 }
    ];

    render(<ResultScreen oldResults={oldTeam} newResults={newTeam} onNext={() => {}} onPrev={() => {}} />);

    expect(screen.getByText('기존 기준으로 구성한 대표팀')).toBeInTheDocument();
    expect(screen.getByText('우리 기준으로 구성한 대표팀')).toBeInTheDocument();
    expect(screen.getByText('새로 포함')).toBeInTheDocument();
    expect(screen.getByText('🧩 우리 대표팀 역할 구성판')).toBeInTheDocument();
  });

  /* 11. 대표팀 활동 4: AppealScreen */
  it('11. [대표팀 4단계] AppealScreen: 모든 대응을 탐색할 수 있고 선택의 결과를 먼저 보여 준다', () => {
    render(<AppealScreen appealChoice={1} onSelectChoice={() => {}} onProceed={() => {}} onPrev={() => {}} />);

    expect(screen.getByText(/잘못된 70점이 데이터에 남고/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /이 선택 뒤에 생기는 일 확인하기/i })).not.toBeDisabled();
    expect(screen.queryByText(/올바른 결정을 선택해 주세요/i)).not.toBeInTheDocument();
  });

  /* 12. 대표팀 활동 5: AppealResultScreen */
  it('12. [대표팀 5단계] AppealResultScreen: 한결의 총점 정정 및 대표팀 재계산 결과가 표시된다', () => {
    render(
      <AppealResultScreen 
        appealChoice={2}
        criteriaWeights={{ problemDiscovery: 20, digitalMaking: 25, communicationCollaboration: 30, presentation: 15, opportunity: 10 }} 
        onNext={() => {}} 
        onPrev={() => {}} 
      />
    );

    expect(screen.getByText(/한결 학생의 기록은 어떻게 되었나요/i)).toBeInTheDocument();
    expect(screen.getByText(/의사소통·협력: 70점 ➔ 92점/i)).toBeInTheDocument();
    expect(screen.getByText(/데이터와 절차를 함께 바로잡는 선택/i)).toBeInTheDocument();
  });

  /* 13. 대표팀 활동 6: PrinciplesScreen */
  it('13. [대표팀 6단계] PrinciplesScreen: 정확히 3개의 운영 원칙을 선택해야 완료 버튼이 활성화된다', () => {
    const { rerender } = render(
      <PrinciplesScreen selectedPrinciples={['원칙1']} setSelectedPrinciples={() => {}} onComplete={() => {}} onPrev={() => {}} />
    );

    expect(screen.getByRole('button', { name: /원칙을 3개 골라주세요/i })).toBeDisabled();

    rerender(
      <PrinciplesScreen selectedPrinciples={['원칙1', '원칙2', '원칙3']} setSelectedPrinciples={() => {}} onComplete={() => {}} onPrev={() => {}} />
    );

    expect(screen.getByRole('button', { name: /원칙 3개 저장하고 미션 완료하기/i })).not.toBeDisabled();
  });

  /* 14. Stepper 완료 체크 */
  it('14. [공통] ProgressStepper: currentStep이 4일 때 모든 4단계에 완료 체크가 표시된다', () => {
    render(
      <ProgressStepper 
        steps={['① AI가 본 기록', '② 빠진 기록', '③ 추천 비교', '④ 사람이 선택']} 
        currentStep={4} 
      />
    );

    const completedSteps = document.querySelectorAll('.step-item.is-completed');
    expect(completedSteps).toHaveLength(4);
  });

  /* 15. 전체 앱 내비게이션 및 모드 전환 */
  it('15. [전체 앱] 활동 추천 실험 및 대표팀 구성 실험 진입과 초기화가 정상 작동한다', () => {
    render(<FairnessLabPage />);

    // Click '활동 추천 실험 시작하기'
    const growthBtn = screen.getByText(/활동 추천 실험 시작하기/);
    fireEvent.click(growthBtn);

    expect(screen.getByText('AI 금쪽이는 온라인 기록만 보고 있어요')).toBeInTheDocument();
    expect(screen.getByText('① AI가 본 기록')).toBeInTheDocument();

    // Click '활동 고르기'
    const backBtn = screen.getByRole('button', { name: /활동 고르기/i });
    fireEvent.click(backBtn);

    // Main selection
    expect(screen.getByText('AI 금쪽이와 함께하는 공정한 AI 실험실')).toBeInTheDocument();
  });

  it('16. [학습 안내] 활동에 들어가면 할 일, 배울 점, AI 리터러시 연결이 바로 보인다', () => {
    render(<FairnessLabPage />);
    fireEvent.click(screen.getByText(/활동 추천 실험 시작하기/));

    expect(screen.getByText('내가 할 일')).toBeInTheDocument();
    expect(screen.getByText('여기서 배우는 것')).toBeInTheDocument();
    expect(screen.getByText(/데이터 확인 · AI에게 되묻기 · 최종 판단/)).toBeInTheDocument();
    expect(screen.getAllByText('지금 할 일').length).toBeGreaterThan(0);
  });

  it('17. [학생 헤더] 모듈 1에는 도움말이 있고 교사 도구와 발표 화면은 노출되지 않는다', () => {
    render(<FairnessLabPage />);

    expect(screen.getByRole('button', { name: /현재 활동 도움말 열기/i })).toBeInTheDocument();
    expect(screen.queryByText('교사 도구')).not.toBeInTheDocument();
    expect(screen.queryByText(/발표 화면/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /현재 활동 도움말 열기/i }));
    expect(screen.getByRole('dialog', { name: /무엇을 하면 되나요/i })).toBeInTheDocument();
  });

  it('18. [스피커 연결] 실제 금쪽이 대화 또는 준비된 응답을 고른 뒤 첫 추천으로 진행한다', () => {
    const onNext = () => {};
    render(<GrowthInitialScreen speakerPath={null} onSpeakerPath={() => {}} onNext={onNext} />);

    expect(screen.getByRole('button', { name: /대화 방법을 먼저 골라 주세요/i })).toBeDisabled();

    const { unmount } = render(<GrowthInitialScreen speakerPath="sample" onSpeakerPath={() => {}} onNext={onNext} />);
    expect(screen.getAllByRole('button', { name: /AI 금쪽이의 첫 추천 보기/i }).at(-1)).not.toBeDisabled();
    unmount();
  });

  it('19. [AI 핑퐁] 학생이 질문을 골라야 준비된 AI 설명을 확인하고 다음으로 간다', () => {
    const { rerender } = render(
      <GrowthTempRecScreen questionId={null} onQuestion={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByRole('button', { name: /AI에게 질문을 하나 골라 주세요/i })).toBeDisabled();

    rerender(<GrowthTempRecScreen questionId="missing" onQuestion={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByText(/온라인 기록 3개만 보고 있어/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /빠진 기록 찾아보기/i })).not.toBeDisabled();
  });

  it('20. [탐구 기록] 완료 화면에서 현재 선택이 반영된 활동지를 바로 확인한다', () => {
    window.localStorage.setItem('ai-literacy-lab:v5', JSON.stringify({
      ...initialFairnessState,
      mode: 'growth',
      growthStep: 5,
      growthSpeakerPath: 'sample',
      growthQuestionId: 'missing',
      growthFinalChoice: 'ask_student',
      isGrowthCompleted: true
    }));

    render(<FairnessLabPage />);
    fireEvent.click(screen.getByRole('button', { name: /내 탐구 기록 보기/i }));

    const recordDialog = screen.getByRole('dialog', { name: /공정한 AI 실험실 나의 탐구 기록/i });
    expect(recordDialog).toHaveTextContent(/내가 AI에게 던진 질문:.*못 본 기록/s);
    expect(recordDialog).toHaveTextContent(/내가 최종 선택한 활동 또는 다음 행동:.*하늘이에게/s);
  });
});
