/**
 * 공정한 AI 실험실 통합 데이터셋
 * 1. AI 금쪽이 꿈·진로 탐색 (한 학생의 기록 범위 비교)
 * 2. 프로젝트 대표팀 구성 (projectTeamCandidates) - 8명
 */

// ==========================================
// 1. AI 금쪽이 꿈·진로 탐색 데이터
// ==========================================

export const activityRecommendationStudent = {
  id: "haneul",
  name: "하늘이",
  grade: "초등학교 6학년",
  introduction: "새로운 것을 만들고 친구들과 아이디어를 나누는 시간을 좋아해요. 하지만 좋아하는 일을 어떤 직업과 이어 볼 수 있을지는 아직 잘 모르겠어요.",
  worry: "내가 잘하면서도 즐겁게 할 수 있는 일은 무엇일까?",
  reportCard: [
    { subject: "정보", score: 92 },
    { subject: "수학", score: 86 },
    { subject: "과학", score: 78 },
    { subject: "국어", score: 74 }
  ],
  codingRecord: "블록 코딩 과제 8번을 모두 제출했어요."
};

export const activityRecommendationOptions = [
  {
    key: "software",
    name: "💻 소프트웨어 개발자",
    shortName: "소프트웨어 개발자",
    desc: "컴퓨터 프로그램과 디지털 서비스를 만드는 사람",
    why: "정보 성적이 높고 코딩 과제를 꾸준히 해 온 모습이 보여요.",
    color: "var(--color-blue)"
  },
  {
    key: "environmentalEngineering",
    name: "🌿 환경공학자",
    shortName: "환경공학자",
    desc: "과학과 기술로 환경 문제의 해결 방법을 찾는 사람",
    why: "환경 문제에 관심이 많고 관찰과 실험을 끝까지 이어 가요.",
    color: "var(--color-orange)"
  },
  {
    key: "scienceCommunication",
    name: "🔎 과학 커뮤니케이터",
    shortName: "과학 커뮤니케이터",
    desc: "어려운 과학 이야기를 다른 사람이 이해하기 쉽게 전하는 사람",
    why: "친구가 어려워할 때 실험 방법을 차근차근 설명해 주었어요.",
    color: "var(--color-purple)"
  },
  {
    key: "greenTech",
    name: "🌏 환경 문제를 해결하는 소프트웨어 개발자",
    shortName: "환경 소프트웨어 개발자",
    desc: "디지털 기술로 동물과 환경을 돕는 방법을 만드는 사람",
    why: "코딩 경험과 환경을 돕고 싶다는 마음을 함께 살릴 수 있어요.",
    color: "var(--color-green)"
  }
];

// 처음 AI에게 제공된 성적표·온라인 학습 기록 3개
export const activityRecommendationInitialRecords = [
  {
    id: "report_card",
    source: "하늘이의 성적표",
    title: "정보 92점 · 수학 86점 · 과학 78점 · 국어 74점",
    desc: "AI는 과목 점수만 보고 정보와 수학을 상대적인 강점으로 보았어요.",
    signals: { software: 4, environmentalEngineering: 1, scienceCommunication: 0, greenTech: 2 }
  },
  {
    id: "coding_homework",
    source: "온라인 과제 기록",
    title: "블록 코딩 과제 8번을 모두 제출함",
    desc: "순서와 조건을 바꾸어 가며 오류를 고쳐 과제를 완성했어요.",
    signals: { software: 5, environmentalEngineering: 0, scienceCommunication: 0, greenTech: 4 }
  },
  {
    id: "logic_quiz",
    source: "온라인 퀴즈",
    title: "규칙 찾기 문제를 여러 방법으로 해결함",
    desc: "틀린 답을 다시 살펴보고 다른 해결 방법을 시도했어요.",
    signals: { software: 3, environmentalEngineering: 2, scienceCommunication: 1, greenTech: 3 }
  }
];

