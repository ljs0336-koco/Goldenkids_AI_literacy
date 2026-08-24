import geumjjokTouched from '../../assets/geumjjok/금쪽이_표정_감동.png';
import geumjjokIdea from '../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';
import geumjjokDoctor from '../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';
import geumjjokEmbarrassed from '../../assets/geumjjok/금쪽이_표정_당황.png';

export const aiPersonas = [
  {
    id: 'friend',
    name: '공감 친구',
    shortRole: '마음을 먼저 살펴요',
    icon: '마음',
    avatar: geumjjokTouched,
    role: '속상한 마음을 말로 정리할 때',
    caution: 'AI는 공감하는 말을 만들 수 있지만 실제로 감정을 느끼지는 않아요. 큰 고민은 믿을 수 있는 사람과 이야기해요.'
  },
  {
    id: 'coach',
    name: '생각 코치',
    shortRole: '질문으로 생각을 넓혀요',
    icon: '질문',
    avatar: geumjjokIdea,
    role: '내 생각과 다음 행동을 찾을 때',
    caution: 'AI가 답을 대신 정하게 두지 말고, 질문을 이용해 내 생각을 만들어요.'
  },
  {
    id: 'doctor',
    name: '설명 박사',
    shortRole: '어려운 내용을 풀어 말해요',
    icon: '설명',
    avatar: geumjjokDoctor,
    role: '개념과 원리를 쉽게 이해할 때',
    caution: '‘박사’는 설명하는 방식의 이름이에요. 중요한 사실은 교과서나 믿을 만한 자료로 다시 확인해요.'
  },
  {
    id: 'critic',
    name: '검토 파트너',
    shortRole: '빠진 점을 찾아요',
    icon: '검토',
    avatar: geumjjokEmbarrassed,
    role: '글이나 발표의 약점을 점검할 때',
    caution: 'AI의 지적도 언제나 맞지는 않아요. 받아들일지는 내가 판단해요.'
  }
];

