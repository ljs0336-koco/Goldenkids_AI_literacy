import mediaCasesContactSheet from './assets/media-cases-contact-sheet.webp';

export const claimDecisionOptions = [
  {
    id: 'confirmed',
    icon: '✅',
    label: '자료로 확인됨',
    shortLabel: '확인됨',
    color: '#047857',
    background: '#ecfdf5'
  },
  {
    id: 'contradicted',
    icon: '❌',
    label: '고쳐야 함',
    shortLabel: '수정 필요',
    color: '#b91c1c',
    background: '#fef2f2'
  },
  {
    id: 'needs_evidence',
    icon: '⚠️',
    label: '근거가 더 필요함',
    shortLabel: '근거 부족',
    color: '#b45309',
    background: '#fffbeb'
  }
];

export const claimCase = {
  id: 'school-forest-news',
  publication: '별빛초 학교신문 여름호',
  prompt: '별빛초 학교숲을 소개하는 짧은 글을 써 줘. 개장일, 현재 이용 시간, 학습 효과도 알려 줘.',
  aiAnswer: [
    '별빛초 학교숲은 2024년 4월 22일에 문을 열었습니다.',
    '현재 학교숲은 평일 오전 8시부터 오후 5시까지 이용할 수 있습니다.',
    '학교숲이 생긴 뒤 학생들의 수업 집중력이 35% 높아졌습니다.'
  ],
  note: '학교와 기관 이름, 문서 내용은 수업을 위해 만든 가상 사례입니다.'
};

export const verificationClaims = [
  {
    id: 'claim_opening',
    number: 1,
    text: '별빛초 학교숲은 2024년 4월 22일에 문을 열었다.',
    question: '개장 날짜를 확인할 수 있을까요?',
    expectedDecision: 'confirmed',
    recommendedSourceIds: ['source_notice_current', 'source_newsletter_old'],
    sourceOptionIds: ['source_notice_current', 'source_newsletter_old', 'source_student_survey'],
    reasonOptions: [
      { id: 'opening_two_records', text: '서로 다른 학교 공식 문서 두 곳에 같은 개장 날짜가 적혀 있다.', isBest: true },
      { id: 'opening_one_comment', text: '개인 게시물 댓글에서 본 날짜라서 맞을 것 같다.', isBest: false },
      { id: 'opening_sounds_natural', text: 'AI 답변이 자연스럽고 자세해서 믿을 수 있다.', isBest: false }
    ],
    evidenceSummary: '현재 시설 안내와 개장 당시 학교소식지에 모두 2024년 4월 22일로 기록되어 있어요.',
    verifiedText: '별빛초 학교숲은 학교 공식 기록에 따르면 2024년 4월 22일에 문을 열었습니다.'
  },
  {
    id: 'claim_hours',
    number: 2,
    text: '현재 학교숲 이용 시간은 평일 오전 8시부터 오후 5시까지다.',
    question: '“현재” 이용 시간은 최신 자료와 맞을까요?',
    expectedDecision: 'contradicted',
    recommendedSourceIds: ['source_notice_current', 'source_newsletter_old'],
    sourceOptionIds: ['source_notice_current', 'source_newsletter_old', 'source_student_survey'],
    reasonOptions: [
      { id: 'hours_current_wins', text: '최신 공식 안내에는 오후 6시까지라고 적혀 있고, 오후 5시는 예전 안내다.', isBest: true },
      { id: 'hours_old_first', text: '먼저 작성된 자료가 언제나 더 정확하다.', isBest: false },
      { id: 'hours_both_official', text: '둘 다 학교 문서이므로 날짜가 달라도 아무 자료나 골라도 된다.', isBest: false }
    ],
    evidenceSummary: '2024년 소식지는 오후 5시까지였지만, 2026년 최신 시설 안내는 오후 6시까지로 바뀌었어요.',
    verifiedText: '2026년 3월의 최신 학교 안내에 따르면 현재 이용 시간은 평일 오전 8시부터 오후 6시까지입니다.'
  },
  {
    id: 'claim_focus',
    number: 3,
    text: '학교숲이 생긴 뒤 학생들의 수업 집중력이 35% 높아졌다.',
    question: '35%라는 수치를 뒷받침하는 조사 근거가 있을까요?',
    expectedDecision: 'needs_evidence',
    recommendedSourceIds: ['source_student_survey', 'source_parent_post'],
    sourceOptionIds: ['source_student_survey', 'source_parent_post', 'source_notice_current'],
    reasonOptions: [
      { id: 'focus_small_no_method', text: '소수의 느낌 조사와 출처 없는 게시물만으로는 35% 향상을 확인할 수 없다.', isBest: true },
      { id: 'focus_number_specific', text: '35%처럼 구체적인 숫자는 그 자체로 과학적 근거가 된다.', isBest: false },
      { id: 'focus_positive_comments', text: '좋았다는 댓글이 있으므로 모든 학생의 집중력이 높아졌다.', isBest: false }
    ],
    evidenceSummary: '18명의 짧은 만족도 조사와 출처 없는 게시물만 있고, 집중력을 전후 비교한 연구나 전체 조사 자료는 없어요.',
    verifiedText: '일부 학생은 학교숲 활동이 도움이 되었다고 답했지만, 집중력이 35% 높아졌다는 수치는 확인할 근거가 더 필요합니다.'
  }
];

