import React, { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import ProgressStepper from '../../components/ProgressStepper';
import { useFairnessState } from './useFairnessState';
import FairnessWorksheet from './print/FairnessWorksheet';
import WorksheetModal from '../../components/WorksheetModal';
import ModeSelectScreen from './screens/ModeSelectScreen';

// Activity recommendation screens (legacy Growth* filenames preserve the existing structure)
import GrowthInitialScreen from './screens/GrowthInitialScreen';
import GrowthTempRecScreen from './screens/GrowthTempRecScreen';
import GrowthSupplementScreen from './screens/GrowthSupplementScreen';
import GrowthDeltaScreen from './screens/GrowthDeltaScreen';
import GrowthHumanCheckScreen from './screens/GrowthHumanCheckScreen';

// Project Team screens
import CandidateScreen from './screens/CandidateScreen';
import CriteriaScreen from './screens/CriteriaScreen';
import ResultScreen from './screens/ResultScreen';
import AppealScreen from './screens/AppealScreen';
import AppealResultScreen from './screens/AppealResultScreen';
import PrinciplesScreen from './screens/PrinciplesScreen';

import CompletionScreen from './screens/CompletionScreen';
import { projectTeamCandidates, projectTeamPresets } from './fairnessData';
import { evaluateTeamCandidates } from './fairnessEngine';

export default function FairnessLabPage() {
  const { state, updateState, resetState, selectMode } = useFairnessState();
  const [isPresentation, setIsPresentation] = useState(false);

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
    if (state.mode === 'growth') {
      return ['① AI가 본 기록', '② 빠진 기록', '③ 추천 비교', '④ 사람이 선택'];
    }
    if (state.mode === 'team') {
      return ['① 지원자 기록', '② 팀 구성 기준', '③ 대표팀 비교', '④ 이의제기·검토'];
    }
    return [];
  };

  // Derive stepper position and sub-step dot progress
  const getStepperInfo = () => {
    const { mode, growthStep, teamStep, isGrowthCompleted, isTeamCompleted } = state;

    if (mode === 'growth') {
      if (growthStep === 5 || isGrowthCompleted) {
        return { currentStep: 4, subStepIndex: 0, subStepTotal: 1 };
      }
      if (growthStep <= 1) {
        return { currentStep: 0, subStepIndex: growthStep, subStepTotal: 2 };
      }
      if (growthStep === 2) {
        return { currentStep: 1, subStepIndex: 0, subStepTotal: 1 };
      }
      if (growthStep === 3) {
        return { currentStep: 2, subStepIndex: 0, subStepTotal: 1 };
      }
      return { currentStep: 3, subStepIndex: 0, subStepTotal: 1 };
    }

    if (mode === 'team') {
      if (teamStep === 6 || isTeamCompleted) {
        return { currentStep: 4, subStepIndex: 0, subStepTotal: 1 };
      }
      if (teamStep === 0) return { currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
      if (teamStep === 1) return { currentStep: 1, subStepIndex: 0, subStepTotal: 1 };
      if (teamStep === 2) return { currentStep: 2, subStepIndex: 0, subStepTotal: 1 };
      return { currentStep: 3, subStepIndex: Math.min(2, Math.max(0, teamStep - 3)), subStepTotal: 3 };
    }

    return { currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
  };

  const goToGrowthStep = (step) => {
    updateState({ growthStep: step });
    scrollToTop();
  };

  const goToTeamStep = (step) => {
    updateState({ teamStep: step });
    scrollToTop();
  };

  // Activity recommendation handlers (legacy state key: growth)
  const handleStudentViewed = (studentId) => {
    const current = state.growthViewedStudentIds || [];
    if (!current.includes(studentId)) {
      updateState({ growthViewedStudentIds: [...current, studentId] });
    }
  };

  const handleToggleChecklist = (checkId) => {
    const current = state.growthChecklist || [];
    const updated = current.includes(checkId)
      ? current.filter(id => id !== checkId)
      : [...current, checkId];
    updateState({ growthChecklist: updated });
  };

  const handleAnswerGrowthQuiz = (answer) => {
    updateState({ growthQuizAnswer: answer });
  };

  const handleCompleteGrowth = () => {
    updateState({ isGrowthCompleted: true, growthStep: 5 });
    scrollToTop();
  };

  // Project Team handlers
  const handleTeamCalculate = () => {
    goToTeamStep(2);
  };

  const handleSelectAppealChoice = (choiceId) => {
    updateState({ teamAppealChoice: choiceId });
  };

  const handleProceedAppeal = () => {
    goToTeamStep(4);
  };

  const handleCompleteTeam = () => {
    updateState({ isTeamCompleted: true, teamStep: 6 });
    scrollToTop();
  };

  // Evaluate project team results
  const getTeamOldResults = () => {
    return evaluateTeamCandidates(projectTeamCandidates, projectTeamPresets[0].weights);
  };

  const getTeamNewResults = () => {
    const activeWeights = state.teamCriteriaWeights || projectTeamPresets[1].weights;
    if (state.teamAppealChoice === 2) {
      const modified = projectTeamCandidates.map(c => 
        c.id === 'hangyeol' ? { ...c, communicationCollaboration: 92 } : c
      );
      return evaluateTeamCandidates(modified, activeWeights);
    }
    return evaluateTeamCandidates(projectTeamCandidates, activeWeights);
  };

  const renderContent = () => {
    if (!state.mode) {
      return <ModeSelectScreen onSelectMode={(mode) => selectMode(mode)} />;
    }

    if (state.mode === 'growth') {
      const { growthStep } = state;

      switch (growthStep) {
        case 0:
          return <GrowthInitialScreen onNext={() => goToGrowthStep(1)} />;
        case 1:
          return (
            <GrowthTempRecScreen 
              onNext={() => goToGrowthStep(2)} 
              onPrev={() => goToGrowthStep(0)} 
            />
          );
        case 2:
          return (
            <GrowthSupplementScreen 
              viewedStudentIds={state.growthViewedStudentIds} 
              onStudentViewed={handleStudentViewed}
              onNext={() => goToGrowthStep(3)} 
              onPrev={() => goToGrowthStep(1)} 
            />
          );
        case 3:
          return (
            <GrowthDeltaScreen 
              onNext={() => goToGrowthStep(4)} 
              onPrev={() => goToGrowthStep(2)} 
            />
          );
        case 4:
          return (
            <GrowthHumanCheckScreen 
              checklist={state.growthChecklist}
              onToggleCheck={handleToggleChecklist}
              quizAnswer={state.growthQuizAnswer}
              onAnswerQuiz={handleAnswerGrowthQuiz}
              onNext={handleCompleteGrowth} 
              onPrev={() => goToGrowthStep(3)} 
            />
          );
        case 5:
          return (
            <CompletionScreen 
              mode="growth" 
              onReset={() => selectMode('growth')}
              onBackToActivities={() => selectMode(null)}
            />
          );
        default:
          return null;
      }
    }

    if (state.mode === 'team') {
      const { teamStep } = state;
      const oldResults = getTeamOldResults();
      const newResults = getTeamNewResults();

      switch (teamStep) {
        case 0:
          return (
            <CandidateScreen 
              hasViewedAll={state.teamHasViewedAll}
              onViewAll={() => updateState({ teamHasViewedAll: true })}
              onNext={() => goToTeamStep(1)} 
              onPrev={() => selectMode(null)} 
            />
          );
        case 1:
          return (
            <CriteriaScreen 
              weights={state.teamCriteriaWeights} 
              setWeights={(w) => updateState({ teamCriteriaWeights: typeof w === 'function' ? w(state.teamCriteriaWeights) : w })}
              onCalculate={handleTeamCalculate}
              onPrev={() => goToTeamStep(0)}
            />
          );
        case 2:
          return (
            <ResultScreen 
              oldResults={oldResults}
              newResults={newResults}
              onNext={() => goToTeamStep(3)}
              onPrev={() => goToTeamStep(1)}
            />
          );
        case 3:
          return (
            <AppealScreen 
              appealChoice={state.teamAppealChoice}
              onSelectChoice={handleSelectAppealChoice}
              onProceed={handleProceedAppeal}
              onPrev={() => goToTeamStep(2)} 
            />
          );
        case 4:
          return (
            <AppealResultScreen
              criteriaWeights={state.teamCriteriaWeights}
              onNext={() => goToTeamStep(5)}
              onPrev={() => goToTeamStep(3)}
            />
          );
        case 5:
          return (
            <PrinciplesScreen 
              selectedPrinciples={state.teamSelectedPrinciples}
              setSelectedPrinciples={(p) => updateState({ teamSelectedPrinciples: typeof p === 'function' ? p(state.teamSelectedPrinciples) : p })}
              onComplete={handleCompleteTeam}
              onPrev={() => goToTeamStep(4)}
            />
          );
        case 6:
          return (
            <CompletionScreen 
              mode="team" 
              onReset={() => selectMode('team')}
              onBackToActivities={() => selectMode(null)}
            />
          );
        default:
          return null;
      }
    }
  };

  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);

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
        title="공정한 AI 실험실"
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
        title="공정한 AI 실험실 탐구 활동지"
      >
        <FairnessWorksheet state={state} />
      </WorksheetModal>

      {/* 인쇄 시에만 출력되는 영역 */}
      <div className="print-only" style={{ display: 'none' }}>
        <FairnessWorksheet state={state} />
      </div>
    </div>
  );
}
