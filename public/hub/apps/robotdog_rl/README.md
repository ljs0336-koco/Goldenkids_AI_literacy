# 멍멍 RL Playground (RoboDog Reinforcement Learning Playground)

> **팀 06 피지컬 AI·메이커 전용 사이드앱 프로토타입 (v0.1)**  
> 보상 함수와 정책 학습으로 배우는 4족보행 로보독의 격자형 길찾기 강화학습 학습도구

---

## 1. 프로젝트 개요

- **목적**: 실제 관절 물리나 하드웨어 제어 없이도, 학생이 보상 함수를 직접 설계하고 **Q-Learning**과 **SARSA**의 경로 선택 차이를 시각적으로 비교·관찰하는 웹 기반 강화학습 시뮬레이터.
- **기반 오픈소스**: Arthur Juliani의 [web-rl-playground](https://github.com/awjuliani/web-rl-playground) (MIT License).
- **핵심 질문**: *"같은 맵, 같은 보상 조건에서 Q-Learning과 SARSA는 왜 서로 다른 길을 선택할까?"*

---

## 2. Q-Learning vs SARSA 비교 기준 맵 (`comparison_01` / 미션 2)

두 알고리즘의 정책 차이를 100% 관찰할 수 있는 Sutton & Barto Cliff Walking 기반 기준 맵입니다.

```text
[ 행 0 ]  ⬜  ⬜  ⬜  ⬜  ⬜  ⬜
[ 행 1 ]  ⬜  ⬜  ⬜  ⬜  ⬜  ⬜
[ 행 2 ]  ⬜  ⬜  ⬜  ⬜  ⬜  ⬜  <-- SARSA 안전 우회로 (위험에서 멀리 피함)
[ 행 3 ]  ⬜  ⬜  ⬜  ⬜  ⬜  ⬜
[ 행 4 ]  ⬜  ⬜  ⬜  ⬜  ⬜  ⬜  <-- Q-Learning 최단 지름길 (웅덩이 바로 위)
[ 행 5 ]  🏠  💧  💧  💧  💧  🍖  <-- 웅덩이 절벽 (Cliff, -10점 벌점)
         (0) (1) (2) (3) (4) (5)
```

### 기본 학습 하이퍼파라미터
- 학습률 ($\alpha$): `0.1`
- 할인율 ($\gamma$): `0.9`
- 탐색률 ($\epsilon$): `0.25`
- 목표 보상: `+10.0`
- 웅덩이 벌점: `-10.0`
- 1칸 이동 비용: `-0.2`
- 충돌 벌점: `-3.0`

### 관찰 결과 요약
- **Q-Learning (Off-policy)**: 업데이트 시 차기 상태의 무작위 탐색 실수를 고려하지 않고 최대 Q값($\max_{a'} Q(s', a')$)을 가정하므로, 웅덩이 바로 윗줄인 **행 4의 7걸음 지름길**을 최적 경로로 학습합니다.
- **SARSA (On-policy)**: 실제로 $\epsilon$-탐색 중 무작위 행동으로 웅덩이에 떨어질 위험까지 $Q(s', a')$에 반영하므로, 위험 구역에서 2~3칸 떨어진 **행 2~3의 9~11걸음 안전 우회로**를 학습합니다.

---

## 3. 학습 미션 안내

1. **미션 1. 간식 배달**: 장애물 `🚧`을 피해 간식 `🍖`에 도착하기. 이동 비용($r_{step}$)에 따른 보수적 경로 탐색.
2. **미션 2. 웅덩이 산책 (비교 맵)**: Q-Learning과 SARSA의 지름길 vs 우회로 비교.
3. **미션 3. 보상 함수 함정 (Reward Hacking Lab)**: 배터리 `🔋` 보너스를 잘못 주었을 때 로보독이 목표로 가지 않고 배터리를 빙빙 도는 리워드 해킹 관찰.

---

## 4. 실행 방법

### 브라우저에서 직접 열기
`index.html` 파일을 더블 클릭하여 실행합니다.

### 로컬 웹서버 실행
```bash
python -m http.server 8000
# 브라우저에서 http://localhost:8000/stitch_/prototype_v0.1/apps/robotdog_rl/index.html 접속
```

---

## 5. 라이선스 및 출처

본 프로젝트는 Arthur Juliani의 `web-rl-playground`를 바탕으로 제작되었으며 MIT License를 따릅니다. 상세 라이선스는 [LICENSE](LICENSE)와 [CREDITS.md](CREDITS.md)를 참조하세요.
