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
import WorksheetModal from '../../components/WorksheetModal';
import './agent.css';

export default function AgentLabPage() {
  const { state, updateState, selectMode, resetState } = useAgentState();
  const [isPresentation, setIsPresentation] = useState(false);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);

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
      return ['① 미션 선택', '② 실행 기록', '③ 근거 확인', '④ 판단 정리'];
    }
    if (state.mode === 'control') {
      return ['① 통제 층 설정', '② 중단·복구 실험', '③ AI 감독관 원칙'];
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
    updateState({ selectedMissionId: missionId, missionStep: 1, isMissionCompleted: false });
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

  const handleToggleReviewCheck = (missionId, checkId) => {
    const current = state.approvalReviewChecks[missionId] || [];
    const next = current.includes(checkId)
      ? current.filter(id => id !== checkId)
      : [...current, checkId];
    updateState({
      approvalReviewChecks: {
        ...state.approvalReviewChecks,
        [missionId]: next
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
    updateState({ controlStep: 1, killSwitchTriggered: false, incidentResponseChecks: [] });
    scrollToTop();
  };

  const handleTriggerKillSwitch = () => {
    updateState({ killSwitchTriggered: true });
  };

  const handleToggleIncidentCheck = (checkId) => {
    const next = state.incidentResponseChecks.includes(checkId)
      ? state.incidentResponseChecks.filter(id => id !== checkId)
      : [...state.incidentResponseChecks, checkId];
    updateState({ incidentResponseChecks: next });
  };

  const handleCompleteControl = () => {
    updateState({ controlStep: 2, isControlCompleted: true });
    scrollToTop();
  };

  const renderContent = () => {
    if (!state.mode) {
      return <AgentModeSelectScreen onSelectMode={selectMode} />;
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
              reviewedCheckIds={state.approvalReviewChecks[state.selectedMissionId] || []}
              onToggleReviewCheck={handleToggleReviewCheck}
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
              incidentResponseChecks={state.incidentResponseChecks}
              onTriggerKillSwitch={handleTriggerKillSwitch}
              onToggleIncidentCheck={handleToggleIncidentCheck}
              onNext={handleCompleteControl}
              onPrev={() => updateState({ controlStep: 0, killSwitchTriggered: false, incidentResponseChecks: [] })}
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

  const handleOpenWorksheet = () => {
    setIsWorksheetOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const stepperInfo = getStepperInfo();

  return (
    <div className={`app-container agent-app ${isPresentation ? 'presentation-mode' : ''}`}>
      <AppHeader 
        title="AI 에이전트 통제실"
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
        title="AI 에이전트 통제실 탐구 활동지"
      >
        <AgentWorksheet state={state} />
      </WorksheetModal>

      {/* 인쇄 시에만 출력되는 숨김 영역 */}
      <div className="print-only" style={{ display: 'none' }}>
        <AgentWorksheet state={state} />
      </div>
    </div>
  );
}
