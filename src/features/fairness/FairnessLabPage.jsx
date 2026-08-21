import React, { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import ProgressStepper from '../../components/ProgressStepper';
import WorksheetModal from '../../components/WorksheetModal';
import { useFairnessState } from './useFairnessState';
import FairnessWorksheet from './print/FairnessWorksheet';
import ModeSelectScreen from './screens/ModeSelectScreen';
import StepPurposeBar from './components/StepPurposeBar';
import FairnessHelpDrawer from './components/FairnessHelpDrawer';
import { fairnessStepPurposes } from './fairnessLearningData';
import './fairness.css';

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
import { projectTeamCandidates, projectTeamPresets } from './fairnessData';
import { evaluateTeamCandidates } from './fairnessEngine';

export default function FairnessLabPage() {
  const { state, updateState, selectMode } = useFairnessState();
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const scrollToTop = () => {
    const prefersReducedMotion = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const getSteps = () => {
    if (state.mode === 'growth') return ['① 하늘이의 고민', '② AI의 첫 생각', '③ 하늘이의 이야기', '④ 꿈 탐색 계획'];
    if (state.mode === 'team') return ['① 프로젝트와 첫 팀', '② 팀 구성 기준', '③ 결과 비교', '④ 기록 정정·재검토'];
    return [];
  };

  const getStepperInfo = () => {
    const { mode, growthStep, teamStep, isGrowthCompleted, isTeamCompleted } = state;
    if (mode === 'growth') {
      if (growthStep === 5 || isGrowthCompleted) return { currentStep: 4, subStepIndex: 0, subStepTotal: 1 };
      if (growthStep === 0) return { currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
      if (growthStep === 1) return { currentStep: 1, subStepIndex: 0, subStepTotal: 1 };
      if (growthStep === 2) return { currentStep: 2, subStepIndex: 0, subStepTotal: 1 };
      return { currentStep: 3, subStepIndex: Math.max(0, growthStep - 3), subStepTotal: 2 };
    }
    if (mode === 'team') {
      if (teamStep === 6 || isTeamCompleted) return { currentStep: 4, subStepIndex: 0, subStepTotal: 1 };
      if (teamStep === 0) return { currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
      if (teamStep === 1) return { currentStep: 1, subStepIndex: 0, subStepTotal: 1 };
      if (teamStep === 2) return { currentStep: 2, subStepIndex: 0, subStepTotal: 1 };
      return { currentStep: 3, subStepIndex: Math.min(2, Math.max(0, teamStep - 3)), subStepTotal: 3 };
    }
    return { currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
  };

  const goToGrowthStep = step => {
    updateState({ growthStep: step });
    scrollToTop();
  };

  const goToTeamStep = step => {
    updateState({ teamStep: step });
    scrollToTop();
  };

  const handleStudentViewed = studentId => {
    const current = state.growthViewedStudentIds || [];
    if (!current.includes(studentId)) updateState({ growthViewedStudentIds: [...current, studentId] });
  };

  const handleToggleCareer = careerId => {
    const current = state.growthCareerChoices || [];
    if (current.includes(careerId)) {
      updateState({ growthCareerChoices: current.filter(id => id !== careerId) });
      return;
    }
    if (current.length < 2) updateState({ growthCareerChoices: [...current, careerId] });
  };

  const handleCompleteGrowth = () => {
    updateState({ isGrowthCompleted: true, growthStep: 5 });
    scrollToTop();
  };

  const handleCompleteTeam = () => {
    updateState({ isTeamCompleted: true, teamStep: 6 });
    scrollToTop();
  };

  const getTeamOldResults = () => evaluateTeamCandidates(projectTeamCandidates, projectTeamPresets[0].weights);
  const getTeamNewResults = () => evaluateTeamCandidates(
    projectTeamCandidates,
    state.teamCriteriaWeights || projectTeamPresets[1].weights
  );

  const renderContent = () => {
    if (!state.mode) return <ModeSelectScreen onSelectMode={selectMode} />;

    if (state.mode === 'growth') {
      switch (state.growthStep) {
        case 0:
          return (
            <GrowthInitialScreen
              onNext={() => goToGrowthStep(1)}
            />
          );
        case 1:
          return (
            <GrowthTempRecScreen
              questionId={state.growthQuestionId}
              onQuestion={value => updateState({ growthQuestionId: value })}
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
              selectedCareerIds={state.growthCareerChoices}
              onToggleCareer={handleToggleCareer}
              onNext={() => goToGrowthStep(4)}
              onPrev={() => goToGrowthStep(2)}
            />
          );
        case 4:
          return (
            <GrowthHumanCheckScreen
              selectedCareerIds={state.growthCareerChoices}
              finalChoice={state.growthFinalChoice}
              onFinalChoice={value => updateState({ growthFinalChoice: value })}
              onNext={handleCompleteGrowth}
              onPrev={() => goToGrowthStep(3)}
            />
          );
        case 5:
          return (
            <CompletionScreen
              mode="growth"
              state={state}
              onOpenRecord={() => setIsWorksheetOpen(true)}
              onReset={() => selectMode('growth')}
              onBackToActivities={() => selectMode(null)}
            />
          );
        default:
          return null;
      }
    }

    const oldResults = getTeamOldResults();
    const newResults = getTeamNewResults();
    switch (state.teamStep) {
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
            setWeights={weights => updateState({ teamCriteriaWeights: typeof weights === 'function' ? weights(state.teamCriteriaWeights) : weights })}
            onCalculate={() => goToTeamStep(2)}
            onPrev={() => goToTeamStep(0)}
          />
        );
      case 2:
        return (
          <ResultScreen
            oldResults={oldResults}
            newResults={newResults}
            questionId={state.teamQuestionId}
            onQuestion={value => updateState({ teamQuestionId: value })}
            onNext={() => goToTeamStep(3)}
            onPrev={() => goToTeamStep(1)}
          />
        );
      case 3:
        return (
          <AppealScreen
            appealChoice={state.teamAppealChoice}
            onSelectChoice={choice => updateState({ teamAppealChoice: choice })}
            onProceed={() => goToTeamStep(4)}
            onPrev={() => goToTeamStep(2)}
          />
        );
      case 4:
        return (
          <AppealResultScreen
            appealChoice={state.teamAppealChoice}
            criteriaWeights={state.teamCriteriaWeights}
            onNext={() => goToTeamStep(5)}
            onPrev={() => goToTeamStep(3)}
          />
        );
      case 5:
        return (
          <PrinciplesScreen
            selectedPrinciples={state.teamSelectedPrinciples}
            setSelectedPrinciples={principles => updateState({ teamSelectedPrinciples: typeof principles === 'function' ? principles(state.teamSelectedPrinciples) : principles })}
            onComplete={handleCompleteTeam}
            onPrev={() => goToTeamStep(4)}
          />
        );
      case 6:
        return (
          <CompletionScreen
            mode="team"
            state={state}
            onOpenRecord={() => setIsWorksheetOpen(true)}
            onReset={() => selectMode('team')}
            onBackToActivities={() => selectMode(null)}
          />
        );
      default:
        return null;
    }
  };

  const stepperInfo = getStepperInfo();
  const stepIndex = state.mode === 'growth' ? state.growthStep : state.teamStep;
  const currentPurpose = state.mode ? fairnessStepPurposes[state.mode]?.[stepIndex] : null;

  return (
    <div className="app-container fairness-app">
      <AppHeader
        title="AI의 선택, 그대로 믿어도 될까?"
        showBackButton={state.mode !== null}
        onBackToActivities={() => selectMode(null)}
        studentMode
        onHelp={() => setIsHelpOpen(true)}
      />
      <main className="container mt-4 no-print">
        {state.mode && (
          <>
            <ProgressStepper
              steps={getSteps()}
              currentStep={stepperInfo.currentStep}
              subStepIndex={stepperInfo.subStepIndex}
              subStepTotal={stepperInfo.subStepTotal}
            />
            <StepPurposeBar purpose={currentPurpose} />
          </>
        )}
        {renderContent()}
      </main>

      <FairnessHelpDrawer isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} mode={state.mode} />
      <WorksheetModal
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        onPrint={() => window.print()}
        title="AI의 선택을 다시 본 나의 탐구 기록"
      >
        <FairnessWorksheet state={state} />
      </WorksheetModal>
      <div className="print-only" style={{ display: 'none' }}>
        <FairnessWorksheet state={state} />
      </div>
    </div>
  );
}
