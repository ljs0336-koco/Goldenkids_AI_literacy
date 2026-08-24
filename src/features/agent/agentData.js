/**
 * 모듈 4는 실제 서비스가 아닌 학생용 가상 시뮬레이션입니다.
 * 도구의 위험은 이름보다 접근 범위와 실행 결과를 함께 보고 판단합니다.
 */
export const agentTools = [
  {
    id: 'tool_contacts',
    name: '연계학교 연락처 보기',
    icon: '주소록',
    riskLevel: 'low',
    riskLabel: '보기만 가능',
    desc: '동아리 공동 계정에 공유된 연락처를 읽습니다. 연락처를 새로 모으거나 수정하지는 못합니다.'
  },
  {
    id: 'tool_files',
    name: '동아리 파일 찾기',
    icon: '파일',
    riskLevel: 'low',
    riskLabel: '보기만 가능',
    desc: '공연 안내문과 포스터 파일을 찾습니다. 비슷한 이름의 초안과 최종본을 사람이 구별해야 합니다.'
  },
  {
    id: 'tool_message',
    name: '메일·메시지 보내기',
    icon: '전송',
    riskLevel: 'high',
    riskLabel: '밖으로 전송 · 사람 확인',
    desc: '선택한 사람에게 내용을 실제로 보냅니다. 받는 사람, 내용, 첨부 파일과 공개 범위를 전송 직전에 확인합니다.'
  },
  {
    id: 'tool_album',
    name: '공유 앨범 정리하기',
    icon: '앨범',
    riskLevel: 'high',
    riskLabel: '파일 변경 · 범위 제한',
    desc: '사진과 영상을 분류·복사·이동할 수 있습니다. 원본을 바꾸거나 삭제하는 권한은 꼭 필요한 경우에만 따로 허용합니다.'
  }
];

