/**
 * 에이전트가 사용하는 가상 도구(Tools) 정의
 */
export const agentTools = [
  {
    id: "tool_search",
    name: "웹 검색 도구 (Web Search)",
    icon: "🔍",
    riskLevel: "low",
    riskLabel: "안전 (조회 전용)",
    desc: "인터넷에서 공개된 정보를 검색하고 요약합니다."
  },
  {
    id: "tool_calendar",
    name: "학급 캘린더 도구 (Calendar API)",
    icon: "📅",
    riskLevel: "low",
    riskLabel: "안전 (일정 확인)",
    desc: "학급 일정과 행사 시간을 확인하고 등록합니다."
  },
  {
    id: "tool_email",
    name: "대량 이메일 발송 도구 (Send Email)",
    icon: "✉️",
    riskLevel: "high",
    riskLabel: "주의 (외부 전송)",
    desc: "학생 및 학부모 30명에게 초대장 메일을 즉시 발송합니다."
  },
  {
    id: "tool_locker",
    name: "스마트 보관함 원격 제어 (Locker Unlock)",
    icon: "🔓",
    riskLevel: "high",
    riskLabel: "위험 (물리적 제어)",
    desc: "학교 스마트 보관함의 잠금 장치를 원격으로 해제합니다."
  },
  {
    id: "tool_pay",
    name: "학급비 자동 결제 도구 (Payment API)",
    icon: "💳",
    riskLevel: "critical",
    riskLabel: "고위험 (재정 결제)",
    desc: "등록된 카드로 학급 준비물 비용을 자동으로 결제합니다."
  }
];

/**
 * 3가지 실생활 학급 에이전트 미션 시나리오
 */