// 처음에는 빠져 있던 실제 경험·관심·학생의 말 4개
export const activityRecommendationSupplementRecords = [
  {
    id: "science_explainer",
    source: "과학 실험 활동",
    title: "실험이 어려운 친구에게 방법을 차근차근 설명했어요",
    desc: "혼자 답을 맞히는 것보다 친구가 함께 이해했을 때 더 뿌듯했다고 말했어요.",
    reveals: "하늘이는 과학을 다른 사람에게 쉽게 설명하는 일을 좋아해요.",
    signals: { software: 0, environmentalEngineering: 2, scienceCommunication: 5, greenTech: 1 }
  },
  {
    id: "environment_project",
    source: "환경 프로젝트",
    title: "학교에서 버려지는 일회용품을 줄이는 방법을 찾았어요",
    desc: "쓰레기의 종류와 양을 관찰하고 친구들과 해결 아이디어를 정리했어요.",
    reveals: "하늘이는 환경 문제를 그냥 지나치지 않고 해결 방법을 찾고 싶어 해요.",
    signals: { software: 1, environmentalEngineering: 5, scienceCommunication: 2, greenTech: 4 }
  },
  {
    id: "team_ideas",
    source: "모둠 활동에서 한 말",
    title: "혼자 코딩할 때보다 친구들과 아이디어를 만들 때 더 재미있어요",
    desc: "친구들의 생각을 듣고 서로 다른 아이디어를 하나로 합치는 과정을 좋아했어요.",
    reveals: "하늘이는 혼자 하는 일보다 사람들과 아이디어를 나누는 일을 즐겨요.",
    signals: { software: 1, environmentalEngineering: 1, scienceCommunication: 3, greenTech: 3 }
  },
  {
    id: "student_voice",
    source: "하늘이가 직접 한 말",
    title: "동물과 환경을 돕는 일을 해 보고 싶어요",
    desc: "아직 직업 이름은 모르지만, 자신이 해결하고 싶은 문제를 분명하게 말했어요.",
    reveals: "성적표에는 나타나지 않는 하늘이의 관심과 바람이에요.",
    signals: { software: 0, environmentalEngineering: 5, scienceCommunication: 2, greenTech: 5 }
  }
];

export const activityRecommendationChecklist = [
  { id: "check_sources", text: "AI가 어떤 자료를 보고 진로를 제안했는지 확인했나요?" },
  { id: "check_missing", text: "성적표에 나오지 않는 하늘이의 경험도 확인했나요?" },
  { id: "check_interest", text: "하늘이가 좋아하는 일과 직접 한 말을 확인했나요?" },
  { id: "check_human_choice", text: "AI의 제안을 정답이 아니라 꿈 탐색의 출발점으로 보았나요?" }
];

export const activityRecommendationExitQuiz = {
  question: "AI가 성적표를 보고 추천한 직업은 그 학생에게 가장 알맞은 진로이다.",
  correctAnswer: false, // ❌ 거짓
  explanation: "성적표는 학생의 일부 모습만 보여 줘요. 실제 경험, 좋아하는 일, 해결하고 싶은 문제와 학생의 목소리를 함께 살펴야 꿈의 가능성을 넓힐 수 있어요."
};


// ==========================================
// 2. 프로젝트 대표팀 구성 데이터 (8명 지원자)
// ==========================================

export const projectTeamRoles = [
  { key: "problemDiscovery", label: "🔎 문제 발견·기획", color: "var(--color-blue)" },
  { key: "digitalMaking", label: "💻 디지털 제작", color: "var(--color-orange)" },
  { key: "communicationCollaboration", label: "🤝 의사소통·협력", color: "var(--color-green)" },
  { key: "presentation", label: "🎤 발표·표현", color: "var(--color-purple)" }
];

export const projectTeamMission = {
  eyebrow: "학교 생활 아이디어 발표회",
  title: "우리 학교를 더 편리하게 만들 네 명의 프로젝트 팀이 필요해요",
  description: "문제를 찾고, 아이디어를 만들고, 친구들과 협력해 발표까지 해낼 팀을 꾸려야 해요.",
  aiRequest: "지원자 기록을 보고 네 명을 먼저 골라 줘."
};