export const evidenceSources = [
  {
    id: 'source_notice_current',
    icon: '🏫',
    title: '별빛초 시설 이용 안내',
    publisher: '별빛초등학교 행정실',
    type: '학교 공식 공지',
    publishedAt: '2026-03-02',
    dateLabel: '2026년 3월 2일 · 최신',
    excerpt: '학교숲 개장일: 2024년 4월 22일 / 2026학년도 이용 시간: 평일 08:00~18:00',
    trustLevel: 'high',
    trustLabel: '현재 정보를 확인하기 좋은 자료',
    checkPoints: ['작성 기관이 분명함', '게시 날짜가 최신임', '시설 운영을 담당하는 곳의 문서임']
  },
  {
    id: 'source_newsletter_old',
    icon: '📰',
    title: '학교숲 문을 열다',
    publisher: '별빛초 학교소식지',
    type: '학교 공식 소식지',
    publishedAt: '2024-05-03',
    dateLabel: '2024년 5월 3일 · 과거 자료',
    excerpt: '4월 22일 학교숲 개장식을 열었습니다. 첫해 이용 시간은 평일 08:00~17:00입니다.',
    trustLevel: 'medium',
    trustLabel: '당시 상황에는 유용하지만 최신성 확인 필요',
    checkPoints: ['개장 당시 기록임', '공식 소식지임', '현재 운영 시간과 다를 수 있음']
  },
  {
    id: 'source_student_survey',
    icon: '📋',
    title: '학교숲 체험 짧은 설문',
    publisher: '별빛초 학생자치회',
    type: '소규모 의견 조사',
    publishedAt: '2026-06-14',
    dateLabel: '2026년 6월 14일 · 최신',
    excerpt: '체험 학생 18명 중 13명이 “수업 전 마음이 편안해졌다”고 응답. 집중력 수치와 체험 전후 비교는 조사하지 않음.',
    trustLevel: 'medium',
    trustLabel: '학생 경험은 알 수 있지만 35% 집중력 향상의 근거는 아님',
    checkPoints: ['응답 인원이 적음', '집중력을 직접 측정하지 않음', '조사 방법이 제한적임']
  },
  {
    id: 'source_parent_post',
    icon: '💬',
    title: '학교숲 정말 효과 있대요!',
    publisher: '작성자 미상의 지역 게시판',
    type: '개인 게시물',
    publishedAt: '2026-04-01',
    dateLabel: '2026년 4월 1일',
    excerpt: '어디선가 봤는데 학교숲 덕분에 집중력이 35%나 올랐다고 합니다. 연구 이름이나 조사 링크는 없습니다.',
    trustLevel: 'low',
    trustLabel: '주장의 출처와 조사 방법을 확인할 수 없음',
    checkPoints: ['작성자를 알 수 없음', '원자료 링크가 없음', '수치의 조사 방법이 없음']
  }
];