export const agentMissions = [
  {
    id: "mission_invite",
    title: "학예회 초대장 자동 발송 미션",
    icon: "💌",
    category: "소통·자동화",
    goal: "학급 캘린더에서 학예회 날짜를 확인하고, 초대장 초안을 작성하여 학부모님께 발송하기",
    steps: [
      { stepIndex: 1, type: "plan", text: "1단계 [생각]: 학급 캘린더에서 학예회 날짜와 장소를 먼저 확인하자." },
      { stepIndex: 2, type: "action", toolId: "tool_calendar", text: "2단계 [도구 호출]: 📅 학급 캘린더 조회 실행 ➔ '10월 25일 금요일 오후 2시 시청각실' 확인 완료." },
      { stepIndex: 3, type: "plan", text: "3단계 [생각]: 확인한 정보를 바탕으로 따뜻하고 정중한 초대장 문구를 작성하자." },
      { 
        stepIndex: 4, 
        type: "approval_needed", 
        toolId: "tool_email", 
        text: "4단계 [고위험 도구 호출 준비]: ✉️ 학부모 30명에게 메일 일괄 발송 시도!",
        warningMessage: "⚠️ 한 번 발송된 메일은 취소할 수 없습니다! 날짜와 문구가 올바른지 사람이 직접 확인해야 합니다."
      }
    ],
    humanCheckpoint: {
      question: "AI가 작성한 초대장 날짜가 맞는지 확인하고 발송을 최종 승인하시겠습니까?",
      draftText: "제목: [별빛초 5-1] 2026 학예회에 초대합니다!\n일시: 10월 25일(금) 14:00\n장소: 시청각실\n우리 반 친구들이 열심히 준비했으니 꼭 참석해 주세요!",
      options: [
        { id: "approve", label: "✅ 내용 확인 완료: 발송 승인", isSafe: true, feedback: "정확합니다! 사람이 날짜와 문구를 검토한 후 안전하게 발송되었습니다." },
        { id: "reject", label: "❌ 내용 수정 필요: 발송 중단", isSafe: true, feedback: "좋은 판단입니다! 오타나 잘못된 정보가 있을 땐 사람이 언제든 반려할 수 있어야 합니다." }
      ]
    },
    takeaway: "에이전트가 초안을 작성하고 일정을 조회할 수는 있지만, 외부로 전송되는 최종 행동은 사람이 승인(Human-in-the-Loop)해야 사고를 막을 수 있어요."
  },
  {
    id: "mission_research",
    title: "과학 탐구자료 자동 수집 & 발표자료 생성",
    icon: "🔬",
    category: "학습·자료조사",
    goal: "신재생에너지 관련 최신 자료를 웹에서 검색하고 발표 슬라이드 초안 구성하기",
    steps: [
      { stepIndex: 1, type: "plan", text: "1단계 [생각]: 신재생에너지의 종류와 장단점에 대한 최신 자료를 검색하자." },
      { stepIndex: 2, type: "action", toolId: "tool_search", text: "2단계 [도구 호출]: 🔍 웹 검색 실행 ➔ 태양광, 풍력, 수소 에너지 핵심 통계 수집 완료." },
      { stepIndex: 3, type: "plan", text: "3단계 [생각]: 모둠원들이 보기 쉽게 5장짜리 발표 슬라이드 개요를 작성하자." },
      { 
        stepIndex: 4, 
        type: "approval_needed", 
        toolId: "tool_pay", 
        text: "4단계 [고위험 도구 호출 준비]: 💳 유료 고화질 이미지 3건 자동 결제(15,000원) 시도!",
        warningMessage: "⚠️ 실제 비용이 결제되는 단계입니다! 학급비 사용은 선생님과 학생의 승인이 필수적입니다."
      }
    ],
    humanCheckpoint: {
      question: "유료 이미지 결제 15,000원을 AI 에이전트에게 승인하시겠습니까?",
      draftText: "결제 항목: 상업용 고화질 풍력발전 일러스트 3종\n결제 금액: 15,000원 (학급비 카드 연동)",
      options: [
        { id: "reject", label: "❌ 무료 대체 이미지 사용: 유료 결제 반려", isSafe: true, feedback: "훌륭한 선택입니다! 공공누리나 무료 라이선스 이미지를 활용하여 불필요한 지출을 막았습니다." },
        { id: "approve", label: "✅ 선생님 사전 허락 받음: 결제 승인", isSafe: true, feedback: "사전 허가와 예산 확인이 된 경우에만 사람이 승인하여 결제를 진행합니다." }
      ]
    },
    takeaway: "재정 결제나 비용이 발생하는 작업은 에이전트의 완전 자율에 맡기지 않고 반드시 인간의 지갑 통제권 하에 두어야 합니다."
  },
  {
    id: "mission_lost_found",
    title: "우리 반 분실물 스마트 매칭 미션",
    icon: "🎒",
    category: "생활·물리제어",
    goal: "습득된 안경 사진을 분석하여 주인을 찾고, 스마트 보관함 원격 열기",
    steps: [
      { stepIndex: 1, type: "plan", text: "1단계 [생각]: 습득된 검정 뿔테 안경의 특징을 분실 신고 데이터와 매칭하자." },
      { stepIndex: 2, type: "action", toolId: "tool_search", text: "2단계 [도구 호출]: 🔍 학급 분실물 게시판 조회 ➔ '민우' 학생의 분실 신고와 95% 일치." },
      { stepIndex: 3, type: "plan", text: "3단계 [생각]: 민우 학생에게 안내 알림을 보내고 보관함 잠금을 열어주자." },
      { 
        stepIndex: 4, 
        type: "approval_needed", 
        toolId: "tool_locker", 
        text: "4단계 [물리 제어 도구 호출 준비]: 🔓 3호 스마트 보관함 원격 잠금 해제 시도!",
        warningMessage: "⚠️ 문이 열리면 누구나 물건을 가져갈 수 있습니다! 주인이 보관함 앞에 도착했는지 사람이 확인해야 합니다."
      }
    ],
    humanCheckpoint: {
      question: "민우 학생이 보관함 앞에 도착했는지 확인하고 원격 잠금 해제를 승인하시겠습니까?",
      draftText: "보관함: 본관 2층 3호 보관함\n물품: 검정 뿔테 안경\n수령자 확인: 민우 학생 본인 대면 확인 필요",
      options: [
        { id: "approve", label: "✅ 학생 본인 확인 완료: 보관함 열기", isSafe: true, feedback: "안전합니다! 실제 주인이 도착한 것을 눈으로 확인하고 잠금을 해제했습니다." },
        { id: "reject", label: "❌ 주인 미도착: 잠금 상태 유지", isSafe: true, feedback: "올바른 안전 조치입니다! 물건 도난을 방지하기 위해 잠금을 안전하게 유지했습니다." }
      ]
    },
    takeaway: "물리적 공간을 제어하는 에이전트(도어락, 이동 로봇 등)는 현실 세계의 안전 사고를 방지하기 위해 현장 확인이 필수적입니다."
  }
];