export const roleScenarios = [
  {
    id: 'sc_01',
    situationTitle: '시험 뒤 마음과 공부 정리',
    category: '고민 정리',
    icon: '시험',
    everydayHook: '시험을 망친 날, 속상한 마음도 말하고 다음 공부도 준비하고 싶어요.',
    everydayUse: 'AI에게 마음을 정리하는 말이나 오답을 살펴볼 질문을 부탁할 수 있어요.',
    userPrompt: '수학 시험을 망쳐서 속상해. 이제 무엇부터 하면 좋을까?',
    genericResponse: '공부 계획을 세우고 다시 열심히 해 보세요.',
    responses: {
      friend: '많이 속상했겠다. 지금 가장 아쉬운 문제를 하나만 말해 줄래? 마음부터 천천히 정리해 보자.',
      coach: '틀린 문제 중에서 다시 보면 풀 수 있을 것 같은 문제는 무엇이야? 그 문제부터 다음 공부 순서를 정해 보자.',
      doctor: '오답은 개념을 몰랐는지, 계산을 실수했는지, 문제를 잘못 읽었는지 나누어 살펴볼 수 있어요.',
      critic: '“열심히 하겠다”만으로는 바뀌기 어려워요. 언제, 어떤 문제를 다시 풀지 구체적으로 정해 보세요.'
    },
    primaryRole: 'friend',
    secondaryRole: 'coach',
    alternativeRole: 'doctor',
    roleGuidance: '먼저 마음을 정리하고, 그다음 공부 계획을 세우면 두 가지 도움이 이어져요.',
    pedagogicalTakeaway: '한 가지 역할만 고집하지 않고, 필요한 순서대로 역할을 바꿀 수 있어요.',
    recipes: [
      {
        id: 'friend_then_coach',
        title: '마음부터, 그다음 계획',
        prompt: '내 마음을 먼저 정리해 주고, 내가 답할 수 있는 질문으로 다음 공부 계획을 세워 줘.',
        result: '위로만 받거나 계획만 듣는 대신, 마음 정리와 행동 계획을 함께 얻어요.'
      },
      {
        id: 'coach_then_friend',
        title: '계획부터, 마지막에 격려',
        prompt: '틀린 문제를 살펴볼 질문을 먼저 해 주고, 마지막에는 짧게 격려해 줘.',
        result: '바로 행동을 시작하고 싶을 때 계획을 앞에 둘 수 있어요.'
      }
    ]
  },
  {
    id: 'sc_02',
    situationTitle: '학교 축제 포스터 아이디어',
    category: '아이디어 만들기',
    icon: '포스터',
    everydayHook: '빈 종이를 보니 막막해요. AI에게 완성품 대신 시작할 아이디어를 받고 싶어요.',
    everydayUse: '주제와 조건을 말하면 AI에게 표어, 구성, 질문 같은 초안을 부탁할 수 있어요.',
    userPrompt: '우리 학교 환경 축제 포스터를 시작할 아이디어가 필요해.',
    genericResponse: '지구 그림과 “환경을 지켜요”라는 문구를 넣어 보세요.',
    responses: {
      friend: '좋은 주제야! 네가 평소에 불편하다고 느낀 환경 문제에서 시작하면 너다운 포스터가 될 거야.',
      coach: '친구들이 축제에서 바로 해 볼 행동은 무엇일까? 쓰레기 줄이기와 전기 아끼기 중 하나를 골라 볼래?',
      doctor: '포스터는 제목, 한눈에 보이는 그림, 바로 할 수 있는 행동 안내를 함께 넣으면 뜻을 전달하기 쉬워요.',
      critic: '“환경을 지켜요”만으로는 무엇을 해야 하는지 알기 어려워요. 행동 하나를 구체적으로 보여 주세요.'
    },
    primaryRole: 'coach',
    secondaryRole: 'critic',
    alternativeRole: 'doctor',
    roleGuidance: '질문으로 내 아이디어를 만든 뒤, 빠진 점을 검토하면 AI가 대신 만든 포스터가 아니라 내 작품이 돼요.',
    pedagogicalTakeaway: 'AI에게 완성품을 맡기기보다 생각을 시작하고 다듬는 데 활용해요.',
    recipes: [
      {
        id: 'coach_then_critic',
        title: '아이디어를 낸 뒤 검토',
        prompt: '내가 포스터 아이디어를 떠올리도록 질문 두 개를 하고, 내가 답하면 빠진 점 하나를 찾아 줘.',
        result: '내 생각을 먼저 만들고 AI의 검토를 이용할 수 있어요.'
      },
      {
        id: 'critic_then_coach',
        title: '흔한 생각을 먼저 깨기',
        prompt: '흔한 환경 포스터의 아쉬운 점 하나를 말한 뒤, 새로운 생각을 떠올릴 질문을 해 줘.',
        result: '진부한 표현을 피하고 새로운 방향을 찾을 수 있어요.'
      }
    ]
  },
  {
    id: 'sc_03',
    situationTitle: '어려운 과학 개념 이해',
    category: '공부 도우미',
    icon: '과학',
    everydayHook: '교과서의 어려운 문장을 읽었지만 뜻이 잡히지 않아요.',
    everydayUse: 'AI에게 쉬운 말, 예시, 확인 문제를 차례로 부탁할 수 있어요.',
    userPrompt: '블랙홀을 처음 배우는 학생도 이해하게 설명해 줘.',
    genericResponse: '블랙홀은 중력이 매우 강한 천체입니다.',
    responses: {
      friend: '처음 들으면 어렵게 느껴질 수 있어. 모르는 단어부터 하나씩 풀어 보면 괜찮아.',
      coach: '“빛도 빠져나오기 어렵다”는 말을 들으면 무엇이 궁금해져? 네 질문에서부터 알아보자.',
      doctor: '블랙홀은 아주 많은 질량이 작은 공간에 모여 중력이 매우 강해진 천체예요. 주변의 모든 것을 무조건 빨아들이는 청소기는 아니에요.',
      critic: '설명에 비유만 있고 원리가 빠지지는 않았는지, 출처를 확인할 수 있는지도 물어보세요.'
    },
    primaryRole: 'doctor',
    secondaryRole: 'coach',
    alternativeRole: 'critic',
    roleGuidance: '쉬운 설명을 들은 뒤 내 말로 다시 설명해 보고, AI에게 이해한 내용이 맞는지 질문받아 보세요.',
    pedagogicalTakeaway: 'AI의 설명을 그대로 외우지 않고 이해와 사실 확인에 사용해요.',
    recipes: [
      {
        id: 'doctor_then_coach',
        title: '설명 뒤 확인 질문',
        prompt: '블랙홀을 쉬운 말로 설명한 뒤, 내가 이해했는지 확인할 질문 하나를 해 줘.',
        result: '설명을 듣고 끝내지 않고 내가 이해했는지 확인해요.'
      },
      {
        id: 'coach_then_doctor',
        title: '궁금한 점부터 설명',
        prompt: '내가 블랙홀에 대해 가장 궁금한 점을 찾도록 질문한 뒤, 그 부분만 쉽게 설명해 줘.',
        result: '필요한 부분에 집중해 설명을 받을 수 있어요.'
      }
    ]
  },
  {
    id: 'sc_04',
    situationTitle: '발표 내용 미리 점검',
    category: '발표 준비',
    icon: '발표',
    everydayHook: '발표 자료는 만들었지만 친구들이 이해할 수 있을지 걱정돼요.',
    everydayUse: 'AI에게 청중의 입장에서 어려운 말, 빠진 설명, 예상 질문을 찾아 달라고 할 수 있어요.',
    userPrompt: '내 과학 발표를 친구들이 이해할 수 있는지 점검해 줘.',
    genericResponse: '내용이 좋습니다. 천천히 발표하면 됩니다.',
    responses: {
      friend: '열심히 준비한 게 보여! 긴장되는 부분을 말해 주면 발표 전 마음을 정리해 볼 수 있어.',
      coach: '발표를 들은 친구가 꼭 기억했으면 하는 한 문장은 무엇이야? 그 문장이 잘 보이는지 확인해 보자.',
      doctor: '전문 용어에는 짧은 뜻풀이와 그림을 붙이고, 핵심 내용을 처음과 끝에 한 번씩 제시하면 이해하기 쉬워요.',
      critic: '공식이 많으면 핵심이 가려질 수 있어요. 친구가 모를 단어와 근거가 빠진 주장을 표시해 보세요.'
    },
    primaryRole: 'critic',
    secondaryRole: 'coach',
    alternativeRole: 'friend',
    roleGuidance: '청중의 눈으로 빠진 점을 찾고, 내가 전하고 싶은 핵심을 다시 정하면 발표가 선명해져요.',
    pedagogicalTakeaway: 'AI의 검토를 참고하되 무엇을 고칠지는 발표자인 내가 결정해요.',
    recipes: [
      {
        id: 'critic_then_coach',
        title: '빠진 점 뒤 핵심 정리',
        prompt: '친구가 이해하기 어려울 부분을 하나 찾고, 내가 핵심을 다시 정하도록 질문해 줘.',
        result: '약점만 지적받지 않고 내 발표의 핵심을 다시 세울 수 있어요.'
      },
      {
        id: 'coach_then_critic',
        title: '핵심을 정한 뒤 검토',
        prompt: '발표의 핵심 한 문장을 정하도록 질문한 뒤, 그 문장이 잘 전달되는지 검토해 줘.',
        result: '발표 목적을 먼저 세운 다음 필요한 부분만 고쳐요.'
      }
    ]
  }
];

