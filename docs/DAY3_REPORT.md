# Day 3 개발 리포트

## 1. 오늘 구현한 내용

- 핵심 앱 화면을 데스크톱형 대시보드에서 9:16 모바일 웹앱 느낌으로 재구성했다.
- `/dashboard`를 “사장님 오늘의 홈” 화면으로 바꿨다.
- `/calendar` 일정 화면을 새로 추가했다.
- `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`에 모바일 앱 쉘과 하단 탭을 적용했다.
- 랜딩페이지 첫 화면에 실제 앱 미리보기 느낌을 강화했다.
- 문의 답장, 리뷰 답글, 홍보글 생성 결과의 문장 패턴을 늘렸다.

## 2. 모바일 앱화 개선 내용

- `MobileAppShell`을 추가해 앱 내부 화면 폭을 `max-w-[430px]`로 제한했다.
- 데스크톱에서도 가운데 정렬된 모바일 앱 프레임처럼 보이도록 구성했다.
- `BottomTabNav`를 추가해 하단 고정 탭 네비게이션을 만들었다.
- 하단 탭은 홈, 만들기, 일정, 가게로 구성했다.
- 현재 페이지에 따라 탭이 활성화되어 보이도록 처리했다.
- 앱 내부 화면에서는 기존 웹사이트 상단 헤더가 보이지 않도록 정리했다.

## 3. 일정/캘린더 화면 구현 내용

- `app/calendar/page.tsx`를 추가했다.
- 오늘 일정 카드와 이번 주 할 일 목록을 표시했다.
- 일정 제목, 시간, 유형을 입력해 오늘 할 일에 추가하는 UI를 만들었다.
- 일정 유형은 예약, 리뷰 답글, 홍보글, 가게 관리로 구성했다.
- 실제 저장이나 알림 연결은 하지 않고 local state로만 동작한다.

## 4. mock 생성 결과 개선 내용

- `lib/mockGeneration.ts`의 문장 패턴을 확장했다.
- 문의 유형에 주차 문의, 메뉴 문의를 추가했다.
- 같은 기능에서도 선택한 말투, 문의 유형, 리뷰 유형, 업종, 채널에 따라 문구가 더 다양하게 나오도록 했다.
- 홍보글은 인스타그램, 네이버 플레이스, 카카오톡 채널별로 길이와 말투가 다르게 구성되도록 개선했다.

## 5. 생성 또는 수정한 파일 목록

### 생성

- `app/calendar/page.tsx`
- `components/MobileAppShell.tsx`
- `components/BottomTabNav.tsx`
- `components/CalendarEventCard.tsx`
- `components/QuickActionButton.tsx`
- `lib/mockCalendar.ts`
- `docs/DAY3_REPORT.md`

### 수정

- `app/page.tsx`
- `app/dashboard/page.tsx`
- `app/setup/page.tsx`
- `app/generate/inquiry/page.tsx`
- `app/generate/review/page.tsx`
- `app/generate/promo/page.tsx`
- `components/AppHeader.tsx`
- `components/GenerationPageLayout.tsx`
- `components/GeneratedResultBox.tsx`
- `components/CopyButton.tsx`
- `components/InputCard.tsx`
- `components/OptionChip.tsx`
- `lib/mockGeneration.ts`
- `docs/PROJECT_PLAN.md`
- `docs/CHECKLIST.md`
- `docs/PROGRESS.md`

## 6. 아직 구현하지 않은 기능

- 실제 AI 생성 연결
- Supabase 저장
- 로그인
- 결제
- 실제 알림 기능
- 일정 데이터 영구 저장
- 생성 기록 저장
- FAQ 관리 화면
- 외부 채널 자동 전송

## 7. 검증 결과

- `npm run lint` 통과
- `npm run build` 통과
- 로컬 서버 실행 후 아래 경로 HTTP 200 확인
  - `/`
  - `/dashboard`
  - `/setup`
  - `/generate/inquiry`
  - `/generate/review`
  - `/generate/promo`
  - `/calendar`
- 사용자 화면에 개발자 용어가 노출되지 않는지 확인했다.

