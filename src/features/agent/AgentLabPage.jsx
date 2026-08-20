import React, { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import ProgressStepper from '../../components/ProgressStepper';
import { useAgentState } from './useAgentState';
import AgentModeSelectScreen from './screens/AgentModeSelectScreen';
import MissionSelectScreen from './screens/mission/MissionSelectScreen';
import MissionPlanScreen from './screens/mission/MissionPlanScreen';
import MissionApprovalScreen from './screens/mission/MissionApprovalScreen';
import MissionSummaryScreen from './screens/mission/MissionSummaryScreen';
import GuardrailSetupScreen from './screens/control/GuardrailSetupScreen';
import KillSwitchSimScreen from './screens/control/KillSwitchSimScreen';
import CharterSummaryScreen from './screens/control/CharterSummaryScreen';
import AgentWorksheet from './print/AgentWorksheet';

export default function AgentLabPage() {
  const { state, updateState, selectMode, resetState } = useAgentState();
  const [isPresentation, setIsPresentation] = useState(false);

  const scrollToTop = () => {
    if (typeof window === 'undefined' || !window.scrollTo) return;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  const getSteps = () => {
    if (state.mode === 'mission') {
      return ['① 미션 선택', '② 도구 실행 관찰', '③ 인간 승인 검문소', '④ 미션 완료'];
    }
    if (state.mode === 'control') {
      return ['① 4대 가드레일', '② 킬스위치 실전 훈련', '③ 안전 사령관 헌장'];
    }
    return [];
  };

  const getStepperInfo = () => {
    const { mode, missionStep, controlStep, isMissionCompleted, isControlCompleted } = state;

    if (mode === 'mission') {
      if (missionStep === 3 || isMissionCompleted) {
        return { currentStep: 4, subStepIndex: 0, subStepTotal: 1 };
      }
      return { currentStep: missionStep, subStepIndex: 0, subStepTotal: 1 };
    }

    if (mode === 'control') {
      if (controlStep === 2 || isControlCompleted) {
        return { currentStep: 3, subStepIndex: 0, subStepTotal: 1 };
      }
      return { currentStep: controlStep, subStepIndex: 0, subStepTotal: 1 };
    }

    return { currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
  };

  // Handlers
  const handleSelectMission = (missionId) => {
    updateState({ selectedMissionId: missionId, missionStep: 1 });
    scrollToTop();
  };

  const handleGoToApproval = () => {
    updateState({ missionStep: 2 });
    scrollToTop();
  };

  const handleApprovalDecision = (missionId, decision) => {
    updateState({
      humanApprovalDecisions: {
        ...state.humanApprovalDecisions,
        [missionId]: decision
      }
    });
  };

  const handleCompleteMission = () => {
    updateState({ missionStep: 3, isMissionCompleted: true });
    scrollToTop();
  };

  const handleSelectGuardrail = (guardId, optionId) => {
    updateState({
      guardrailChoices: {
        ...state.guardrailChoices,
        [guardId]: optionId
      }
    });
  };

  const handleGoToKillSwitch = () => {
    updateState({ controlStep: 1 });
    scrollToTop();
  };

  const handleTriggerKillSwitch = () => {
    updateState({ killSwitchTriggered: true });
  };

  const handleCompleteControl = () => {
    updateState({ controlStep: 2, isControlCompleted: true });
    scrollToTop();
  };

  const handlePrint = () => {
    window.print();
  };

  const renderContent = () => {
    if (!state.mode) {
      return <AgentModeSelectScreen onSelectMode={(mode) => selectMode(mode)} />;
    }

    if (state.mode === 'mission') {
      switch (state.missionStep) {
        case 0:
          return (
            <MissionSelectScreen 
              selectedMissionId={state.selectedMissionId}
              onSelectMission={handleSelectMission}
              onPrev={() => selectMode(null)}
            />
          );
        case 1:
          return (
            <MissionPlanScreen 
              missionId={state.selectedMissionId}
              onNext={handleGoToApproval}
              onPrev={() => updateState({ missionStep: 0 })}
            />
          );
        case 2:
          return (
            <MissionApprovalScreen 
              missionId={state.selectedMissionId}
              decision={state.humanApprovalDecisions[state.selectedMissionId]}
              onDecide={handleApprovalDecision}
              onNext={handleCompleteMission}
              onPrev={() => updateState({ missionStep: 1 })}
            />
          );
        case 3:
          return (
            <MissionSummaryScreen 
              missionId={state.selectedMissionId}
              decision={state.humanApprovalDecisions[state.selectedMissionId]}
              onReset={() => selectMode('mission')}
              onBackToActivities={() => selectMode(null)}
            />
          );
        default:
          return null;
      }
    }

    if (state.mode === 'control') {
      switch (state.controlStep) {
        case 0:
          return (
            <GuardrailSetupScreen 
              guardrailChoices={state.guardrailChoices}
              onSelectGuardrail={handleSelectGuardrail}
              onNext={handleGoToKillSwitch}
              onPrev={() => selectMode(null)}
            />
          );
        case 1:
          return (
            <KillSwitchSimScreen 
              killSwitchTriggered={state.killSwitchTriggered}
              onTriggerKillSwitch={handleTriggerKillSwitch}
              onNext={handleCompleteControl}
              onPrev={() => updateState({ controlStep: 0 })}
            />
          );
        case 2:
          return (
            <CharterSummaryScreen 
              onReset={() => selectMode('control')}
              onBackToActivities={() => selectMode(null)}
            />
          );
        default:
          return null;
      }
    }
  };

  const stepperInfo = getStepperInfo();

  return (
    <div className={`app-container ${isPresentation ? 'presentation-mode' : ''}`}>
      <AppHeader 
        title="AI 에이전트 통제실"
        showBackButton={state.mode !== null}
        onBackToActivities={() => selectMode(null)}
        onReset={resetState} 
        onPrint={handlePrint} 
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
      <AgentWorksheet state={state} />
    </div>
  );
}
