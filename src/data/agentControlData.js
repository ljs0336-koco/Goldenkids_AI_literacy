/**
 * 모듈 4: 에이전트 통제실 샘플 데이터셋
 * - 자율 AI 에이전트 판단 로그 시나리오 (8선)
 * - 확신도(Confidence), 센서 상태, 인간 개입(Kill-Switch) 결정 시뮬레이션
 */

export const agentScenarios = [
  {
    id: "agent_01",
    title: "스마트 스쿨 복도 자율주행 배송 로봇",
    domain: "교내 물리 로봇",
    situation: "복도에서 학습 교재를 운반 중인 자율주행 로봇이 갑자기 코너에서 튀어나온 유치원생을 감지했습니다.",
    sensorStatus: {
      lidar: "정상 (전방 1.5m 장애물 급감지)",
      camera: "정상 (보행자 인식률 94%)",
      floorSensor: "미끄러운 바닥 감지 (물청소 직후 미끄럼 마찰계수 저하)"
    },
    aiPlannedAction: "긴급 제동 시 바닥 미끄러짐 위험으로 인해 우측 빈 공간으로 자율 회피 주행 시도",
    aiConfidence: 68, // 확신도 낮음
    riskLevel: "높음",
    options: [
      {
        id: "opt_override",
        label: "🛑 인간 관리자 긴급 제동 (수동 개입)",
        isRecommended: true,
        consequence: "로봇이 즉시 멈추어 미끄러질 수는 있으나 충돌 사고를 사전에 완벽히 방지했습니다. 안전 책임은 사람이 집니다.",
        feedback: "올바른 선택입니다! 인명 피해 가능성이 있고 AI의 확신도가 낮을 때는 사람이 즉각 제어권을 가져와야 합니다."
      },
      {
        id: "opt_let_ai",
        label: "🤖 AI의 자율 회피 판단에 맡기기",
        isRecommended: false,
        consequence: "바닥이 미끄러워 우측 벽면에 부딪히며 교재가 쏟아지고 학생이 놀라 넘어졌습니다.",
        feedback: "위험합니다! AI의 확신도가 70% 미만이고 주변에 사람이 있을 때는 자동 제어에만 의존해서는 안 됩니다."
      }
    ],
    principle: "인간 개입의 원칙 (Human-in-the-loop): 안전과 생명에 직결된 결정에서 AI는 인간의 통제하에 있어야 합니다."
  },
  {
    id: "agent_02",
    title: "스마트 급식 자동 발주 및 식단 편성 에이전트",
    domain: "의사결정 알고리즘",
    situation: "급식 잔반 데이터를 분석하여 다음 주 식단을 자동으로 발주하는 에이전트가 학생 선호도 1위 메뉴만 5일 연속 발주하려 합니다.",
    sensorStatus: {
      preferenceHistory: "학생 선호도 99% (치킨/돈가스)",
      nutritionBalance: "영양 불균형 경고 (나트륨 및 지방 초과)",
      budgetStatus: "예산 내 유지"
    },
    aiPlannedAction: "선호도 만족도 극대화를 위해 5일 연속 튀김류 단일 식단 자동 발주 승인",
    aiConfidence: 92,
    riskLevel: "보통",
    options: [
      {
        id: "opt_override",
        label: "✏️ 영양교사 수동 검토 및 식단 조정 (수동 개입)",
        isRecommended: true,
        consequence: "영양 균형을 고려하여 채소와 생선 식단을 적절히 배분한 건강한 식단표로 수정되었습니다.",
        feedback: "올바른 선택입니다! AI가 데이터 수치(선호도)에만 최적화할 때, 사람이 공익적 가치(건강, 균형)를 반영하여 교정해야 합니다."
      },
      {
        id: "opt_let_ai",
        label: "🤖 AI 추천대로 자동 발주 승인하기",
        isRecommended: false,
        consequence: "학생들은 하루이틀 좋아했지만 일주일 만에 영양 기준 미달로 교육청 시정 조치를 받았습니다.",
        feedback: "단순 선호도 최적화가 전체 시스템의 올바른 목적(건강한 식습관)을 해칠 수 있습니다."
      }
    ],
    principle: "가치 정렬의 원칙 (Value Alignment): AI의 단기 목표(선호도 수치)가 인간의 궁극적 가치(건강)와 일치하는지 감독해야 합니다."
  },
  {
    id: "agent_03",
    title: "스마트 교실 자동 환기 및 냉난방 에이전트",
    domain: "환경 제어",
    situation: "교실 내 이산화탄소 농도가 높아지자 AI가 창문을 열어 환기하려 합니다. 하지만 현재 실외 미세먼지 수치는 '매우 나쁨' 경보 상태입니다.",
    sensorStatus: {
      indoorCO2: "1500ppm (경고 수준, 졸림 유발)",
      outdoorFineDust: "180㎍/㎥ (매우 나쁨 경보 발령)",
      airPurifierState: "필터 점검 필요 상태 (정화 효율 40% 저하)"
    },
    aiPlannedAction: "실내 CO2 급상승 방지를 위해 교실 대형 창문 4개 자동 전면 개방",
    aiConfidence: 74,
    riskLevel: "높음",
    options: [
      {
        id: "opt_override",
        label: "🛑 창문 개방 취소 및 공기청정기 최대 가동 (수동 개입)",
        isRecommended: true,
        consequence: "미세먼지 유입을 막고 공기청정기와 환기 장치를 가동하여 안전하게 실내 공기질을 관리했습니다.",
        feedback: "훌륭합니다! 상충하는 두 가지 위험(CO2 vs 미세먼지)이 부딪힐 때 복합적인 맥락을 사람이 종합 판단해야 합니다."
      },
      {
        id: "opt_let_ai",
        label: "🤖 AI 자동 환기 실행",
        isRecommended: false,
        consequence: "교실 안으로 짙은 황사와 미세먼지가 유입되어 호흡기 질환이 있는 학생들이 기침을 하기 시작했습니다.",
        feedback: "단일 센서 목표(CO2 저감)만 해결하려다 더 큰 외부 위험(미세먼지)을 불러왔습니다."
      }
    ],
    principle: "다중 위험 종합 평가의 원칙: 복합적인 위험 상황에서는 단일 지표에 의존하지 않고 사람이 우선순위를 결정해야 합니다."
  },
  {
    id: "agent_04",
    title: "학교 도서관 AI 도서 추천 에이전트",
    domain: "추천 알고리즘",
    situation: "학생의 독서 이력을 분석하는 추천 알고리즘이 1년간 재미 위주의 특정 학습만화 100권만 집중적으로 계속 추천하고 있습니다.",
    sensorStatus: {
      userClickRate: "학습만화 클릭률 98%",
      genreDiversity: "다양성 지수 5점 / 100점 (심각한 편향)",
      gradeLevelMatch: "초등 고학년 권장 도서 비중 0%"
    },
    aiPlannedAction: "클릭률 및 완독률 최대화를 위해 다음 달 추천 도서 목록도 학습만화 100%로 자동 채움",
    aiConfidence: 96,
    riskLevel: "낮음",
    options: [
      {
        id: "opt_override",
        label: "📚 사서 교사 추천 필터 조정 (다양성 강제 주입)",
        isRecommended: true,
        consequence: "학습만화 50%와 함께 학생이 흥미를 가질 만한 문학/과학 줄글 책 50%를 섞어 추천하여 독서 지평을 넓혔습니다.",
        feedback: "정확합니다! AI 알고리즘의 필터 버블(Filter Bubble, 편식 현상)을 깨뜨리기 위해 인간 전문가의 교육적 개입이 필수적입니다."
      },
      {
        id: "opt_let_ai",
        label: "🤖 AI 추천 알고리즘 유지",
        isRecommended: false,
        consequence: "학생이 만화책 외에는 긴 줄글 책을 전혀 읽지 않게 되는 독서 편식 현상이 심화되었습니다.",
        feedback: "사용자의 즉각적인 만족도만 쫓는 AI는 장기적인 교육적 성장을 저해할 수 있습니다."
      }
    ],
    principle: "필터 버블 방지의 원칙: 추천 알고리즘이 사용자를 좁은 취향의 감옥에 가두지 않도록 다양성을 보장해야 합니다."
  },
  {
    id: "agent_05",
    title: "학교 정문 안면인식 자동 출결 에이전트",
    domain: "생체 인식",
    situation: "등교 시간 정문 카메라가 일란성 쌍둥이 학생 중 동생의 얼굴을 보고 형의 출석으로 잘못 인식했습니다.",
    sensorStatus: {
      facialMatchScore: "81% (형으로 판정)",
      timeLog: "08:25 등교",
      rfidCardCheck: "미소지"
    },
    aiPlannedAction: "형의 출결을 '출석'으로 자동 전송 완료하고 동생은 '결석' 처리 예정",
    aiConfidence: 81,
    riskLevel: "보통",
    options: [
      {
        id: "opt_override",
        label: "🔍 교사 육안 확인 및 수동 출결 정정",
        isRecommended: true,
        consequence: "쌍둥이 학생의 실제 신원을 확인하고 두 학생 모두 정확하게 출석 처리되었습니다.",
        feedback: "올바른 조치입니다! 안면인식 등 생체 AI의 오인식 가능성을 열어두고 사람이 재확인하는 절차가 있어야 합니다."
      },
      {
        id: "opt_let_ai",
        label: "🤖 AI 판정대로 출결 전송",
        isRecommended: false,
        consequence: "실제 등교한 동생의 학부모님께 '무단 결석' 알림 문자가 잘못 발송되어 혼선이 빚어졌습니다.",
        feedback: "생체인식 시스템의 오판단은 불필요한 행정 오류와 학생/학부모의 불편을 초래합니다."
      }
    ],
    principle: "절차적 확인의 원칙: 생체 인식 AI의 결과는 결정적인 증거가 아닌 보조 수단으로 활용해야 합니다."
  },
  {
    id: "agent_06",
    title: "스마트 텃밭 자동 급수 및 드론 방제 에이전트",
    domain: "농업/환경",
    situation: "토양 수분 센서가 일시적으로 '건조'를 가리키자, AI가 텃밭 전체에 대량의 물을 자동 분사하려 합니다. 하지만 1시간 뒤 폭우 예보가 있습니다.",
    sensorStatus: {
      soilMoisture: "15% (센서 일시 건조 감지)",
      weatherForecastAPI: "1시간 후 강수 확률 90% (시간당 30mm 폭우 예보)",
      waterTankLevel: "80%"
    },
    aiPlannedAction: "토양 수분 목표치(60%) 달성을 위해 스프링클러 30분간 전면 가동",
    aiConfidence: 70,
    riskLevel: "보통",
    options: [
      {
        id: "opt_override",
        label: "🌧️ 급수 보류 및 기상 예보 대기 (수동 개입)",
        isRecommended: true,
        consequence: "1시간 뒤 내린 비로 자연 급수가 이루어져 물 낭비와 텃밭 침수 피해를 막았습니다.",
        feedback: "지혜로운 결정입니다! 단일 센서의 현재 수치보다 미래 기상 정보와 자연 조건을 종합하는 것이 중요합니다."
      },
      {
        id: "opt_let_ai",
        label: "🤖 AI 자동 급수 실행",
        isRecommended: false,
        consequence: "대량 급수 직후 폭우가 쏟아져 텃밭 작물의 뿌리가 썩고 비료가 유실되었습니다.",
        feedback: "자연 환경과 연계된 시스템에서는 단기 센서 수치에만 매몰되면 큰 손실을 초래합니다."
      }
    ],
    principle: "자원 보존 및 거시적 맥락의 원칙: 외부 환경의 거시적 변화를 종합하여 불필요한 자동 행동을 제어해야 합니다."
  },
  {
    id: "agent_07",
    title: "교내 시험 서술형 채점 보조 에이전트",
    domain: "교육 평가",
    situation: "학생이 정답과 의미는 정확히 일치하지만, 예시 답안과 다른 창의적인 비유 표현을 사용하여 서술형 답안을 작성했습니다.",
    sensorStatus: {
      keywordMatch: "예시 답안 키워드 일치율 40% (낮음)",
      semanticSimilarity: "문맥적 의미 유사도 92% (높음)",
      spellingCheck: "맞춤법 완벽"
    },
    aiPlannedAction: "모범 답안 키워드 미포함으로 인해 5점 만점에 1점(감점) 자동 채점 처리",
    aiConfidence: 62,
    riskLevel: "높음",
    options: [
      {
        id: "opt_override",
        label: "📝 교사 정밀 검토 및 만점 부여 (수동 개입)",
        isRecommended: true,
        consequence: "학생의 창의적이고 정확한 개념 이해를 인정하여 정당한 5점 만점을 부여했습니다.",
        feedback: "훌륭한 교육적 결정입니다! AI 채점은 키워드 매칭 한계가 있으므로 학생의 창의적 사고를 사람이 최종 평가해야 합니다."
      },
      {
        id: "opt_let_ai",
        label: "🤖 AI 채점 결과 그대로 반영",
        isRecommended: false,
        consequence: "정확한 개념을 이해하고도 모범 답안과 단어가 다르다는 이유로 억울하게 감점되어 학생의 학습 의욕이 꺾였습니다.",
        feedback: "평가 시스템에서 AI의 경직된 규칙이 학생의 창의성을 훼손하지 않도록 교사의 검토가 필수입니다."
      }
    ],
    principle: "정의로운 평가의 원칙: 인간의 창의성과 맥락적 사고에 대한 평가는 기계적 수치에만 맡길 수 없습니다."
  },
  {
    id: "agent_08",
    title: "방과후 프로그램 자동 추첨 및 배정 에이전트",
    domain: "자원 배분",
    situation: "인기 코딩 로봇 방과후 수업(정원 20명)에 80명이 몰렸습니다. 에이전트가 신청 서버에 0.001초 먼저 접속한 매크로 프로그램을 일반 학생으로 인식했습니다.",
    sensorStatus: {
      requestTimestamp: "정확히 09:00:00.001초에 20건 집중 접수",
      ipAddress: "동일 IP 대역에서 다중 접속",
      captchaPassed: "간이 캡차 자동 통과"
    },
    aiPlannedAction: "접수 시간순 정렬에 따라 매크로 의심 20명에게 자동 최종 수강권 배정 완료",
    aiConfidence: 75,
    riskLevel: "높음",
    options: [
      {
        id: "opt_override",
        label: "🚫 비정상 접속 필터링 및 공정 무작위 추첨 (수동 개입)",
        isRecommended: true,
        consequence: "매크로 비정상 트래픽을 차단하고 전체 신청 학생을 대상으로 공정하고 투명한 무작위 추첨을 진행했습니다.",
        feedback: "공정한 행정입니다! 기계적 선착순의 허점을 노린 부정행위를 사람이 감시하고 걸러내야 공정한 기회가 보장됩니다."
      },
      {
        id: "opt_let_ai",
        label: "🤖 AI 선착순 결과대로 확정",
        isRecommended: false,
        consequence: "정직하게 신청한 일반 학생들이 모두 탈락하고 학부모들의 항의로 배정이 전면 취소되었습니다.",
        feedback: "데이터 수집 과정의 공정성을 감시하지 않으면 알고리즘의 결과도 불공정해집니다."
      }
    ],
    principle: "공정성 감시의 원칙: 알고리즘이 악용되거나 부정한 방식으로 조작되지 않도록 인간 감시자가 상시 모니터링해야 합니다."
  }
];
