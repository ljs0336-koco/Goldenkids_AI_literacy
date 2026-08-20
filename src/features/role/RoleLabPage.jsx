import React, { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import ProgressStepper from '../../components/ProgressStepper';
import { useRoleState } from './useRoleState';
import RoleModeSelectScreen from './screens/RoleModeSelectScreen';
import PersonaScenarioScreen from './screens/persona/PersonaScenarioScreen';
import PersonaCompareScreen from './screens/persona/PersonaCompareScreen';
import PersonaFeedbackScreen from './screens/persona/PersonaFeedbackScreen';
import PersonaSummaryScreen from './screens/persona/PersonaSummaryScreen';
import TaskClassifyScreen from './screens/task/TaskClassifyScreen';
import TaskAnalysisScreen from './screens/task/TaskAnalysisScreen';
import TaskSummaryScreen from './screens/task/TaskSummaryScreen';
import RoleWorksheet from './print/RoleWorksheet';
import WorksheetModal from '../../components/WorksheetModal';

export default function RoleLabPage() {
  const { state, updateState, selectMode, resetState } = useRoleState();
  const [isPresentation, setIsPresentation] = useState(false);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);

  const scrollToTop = () => {
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  const getSteps = () => {
    if (state.mode === 'persona') {
      return ['① 상황 탐색', '② 4색 답변 비교', '③ 피드백 & 인사이트', '④ 탐구 완료'];
    }
    if (state.mode === 'task') {
      return ['① 12개 업무 분류', '② 결과 분석 & 가치 탐구', '③ 공존 설계도 완성'];
    }
    return [];
  };

  const getStepperInfo = () => {
    const { mode, personaStep, taskStep, isPersonaCompleted, isTaskCompleted } = state;

    if (mode === 'persona') {
      if (personaStep === 3 || isPersonaCompleted) {
        return { currentStep: 4, subStepIndex: 0, subStepTotal: 1 };
      }
      return { currentStep: personaStep, subStepIndex: 0, subStepTotal: 1 };
    }

    if (mode === 'task') {
      if (taskStep === 2 || isTaskCompleted) {
        return { currentStep: 3, subStepIndex: 0, subStepTotal: 1 };
      }
      return { currentStep: taskStep, subStepIndex: 0, subStepTotal: 1 };
    }

    return { currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
  };

  // Persona handlers
  const handleSelectScenario = (scenarioId) => {
    updateState({ currentScenarioId: scenarioId, personaStep: 1 });
    scrollToTop();
  };

  const handleChoosePersona = (scenarioId, personaId) => {
    updateState({
      userPersonaChoices: {
        ...state.userPersonaChoices,
        [scenarioId]: personaId
      }
    });
  };

  const handleGoToFeedback = () => {
    updateState({ personaStep: 2 });
    scrollToTop();
  };

  const handleCompletePersona = () => {
    updateState({ personaStep: 3, isPersonaCompleted: true });
    scrollToTop();
  };

  // Task handlers
  const handleClassifyTask = (taskId, zone) => {
    updateState({
      taskClassifications: {
        ...state.taskClassifications,
        [taskId]: zone
      }
    });
  };

  const handleGoToTaskAnalysis = () => {
    updateState({ taskStep: 1 });
    scrollToTop();
  };

  const handleSelectPrinciples = (principles) => {
    updateState({ selectedPrinciples: principles });
  };

  const handleCompleteTask = () => {
    updateState({ taskStep: 2, isTaskCompleted: true });
    scrollToTop();
  };

  const renderContent = () => {
    if (!state.mode) {
      return <RoleModeSelectScreen onSelectMode={(mode) => selectMode(mode)} />;
    }

    if (state.mode === 'persona') {
      switch (state.personaStep) {
        case 0:
          return (
            <PersonaScenarioScreen 
              currentScenarioId={state.currentScenarioId}
              userPersonaChoices={state.userPersonaChoices}
              onSelectScenario={handleSelectScenario}
              onPrev={() => selectMode(null)}
            />
          );
        case 1:
          return (
            <PersonaCompareScreen 
              scenarioId={state.currentScenarioId}
              userChoice={state.userPersonaChoices[state.currentScenarioId]}
              onChoosePersona={handleChoosePersona}
              onNext={handleGoToFeedback}
              onPrev={() => updateState({ personaStep: 0 })}
            />
          );
        case 2:
          return (
            <PersonaFeedbackScreen 
              scenarioId={state.currentScenarioId}
              userChoice={state.userPersonaChoices[state.currentScenarioId]}
              onChooseOtherScenario={() => updateState({ personaStep: 0 })}
              onComplete={handleCompletePersona}
              onPrev={() => updateState({ personaStep: 1 })}
            />
          );
        case 3:
          return (
            <PersonaSummaryScreen 
              userPersonaChoices={state.userPersonaChoices}
              onReset={() => selectMode('persona')}
              onBackToActivities={() => selectMode(null)}
            />
          );
        default:
          return null;
      }
    }

    if (state.mode === 'task') {
      switch (state.taskStep) {
        case 0:
          return (
            <TaskClassifyScreen 
              taskClassifications={state.taskClassifications}
              onClassifyTask={handleClassifyTask}
              onNext={handleGoToTaskAnalysis}
              onPrev={() => selectMode(null)}
            />
          );
        case 1:
          return (
            <TaskAnalysisScreen 
              taskClassifications={state.taskClassifications}
              selectedPrinciples={state.selectedPrinciples}
              onSelectPrinciples={handleSelectPrinciples}
              onNext={handleCompleteTask}
              onPrev={() => updateState({ taskStep: 0 })}
            />
          );
        case 2:
          return (
            <TaskSummaryScreen 
              taskClassifications={state.taskClassifications}
              selectedPrinciples={state.selectedPrinciples}
              onReset={() => selectMode('task')}
              onBackToActivities={() => selectMode(null)}
            />
          );
        default:
          return null;
      }
    }
  };

  const handleOpenWorksheet = () => {
    setIsWorksheetOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const stepperInfo = getStepperInfo();

  return (
    <div className={`app-container ${isPresentation ? 'presentation-mode' : ''}`}>
      <AppHeader 
        title="AI 역할 선택소"
        showBackButton={state.mode !== null}
        onBackToActivities={() => selectMode(null)}
        onReset={resetState} 
        onPrint={handleOpenWorksheet} 
        isPresentation={isPresentation} 
        setIsPresentation={setIsPresentation} 
      />
      <main className="container mt-4 no-print">
        {state.mode && (
          <ProgressStepper 
            steps={getSteps()} 
            currentStep={stepperInfo.currentStep}
            subStepIndex={stepperInfo.subStepIndex}
            subStepTotal={stepperInfo.subStepTotal}
          />
        )}
        {renderContent()}
      </main>

      {/* 활동지 전용 팝업 모달 */}
      <WorksheetModal
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        onPrint={handlePrint}
        title="AI 역할 선택소 탐구 활동지"
      >
        <RoleWorksheet state={state} />
      </WorksheetModal>

      {/* 인쇄 시에만 출력되는 숨김 영역 */}
      <div className="print-only" style={{ display: 'none' }}>
        <RoleWorksheet state={state} />
      </div>
    </div>
  );
}