/**
 * 에이전트 안전 가드레일 4대 설정 항목
 */
export const safetyGuardrails = [
  {
    id: "guard_permission",
    title: "1. 권한 스코프 제한 (Permission Scoping)",
    icon: "🛡️",
    desc: "에이전트에게 필요한 최소한의 권한만 부여하고 위험한 도구는 읽기 전용으로 제한해요.",
    options: [
      { id: "minimal", label: "안전 모드: 읽기·조회만 허용 (고위험 도구 원천 차단)", recommended: true },
      { id: "full", label: "전체 권한: 모든 도구(결제, 삭제 등) 무제한 허용", recommended: false }
    ]
  },
  {
    id: "guard_budget",
    title: "2. 호출 횟수 및 예산 한도 (Budget / Rate Limit)",
    icon: "⏳",
    desc: "에이전트가 무한 루프에 빠져 끝없이 도구를 반복 실행하지 못하도록 1회 최대 10회로 제한해요.",
    options: [
      { id: "limit_10", label: "한도 설정: 1회 미션당 최대 10회 도구 실행 후 강제 정지", recommended: true },
      { id: "no_limit", label: "제한 없음: 완료될 때까지 무한 반복 실행", recommended: false }
    ]
  },
  {
    id: "guard_hitl",
    title: "3. 인간 개입 필수화 (Human-in-the-Loop)",
    icon: "👤",
    desc: "외부 발송, 결제, 물리 제어 등 비가역적(되돌릴 수 없는) 행동 전에는 인간의 명시적 승인을 받아요.",
    options: [
      { id: "hitl_strict", label: "필수 승인: 중요 행동 전 인간 확인 알림 팝업", recommended: true },
      { id: "hitl_off", label: "완전 자동: 인간 확인 없이 스스로 판단하여 실행", recommended: false }
    ]
  },
  {
    id: "guard_killswitch",
    title: "4. 비상 정지 버튼 활성화 (Emergency Kill-Switch)",
    icon: "🚨",
    desc: "이상 행동이나 버그가 감지되면 0.1초 만에 에이전트의 모든 프로세스를 차단하는 비상 스위치를 배치해요.",
    options: [
      { id: "kill_enabled", label: "킬스위치 상시 대기 (원클릭 전체 정지)", recommended: true },
      { id: "kill_disabled", label: "킬스위치 미사용", recommended: false }
    ]
  }
];

/**
 * 킬스위치 시뮬레이터 이상 상황 케이스
 */
export const killSwitchAnomaly = {
  title: "⚠️ 에이전트 무한 루프 & 대량 스팸 결제 이상 감지!",
  scenario: "AI 에이전트가 '학급 간식 구매' 미션을 수행하던 중, 오류로 인해 1초마다 1,000원씩 무한 반복 결제를 시도하고 있습니다!",
  anomalyLog: [
    { time: "14:02:01", text: "💳 [결제 도구]: 1,000원 결제 승인됨 (간식 1호)" },
    { time: "14:02:02", text: "💳 [결제 도구]: 1,000원 결제 승인됨 (간식 2호)" },
    { time: "14:02:03", text: "💳 [결제 도구]: 1,000원 결제 승인됨 (간식 3호)" },
    { time: "14:02:04", text: "🚨 [경고]: 1초당 호출 한도 초과! 무한 루프 의심 상태!" },
    { time: "14:02:05", text: "💳 [결제 도구]: 1,000원 결제 재시도 중..." }
  ],
  successMessage: "🎉 킬스위치 작동 완료! 에이전트 프로세스가 0.05초 만에 완전 차단되었습니다. 추가 피해(과다 결제)를 안전하게 방지했습니다."
};