export const clubInviteMission = {
  id: 'club_invite',
  title: '동아리 공연 초대를 보내도 될까?',
  icon: '초대',
  category: '학생 동아리 홍보팀',
  hook: '우리 동아리가 준비한 공연에 지역 연계학교 친구들도 초대하려고 해요.',
  role: '나는 공연 홍보를 맡은 동아리원입니다. 동아리 공동 계정과 확인받은 연락처만 사용합니다.',
  request: '올해 공연의 최종 포스터를 붙여서, 연계학교 동아리 친구들에게 초대 메일과 메시지를 보내 줘.',
  goal: 'AI가 전송을 준비하는 과정과 자료를 살펴보고, 지금 보내도 되는지 결정하기',
  steps: [
    {
      stepIndex: 1,
      type: 'plan_summary',
      title: '먼저 할 일을 나눴어요',
      text: '연락처 확인 → 공연 정보 확인 → 포스터 첨부 → 전송 요청 순서로 준비합니다.'
    },
    {
      stepIndex: 2,
      type: 'tool_request',
      toolId: 'tool_contacts',
      title: '연락처를 찾았어요',
      text: '올해 확인된 연계학교 3곳과 작년에 사용한 연락처 2곳이 함께 보입니다.'
    },
    {
      stepIndex: 3,
      type: 'tool_request',
      toolId: 'tool_files',
      title: '포스터를 골랐어요',
      text: '`공연포스터_최종.jpg`와 `공연포스터_수정전.jpg` 중 수정 전 파일을 첨부했습니다.'
    },
    {
      stepIndex: 4,
      type: 'observation',
      title: '전송할 내용을 만들었어요',
      text: '공연 시간은 이전 기획안에서 가져왔고, 받는 사람들의 연락처가 서로 보이게 설정되어 있습니다.'
    },
    {
      stepIndex: 5,
      type: 'approval_needed',
      toolId: 'tool_message',
      title: '이제 실제로 보내려고 해요',
      text: 'AI가 메일과 메시지를 전송하기 전에 사람의 확인을 기다립니다.',
      warningMessage: '문장을 잘 만들었는지만 보지 말고, 받는 사람·행사 정보·첨부 파일·연락처 공개 범위를 확인하세요.'
    }
  ],
  humanCheckpoint: {
    actionLabel: '연계학교에 공연 초대 전송',
    question: '이 상태에서 무엇을 할까요?',
    draftText: '받는 사람: 올해 연계학교 3곳 + 작년 연락처 2곳\n제목: 별빛밴드 가을 공연에 초대합니다\n일시: 10월 25일 오후 4시\n장소: 별빛청소년문화관\n첨부: 공연포스터_수정전.jpg\n공개 범위: 받는 사람들의 연락처가 서로 보임',
    reviewChecks: [
      {
        id: 'recipients',
        label: '누구에게 보내나요?',
        evidence: '올해 확인된 3곳뿐 아니라 작년에 사용한 2곳도 섞여 있습니다.',
        status: 'issue'
      },
      {
        id: 'schedule',
        label: '공연 정보가 맞나요?',
        evidence: '최종 기획안은 10월 24일 오후 5시인데, 전송 문구에는 이전 일정이 적혀 있습니다.',
        status: 'issue'
      },
      {
        id: 'poster',
        label: '최종 파일을 붙였나요?',
        evidence: '최종본이 아니라 수정 전 포스터가 첨부되어 있습니다.',
        status: 'issue'
      },
      {
        id: 'privacy',
        label: '연락처가 서로 보이지 않나요?',
        evidence: '현재 설정에서는 다른 학교 연락처가 함께 보입니다. 받는 사람끼리 보이지 않게 바꿔야 합니다.',
        status: 'issue'
      }
    ],
    expectedDecision: 'pause_fix',
    options: [
      {
        id: 'send_now',
        label: 'A. 지금 모두 보내기',
        note: 'AI가 준비했으니 바로 전송해요.',
        feedback: '잘못된 일정과 파일이 여러 사람에게 전달됩니다. 밖으로 나가는 행동은 실행 전에 멈추고 고칠 수 있어야 해요.'
      },
      {
        id: 'pause_fix',
        label: 'B. 멈추고 고치기',
        note: '받는 사람과 내용을 수정한 뒤 다시 확인해요.',
        feedback: '전송을 보류하고 네 가지 문제를 고쳤어요. AI는 수정된 내용을 보여 준 뒤 다시 승인을 요청해야 합니다.'
      },
      {
        id: 'test_first',
        label: 'C. 우리 동아리에 시험 전송하기',
        note: '작게 시험해 보고 화면과 첨부를 확인해요.',
        feedback: '시험 전송은 좋은 확인 방법이지만, 이미 발견한 잘못된 일정과 연락처 범위는 먼저 고쳐야 해요.'
      }
    ]
  },
  correctedAction: {
    recipients: '올해 확인된 연계학교 동아리 3곳',
    schedule: '10월 24일 오후 5시 · 별빛청소년문화관',
    attachment: '공연포스터_최종.jpg',
    privacy: '각 학교의 연락처가 서로 보이지 않게 전송',
    request: '위 내용으로 우리 동아리에 시험 전송한 뒤, 화면을 확인하면 연계학교 3곳에 보내도 될까요?'
  },
  takeaway: 'AI에게 목적을 말한 것과 실제 전송을 허락한 것은 다릅니다. 영향이 밖으로 퍼지는 행동은 사람이 근거를 보고 승인하거나 보류합니다.'
};

export const agentMissions = [clubInviteMission];

