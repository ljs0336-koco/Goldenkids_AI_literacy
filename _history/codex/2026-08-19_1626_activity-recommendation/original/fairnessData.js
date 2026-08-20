/**
 * 공정한 AI 실험실 통합 데이터셋
 * 1. AI 금쪽이 성장상 (growthAwardCandidates) - 6명
 * 2. 프로젝트 대표팀 구성 (projectTeamCandidates) - 8명
 */

// ==========================================
// 1. AI 금쪽이 성장상 데이터 (1년간 역량 변화)
// ==========================================

export const growthAwardCompetencies = [
  {
    key: "digitalToolUse",
    name: "💻 디지털 도구 활용",
    desc: "필요한 디지털 도구를 골라 사용한 모습",
    color: "var(--color-blue)"
  },
  {
    key: "problemSolving",
    name: "🧩 문제해결",
    desc: "방법을 찾고 다시 시도한 모습",
    color: "var(--color-orange)"
  },
  {
    key: "communicationCollaboration",
    name: "🤝 의사소통·협력",
    desc: "의견을 나누고 친구와 함께 해결한 모습",
    color: "var(--color-green)"
  }
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
    march: { digitalToolUse: 52, problemSolving: 60, communicationCollaboration: 48 },
    december: { digitalToolUse: 76, problemSolving: 84, communicationCollaboration: 72 }
  },
  {
    id: "doyun",
    name: "도윤",
    march: { digitalToolUse: 60, problemSolving: 55, communicationCollaboration: 70 },
    december: { digitalToolUse: 80, problemSolving: 78, communicationCollaboration: 88 }
  },
  {
    id: "haeun",
    name: "하은",
    march: { digitalToolUse: 40, problemSolving: 45, communicationCollaboration: 65 },
    december: { digitalToolUse: 68, problemSolving: 72, communicationCollaboration: 85 }
  },
  {
    id: "yujin",
    name: "유진",
    march: { digitalToolUse: 70, problemSolving: 75, communicationCollaboration: 68 },
    december: { digitalToolUse: 85, problemSolving: 88, communicationCollaboration: 82 }
  }
];

export const growthAwardChecklist = [
  { id: "check_both_records", text: "시작 기록과 마지막 기록이 모두 있는가?" },
  { id: "check_same_standard", text: "같은 기준과 같은 100점 척도로 측정한 기록인가?" },
  { id: "check_no_missing", text: "누락되거나 잘못 입력된 기록은 없는가?" },
  { id: "check_teacher_obs", text: "점수 숫자 외에 교사의 관찰과 학생의 활동 과정도 확인했는가?" }
];

export const growthAwardExitQuiz = {
  question: "12월 점수가 가장 높은 학생이 1년 동안 가장 많이 성장한 학생이라고 할 수 있다.",
  correctAnswer: false, // ❌ 거짓
  explanation: "현재 수준과 변화량은 달라요. 성장 정도를 알려면 시작 기록과 마지막 기록을 함께 비교해야 해요."
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
    weights: { problemDiscovery: 30, digitalMaking: 35, communicationCollaboration: 20, presentation: 15, opportunity: 0 }
  },
  {
    id: "preset2",
    name: "🧩 역할 균형 중심",
    desc: "서로 다른 강점을 가진 학생들로 팀을 구성해요.",
    weights: { problemDiscovery: 25, digitalMaking: 25, communicationCollaboration: 25, presentation: 25, opportunity: 0 }
  },
  {
    id: "preset3",
    name: "⚖️ 여러 조건을 함께 고려",
    desc: "개인 역량과 팀의 역할 균형을 함께 살펴봐요.",
    weights: { problemDiscovery: 20, digitalMaking: 25, communicationCollaboration: 30, presentation: 15, opportunity: 10 }
  },
  {
    id: "preset4",
    name: "🌱 참여 기회도 고려",
    desc: "필요한 역량을 확인하면서 이전 참여 기회도 함께 고려해요.",
    weights: { problemDiscovery: 20, digitalMaking: 20, communicationCollaboration: 25, presentation: 15, opportunity: 20 }
  }
];

// 공정한 AI 운영 원칙 (3가지 선택)
export const principles = [
  "판단 기준을 미리 공개한다.",
  "데이터의 출처, 누락, 오류를 확인한다.",
  "결과가 여러 사람에게 미치는 영향을 비교한다.",
  "이의제기와 재검토 절차를 마련한다.",
  "AI의 추천을 참고하되 사람이 근거를 확인하고 최종 판단한다."
];
