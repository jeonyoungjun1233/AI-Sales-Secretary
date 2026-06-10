# Day 4 개발 리포트

## 1. 오늘 구현한 내용

- AI 생성 기능을 provider 구조로 분리했다.
- 문의 답장, 리뷰 답글, 홍보글 화면이 `agentRouter`를 통해 결과를 받도록 변경했다.
- 생성 전 빈 상태, 입력 안내 상태, 생성 중 상태, 완료 상태를 개선했다.
- `/faq` 자주 묻는 질문 관리 기본 UI를 추가했다.
- 생성 기록 저장을 위한 타입을 추가했다.
- AI 에이전트 확장 구조 문서를 작성했다.

## 2. AI Provider 구조 정리

새 구조는 아래 흐름을 따른다.

1. 화면에서 `GenerateRequest`를 만든다.
2. `generateWithAgent`를 호출한다.
3. 현재는 기본 provider인 `mockProvider`가 응답한다.
4. 화면은 `GenerateResponse`의 문구, 절약 시간, 확인 안내를 표시한다.

주요 파일:

- `lib/ai/types.ts`
- `lib/ai/agentRouter.ts`
- `lib/ai/providers/mockProvider.ts`
- `lib/ai/providers/openaiProvider.ts`

## 3. mockProvider 동작 방식

`mockProvider`는 실제 외부 호출 없이 로컬 문장 조합으로 결과를 만든다.

- 문의 답장: 문의 유형과 말투에 따라 답장 생성
- 리뷰 답글: 리뷰 유형과 말투에 따라 답글 생성
- 홍보글: 홍보 목적, 업종, 채널, 추가 소식에 따라 문구 생성
- FAQ 답변: 향후 확장을 위한 기본 응답 구조 준비

## 4. openaiProvider 준비 상태

`openaiProvider.ts`는 실제 연결을 구현하지 않았다.

현재는 향후 서버 쪽 연결을 위한 함수 형태와 TODO 주석만 있다.
환경변수, 키, 실제 호출 코드는 추가하지 않았다.

## 5. 생성 화면 UX 개선 내용

- 입력 전에는 무엇을 넣으면 되는지 쉽게 안내한다.
- 입력값이 비어 있으면 사장님이 이해하기 쉬운 문구로 먼저 입력을 요청한다.
- 버튼 클릭 후 짧은 생성 중 상태를 보여준다.
- 완료 후 절약 시간을 함께 보여준다.
- 홍보글 결과에는 실제 제공 가능한 내용인지 확인하라는 안내를 함께 보여준다.

## 6. FAQ 관리 UI 구현 여부

`app/faq/page.tsx`를 구현했다.

- 자주 묻는 질문 목록 표시
- 질문과 답변 추가 UI
- local state 기반 추가
- 실제 저장은 아직 하지 않음
- 대시보드에서 `/faq`로 이동하는 연결 추가

## 7. 생성 또는 수정한 파일 목록

### 생성

- `app/faq/page.tsx`
- `lib/ai/types.ts`
- `lib/ai/agentRouter.ts`
- `lib/ai/providers/mockProvider.ts`
- `lib/ai/providers/openaiProvider.ts`
- `lib/ai/prompts/customerReply.ts`
- `lib/ai/prompts/reviewReply.ts`
- `lib/ai/prompts/promoPost.ts`
- `lib/ai/prompts/faqAnswer.ts`
- `lib/historyTypes.ts`
- `docs/AI_AGENT_ARCHITECTURE.md`
- `docs/DAY4_REPORT.md`

### 수정

- `app/dashboard/page.tsx`
- `app/generate/inquiry/page.tsx`
- `app/generate/review/page.tsx`
- `app/generate/promo/page.tsx`
- `components/GeneratedResultBox.tsx`
- `lib/mockGeneration.ts`
- `docs/PROJECT_PLAN.md`
- `docs/CHECKLIST.md`
- `docs/PROGRESS.md`

## 8. 아직 구현하지 않은 기능

