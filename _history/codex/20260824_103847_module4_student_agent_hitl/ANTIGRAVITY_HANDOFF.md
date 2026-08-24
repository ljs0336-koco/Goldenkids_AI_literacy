# Antigravity 인계 메모

## 현재 상태

모듈 4 학생용 개편과 공용 홈 연동이 완료되었습니다. GitHub 푸시는 하지 않았습니다.

## 반드시 유지할 내용

1. 모듈 4 제목은 ‘AI가 대신 움직인다면?’입니다.
2. 활동 A는 학생 동아리 홍보팀이 확인된 연계학교 연락처와 동아리 공동 계정을 사용하는 가상 상황입니다.
3. 활동 B는 박물관 견학 보고서용 공유 앨범을 정리하는 가상 상황입니다.
4. AI가 숨겨진 생각을 공개한다고 표현하지 말고, 사람이 볼 수 있는 계획·도구 요청·작업 결과만 보여 줍니다.
5. HITL은 사람 승인 버튼 하나가 아니라 정보 확인, 승인·보류, 실행 뒤 결과 확인까지 포함합니다.
6. 비상 정지는 앞으로의 행동만 막고, 이미 바뀐 파일은 복구하지 않습니다.
7. 교사 도구, 발표 모드, 안전 점수·백분율을 다시 넣지 않습니다.
8. 학생 화면의 주요 선택은 A/B이며 C는 작은 보조 선택지입니다.

## 저장소와 공용 연동

- 모듈 4 저장 키: ai-literacy-lab-agent:v3
- 전체 초기화 목록: src/utils/learningProgress.js에 v3 추가 완료
- 홈 카드: src/app/Home.jsx의 모듈 4 제목과 설명 갱신 완료
- 모듈 1·2·3 파일은 이번 작업에서 수정하지 않았습니다.

## 업로드 전 권장 확인

- 현재 브랜치와 원격 상태 확인
- 예상하지 못한 다른 에이전트 변경이 없는지 git status 확인
- npm test -- --run
- npm run lint
- npm run build
- 배포 후 /#/agent에서 활동 A·B 진입과 전체 초기화 대화상자 확인

## 참고 문서

- docs/MODULE4_STUDENT_AGENT_HITL_IMPLEMENTATION.md
- docs/MODULE4_EDUCATIONAL_REVIEW.md
- src/features/agent/MEMO_FOR_CODEX.md
