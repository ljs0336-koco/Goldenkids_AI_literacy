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

describe('FairnessLab v5 paged student flow', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('1. 학생 화면과 활동지에 차시 번호가 노출되지 않는다', () => {
    render(<FairnessLabPage />);
    expect(screen.queryByText(/2차시|5차시/)).not.toBeInTheDocument();
    expect(screen.getByText('학습 데이터 탐구 · 약 10분')).toBeInTheDocument();

    const { container } = render(<FairnessWorksheet state={{ mode: 'growth' }} />);
    expect(container.textContent).not.toMatch(/2차시|5차시/);
  });

  it('2. 활동 선택 화면에서 두 실험의 목적과 시작 버튼을 확인한다', () => {
    render(<FairnessLabPage />);
    expect(screen.getByText('AI 금쪽이의 활동 추천, 그대로 따라도 될까?')).toBeInTheDocument();
    expect(screen.getByText('우리 학교 프로젝트 대표팀을 만들어라!')).toBeInTheDocument();
    expect(screen.getByText(/활동 추천 실험 시작하기/)).toBeInTheDocument();
    expect(screen.getByText(/대표팀 구성 시작하기/)).toBeInTheDocument();
  });

  it('3. 첫 장은 AI가 아는 것과 모르는 것을 쉬운 문장으로 구분한다', () => {
    render(<GrowthInitialScreen onNext={() => {}} />);
    expect(screen.getByText('AI가 지금 아는 것')).toBeInTheDocument();
    expect(screen.getByText('온라인 기록 3개')).toBeInTheDocument();
    expect(screen.getByText('AI가 아직 모르는 것')).toBeInTheDocument();
    expect(screen.getByText(/첫 번째 임시 추천/)).toBeInTheDocument();
    expect(screen.queryByText('✅ 기록됨')).not.toBeInTheDocument();
    expect(screen.getByText('이번에 비교할 체험 활동 4가지 보기')).toBeInTheDocument();
  });

  it('4. 첫 추천은 핵심 답만 보여 주고 자세한 점수는 접어 둔다', () => {
    render(<GrowthTempRecScreen questionId={null} onQuestion={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByRole('heading', { name: /코딩 메이커 교실/ })).toBeInTheDocument();
    expect(screen.getByText('AI가 계산한 단서 점수 보기')).toBeInTheDocument();
    expect(screen.getByText(/교실 활동과 하늘의 직접 선택/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /질문 하나를 골라 주세요/ })).toBeDisabled();
  });

  it('5. 빠진 기록은 한 장씩 확인하며 현재 장을 확인해야 다음 장으로 간다', () => {
    const { rerender } = render(
      <GrowthSupplementScreen viewedStudentIds={[]} onStudentViewed={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByLabelText('3장 중 1장')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /다음 기록/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /기록 3개를 차례로 확인해 주세요/ })).toBeDisabled();

    rerender(
      <GrowthSupplementScreen
        viewedStudentIds={['science_notebook', 'interest_choice', 'team_prototype']}
        onStudentViewed={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /전체 기록으로 다시 추천받기/ })).not.toBeDisabled();
  });

  it('6. 추천 비교는 처음 장에서 다시 추천 장으로 넘겨 확인한다', () => {
    render(<GrowthDeltaScreen onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByRole('heading', { name: /코딩 메이커 교실/ })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /과학 탐구 교실/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /다시 추천 장을 먼저 확인해 주세요/ })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: '다시 추천 →' }));
    expect(screen.getByRole('heading', { name: /과학 탐구 교실/ })).toBeInTheDocument();
    expect(screen.getByText('네 활동의 점수가 어떻게 달라졌는지 보기')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /내가 마지막으로 판단하기/ })).not.toBeDisabled();
  });

  it('7. 최종 판단은 OX 퀴즈가 아니라 확인 장과 학생 선택으로 마친다', () => {
    const { rerender } = render(
      <GrowthHumanCheckScreen checklist={[]} finalChoice={null} onToggleCheck={() => {}} onFinalChoice={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByLabelText('4장 중 1장')).toBeInTheDocument();
    expect(screen.queryByText(/정답이에요/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /확인한 뒤 나의 행동을 골라 주세요/ })).toBeDisabled();

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
    expect(screen.getByText(/하늘이에게 두 활동을 보여 주고 직접 묻는다/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /내 선택으로 탐구 마치기/ })).not.toBeDisabled();
  });

  it('8. 지원자 8명은 그리드가 아니라 한 명씩 넘겨 본다', () => {
    render(<CandidateScreen hasViewedAll onViewAll={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByLabelText('8장 중 1장')).toBeInTheDocument();
    expect(screen.getAllByText(/이전 대회 참여/)).toHaveLength(1);
    expect(screen.getByRole('button', { name: /팀 구성 기준 정하기/ })).not.toBeDisabled();
  });

  it('9. 팀 기준 4개도 한 장씩 비교하고 하나를 선택한다', () => {
    const { rerender } = render(<CriteriaScreen weights={null} setWeights={() => {}} onCalculate={() => {}} onPrev={() => {}} />);
    expect(screen.getByLabelText('4장 중 1장')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /마음에 드는 기준을 골라 주세요/ })).toBeDisabled();

    rerender(
      <CriteriaScreen
        weights={{ problemDiscovery: 30, digitalMaking: 35, communicationCollaboration: 20, presentation: 15, opportunity: 0 }}
        setWeights={() => {}}
        onCalculate={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /이 기준으로 AI 추천 보기/ })).not.toBeDisabled();
  });

  it('10. 대표팀 결과는 기존 명단, 새 명단, 역할 확인 순서로 넘긴다', () => {
    const oldTeam = [{ id: 'narae', name: '나래', score: 85, keyStrength: '디지털 제작' }];
    const newTeam = [{ id: 'bora', name: '보라', score: 88, keyStrength: '협업', problemDiscovery: 80, digitalMaking: 85, communicationCollaboration: 90, presentation: 80 }];
    render(<ResultScreen oldResults={oldTeam} newResults={newTeam} questionId="why" onQuestion={() => {}} onNext={() => {}} onPrev={() => {}} />);

    expect(screen.getByText('기존 기준으로 구성한 대표팀')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 결과/ }));
    expect(screen.getByText('우리 기준으로 구성한 대표팀')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 결과/ }));
    expect(screen.getByText('네 역할이 모두 있나요?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /이의제기 상황 보기/ })).not.toBeDisabled();
  });

  it('11. 이의제기 대응 3개도 한 장씩 탐색하고 선택의 결과를 본다', () => {
    render(<AppealScreen appealChoice={1} onSelectChoice={() => {}} onProceed={() => {}} onPrev={() => {}} />);
    expect(screen.getByLabelText('3장 중 1장')).toBeInTheDocument();
    expect(screen.getByText(/잘못된 70점이 데이터에 남고/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /내 선택 뒤에 생기는 일 보기/ })).not.toBeDisabled();
  });

  it('12. 기록 정정 선택 뒤에는 70점에서 92점으로 바뀐 결과를 보여 준다', () => {
    render(
      <AppealResultScreen
        appealChoice={2}
        criteriaWeights={{ problemDiscovery: 20, digitalMaking: 25, communicationCollaboration: 30, presentation: 15, opportunity: 10 }}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByText(/의사소통·협력: 70점 ➔ 92점/)).toBeInTheDocument();
    expect(screen.getByText(/데이터와 절차를 함께 바로잡는 선택/)).toBeInTheDocument();
  });

  it('13. 운영 원칙 5개는 한 장씩 보고 정확히 3개를 고른다', () => {
    const { rerender } = render(<PrinciplesScreen selectedPrinciples={[]} setSelectedPrinciples={() => {}} onComplete={() => {}} onPrev={() => {}} />);
    expect(screen.getByLabelText('5장 중 1장')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /원칙을 3개 골라 주세요/ })).toBeDisabled();

    rerender(
      <PrinciplesScreen
        selectedPrinciples={['판단 기준을 미리 공개한다.', '데이터의 출처, 누락, 오류를 확인한다.', '결과가 여러 사람에게 미치는 영향을 비교한다.']}
        setSelectedPrinciples={() => {}}
        onComplete={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /원칙 3개 저장하고 마치기/ })).not.toBeDisabled();
  });

  it('14. 진행 단계가 끝나면 네 단계가 모두 완료로 표시된다', () => {
    render(<ProgressStepper steps={['① AI가 본 기록', '② 빠진 기록', '③ 추천 비교', '④ 내가 선택']} currentStep={4} />);
    expect(document.querySelectorAll('.step-item.is-completed')).toHaveLength(4);
  });

  it('15. 활동 진입과 활동 고르기로 돌아가기가 동작한다', () => {
    render(<FairnessLabPage />);
    fireEvent.click(screen.getByText(/활동 추천 실험 시작하기/));
    expect(screen.getByText(/AI는 하늘의 일부 기록만 보고 있어요/)).toBeInTheDocument();
    expect(screen.getByText('① AI가 본 기록')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /활동 고르기/ }));
    expect(screen.getByText('AI 금쪽이와 함께하는 공정한 AI 실험실')).toBeInTheDocument();
  });

  it('16. 긴 안내 대신 손가락 행동 지시와 접이식 이유 도움말을 제공한다', () => {
    render(<FairnessLabPage />);
    fireEvent.click(screen.getByText(/활동 추천 실험 시작하기/));
    expect(screen.getByText('이 화면에서는')).toBeInTheDocument();
    expect(screen.getByText(/금쪽이에게 추천을 부탁할 준비/)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('이 활동을 하는 이유 보기'));
    expect(screen.getByText(/어떤 정보만 보고 있는지 먼저 알아야/)).toBeInTheDocument();
    expect(screen.queryByText('내가 할 일')).not.toBeInTheDocument();
  });

  it('17. 학생 헤더에는 도움말이 있고 교사 도구와 발표 화면은 없다', () => {
    render(<FairnessLabPage />);
    expect(screen.getByRole('button', { name: /현재 활동 도움말 열기/ })).toBeInTheDocument();
    expect(screen.queryByText('교사 도구')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /현재 활동 도움말 열기/ }));
    expect(screen.getByRole('dialog', { name: /무엇을 하면 되나요/ })).toBeInTheDocument();
  });

  it('18. 금쪽이 대화는 작은 제안일 뿐 진행 조건이 아니다', () => {
    render(<GrowthInitialScreen onNext={() => {}} />);
    expect(screen.getByText('금쪽이와도 대화해 보세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AI의 첫 추천 받아 보기/ })).not.toBeDisabled();
    expect(screen.queryByText(/대화 방법을 먼저 골라/)).not.toBeInTheDocument();
  });

  it('19. AI 질문도 한 장씩 넘겨 보고 한 질문을 고르면 다음으로 간다', () => {
    const first = render(<GrowthTempRecScreen questionId={null} onQuestion={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByLabelText('3장 중 1장')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /질문 하나를 골라 주세요/ })).toBeDisabled();
    first.unmount();

    render(<GrowthTempRecScreen questionId="why" onQuestion={() => {}} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByText(/온라인 기록에서 코딩 관련 단서가 가장 많이/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AI가 놓친 기록 찾아보기/ })).not.toBeDisabled();
  });

  it('20. 완료 화면에서 현재 선택이 반영된 탐구 기록을 확인한다', () => {
    window.localStorage.setItem('ai-literacy-lab:v5', JSON.stringify({
      ...initialFairnessState,
      mode: 'growth',
      growthStep: 5,
      growthQuestionId: 'missing',
      growthFinalChoice: 'ask_student',
      isGrowthCompleted: true
    }));
    render(<FairnessLabPage />);
    fireEvent.click(screen.getByRole('button', { name: /내 탐구 기록 보기/ }));
    const dialog = screen.getByRole('dialog', { name: /공정한 AI 실험실 나의 탐구 기록/ });
    expect(dialog).toHaveTextContent(/내가 AI에게 던진 질문:.*못 본 기록/s);
    expect(dialog).toHaveTextContent(/내가 최종 선택한 활동 또는 다음 행동:.*하늘이에게/s);
  });
});