- 실제 외부 AI 연결
- Supabase 저장
- 로그인/회원가입
- 결제/구독
- 생성 기록 실제 저장
- FAQ 실제 저장
- 사용자별 가게 데이터 분리
- 외부 채널 자동 연동

## 9. 검증 결과

- `npm run lint` 통과
- `npm run build` 통과
- 로컬 HTTP 200 확인:
  - `/`
  - `/dashboard`
  - `/setup`
  - `/generate/inquiry`
  - `/generate/review`
  - `/generate/promo`
  - `/calendar`
  - `/faq`

추가 확인:

- 생성 화면 3개가 `agentRouter`를 통해 결과를 받도록 변경됨
- 사용자 화면에 금지된 개발자 용어가 노출되지 않음
- 실제 외부 호출, 환경변수, 로그인, 결제 코드가 추가되지 않음

## 10. 수익화 관점에서의 판단

Day 4 작업은 바로 결제를 만드는 단계는 아니지만, 향후 유료 전환에 필요한 기반을 만들었다.

- provider 구조로 기능별 품질 개선이 쉬워졌다.
- 절약 시간과 결과 품질을 화면에서 보여줄 수 있게 되었다.
- FAQ는 반복 문의 감소라는 명확한 유료 가치를 만들 수 있는 기능이다.
- 생성 기록 저장과 사용량 제한을 붙이면 요금제 설계로 이어질 수 있다.

## 11. 발견한 문제

- FAQ와 생성 기록은 아직 브라우저 새로고침 후 유지되지 않는다.
- 실제 provider 연결 전에는 비용, 호출 제한, 실패 안내 문구를 먼저 정해야 한다.
- Playwright가 설치되어 있지 않아 스크린샷 기반 검증은 수행하지 않았다.

## 12. Day 5에 해야 할 작업

- 실제 외부 AI 연결 전 환경변수 이름과 Vercel 설정 방식 확정
- 서버 쪽 생성 경로 설계
- 호출 제한과 사용량 표시 정책 설계
- 생성 실패 시 사용자 안내 문구 정리
- FAQ 또는 생성 기록 중 무엇을 먼저 Supabase에 저장할지 결정

## 13. 다음 Codex 작업 명령어

```text
너는 지금부터 “AI 사장님 매출 비서” SaaS 웹앱의 Day 5 개발을 담당한다.

현재 상태:
Day 4에서 AI provider 구조, mockProvider, 향후 provider placeholder, FAQ 기본 UI, 생성 기록 타입, AI 에이전트 구조 문서를 구현했다.

중요:
Day 5에서 실제 외부 AI 연결을 진행할지 여부는 먼저 확인한다.
연결을 진행한다면 환경변수, 비용, 호출 제한, 실패 안내, Vercel 배포 환경변수 설정을 먼저 점검한다.

작업 전 확인할 파일:
- docs/PROJECT_PLAN.md
- docs/CHECKLIST.md
- docs/PROGRESS.md
- docs/DAY4_REPORT.md
- docs/AI_AGENT_ARCHITECTURE.md
- lib/ai/types.ts
- lib/ai/agentRouter.ts
- lib/ai/providers/mockProvider.ts
- lib/ai/providers/openaiProvider.ts
- app/generate/inquiry/page.tsx
- app/generate/review/page.tsx
- app/generate/promo/page.tsx
- app/faq/page.tsx

Day 5 목표 후보:
1. 실제 AI 연결 전 서버 쪽 생성 경로 설계
2. 환경변수 이름과 Vercel 설정 문서화
3. 생성 기록 저장 구조 구체화
4. FAQ 저장 구조 구체화
5. 사용량 제한과 무료 플랜 UX 설계

금지:
- 사용자 승인 없이 실제 외부 호출 연결 금지
- API Key 직접 코드에 작성 금지
- .env.local 임의 수정 금지
- Supabase, 로그인, 결제는 승인 전 구현 금지

작업 후:
- npm run lint
- npm run build
- 주요 경로 렌더링 확인
- docs/DAY5_REPORT.md 작성
```
