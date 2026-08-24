import React, { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import LearningGuideToast from '../../components/LearningGuideToast';
import ProgressStepper from '../../components/ProgressStepper';
import WorksheetModal from '../../components/WorksheetModal';
import { announceLearningGuide } from '../../utils/learningGuide';
import { workTasks } from './roleData';
import { useRoleState } from './useRoleState';
import RoleHelpDrawer from './components/RoleHelpDrawer';
import RoleModeSelectScreen from './screens/RoleModeSelectScreen';
import PersonaScenarioScreen from './screens/persona/PersonaScenarioScreen';
import PersonaCompareScreen from './screens/persona/PersonaCompareScreen';
import PersonaFeedbackScreen from './screens/persona/PersonaFeedbackScreen';
import PersonaSummaryScreen from './screens/persona/PersonaSummaryScreen';
import TaskClassifyScreen from './screens/task/TaskClassifyScreen';
import TaskAnalysisScreen from './screens/task/TaskAnalysisScreen';
import TaskSummaryScreen from './screens/task/TaskSummaryScreen';
import RoleWorksheet from './print/RoleWorksheet';
import './role.css';

const clickGuides = {
  persona: [
    '네 상황 중 해 보고 싶은 카드 하나를 누르세요.',
    'A와 B 답을 읽고 지금 필요한 도움 하나를 고르세요.',
    '두 부탁 문장 중 하나를 골라 내 프롬프트를 완성하세요.',
    '완성 기록을 보고, 원하면 다른 상황도 이어서 해보세요.'
  ],
  task: [
    '세 가지 일 나누기 예시를 읽고 오른쪽 아래 시작 버튼을 누르세요.',
    'A와 B 중 하나를 고른 뒤 역할 결과를 읽고 ‘다음 일’을 누르세요.',
    '네 가지 일을 연결한 역할 지도를 읽고 다음 장으로 넘기세요.',
    '맡기기 전 질문을 확인한 뒤, 내가 지킬 원칙 하나를 고르세요.',
    '완성 기록을 확인하거나 다른 활동으로 돌아가세요.'
  ]
};

export default function RoleLabPage() {
  const { state, updateState, selectMode, resetState } = useRoleState();
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const scrollToTop = () => {
    const reduceMotion = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const move = (updates, guide) => {
    updateState(updates);
    scrollToTop();
    announceLearningGuide(guide);
  };

  const chooseMode = mode => {
    selectMode(mode);
    announceLearningGuide(mode ? clickGuides[mode][0] : '두 활동 중 궁금한 카드 하나를 눌러 시작하세요.');
    scrollToTop();
  };

  const personaSteps = ['① 상황 고르기', '② 두 답 비교', '③ 부탁 고쳐 쓰기'];
  const taskSteps = ['① 먼저 알아보기', '② 일 나누기', '③ 역할 지도', '④ 내 원칙'];

  const getProgress = () => {
    if (state.mode === 'persona') {
      return {
        steps: personaSteps,
        currentStep: state.personaStep >= 3 ? 3 : state.personaStep,
        subStepIndex: 0,
        subStepTotal: 1
      };
    }
    if (state.mode === 'task') {
      if (state.taskStep === 2) return { steps: taskSteps, currentStep: 4, subStepIndex: 0, subStepTotal: 1 };
      if (state.taskStep === 1) {
        return {
          steps: taskSteps,
          currentStep: state.taskAnalysisPage === 0 ? 2 : 3,
          subStepIndex: Math.max(0, state.taskAnalysisPage - 1),
          subStepTotal: state.taskAnalysisPage === 0 ? 1 : 2
        };
      }
      return {
        steps: taskSteps,
        currentStep: state.taskIntroSeen ? 1 : 0,
        subStepIndex: state.currentTaskIndex,
        subStepTotal: state.taskIntroSeen ? workTasks.length : 1
      };
    }
    return { steps: [], currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
  };

  const renderPersona = () => {
    if (state.personaStep === 0) {
      return (
        <PersonaScenarioScreen
          userPersonaChoices={state.userPersonaChoices}
          onSelectScenario={scenarioId => move(
            { currentScenarioId: scenarioId, personaStep: 1 },
            clickGuides.persona[1]
          )}
          onPrev={() => chooseMode(null)}
        />
      );
    }
    if (state.personaStep === 1) {
      return (
        <PersonaCompareScreen
          scenarioId={state.currentScenarioId}
          userChoice={state.userPersonaChoices[state.currentScenarioId]}
          onChoosePersona={(scenarioId, personaId) => updateState({
            userPersonaChoices: { ...state.userPersonaChoices, [scenarioId]: personaId }
          })}
          onNext={() => move({ personaStep: 2 }, clickGuides.persona[2])}
          onPrev={() => move({ personaStep: 0 }, clickGuides.persona[0])}
        />
      );
    }
    if (state.personaStep === 2) {
      return (
        <PersonaFeedbackScreen
          scenarioId={state.currentScenarioId}
          userChoice={state.userPersonaChoices[state.currentScenarioId]}
          recipeChoice={state.personaRecipeChoices[state.currentScenarioId]}
          onChooseRecipe={(scenarioId, recipeId) => updateState({
            personaRecipeChoices: { ...state.personaRecipeChoices, [scenarioId]: recipeId }
          })}
          onComplete={() => move({ personaStep: 3, isPersonaCompleted: true }, clickGuides.persona[3])}
          onPrev={() => move({ personaStep: 1 }, clickGuides.persona[1])}
        />
      );
    }
    return (
      <PersonaSummaryScreen
        currentScenarioId={state.currentScenarioId}
        personaRecipeChoices={state.personaRecipeChoices}
        onTryScenario={scenarioId => move({ currentScenarioId: scenarioId, personaStep: 1 }, clickGuides.persona[1])}
        onOpenRecord={() => setIsWorksheetOpen(true)}
        onBackToActivities={() => chooseMode(null)}
      />
    );
  };

  const renderTask = () => {
    if (state.taskStep === 0) {
      return (
        <TaskClassifyScreen
          introSeen={state.taskIntroSeen}
          currentTaskIndex={state.currentTaskIndex}
          taskClassifications={state.taskClassifications}
          onStart={() => move({ taskIntroSeen: true, currentTaskIndex: 0 }, clickGuides.task[1])}
          onClassifyTask={(taskId, zone) => updateState({
            taskClassifications: { ...state.taskClassifications, [taskId]: zone }
          })}
          onNextTask={() => move({ currentTaskIndex: state.currentTaskIndex + 1 }, clickGuides.task[1])}
          onPrevTask={() => move({ currentTaskIndex: Math.max(0, state.currentTaskIndex - 1) }, clickGuides.task[1])}
          onFinish={() => move({ taskStep: 1, taskAnalysisPage: 0 }, clickGuides.task[2])}
          onPrev={() => chooseMode(null)}
        />
      );
    }
    if (state.taskStep === 1) {
      return (
        <TaskAnalysisScreen
          page={state.taskAnalysisPage}
          taskClassifications={state.taskClassifications}
          selectedPrinciples={state.selectedPrinciples}
          onSelectPrinciple={principle => updateState({ selectedPrinciples: [principle] })}
          onNextPage={() => move(
            { taskAnalysisPage: Math.min(2, state.taskAnalysisPage + 1) },
            clickGuides.task[state.taskAnalysisPage === 0 ? 3 : 3]
          )}
          onPrevPage={() => {
            if (state.taskAnalysisPage === 0) {
              move({ taskStep: 0, currentTaskIndex: workTasks.length - 1 }, clickGuides.task[1]);
            } else {
              move({ taskAnalysisPage: state.taskAnalysisPage - 1 }, clickGuides.task[state.taskAnalysisPage === 1 ? 2 : 3]);
            }
          }}
          onComplete={() => move({ taskStep: 2, isTaskCompleted: true }, clickGuides.task[4])}
        />
      );
    }
    return (
      <TaskSummaryScreen
        selectedPrinciples={state.selectedPrinciples}
        onOpenRecord={() => setIsWorksheetOpen(true)}
        onReset={() => move({
          taskStep: 0,
          taskIntroSeen: false,
          currentTaskIndex: 0,
          taskAnalysisPage: 0,
          taskClassifications: {},
          selectedPrinciples: [],
          isTaskCompleted: false
        }, clickGuides.task[0])}
        onBackToActivities={() => chooseMode(null)}
      />
    );
  };

  const progress = getProgress();
  const initialGuide = state.mode ? clickGuides[state.mode][0] : '두 활동 중 궁금한 카드 하나를 눌러 시작하세요.';

  return (
    <div className="app-container role-app">
      <AppHeader
        title="AI에게 무엇을 맡길까?"
        showBackButton={state.mode !== null}
        onBackToActivities={() => chooseMode(null)}
        onReset={resetState}
        studentMode
        onHelp={() => setIsHelpOpen(true)}
      />
      <main className="container role-main no-print">
        {state.mode && (
          <ProgressStepper
            steps={progress.steps}
            currentStep={progress.currentStep}
            subStepIndex={progress.subStepIndex}
            subStepTotal={progress.subStepTotal}
          />
        )}
        {!state.mode ? <RoleModeSelectScreen onSelectMode={chooseMode} /> : state.mode === 'persona' ? renderPersona() : renderTask()}
      </main>

      <LearningGuideToast message={initialGuide} />
      <RoleHelpDrawer isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} mode={state.mode} />
      <WorksheetModal
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        onPrint={() => window.print()}
        title="AI 역할 활용 기록"
      >
        <RoleWorksheet state={state} />
      </WorksheetModal>
      <div className="print-only" style={{ display: 'none' }}><RoleWorksheet state={state} /></div>
    </div>
  );
}