export const projectTeamCandidates = [
  {
    id: "narae",
    name: "나래",
    problemDiscovery: 75,
    digitalMaking: 95,
    communicationCollaboration: 55,
    presentation: 85,
    keyStrength: "💻 디지털 제작",
    weakness: "🤝 의사소통·협력",
    previousParticipationCount: 2
  },
  {
    id: "daon",
    name: "다온",
    problemDiscovery: 90,
    digitalMaking: 60,
    communicationCollaboration: 75,
    presentation: 80,
    keyStrength: "🔎 문제 발견·기획",
    weakness: "💻 디지털 제작",
    previousParticipationCount: 2
  },
  {
    id: "raon",
    name: "라온",
    problemDiscovery: 82,
    digitalMaking: 70,
    communicationCollaboration: 78,
    presentation: 94,
    keyStrength: "🎤 발표·표현",
    weakness: "💻 디지털 제작",
    previousParticipationCount: 1
  },
  {
    id: "maru",
    name: "마루",
    problemDiscovery: 88,
    digitalMaking: 86,
    communicationCollaboration: 84,
    presentation: 72,
    keyStrength: "🔎 문제 발견·기획, 💻 디지털 제작",
    weakness: "🎤 발표·표현",
    previousParticipationCount: 1
  },
  {
    id: "bora",
    name: "보라",
    problemDiscovery: 65,
    digitalMaking: 92,
    communicationCollaboration: 90,
    presentation: 68,
    keyStrength: "💻 디지털 제작, 🤝 의사소통·협력",
    weakness: "🔎 문제 발견·기획",
    previousParticipationCount: 0
  },
  {
    id: "saebom",
    name: "새봄",
    problemDiscovery: 70,
    digitalMaking: 65,
    communicationCollaboration: 88,
    presentation: 90,
    keyStrength: "🤝 의사소통·협력, 🎤 발표·표현",
    weakness: "💻 디지털 제작",
    previousParticipationCount: 0
  },
  {
    id: "onyu",
    name: "온유",
    problemDiscovery: 60,
    digitalMaking: 72,
    communicationCollaboration: 96,
    presentation: 76,
    keyStrength: "🤝 의사소통·협력",
    weakness: "🔎 문제 발견·기획",
    previousParticipationCount: 0
  },
  {
    id: "hangyeol",
    name: "한결",
    problemDiscovery: 78,
    digitalMaking: 80,
    communicationCollaboration: 70, // 전산 오류 상태 (실제는 92)
    presentation: 74,
    keyStrength: "🤝 의사소통·협력 (정정 시)",
    weakness: "🎤 발표·표현",
    previousParticipationCount: 1
  }
];

// 4대 기준 프리셋
export const projectTeamPresets = [
  {
    id: "preset1",
    name: "🏅 현재 역량 중심",
    desc: "각 역할에서 현재 수행이 높은 학생을 살펴봐요.",
    focus: ["지금 기록된 수행", "빠른 결과"],
    tradeoff: "현재 기록이 높지 않거나 아직 참여 기회가 적었던 학생은 잘 보이지 않을 수 있어요.",
    weights: { problemDiscovery: 30, digitalMaking: 35, communicationCollaboration: 20, presentation: 15, opportunity: 0 }
  },
  {
    id: "preset2",
    name: "🧩 역할 균형 중심",
    desc: "서로 다른 강점을 가진 학생들로 팀을 구성해요.",
    focus: ["서로 다른 강점", "네 역할의 균형"],
    tradeoff: "개인의 전체 기록보다 팀 안에서 맡을 역할을 더 중요하게 봐요.",
    weights: { problemDiscovery: 25, digitalMaking: 25, communicationCollaboration: 25, presentation: 25, opportunity: 0 }
  },
  {
    id: "preset3",
    name: "⚖️ 여러 조건을 함께 고려",
    desc: "개인 역량과 팀의 역할 균형을 함께 살펴봐요.",
    focus: ["현재 역량", "협력", "참여 기회"],
    tradeoff: "여러 조건을 함께 보지만 무엇을 더 중요하게 둘지는 사람이 설명해야 해요.",
    weights: { problemDiscovery: 20, digitalMaking: 25, communicationCollaboration: 30, presentation: 15, opportunity: 10 }
  },
  {
    id: "preset4",
    name: "🌱 참여 기회도 고려",
    desc: "필요한 역량을 확인하면서 이전 참여 기회도 함께 고려해요.",
    focus: ["처음 얻는 기회", "팀에 필요한 역량"],
    tradeoff: "참여 기회를 고려하는 이유와 적용 방법을 모두에게 미리 알려야 해요.",
    weights: { problemDiscovery: 20, digitalMaking: 20, communicationCollaboration: 25, presentation: 15, opportunity: 20 }
  }
];