export const taskZoneOptions = [
  {
    id: 'ai_auto',
    label: 'A. 규칙으로 자동 정리',
    shortLabel: '자동 정리',
    note: '정해진 규칙대로 빠르게 처리해요.'
  },
  {
    id: 'human_lead',
    label: 'B. 사람이 직접 결정',
    shortLabel: '사람 결정',
    note: '목적과 영향을 살피고 사람이 선택해요.'
  },
  {
    id: 'collaboration',
    label: 'C. AI가 돕고 사람이 확인',
    shortLabel: 'AI 도움 + 사람 확인',
    note: 'AI가 초안을 만들고 사람이 고쳐서 결정해요.'
  }
];

export const workTasks = [
  {
    id: 'task_01',
    title: '축제 신청 명단 정리',
    category: '정해진 규칙',
    icon: '명단',
    description: '같은 신청을 찾고 반 이름과 번호 순서로 명단을 정리해요.',
    recommendedZone: 'ai_auto',
    rationale: '중복 찾기와 순서 정하기는 기준이 분명해서 규칙 기반 프로그램으로 처리할 수 있어요. 꼭 AI가 필요한 일은 아니에요.',
    aiPart: '프로그램이 같은 항목을 표시하고 정해진 순서로 배열해요.',
    humanPart: '누락된 신청과 이름이 같은 학생을 확인해요.',
    responsibility: '최종 명단을 사용하는 사람이 오류를 확인해요.'
  },
  {
    id: 'task_02',
    title: '축제 소개 문구 초안',
    category: '글 초안',
    icon: '문구',
    description: '축제의 즐거움이 느껴지는 소개 문구 세 가지를 만들어요.',
    recommendedZone: 'collaboration',
    rationale: 'AI는 여러 초안을 빠르게 만들 수 있지만, 우리 학교의 분위기와 실제 정보를 아는 사람이 고쳐야 해요.',
    aiPart: '조건에 맞는 소개 문구 초안을 여러 개 제안해요.',
    humanPart: '사실과 말투를 확인하고 우리 축제에 맞게 고쳐요.',
    responsibility: '게시할 문장을 정한 사람이 내용에 책임을 져요.'
  },
  {
    id: 'task_03',
    title: '외국어 안내문 초벌 번역',
    category: '번역 초안',
    icon: '번역',
    description: '외국인 방문객을 위한 축제 안내문을 먼저 번역해요.',
    recommendedZone: 'collaboration',
    rationale: 'AI 번역은 빠르지만 행사 이름, 장소, 문화에 맞지 않는 표현이 생길 수 있어 사람이 확인해야 해요.',
    aiPart: '안내문 전체의 첫 번역을 만들어요.',
    humanPart: '이름, 장소, 시간과 자연스러운 표현을 다시 확인해요.',
    responsibility: '안내문을 게시하는 사람이 정확성을 책임져요.'
  },
  {
    id: 'task_04',
    title: '축제 부스 주제 최종 선택',
    category: '가치와 영향',
    icon: '결정',
    description: '학생 의견, 예산, 안전을 함께 보고 어떤 부스를 열지 정해요.',
    recommendedZone: 'human_lead',
    rationale: '여러 사람에게 영향을 주는 선택에는 의견 조정과 책임이 필요해요. AI는 정리를 도울 수 있지만 최종 결정은 사람이 해요.',
    aiPart: '의견을 묶거나 각 선택의 장단점을 정리할 수 있어요.',
    humanPart: '학생의 의견과 안전, 비용을 함께 살피고 결정해요.',
    responsibility: '결정 권한을 가진 사람이 결과를 설명하고 책임져요.'
  }
];

export const rolePrinciples = [
  'AI의 초안은 사실과 상황을 확인한 뒤 사용해요.',
  '영향을 받는 사람의 의견을 듣고 마지막 결정은 사람이 해요.',
  '규칙 자동화와 AI의 도움을 구별하고 필요한 도구만 써요.'
];
