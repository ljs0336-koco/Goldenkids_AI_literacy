# Antigravity 인계 메모

## Codex 수정 영역

- `src/features/fairness/**`만 수정했다.
- 공용 홈·라우팅·전역 스타일과 모듈 2·3·4는 수정하지 않았다.

## 모듈 1 성장 활동의 새 의미

- 내부 호환을 위해 상태 모드 이름 `growth`와 저장 키 `ai-literacy-lab:v5`는 유지한다.
- 사용자에게 보이는 활동은 이제 `활동 추천`이 아니라 `꿈·진로 탐색`이다.
- 기존 저장 데이터의 옛 최종 선택 ID는 화이트리스트에서 제외되어 자동으로 무효화된다.

## 유지해야 할 콘텐츠 원칙

1. 화면에 내부 `signals` 합계나 진로 적합도 점수를 노출하지 않는다.
2. 성적표만으로 학생의 진로를 단정하지 않는다.
3. 실제 경험, 좋아하는 일, 해결하고 싶은 문제, 학생의 직접적인 말을 함께 보여 준다.
4. 최종 결과는 직업 하나의 정답이 아니라 여러 꿈 후보와 다음 탐색 행동이다.
5. 금쪽이 스피커 사용 여부는 웹앱 진행 조건이 아니다.

## 데이터 구조

- `activityRecommendationStudent`: 학년, 성적표, 코딩 기록
- `activityRecommendationInitialRecords`: AI가 처음 받은 자료
- `activityRecommendationSupplementRecords`: 성적표 밖의 경험과 학생의 말
- `activityRecommendationOptions`: 화면에 보여 줄 진로 후보와 설명
- 기존 변수 이름은 다른 코드와의 호환을 위해 유지했다.

## 기준 커밋

- 작업 시작 기준: `4cd71663d006f7446405e0069495be1cf8ac3afe`
- 최종 커밋 해시는 로컬 커밋 후 `git log -1`로 확인한다.