## 8. 수익화 관점에서의 판단

Day 3는 “한 번 써보는 문구 생성기”에서 “매일 들어오는 업무 앱”으로 방향을 옮긴 작업이다.

특히 오늘 절약한 시간, 생성 횟수, 남은 횟수, 오늘 일정, 빠른 실행 버튼을 대시보드에 배치해 월 구독료를 낼 이유를 조금 더 화면에서 보여주기 시작했다.

아직 실제 저장과 알림이 없으므로 유료 전환 설득은 완성되지 않았다. 다음 단계에서는 생성 기록, FAQ, 실제 답장 품질 개선 구조가 필요하다.

## 9. 발견한 문제

- Playwright가 설치되어 있지 않아 스크린샷 기반 시각 검증은 하지 않았다.
- 일정 추가는 화면 안에서만 동작하며 새로고침 후 유지되지 않는다.
- 생성 결과는 아직 실제 AI가 아니라 문장 패턴 조합이다.
- FAQ 관리는 아직 구현되지 않았다.

## 10. Day 4에 해야 할 작업

- 실제 API 연결 전에 확장 가능한 AI Provider 구조를 준비한다.
- 문의 답장, 리뷰 답글, 홍보글별 프롬프트 파일 구조를 만든다.
- 실제 API 키 연결은 사용자 승인 전까지 하지 않는다.
- 생성 기록 또는 FAQ 관리 중 하나를 Day 4 후속 범위로 결정한다.

## 11. 다음 Codex 작업 명령어

```text
너는 지금부터 “AI 사장님 매출 비서” SaaS 웹앱의 Day 4 개발을 담당한다.

현재 상태:
Day 1에서 랜딩페이지, 대시보드, 가게 정보 등록 기본 화면을 구현했다.
Day 2에서 손님 문의 답장, 리뷰 답글, 홍보글 생성 화면을 mock 데이터 기반으로 구현했다.
Day 3에서 핵심 앱 화면을 9:16 모바일 웹앱처럼 개선했고, 하단 탭 네비게이션과 일정 화면을 추가했다.

중요:
Day 4에서도 실제 OpenAI API 키 연결, Supabase 연결, 로그인, 결제 기능은 사용자 승인 전까지 구현하지 않는다.
이번 목표는 실제 AI 연결 전에 확장 가능한 AI Provider 구조와 프롬프트 파일 구조를 준비하는 것이다.

작업 전 확인할 파일:
- docs/PROJECT_PLAN.md
- docs/CHECKLIST.md
- docs/PROGRESS.md
- docs/DAY3_REPORT.md
- lib/mockGeneration.ts
- app/generate/inquiry/page.tsx
- app/generate/review/page.tsx
- app/generate/promo/page.tsx

Day 4 목표:
1. 실제 AI 연결 전용 파일 구조 준비
2. 문의 답장, 리뷰 답글, 홍보글별 프롬프트 템플릿 파일 생성
3. 실제 API 호출은 하지 않는 provider 인터페이스 작성
4. 현재 mock 생성 흐름과 나중에 실제 AI 생성 흐름이 교체 가능하도록 설계
5. 사용자 화면에는 개발자 용어를 노출하지 않음

권장 생성 파일:
- lib/ai/types.ts
- lib/ai/agentRouter.ts
- lib/ai/providers/mockProvider.ts
- lib/ai/prompts/customerReply.ts
- lib/ai/prompts/reviewReply.ts
- lib/ai/prompts/promoPost.ts

주의:
- 실제 OpenAI API 호출 금지
- API 키나 환경변수 추가 금지
- Supabase 연결 금지
- 로그인/결제 구현 금지
- 외부 패키지 설치 금지

검증:
- npm run lint
- npm run build
- /, /dashboard, /setup, /calendar, /generate/inquiry, /generate/review, /generate/promo 확인

작업 완료 후 docs/DAY4_REPORT.md를 생성하고, 변경 파일 목록과 검증 결과를 보고해줘.
작업 시작 전 Day 4 작업 계획을 짧게 보고한 뒤 진행해줘.
```
