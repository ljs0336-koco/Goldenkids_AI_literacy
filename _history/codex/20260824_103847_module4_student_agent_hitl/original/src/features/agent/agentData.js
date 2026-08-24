/**
 * 에이전트가 사용하는 수업용 가상 도구입니다.
 * 위험도는 도구 이름만이 아니라 권한 범위와 실제 실행 결과를 함께 보고 판단합니다.
 */
export const agentTools = [
  {
    id: 'tool_search',
    name: '공개 자료 검색',
    icon: '🔍',
    riskLevel: 'low',
    riskLabel: '조회 중심 · 출처 확인 필요',
    desc: '공개된 자료를 찾습니다. 검색 결과가 곧 사실이라는 뜻은 아니므로 출처와 날짜를 다시 확인해야 합니다.'
  },
  {
    id: 'tool_calendar',
    name: '학급 캘린더 조회',
    icon: '📅',
    riskLevel: 'low',
    riskLabel: '읽기 전용',
    desc: '학급 일정의 날짜·시간·장소를 읽습니다. 이 활동에서는 일정을 새로 등록하거나 수정할 권한은 없습니다.'
  },
  {
    id: 'tool_email',
    name: '단체 메일 발송',
    icon: '✉️',
    riskLevel: 'high',
    riskLabel: '외부 전송 · 사전 확인',
    desc: '지정된 수신자에게 메일을 실제로 보냅니다. 수신자, 내용, 개인정보를 실행 직전에 확인해야 합니다.'
  },
  {
    id: 'tool_locker',
    name: '스마트 보관함 잠금 해제',
    icon: '🔓',
    riskLevel: 'high',
    riskLabel: '물리 제어 · 현장 확인',
    desc: '학교 보관함을 원격으로 엽니다. 수령자와 현장 상황을 확인한 뒤 제한된 시간 동안만 실행해야 합니다.'
  },
  {
    id: 'tool_pay',
    name: '학급비 결제',
    icon: '💳',
    riskLevel: 'critical',
    riskLabel: '금전 영향 · 명시적 승인',
    desc: '승인된 결제 수단으로 비용을 지불합니다. 구매 권한, 금액, 항목, 이용 조건을 모두 확인해야 합니다.'
  }
];

/**
 * 세 미션은 모두 수업을 위해 만든 가상 사례입니다.
 * reviewChecks를 확인한 뒤 expectedDecision과 비교하며 판단 근거를 학습합니다.
 */
