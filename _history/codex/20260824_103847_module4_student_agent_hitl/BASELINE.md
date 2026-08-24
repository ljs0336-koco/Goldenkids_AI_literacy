# 모듈 4 학생 중심 AI 행동·HITL 개편 기준선

- 작업 시작: 2026-08-24 10:38:47 (Asia/Seoul)
- 기준 Git 브랜치: `main`
- 기준 커밋: `56755bd feat: rebuild module 3 for first-time AI learners`
- 시작 시 Git 상태: clean (`main...origin/main`)
- 원본 보관: `original/src/features/agent/**`, `original/src/app/Home.jsx`, `original/src/utils/learningProgress.js`

## 승인된 개편 방향

- 활동 A는 학생 동아리 홍보팀이 지역 연계학교에 공연 초대 메일·메시지를 보내는 상황으로 바꾼다.
- 활동 B는 현장체험학습·박물관 견학 보고서를 위해 사진과 영상을 분류하다가 AI의 과도한 이동·삭제를 중단하고 복구하는 상황으로 바꾼다.
- 학생이 먼저 사람 확인 과정을 경험한 뒤 `HITL(Human in the Loop)`이라는 이름과 뜻을 연결한다.
- 교사 도구·발표 모드를 학생 화면에서 제거하고, 페이지별 행동 안내와 도움말을 제공한다.
- 안전 점수나 준비도 백분율을 제거하고, 행동 전 확인·중단·복구의 실제 의미를 보여 준다.

## 복원 방법

필요하면 이 폴더의 `original/` 아래 파일을 동일한 프로젝트 상대 경로로 되돌린다. 다른 에이전트의 이후 변경이 있을 수 있으므로 폴더 전체 덮어쓰기 전에 반드시 현재 diff를 확인한다.
