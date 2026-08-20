# 🦊 회색여우 코덱스 수석님께 드리는 모듈 4(AI 에이전트 통제실) 프로토타입 인계서

> **작성자**: ⚡ 쾌걸 안티 (Antigravity)  
> **목적**: 모듈 4 (AI 에이전트 통제실) 초고속 프로토타입 구조 전달 및 코덱스 스타일의 고도화·통합 요청

---

## 1. 🎯 모듈 4 핵심 기획 및 프로토타입 골격

모듈 4는 단순한 챗봇을 넘어 **스스로 판단하고 외부 도구를 사용하는 자율 AI 에이전트(Autonomous Agent)**를 학생이 직접 통제해보는 피날레 모듈입니다.

```
src/features/agent/
├── agentData.js                   # 3가지 미션 시나리오, 5대 가상 도구, 4대 안전 가드레일, 킬스위치 이상 징후
├── agentEngine.js                 # 가드레일 안전 지수(Score) 및 미션 데이터 룩업
├── useAgentState.js               # ai-literacy-lab-agent:v1 독립 스토리지 & 화이트리스트
├── AgentLabPage.jsx               # 모듈 4 오케스트레이터 (AppHeader title="AI 에이전트 통제실")
├── screens/
│   ├── AgentModeSelectScreen.jsx  # 미션 실행소 vs 안전 가드레일&킬스위치
│   ├── mission/
│   │   ├── MissionSelectScreen.jsx    # 3대 학급 미션 카드 (초대장/자료조사/분실물)
│   │   ├── MissionPlanScreen.jsx      # 에이전트 생각-도구호출 루프 타임라인
│   │   ├── MissionApprovalScreen.jsx  # 고위험 도구 실행 전 [인간 승인 검문소] (HITL)
│   │   └── MissionSummaryScreen.jsx   # 미션 완료 요약
│   └── control/
│       ├── GuardrailSetupScreen.jsx   # 4대 안전 가드레일 (권한/예산한도/HITL/킬스위치)
│       ├── KillSwitchSimScreen.jsx    # 무한 루프 이상 상황 실시간 터미널 & 🚨 비상정지 킬스위치
│       └── CharterSummaryScreen.jsx   # AI 에이전트 안전 사령관 임명장 & 4대 헌장
├── print/
│   └── AgentWorksheet.jsx         # [AI 에이전트 통제실 활동지] A4 인쇄
└── *.test.js[x]
    ├── agentEngine.test.js        # 단위 테스트 (2개)
    ├── useAgentState.test.js      # v1 스토리지 화이트리스트 테스트 (3개)
    └── AgentLab.integration.test.jsx # 차시 미노출 및 전체 플로우 통합 테스트 (7개)
```

---

## 2. 🌟 코덱스 수석님께 요청드리는 고도화 및 멋진 업그레이드 포인트

1. **교육적 텍스트 & 시나리오 정밀 튜닝**:
   - 코덱스 특유의 차분하고 엄밀한 교육 철학을 반영하여, 3대 미션의 `warningMessage`나 인간 승인 옵션의 설명 문구를 더 풍성하고 날카롭게 다듬어 주세요!
2. **시뮬레이터 연출 강화**:
   - `KillSwitchSimScreen.jsx`의 터미널 로그나 에러 사운드/애니메이션을 코덱스의 감각으로 더 멋지게 업그레이드해 주시면 학생들이 환호할 것 같습니다!
3. **공용 라우팅 & 홈 연동 (`/agent`)**:
   - 코덱스가 전체 통합을 진행하실 때 `src/app/routes.jsx`와 `src/app/Home.jsx`에 모듈 4 카드를 정식 연결해 주시면 됩니다.

---

## 3. 🧪 현재 모듈 4 검증 상태

- **린트 검사**: `npx oxlint src/features/agent/` ➔ **0 errors, 0 warnings (Clean!)**
- **단위 및 통합 테스트**: `npx vitest run src/features/agent/` ➔ **3개 파일, 12개 테스트 100% Pass!**
- **격리 원칙**: 타 모듈(`fairness`, `verification`, `role`) 코드 일체 간섭 없음.

---

코덱스 수석님, 엔진과 뼈대는 튼튼하게 깔아두었으니 계기판과 디테일을 훨씬 더 멋지게 완성해 주십쇼! 🚀🦊🔥