export const agentMissions = [
  {
    id: 'mission_invite',
    title: '학예회 초대장 발송 미션',
    icon: '💌',
    category: '소통·외부 전송',
    goal: '학급 일정에서 행사 정보를 확인하고 초대장 초안을 검토한 뒤 발송 여부 정하기',
    steps: [
      { stepIndex: 1, type: 'plan_summary', text: '행사명, 날짜, 시간, 장소를 공식 학급 일정에서 먼저 확인한다.' },
      { stepIndex: 2, type: 'tool_request', toolId: 'tool_calendar', text: '읽기 전용 권한으로 학급 캘린더 조회를 요청한다.' },
      { stepIndex: 3, type: 'observation', text: "학급 캘린더 원문: '학예회 · 10월 23일(금) 14:00 · 시청각실'" },
      { stepIndex: 4, type: 'plan_summary', text: '조회 결과를 바탕으로 학부모 안내 메일 초안을 만든다.' },
      {
        stepIndex: 5,
        type: 'approval_needed',
        toolId: 'tool_email',
        text: '학부모 30명에게 단체 메일 발송을 요청한다.',
        warningMessage: '외부로 전송되면 여러 사람에게 영향을 줍니다. 일정 원문과 초안을 한 항목씩 비교하세요.'
      }
    ],
    humanCheckpoint: {
      actionLabel: '학부모 30명 단체 메일 발송',
      question: '이 초안은 지금 발송해도 될까요?',
      draftText: '제목: [별빛초 5-1] 학예회에 초대합니다!\n일시: 10월 25일(금) 14:00\n장소: 시청각실\n우리 반 친구들이 준비한 발표를 함께 응원해 주세요.',
      reviewChecks: [
        { id: 'schedule', label: '일정 원문의 날짜·요일·시간·장소와 초안을 비교했다.', evidence: '원문 10월 23일 ↔ 초안 10월 25일: 날짜가 다릅니다.', status: 'issue' },
        { id: 'recipients', label: '수신자 범위와 인원을 확인했다.', evidence: '학부모 30명으로 설정되어 있습니다.', status: 'confirmed' },
        { id: 'privacy', label: '불필요한 개인정보가 들어 있지 않은지 확인했다.', evidence: '초안 본문에는 학생 개인 정보가 없습니다.', status: 'confirmed' }
      ],
      expectedDecision: 'reject',
      options: [
        { id: 'approve', label: '발송 승인', feedback: '날짜가 원문과 다릅니다. 지금 승인하면 잘못된 일정이 전송되므로 먼저 수정해야 합니다.' },
        { id: 'reject', label: '발송 보류 후 수정', feedback: '근거 있는 판단입니다. 날짜를 10월 23일로 고친 뒤 다시 확인해야 합니다.' }
      ]
    },
    takeaway: '에이전트가 자료를 조회했더라도 초안에 옮기는 과정에서 오류가 생길 수 있습니다. 외부 전송 직전에는 원문과 실행 내용을 사람이 다시 비교합니다.'
  },
  {
    id: 'mission_research',
    title: '과학 탐구 자료 준비 미션',
    icon: '🔬',
    category: '조사·금전 영향',
    goal: '신재생에너지 자료와 이미지 후보를 찾고 유료 자료 결제 조건을 검토하기',
    steps: [
      { stepIndex: 1, type: 'plan_summary', text: '발행 기관과 날짜가 표시된 신재생에너지 자료를 우선 찾는다.' },
      { stepIndex: 2, type: 'tool_request', toolId: 'tool_search', text: '공개 자료와 발표용 이미지 후보를 검색한다.' },
      { stepIndex: 3, type: 'observation', text: '공공기관 자료 2건과 이미지 후보 3건을 찾았지만, 이미지 이용 조건은 아직 확인하지 않았다.' },
      { stepIndex: 4, type: 'plan_summary', text: '발표 개요를 만들고 이미지 구매 요청을 준비한다.' },
      {
        stepIndex: 5,
        type: 'approval_needed',
        toolId: 'tool_pay',
        text: '유료 이미지 3건, 합계 15,000원 결제를 요청한다.',
        warningMessage: '결제 전에는 구매 권한, 예산, 정확한 금액, 라이선스와 출처 표시 조건을 확인해야 합니다.'
      }
    ],
    humanCheckpoint: {
      actionLabel: '학급비 15,000원 결제',
      question: '현재 정보만으로 결제를 승인해도 될까요?',
      draftText: '품목: 풍력발전 발표용 이미지 3건\n금액: 15,000원\n교사 사전 승인: 확인 기록 없음\n사용 범위·출처 표시 조건: 확인 전',
      reviewChecks: [
        { id: 'authority', label: '학급비를 쓸 권한과 교사 사전 승인을 확인했다.', evidence: '승인 기록이 제시되지 않았습니다.', status: 'issue' },
        { id: 'amount', label: '품목, 수량, 총액을 확인했다.', evidence: '이미지 3건, 합계 15,000원입니다.', status: 'confirmed' },
        { id: 'license', label: '라이선스와 출처 표시 조건을 확인했다.', evidence: '사용 조건이 아직 확인되지 않았습니다. 무료 자료도 이용 조건 확인이 필요합니다.', status: 'issue' }
      ],
      expectedDecision: 'reject',
      options: [
        { id: 'approve', label: '결제 승인', feedback: '구매 권한과 이용 조건이 확인되지 않았습니다. 금액만 맞는다고 결제하면 안 됩니다.' },
        { id: 'reject', label: '결제 보류 후 조건 확인', feedback: '적절합니다. 교사 승인과 라이선스 조건을 확인한 뒤 구매 또는 대체 자료 사용을 결정합니다.' }
      ]
    },
    takeaway: '금전이 오가는 실행은 금액 확인만으로 충분하지 않습니다. 권한, 예산, 품목, 이용 조건을 함께 확인하고 승인 기록을 남깁니다.'
  },
  {
    id: 'mission_lost_found',
    title: '분실물 수령 지원 미션',
    icon: '🎒',
    category: '생활·물리 제어',
    goal: '분실 신고와 습득물 특징을 비교하고 안전한 수령 조건에서 보관함을 열지 결정하기',
    steps: [
      { stepIndex: 1, type: 'plan_summary', text: '습득물 사진만으로 주인을 단정하지 않고 분실 신고 기록을 찾는다.' },
      { stepIndex: 2, type: 'tool_request', toolId: 'tool_search', text: '학교 분실물 게시판에서 특징이 비슷한 신고를 조회한다.' },
      { stepIndex: 3, type: 'observation', text: "'검정 뿔테 안경' 신고 1건을 찾았다. 비슷하다는 사실만으로 소유자는 확정할 수 없다." },
      { stepIndex: 4, type: 'plan_summary', text: '신고 번호와 공개하지 않은 특징을 대조하고 담당 교사의 현장 확인을 요청한다.' },
      {
        stepIndex: 5,
        type: 'approval_needed',
        toolId: 'tool_locker',
        text: '담당 교사가 있는 동안 3호 보관함을 한 번 열도록 요청한다.',
        warningMessage: '물리 제어는 현실 공간에 영향을 줍니다. 수령자 확인과 현장 감독, 제한된 실행 범위를 확인하세요.'
      }
    ],
    humanCheckpoint: {
      actionLabel: '3호 보관함 1회 잠금 해제',
      question: '제시된 조건이라면 보관함 열기를 승인할 수 있을까요?',
      draftText: '신고 번호: LF-17 일치\n비공개 특징: 왼쪽 안경다리의 작은 흠집 일치\n현장 확인: 분실물 담당 교사와 수령 학생이 보관함 앞에서 확인 중\n실행 범위: 3호 보관함 1회 열기',
      reviewChecks: [
        { id: 'identity', label: '신고 번호와 비공개 특징을 함께 대조했다.', evidence: '신고 번호와 왼쪽 안경다리의 흠집이 모두 일치합니다.', status: 'confirmed' },
        { id: 'supervision', label: '권한 있는 담당자가 현장에 있는지 확인했다.', evidence: '분실물 담당 교사가 현장에서 확인 중입니다.', status: 'confirmed' },
        { id: 'scope', label: '도구 실행 대상과 횟수를 최소 범위로 제한했다.', evidence: '3호 보관함을 한 번만 엽니다.', status: 'confirmed' }
      ],
      expectedDecision: 'approve',
      options: [
        { id: 'approve', label: '조건부 열기 승인', feedback: '근거 있는 승인입니다. 본인 확인, 현장 감독, 1회 실행 범위가 모두 제시되었습니다.' },
        { id: 'reject', label: '열기 보류', feedback: '보류도 가능한 안전 선택입니다. 다만 이 사례에는 본인 확인과 현장 감독 자료가 모두 제시되어 조건부 승인이 가능합니다.' }
      ]
    },
    takeaway: '사진 유사도만으로 사람이나 소유자를 확정하지 않습니다. 여러 근거와 현장 확인을 결합하고 물리 제어 권한을 좁게 제한합니다.'
  }
];