export const mediaDecisionOptions = [
  { id: 'allowed', icon: '✅', label: '현재 정보로 사용 가능', color: '#047857', background: '#ecfdf5' },
  { id: 'not_allowed', icon: '❌', label: '현재는 사용하지 않음', color: '#b91c1c', background: '#fef2f2' },
  { id: 'conditional', icon: '🔎', label: '조건을 고치거나 더 확인한 뒤 사용', color: '#8a651f', background: '#fbf4e6' }
];

export const mediaCases = [
  {
    id: 'media_voice',
    number: 1,
    title: '동아리 진행자의 합성 목소리',
    mediaType: '보이스클로닝',
    artPosition: 'top-left',
    image: mediaCasesContactSheet,
    postText: '익명 채널이 학교 방송 진행자의 목소리를 본떠 장난 광고 영상을 게시하려고 해요.',
    visibleClues: [
      { id: 'voice_wave', text: '음성 파형이 보이지만, 파형 모양만으로 합성 여부를 확정할 수 없다.' },
      { id: 'smooth_voice', text: '목소리가 매끄럽다는 느낌은 첫 의심 단서일 뿐이다.' },
      { id: 'no_label', text: '게시 화면에 합성 여부와 원래 목소리 제공자가 표시되어 있지 않다.' }
    ],
    provenance: [
      { id: 'origin', label: '원래 출처', value: '학교 방송 동아리가 공개한 인터뷰 녹음', tone: 'neutral' },
      { id: 'creator', label: '만든 사람', value: '신원을 밝히지 않은 외부 채널 운영자', tone: 'warning' },
      { id: 'history', label: '제작·수정 이력', value: '인터뷰 음성 40초를 학습시켜 새 문장을 생성함', tone: 'warning' },
      { id: 'consent', label: '당사자 동의', value: '진행자에게 합성·광고 사용 동의를 받지 않음', tone: 'danger' }
    ],
    rightsChoices: [
      { id: 'voice_consent', text: '목소리 주인에게 합성 및 게시 동의를 받는다.', required: true },
      { id: 'synthetic_label', text: '실제 발언이 아니라 합성 음성임을 분명히 표시한다.', required: true },
      { id: 'purpose_check', text: '당사자의 명예를 해치거나 오해를 만들 목적이 없는지 확인한다.', required: true },
      { id: 'more_views', text: '조회 수를 높이기 위해 실제 발언처럼 제목을 붙인다.', required: false }
    ],
    affectedRights: ['목소리에 대한 권리', '동의와 자기결정권', '명예와 피해 가능성'],
    expectedDecision: 'not_allowed',
    decisionReason: '현재는 당사자 동의가 없고 합성 표시도 없어 실제 발언으로 오해될 가능성이 큽니다.',
    repairSteps: ['목소리 주인의 명시적 동의 받기', '합성 음성 표시하기', '게시 목적과 피해 가능성을 당사자와 함께 검토하기']
  },
  {
    id: 'media_context',
    number: 2,
    title: '설명이 바뀐 공원 사진',
    mediaType: '실제 장면의 잘못된 맥락',
    artPosition: 'top-right',
    image: mediaCasesContactSheet,
    postText: '공원 정화 활동 사진에 “행사가 끝난 뒤 학생들이 쓰레기를 버리고 갔다”라는 설명이 붙었어요.',
    visibleClues: [
      { id: 'cleanup_bags', text: '사람들이 장갑과 수거 봉투를 들고 있지만 앞뒤 상황은 사진만으로 알 수 없다.' },
      { id: 'camera', text: '촬영 장비가 보여도 누가 언제 어떤 목적으로 촬영했는지는 확인해야 한다.' },
      { id: 'caption_claim', text: '사진 속 장면과 게시물 설명이 정말 같은 사건인지 출처 확인이 필요하다.' }
    ],
    provenance: [
      { id: 'origin', label: '원래 출처', value: '푸른마을 자원봉사센터의 정화 활동 기록', tone: 'neutral' },
      { id: 'creator', label: '촬영자', value: '활동 기록을 맡은 센터 직원', tone: 'neutral' },
      { id: 'history', label: '제작·수정 이력', value: '사진 자체의 합성·편집 기록은 없음', tone: 'neutral' },
      { id: 'context', label: '원래 맥락', value: '참가자들이 행사 전부터 있던 쓰레기를 줍는 장면', tone: 'danger' }
    ],
    rightsChoices: [
      { id: 'restore_context', text: '원래 행사와 촬영 맥락에 맞게 설명을 고친다.', required: true },
      { id: 'credit_source', text: '촬영 기관과 원본 출처를 표시한다.', required: true },
      { id: 'participant_check', text: '사람이 식별된다면 게시 범위와 촬영 동의를 확인한다.', required: true },
      { id: 'keep_caption', text: '사진이 실제이므로 자극적인 설명은 그대로 둔다.', required: false }
    ],
    affectedRights: ['정확한 맥락', '명예와 피해 가능성', '출처 표시'],
    expectedDecision: 'not_allowed',
    decisionReason: '실제 사진이라도 원래 맥락과 반대되는 설명을 붙이면 사람들에게 잘못된 믿음과 피해를 만들 수 있습니다.',
    repairSteps: ['잘못된 설명 삭제 또는 정정하기', '원본 출처와 촬영 맥락 표시하기', '식별 가능한 참가자의 게시 동의 확인하기']
  },
  {
    id: 'media_poster',
    number: 3,
    title: 'AI와 함께 만든 축제 포스터',
    mediaType: 'AI 생성 이미지',
    artPosition: 'bottom-left',
    image: mediaCasesContactSheet,
    postText: '미술 동아리가 직접 만든 가상 로봇 캐릭터로 우주 축제 포스터를 제작했어요.',
    visibleClues: [
      { id: 'fictional_robot', text: '실존 인물이 아닌 가상 로봇 캐릭터가 중심에 있다.' },
      { id: 'art_style', text: '일러스트처럼 보여도 어떤 도구로 만들었는지는 겉모습만으로 확정할 수 없다.' },
      { id: 'safe_context', text: '포스터의 목적과 게시 장소를 확인해야 사용 범위를 판단할 수 있다.' }
    ],
    provenance: [
      { id: 'origin', label: '원래 출처', value: '별빛초 미술 동아리의 축제 홍보물', tone: 'neutral' },
      { id: 'creator', label: '만든 사람', value: '동아리 학생들과 지도교사가 학교용 AI 도구로 공동 제작', tone: 'neutral' },
      { id: 'history', label: '제작·수정 이력', value: 'AI로 초안을 만든 뒤 학생들이 색과 구성을 수정했으며 제작 기록을 보관함', tone: 'neutral' },
      { id: 'consent', label: '권리·표시', value: '실존 인물 없음 / 학교가 사용 가능한 요소만 사용 / AI 도움을 받았다고 표시', tone: 'positive' }
    ],
    rightsChoices: [
      { id: 'keep_label', text: 'AI의 도움을 받은 제작물임을 계속 표시한다.', required: true },
      { id: 'check_license', text: '사용한 이미지 요소와 도구의 이용 조건을 확인한다.', required: true },
      { id: 'teacher_review', text: '공개 게시 전 동아리와 담당 교사가 함께 최종 확인한다.', required: true },
      { id: 'hide_ai', text: '사람들이 모르게 AI 제작 기록을 삭제한다.', required: false }
    ],
    affectedRights: ['저작권과 이용 조건', '출처·제작 방식 표시', '공개 전 인간 확인'],
    expectedDecision: 'allowed',
    decisionReason: '가상 캐릭터를 사용했고, 제작 이력과 AI 사용을 공개했으며, 이용 조건과 게시 목적도 확인했습니다.',
    repairSteps: ['현재의 제작 이력과 AI 사용 표시 유지하기', '게시 범위가 바뀌면 이용 조건을 다시 확인하기']
  },
  {
    id: 'media_parody',
    number: 4,
    title: '교장 선생님 말투를 흉내 낸 패러디',
    mediaType: '합성 음성 패러디',
    artPosition: 'bottom-right',
    image: mediaCasesContactSheet,
    postText: '방송부가 축제용 패러디임을 표시했지만, 교장 선생님의 목소리를 본떠 만든 음성을 사용하려 해요.',
    visibleClues: [
      { id: 'parody_setting', text: '연극 가면과 편집 화면이 보여 패러디 제작 상황처럼 보인다.' },
      { id: 'clear_label', text: '패러디 표시가 있다는 정보는 목적을 이해하는 데 도움이 된다.' },
      { id: 'consent_unknown', text: '화면만으로 목소리 주인의 동의를 받았는지는 알 수 없다.' }
    ],
    provenance: [
      { id: 'origin', label: '원래 출처', value: '학교 공식 행사에서 공개된 교장 선생님의 인사말', tone: 'neutral' },
      { id: 'creator', label: '만든 사람', value: '별빛초 방송 동아리', tone: 'neutral' },
      { id: 'history', label: '제작·수정 이력', value: '축제 패러디 영상용 합성 음성으로 제작했고 합성 표시를 넣음', tone: 'positive' },
      { id: 'consent', label: '당사자 동의', value: '기록에 동의 여부가 적혀 있지 않아 추가 확인 필요', tone: 'warning' }
    ],
    rightsChoices: [
      { id: 'ask_principal', text: '목소리를 본뜰 당사자에게 제작과 상영 동의를 확인한다.', required: true },
      { id: 'keep_parody_label', text: '합성 패러디이며 실제 발언이 아니라고 표시한다.', required: true },
      { id: 'limit_audience', text: '합의한 행사와 관람 범위를 지킨다.', required: true },
      { id: 'assume_ok', text: '학교 행사이므로 묻지 않아도 동의한 것으로 생각한다.', required: false }
    ],
    affectedRights: ['목소리에 대한 권리', '동의와 자기결정권', '사용 목적과 범위'],
    expectedDecision: 'conditional',
    decisionReason: '패러디와 합성 표시가 있어도 당사자의 제작·상영 동의를 받았는지 아직 확인되지 않았습니다.',
    repairSteps: ['교장 선생님의 명시적 동의 확인하기', '합성 패러디 표시 유지하기', '합의한 행사와 공개 범위만 사용하기']
  }
];

export const verificationPrinciples = [
  '답변 전체가 아니라 확인 가능한 주장으로 나누기',
  '출처의 이름만 보지 말고 작성자·날짜·근거를 함께 보기',
  '한 자료만 믿지 않고 다른 자료와 교차 확인하기',
  '시각적 이상함은 첫 단서일 뿐 최종 판별로 사용하지 않기',
  '합성 여부와 별개로 동의·권리·맥락·피해 가능성 확인하기',
  '게시하거나 공유하기 전에 사람이 마지막으로 확인하기'
];

export const claimById = Object.fromEntries(verificationClaims.map(claim => [claim.id, claim]));
export const sourceById = Object.fromEntries(evidenceSources.map(source => [source.id, source]));
export const mediaCaseById = Object.fromEntries(mediaCases.map(item => [item.id, item]));
