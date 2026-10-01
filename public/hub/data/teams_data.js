/**
 * 8개 팀 전체 기획 데이터셋 및 Notes 초기 피드
 * 기준 문서: 01_기획/팀정보/팀구성_과제방향_메모.md (출석부순 24명 전원 반영)
 * 수정일: 2026-10-01 (팀 구성 및 역할 분담 기본정보 중심으로 간결화, 패들렛 및 미반영 과제현황 제거)
 */

const TEAMS_DATA = [
  {
    id: "01",
    name: "질문과 사고력",
    subtitle: "",
    category: "사고력·질문",
    status: "팀 구성 완료",
    statusBadge: "bg-surface-container-high text-on-surface border border-outline-variant/40",
    members: [
      { name: "김선우", role: "질문 성장 기록과 교실 적용" },
      { name: "손보경", role: "문해력·검증 활동 설계" },
      { name: "윤민서", role: "오개념 진단과 맞춤 발문" }
    ],
    target: "팀 구성 완료",
    direction: "AI가 답을 대신하지 않도록 학생의 질문과 검증 과정을 기록하고 다음 발문을 제안하는 도구",
    milestone: "팀 구성 및 역할 분담 완료",
    links: [],
    sideApp: {
      id: "app-01",
      title: "질문 전후 비교 및 근거 기록기",
      badge: "01팀 예시 사이드 앱",
      tag: "질문 기록",
      desc: "처음 작성한 질문과 점검 기준을 거쳐 수정한 질문을 비교하고 바꾼 이유를 기록하는 도구",
      mode: "모바일(390px) 및 PC 대응",
      appUrl: "apps/질문전후비교_v3.html",
      downloadName: "01팀_질문전후비교_웹앱_v3.html"
    },
    curriculum: null
  },
  {
    id: "02",
    name: "머신러닝 융합수업",
    subtitle: "",
    category: "교과×ML",
    status: "팀 구성 완료",
    statusBadge: "bg-surface-container-high text-on-surface border border-outline-variant/40",
    members: [
      { name: "한솔", role: "학습 플랫폼과 사고과정 기록" },
      { name: "이정윤", role: "AI 협업·질문 경험 설계" },
      { name: "정다영", role: "교과×ML 수업과 웹앱 설계" }
    ],
    target: "팀 구성 완료",
    direction: "고등학교 교과에서 머신러닝을 탐구 도구로 활용하고 AI 협업 과정과 판단을 기록하는 학습도구",
    milestone: "팀 구성 및 역할 분담 완료",
    links: [],
    sideApp: {
      id: "app-02",
      title: "머신러닝 교과 탐구 시뮬레이터",
      badge: "02팀 사이드 앱",
      tag: "ML 시뮬레이터",
      desc: "고교 교과 데이터를 조작하고 모델 예측 결과를 비교하는 탐구 도구 (과제 접수 후 연결)",
      mode: "웹앱 실습",
      appUrl: "",
      downloadName: ""
    },
    curriculum: null
  },
  {
    id: "03",
    name: "교사 전문성 지원",
    subtitle: "",
    category: "교원지원",
    status: "팀 구성 완료",
    statusBadge: "bg-surface-container-high text-on-surface border border-outline-variant/40",
    members: [
      { name: "박세원", role: "교원 업무 흐름과 현장 검증" },
      { name: "김보경", role: "교사전문성·사업 기획" },
      { name: "이유나", role: "AI 코칭 로직과 웹 시제품" }
    ],
    target: "팀 구성 완료",
    direction: "교사의 행정과 수업 설계 부담을 줄이고 AI 코칭과 사람 코칭을 연결하는 지원 서비스",
    milestone: "팀 구성 및 역할 분담 완료",
    links: [],
    sideApp: {
      id: "app-03",
      title: "수업 설계 및 행정 지원 코칭 툴",
      badge: "03팀 사이드 앱",
      tag: "교원 지원",
      desc: "수업 설계 입력 시 맞춤형 교수전략과 행정 서식을 추천해 주는 교사 지원 툴 (과제 접수 후 연결)",
      mode: "웹앱 실습",
      appUrl: "",
      downloadName: ""
    },
    curriculum: null
  },
  {
    id: "04",
    name: "사회정서 학급운영",
    subtitle: "",
    category: "사회정서",
    status: "팀 구성 완료",
    statusBadge: "bg-surface-container-high text-on-surface border border-outline-variant/40",
    members: [
      { name: "김가현", role: "정서 지원 AI와 학습로그" },
      { name: "이채민", role: "관계 데이터·학급 운영" },
      { name: "한지연", role: "자기조절학습 스캐폴딩" }
    ],
    target: "팀 구성 완료",
    direction: "정서·관계·학습 동기를 파악해 교사가 적절한 개입과 작은 힌트를 제공하도록 돕는 시스템",
    milestone: "팀 구성 및 역할 분담 완료",
    links: [],
    sideApp: {
      id: "app-04",
      title: "감정 체크인 및 자기조절 러너",
      badge: "04팀 사이드 앱",
      tag: "정서 케어",
      desc: "학생이 기분/상태를 선택하면 자기조절 미션과 따뜻한 피드백을 제공하는 웹앱 (과제 접수 후 연결)",
      mode: "웹앱 실습",
      appUrl: "",
      downloadName: ""
    },
    curriculum: null
  },
  {
    id: "05",
    name: "기초학력과 학습루틴",
    subtitle: "",
    category: "기초학력",
    status: "팀 구성 완료",
    statusBadge: "bg-surface-container-high text-on-surface border border-outline-variant/40",
    members: [
      { name: "문혜림", role: "기초학력·학습습관 설계" },
      { name: "신민경", role: "글쓰기 과정·학습분석" },
      { name: "홍한나", role: "영어 글쓰기와 맞춤지원" }
    ],
    target: "팀 구성 완료",
    direction: "기초학력과 영어 글쓰기 학습자에게 과정 시각화, 학습루틴, 단계적 스캐폴딩을 제공하는 AI 도구",
    milestone: "팀 구성 및 역할 분담 완료",
    links: [],
    sideApp: {
      id: "app-05",
      title: "문장 카드 루틴 및 스캐폴딩 러너",
      badge: "05팀 사이드 앱",
      tag: "학습 루틴",
      desc: "문장 카드 배열과 빈칸 채우기로 단계적 글쓰기를 돕고 칭찬 스탬프를 주는 웹앱 (과제 접수 후 연결)",
      mode: "웹앱 실습",
      appUrl: "",
      downloadName: ""
    },
    curriculum: null
  },
  {
    id: "06",
    name: "피지컬 AI와 메이커",
    subtitle: "",
    category: "피지컬AI",
    status: "팀 구성 완료",
    statusBadge: "bg-surface-container-high text-on-surface border border-outline-variant/40",
    members: [
      { name: "구주영", role: "게임화·영재·발명교육" },
      { name: "서민택", role: "로봇·메이커 에듀테크" },
      { name: "정은서", role: "피지컬 컴퓨팅·PBL 참여도" }
    ],
    target: "팀 구성 완료",
    direction: "로봇·발명·피지컬 컴퓨팅·PBL 수업에서 학생의 설계와 제작 과정을 지원하는 에듀테크",
    milestone: "팀 구성 및 역할 분담 완료",
    links: [],
    sideApp: {
      id: "app-06",
      title: "로보독 RL Playground (강화학습)",
      badge: "06팀 예시 사이드 앱",
      tag: "로보독 시뮬레이터",
      desc: "Q-Learning 기반 로보독 절벽 탈출 및 간식 획득 강화학습 시뮬레이터",
      mode: "PC 및 태블릿 권장",
      appUrl: "apps/robotdog_rl/index.html",
      downloadName: "로보독_RL_Playground.html"
    },
    curriculum: null
  },
  {
    id: "07",
    name: "탐구와 학습자 주도성",
    subtitle: "",
    category: "탐구·주도성",
    status: "팀 구성 완료",
    statusBadge: "bg-surface-container-high text-on-surface border border-outline-variant/40",
    members: [
      { name: "유형지", role: "사회·진로 탐구의 학습 흐름" },
      { name: "이서연", role: "인지적 개입·주도성 분석" },
      { name: "장윤하", role: "과학 수업과 타당한 평가" }
    ],
    target: "팀 구성 완료",
    direction: "관심에서 출발해 질문 생성, 자료 탐색, 판단, 결과물 제작으로 이어지는 AI 탐구학습 지원 서비스",
    milestone: "팀 구성 및 역할 분담 완료",
    links: [],
    sideApp: {
      id: "app-07",
      title: "탐구 질문 및 팩트체크 네비게이터",
      badge: "07팀 사이드 앱",
      tag: "탐구 네비게이터",
      desc: "탐구 키워드를 바탕으로 핵심 질문과 자료 수집 체크리스트를 구성하는 웹 도구 (과제 접수 후 연결)",
      mode: "웹앱 실습",
      appUrl: "",
      downloadName: ""
    },
    curriculum: null
  },
  {
    id: "08",
    name: "AI 코칭과 교육서비스",
    subtitle: "",
    category: "코칭·서비스",
    status: "팀 구성 완료",
    statusBadge: "bg-surface-container-high text-on-surface border border-outline-variant/40",
    members: [
      { name: "주은영", role: "교사 AI 수업 지원과 멘토링" },
      { name: "홍승주", role: "부모 코칭·사업모델 기획" },
      { name: "김영후", role: "관심 분야 확인 후 역할 확정" }
    ],
    target: "팀 구성 완료",
    direction: "교사 AI 수업 지원과 학부모 동반형 사고력 교육을 연결하는 코칭·서비스 모델",
    milestone: "팀 구성 및 역할 분담 완료",
    links: [],
    sideApp: {
      id: "app-08",
      title: "가족 AI 윤리 및 서약 인터랙션",
      badge: "08팀 사이드 앱",
      tag: "AI 코칭",
      desc: "학부모와 학생이 함께 AI 사용 규칙을 테스트하고 실천 서약서를 발급하는 웹 도구 (과제 접수 후 연결)",
      mode: "웹앱 실습",
      appUrl: "",
      downloadName: ""
    },
    curriculum: null
  }
];

// 강사 예시 사이드 앱 데이터 (모둠 과제와 분리)
const INSTRUCTOR_APP = {
  id: "inst-01",
  title: "강사 예시: 통학 데이터 탐구",
  badge: "강사 예시 (실습자료 v1)",
  tag: "데이터 탐구",
  desc: "실습자료 v1 기반 통학 탐구 앱 교정본: 1회성 완료형에서 가설-차트-이상치-판단 5단계 탐구 학습 흐름으로 전환한 웹앱",
  mode: "모바일(390px) 및 PC 대응",
  appUrl: "apps/통학_데이터_탐구_v2.html",
  downloadName: "강사예시_통학_데이터_탐구_v2.html"
};

const INITIAL_NOTES_DATA = [
  {
    id: "n-01",
    author: "강사 안내",
    role: "수업 공지",
    time: "9/30",
    tag: "notice",
    content: "팀 과제는 제출을 확인한 뒤 이 화면에 반영합니다.",
    likes: 0,
    comments: 0
  }
];