/** 수업에서 점검할 네 가지 통제 층입니다. 모든 위험을 없애는 보증 점수가 아닙니다. */
export const safetyGuardrails = [
  {
    id: 'guard_permission',
    title: '1. 최소 권한과 범위 제한',
    icon: '🛡️',
    desc: '미션에 필요한 도구, 대상, 시간만 허용하고 외부 실행 권한은 기본적으로 닫아 둡니다.',
    options: [
      { id: 'scoped', label: '필요한 도구·대상·시간만 임시 허용', recommended: true },
      { id: 'full', label: '결제·발송·삭제 권한을 계속 모두 허용', recommended: false }
    ]
  },
  {
    id: 'guard_budget',
    title: '2. 실행 횟수·시간·금액 한도',
    icon: '⏳',
    desc: '미션의 위험에 맞게 호출 횟수, 실행 시간, 지출 한도를 정하고 초과하면 새 실행을 막습니다.',
    options: [
      { id: 'bounded', label: '미션별 한도 설정 + 초과 시 자동 중단', recommended: true },
      { id: 'no_limit', label: '완료될 때까지 횟수·시간·금액 제한 없음', recommended: false }
    ]
  },
  {
    id: 'guard_hitl',
    title: '3. 위험 기반 인간 확인',
    icon: '👤',
    desc: '외부 발송, 결제, 물리 제어처럼 영향이 크거나 되돌리기 어려운 실행은 사람이 근거를 보고 결정합니다.',
    options: [
      { id: 'risk_based', label: '고영향 실행 전 내용 공개 + 명시적 승인', recommended: true },
      { id: 'hitl_off', label: '영향과 상관없이 사람 확인 없이 자동 실행', recommended: false }
    ]
  },
  {
    id: 'guard_killswitch',
    title: '4. 중단·권한 회수·복구 절차',
    icon: '🚨',
    desc: '이상 행동이 보이면 새 실행을 멈추고 임시 권한을 회수한 뒤, 이미 일어난 결과를 확인하고 기록합니다.',
    options: [
      { id: 'containment', label: '중단 + 권한 회수 + 결과 확인 절차 준비', recommended: true },
      { id: 'alert_only', label: '경고만 표시하고 실행 권한과 복구 절차는 유지하지 않음', recommended: false }
    ]
  }
];