// 프로젝트 팀 추천을 다시 살필 때 필요한 핵심 운영 원칙 (2가지 선택)
export const principles = [
  "팀의 목표와 선택 기준을 먼저 공개한다.",
  "빠지거나 잘못된 기록은 고친 뒤 같은 기준으로 다시 살핀다.",
  "결과에 질문하고 다시 검토할 수 있는 방법을 마련한다."
];

// ==========================================
// 3. AI 금쪽이 성장상 데이터 (호환성 및 데이터 리터러시)
// ==========================================

export const growthAwardCompetencies = [
  { key: "digitalToolUse", name: "💻 디지털 도구 활용", desc: "필요한 디지털 도구를 골라 사용한 모습", color: "var(--color-blue)" },
  { key: "problemSolving", name: "🧩 문제해결", desc: "방법을 찾고 다시 시도한 모습", color: "var(--color-orange)" },
  { key: "communicationCollaboration", name: "🤝 의사소통·협력", desc: "의견을 나누고 친구와 함께 해결한 모습", color: "var(--color-green)" }
];

export const growthAwardCandidates = [
  {
    id: "onyu",
    name: "온유",
    march: { digitalToolUse: 45, problemSolving: 50, communicationCollaboration: 58 },
    december: { digitalToolUse: 78, problemSolving: 82, communicationCollaboration: 86 }
  },
  {
    id: "seojun",
    name: "서준",
    march: { digitalToolUse: 85, problemSolving: 88, communicationCollaboration: 82 },
    december: { digitalToolUse: 92, problemSolving: 95, communicationCollaboration: 90 }
  },
  {
    id: "minseo",
    name: "민서",
    march: { digitalToolUse: 50, problemSolving: 55, communicationCollaboration: 60 },
    december: { digitalToolUse: 75, problemSolving: 80, communicationCollaboration: 82 }
  },
  {
    id: "doyun",
    name: "도윤",
    march: { digitalToolUse: 60, problemSolving: 62, communicationCollaboration: 65 },
    december: { digitalToolUse: 80, problemSolving: 82, communicationCollaboration: 86 }
  },
  {
    id: "haeun",
    name: "하은",
    march: { digitalToolUse: 55, problemSolving: 58, communicationCollaboration: 62 },
    december: { digitalToolUse: 82, problemSolving: 80, communicationCollaboration: 88 }
  },
  {
    id: "yujin",
    name: "유진",
    march: { digitalToolUse: 70, problemSolving: 72, communicationCollaboration: 75 },
    december: { digitalToolUse: 84, problemSolving: 86, communicationCollaboration: 89 }
  }
];

export const growthAwardChecklist = [
  { id: "check_both_records", text: "시작 기록과 마지막 기록이 모두 있는가?" },
  { id: "check_same_standard", text: "같은 기준으로 측정한 기록인가?" },
  { id: "check_no_missing", text: "누락되거나 잘못 입력된 기록은 없는가?" },
  { id: "check_teacher_obs", text: "숫자 외에 사람의 관찰과 실제 활동 과정도 확인했는가?" }
];

export const growthAwardExitQuiz = {
  question: "12월 점수가 가장 높은 학생이 1년 동안 가장 많이 성장한 학생이라고 할 수 있다.",
  correctAnswer: false,
  explanation: "현재 수준과 변화량은 달라요. 성장 정도를 알려면 시작 기록과 마지막 기록을 함께 비교해야 해요."
};
