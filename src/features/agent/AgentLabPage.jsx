import React, { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import LearningGuideToast from '../../components/LearningGuideToast';
import ProgressStepper from '../../components/ProgressStepper';
import WorksheetModal from '../../components/WorksheetModal';
import { announceLearningGuide } from '../../utils/learningGuide';
import { useAgentState } from './useAgentState';
import AgentHelpDrawer from './components/AgentHelpDrawer';
import AgentModeSelectScreen from './screens/AgentModeSelectScreen';
import MissionSelectScreen from './screens/mission/MissionSelectScreen';
import MissionPlanScreen from './screens/mission/MissionPlanScreen';
import MissionApprovalScreen from './screens/mission/MissionApprovalScreen';
import MissionSummaryScreen from './screens/mission/MissionSummaryScreen';
import KillSwitchSimScreen from './screens/control/KillSwitchSimScreen';
import IncidentRecoveryScreen from './screens/control/IncidentRecoveryScreen';
import GuardrailSetupScreen from './screens/control/GuardrailSetupScreen';
import CharterSummaryScreen from './screens/control/CharterSummaryScreen';
import AgentWorksheet from './print/AgentWorksheet';
import './agent.css';

const clickGuides = {
  mission: [
    '상황을 읽고 오른쪽 아래 ‘AI의 행동 보기’를 누르세요.',
    '가운데 행동 카드를 읽고 ‘다음 행동’을 눌러 전송 직전까지 따라가세요.',
    '받는 사람·공연 정보·첨부 파일·연락처 공개 범위를 한 장씩 확인하세요.',
    '고친 전송 요청과 HITL의 뜻을 연결해 보세요.'
  ],
  control: [
    '가운데 작업 기록을 한 장씩 넘겨 부탁하지 않은 행동이 시작되는 순간을 찾으세요.',
    '멈춘 뒤 해야 할 세 가지를 눌러 원본과 권한을 복구하세요.',
    'A와 B 중 더 안전한 설정을 고르며 네 장을 넘기세요.',
    '처음 실행과 다시 실행한 결과를 비교해 보세요.'
  ]
};

export default function AgentLabPage() {
  const { state, updateState, selectMode, resetState } = useAgentState();
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

  const missionSteps = ['① 상황 만나기', '② AI 행동 보기', '③ 보내기 전 확인', '④ HITL 정리'];
  const controlSteps = ['① 이상 행동 찾기', '② 멈춘 뒤 복구', '③ 다시 맡기기', '④ 내 원칙'];

  const getProgress = () => {
    if (state.mode === 'mission') {
      return { steps: missionSteps, currentStep: state.missionStep, subStepIndex: 0, subStepTotal: 1 };
    }
    if (state.mode === 'control') {
      return { steps: controlSteps, currentStep: state.controlStep, subStepIndex: 0, subStepTotal: 1 };
    }
    return { steps: [], currentStep: 0, subStepIndex: 0, subStepTotal: 1 };
  };

  const toggleReviewCheck = checkId => {
    const next = state.approvalReviewChecks.includes(checkId)
      ? state.approvalReviewChecks.filter(id => id !== checkId)
      : [...state.approvalReviewChecks, checkId];
    updateState({ approvalReviewChecks: next });
  };

  const toggleIncidentCheck = checkId => {
    const next = state.incidentResponseChecks.includes(checkId)
      ? state.incidentResponseChecks.filter(id => id !== checkId)
      : [...state.incidentResponseChecks, checkId];
    updateState({ incidentResponseChecks: next });
  };

  const renderMission = () => {
    if (state.missionStep === 0) {
      return (
        <MissionSelectScreen
          onNext={() => move({ missionStep: 1 }, clickGuides.mission[1])}
          onPrev={() => chooseMode(null)}
        />
      );
    }
    if (state.missionStep === 1) {
      return (
        <MissionPlanScreen
          onNext={() => move({ missionStep: 2 }, clickGuides.mission[2])}
          onPrev={() => move({ missionStep: 0 }, clickGuides.mission[0])}
        />
      );
    }
    if (state.missionStep === 2) {
      return (
        <MissionApprovalScreen
          decision={state.humanApprovalDecision}
          reviewedCheckIds={state.approvalReviewChecks}
          onToggleReviewCheck={toggleReviewCheck}
          onDecide={decision => updateState({ humanApprovalDecision: decision })}
          onNext={() => move({ missionStep: 3, isMissionCompleted: true }, clickGuides.mission[3])}
          onPrev={() => move({ missionStep: 1 }, clickGuides.mission[1])}
        />
      );
    }
    return (
      <MissionSummaryScreen
        decision={state.humanApprovalDecision}
        onOpenRecord={() => setIsWorksheetOpen(true)}
        onReset={() => chooseMode('mission')}
        onBackToActivities={() => chooseMode(null)}
      />
    );
  };

  const renderControl = () => {
    if (state.controlStep === 0) {
      return (
        <KillSwitchSimScreen
          killSwitchTriggered={state.killSwitchTriggered}
          onTriggerKillSwitch={() => updateState({ killSwitchTriggered: true })}
          onNext={() => move({ controlStep: 1 }, clickGuides.control[1])}
          onPrev={() => chooseMode(null)}
        />
      );
    }
    if (state.controlStep === 1) {
      return (
        <IncidentRecoveryScreen
          incidentResponseChecks={state.incidentResponseChecks}
          onToggleIncidentCheck={toggleIncidentCheck}
          onNext={() => move({ controlStep: 2 }, clickGuides.control[2])}
          onPrev={() => move({ controlStep: 0 }, clickGuides.control[0])}
        />
      );
    }
    if (state.controlStep === 2) {
      return (
        <GuardrailSetupScreen
          guardrailChoices={state.guardrailChoices}
          onSelectGuardrail={(guardId, optionId) => updateState({
            guardrailChoices: { ...state.guardrailChoices, [guardId]: optionId }
          })}
          onNext={() => move({ controlStep: 3, isControlCompleted: true }, clickGuides.control[3])}
          onPrev={() => move({ controlStep: 1 }, clickGuides.control[1])}
        />
      );
    }
    return (
      <CharterSummaryScreen
        onOpenRecord={() => setIsWorksheetOpen(true)}
        onReset={() => chooseMode('control')}
        onBackToActivities={() => chooseMode(null)}
      />
    );
  };

  const progress = getProgress();
  const initialGuide = state.mode ? clickGuides[state.mode][state.mode === 'mission' ? state.missionStep : state.controlStep] : '두 활동 중 궁금한 카드 하나를 눌러 시작하세요.';

  return (
    <div className="app-container agent-app">
      <AppHeader
        title="AI가 대신 움직인다면?"
        showBackButton={state.mode !== null}
        onBackToActivities={() => chooseMode(null)}
        onReset={resetState}
        studentMode
        onHelp={() => setIsHelpOpen(true)}
      />
      <main className="container agent-main no-print">
        {state.mode && (
          <ProgressStepper
            steps={progress.steps}
            currentStep={progress.currentStep}
            subStepIndex={progress.subStepIndex}
            subStepTotal={progress.subStepTotal}
          />
        )}
        {!state.mode ? <AgentModeSelectScreen onSelectMode={chooseMode} /> : state.mode === 'mission' ? renderMission() : renderControl()}
      </main>

      <LearningGuideToast message={initialGuide} />
      <AgentHelpDrawer isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} mode={state.mode} />
      <WorksheetModal
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        onPrint={() => window.print()}
        title="AI 행동 확인 기록"
      >
        <AgentWorksheet state={state} />
      </WorksheetModal>
      <div className="print-only" style={{ display: 'none' }}><AgentWorksheet state={state} /></div>
    </div>
  );
}