export const killSwitchAnomaly = {
  title: '중복 결제 위험과 재시도 반복 감지',
  scenario: '간식 구매 요청의 응답이 늦어지자 에이전트가 같은 결제를 다시 시도하려 합니다. 결제가 완료됐는지는 아직 확인되지 않았습니다.',
  anomalyLog: [
    { time: '14:02:01', text: '[결제 요청] 간식 1세트, 10,000원 요청 전송' },
    { time: '14:02:03', text: '[응답 지연] 결제 결과 확인 전 시간 초과' },
    { time: '14:02:04', text: '[재시도 예약] 같은 주문을 다시 전송하려 함' },
    { time: '14:02:04', text: '[이상 감지] 동일 주문 지문과 금액이 반복됨' },
    { time: '14:02:05', text: '[사람 확인 요청] 새 실행 중단 여부를 결정해 주세요' }
  ],
  containmentLog: [
    { time: '14:02:06', text: '[실행 중단] 새 계획과 도구 호출을 더 이상 시작하지 않음' },
    { time: '14:02:06', text: '[권한 회수] 임시 결제 토큰 사용 중지' },
    { time: '14:02:07', text: '[확인 필요] 결제사 기록에서 첫 요청의 처리 상태 점검 대기' }
  ],
  responseChecks: [
    { id: 'stop', label: '새 도구 호출이 더 이상 시작되지 않는지 확인한다.' },
    { id: 'revoke', label: '임시 결제 권한과 예약된 재시도를 회수한다.' },
    { id: 'recover', label: '이미 처리된 거래를 확인하고 담당자에게 알리며 로그를 보존한다.' }
  ],
  containedMessage: '새 결제 시도는 중단했지만, 첫 요청의 처리 여부는 별도로 확인해야 합니다. 중단 장치는 과거의 실행 결과까지 되돌려 주지는 않습니다.'
};