export const museumIncident = {
  id: 'museum_album',
  title: '사라지는 견학 사진을 멈춰라',
  hook: '박물관 현장체험학습을 다녀온 뒤, 조별 보고서에 쓸 사진과 영상을 함께 정리하려고 해요.',
  request: '공유 앨범의 사진과 영상을 전시 주제별로 묶어 줘.',
  clueOptions: [
    {
      id: 'make_folders',
      label: 'A. 전시 주제별 새 폴더 만들기',
      note: '부탁한 범위 안에서 분류할 자리를 만들어요.',
      suspicious: false,
      feedback: '폴더를 만드는 것은 부탁한 분류 작업에 포함됩니다. 아직 원본을 바꾸지는 않았어요.'
    },
    {
      id: 'trash_similar',
      label: 'B. 비슷한 사진을 휴지통으로 옮기기',
      note: '부탁하지 않은 삭제로 이어질 수 있어요.',
      suspicious: true,
      feedback: '맞아요. AI는 비슷해 보인다는 이유만으로 서로 다른 전시물 사진을 중복이라고 판단했습니다.'
    },
    {
      id: 'delete_video',
      label: 'C. 긴 영상을 삭제 예약하기',
      note: '용량을 줄이려고 원본 영상을 지우려 해요.',
      suspicious: true,
      feedback: '이 행동도 멈춰야 해요. 영상 길이만으로 보고서에 필요 없는 자료라고 결정할 수 없습니다.'
    }
  ],
  anomalyLog: [
    { label: '요청 확인', text: '사진과 영상을 전시 주제별로 분류합니다.', tone: 'normal' },
    { label: '폴더 생성', text: '`우주`, `생명`, `역사`, `확인 필요` 폴더를 만들었습니다.', tone: 'normal' },
    { label: '범위 변경', text: '비슷해 보이는 사진을 중복으로 판단해 휴지통으로 옮기기 시작했습니다.', tone: 'warning' },
    { label: '추가 행동', text: '용량이 큰 영상을 삭제할 작업을 예약했습니다.', tone: 'danger' }
  ],
  stopResult: {
    stopped: '아직 시작하지 않은 사진 이동과 영상 삭제 예약',
    notReversed: '이미 휴지통으로 옮겨진 사진 7장',
    meaning: '비상 정지(킬스위치)는 앞으로의 행동을 멈추지만, 이미 바뀐 파일을 자동으로 되돌리지는 않습니다.'
  },
  responseChecks: [
    { id: 'restore', label: '휴지통으로 옮겨진 사진 7장을 원래 앨범으로 복원한다.' },
    { id: 'revoke', label: 'AI의 이동·삭제 권한을 끄고 원본은 보기만 가능하게 바꾼다.' },
    { id: 'review', label: '작업 기록을 보고 잘못 묶인 자료와 예약된 행동을 확인한다.' }
  ]
};

export const safetyGuardrails = [
  {
    id: 'guard_original',
    title: '원본 파일은 어떻게 할까요?',
    icon: '원본',
    desc: '분류가 잘못되어도 다시 돌아올 수 있는 방법을 정해요.',
    options: [
      { id: 'copy_only', label: 'A. 원본은 보기만 하고 새 폴더에 복사', note: '원본을 그대로 남겨요.', recommended: true },
      { id: 'edit_original', label: 'B. 원본 앨범에서 바로 이동·삭제', note: '한 번의 오판이 원본을 바꿀 수 있어요.', recommended: false }
    ]
  },
  {
    id: 'guard_uncertain',
    title: '애매한 자료는 어디에 둘까요?',
    icon: '확인',
    desc: 'AI가 확신하기 어려운 사진과 영상을 처리하는 방법을 정해요.',
    options: [
      { id: 'guess', label: 'A. AI가 가장 비슷한 주제로 결정', note: '그럴듯한 오분류가 숨을 수 있어요.', recommended: false },
      { id: 'needs_review', label: 'B. `확인 필요`에 모아 사람이 분류', note: '모르는 것을 표시하고 남겨요.', recommended: true }
    ]
  },
  {
    id: 'guard_preview',
    title: '여러 파일을 바꾸기 전에는요?',
    icon: '미리보기',
    desc: 'AI의 분류안을 사람이 보고 승인하거나 보류하도록 만들어요.',
    options: [
      { id: 'preview_hitl', label: 'A. 바뀔 목록을 먼저 보여 주고 승인받기', note: '사람 확인(HITL)을 행동 전에 넣어요.', recommended: true },
      { id: 'run_immediately', label: 'B. 분류가 끝나면 바로 모두 적용', note: '오류를 보기 전에 결과가 커질 수 있어요.', recommended: false }
    ]
  },
  {
    id: 'guard_delete_share',
    title: '삭제하거나 공유할 때는요?',
    icon: '권한',
    desc: '되돌리기 어렵거나 다른 사람에게 영향을 주는 행동을 따로 막아요.',
    options: [
      { id: 'automatic', label: 'A. 정리 과정에서 AI가 자동 실행', note: '분류 부탁이 삭제·공유 허락으로 넓어져요.', recommended: false },
      { id: 'ask_again', label: 'B. 삭제·공유 직전에 다시 묻기', note: '영향이 큰 행동만 따로 확인해요.', recommended: true }
    ]
  }
];

export const safeRerunResult = {
  title: '이번에는 자료를 지키며 정리했어요',
  items: [
    '원본 앨범은 그대로 남았습니다.',
    '새 폴더에는 복사본만 주제별로 묶였습니다.',
    '애매한 자료는 `확인 필요`에 모였습니다.',
    '삭제·공유는 실행하지 않고 사람의 다음 결정을 기다립니다.'
  ]
};
