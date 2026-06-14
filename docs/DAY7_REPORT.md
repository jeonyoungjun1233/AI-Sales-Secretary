# Day 7 개발 리포트

## 1. 오늘 구현한 내용

- `.gitignore`에 환경변수 파일 제외 항목을 명시했다.
- 환경변수 존재 여부 점검 스크립트를 추가했다.
- Vercel 환경변수 동기화 스크립트를 추가했다.
- `/api/generate` 서버 Route를 추가했다.
- OpenAI provider를 `fetch` 기반으로 구현했다.
- 생성 화면 3개가 `/api/generate`를 통해 결과를 받도록 변경했다.
- 생성 요청에 가게 정보, FAQ, 오늘 일정, 최근 생성 기록 맥락을 포함하도록 했다.
- 환경변수 및 배포 안내 문서를 추가했다.

## 2. OpenAI 실제 연결 구조

클라이언트 화면은 `/api/generate`에 요청만 보낸다. 서버 Route에서 `AI_PROVIDER`와 `OPENAI_API_KEY`를 확인하고, 조건이 맞으면 `openaiProvider`를 사용한다.

OpenAI 호출은 `lib/ai/providers/openaiProvider.ts`에서만 수행한다. 기본 모델은 `gpt-4.1-mini`이며, `OPENAI_MODEL`이 있으면 해당 값을 사용한다.

## 3. Vercel 환경변수 적용 방식

`scripts/sync-vercel-env.mjs`가 `.env.local`에서 필요한 값을 읽고 Vercel Production, Preview, Development 환경에 등록한다.

값은 출력하지 않고 변수명과 처리 상태만 표시한다.

## 4. Supabase 환경변수 등록 상태

Supabase 환경변수 등록 스크립트는 준비했다. 다만 현재 프로젝트 루트에 `.env.local`이 없어 실제 등록은 완료하지 못했다.

Supabase DB 연결은 Day 7 범위에서 제외했고, Day 8 이후 진행한다.

## 5. fallback 동작 방식

`AI_PROVIDER=openai`이고 서버에 `OPENAI_API_KEY`가 있으면 실제 provider를 사용한다.

키가 없거나 호출이 실패하면 `mockProvider`로 자동 fallback한다. 사용자 화면에는 기술적인 실패 원인을 보여주지 않고, 기존처럼 복사 가능한 문구를 제공한다.

## 6. 보안 점검 내용

- `.env.local`은 Git에 추적되지 않았다.
- `.gitignore`에 `.env`, `.env.local`, `.env.*.local`, `.env*`를 명시했다.
- 실제 키 값은 터미널, 문서, 코드, 커밋 메시지에 출력하지 않았다.
- `OPENAI_API_KEY`와 `SUPABASE_SERVICE_ROLE_KEY`는 서버 전용으로 다루도록 설계했다.
- 사용자 화면에 개발자 용어가 노출되지 않도록 생성 화면 문구를 유지했다.

## 7. 생성 또는 수정한 파일 목록

생성:

- `app/api/generate/route.ts`
- `lib/ai/generationContext.ts`
- `lib/ai/requestGeneration.ts`
- `scripts/check-env.mjs`
- `scripts/sync-vercel-env.mjs`
- `docs/ENVIRONMENT_DEPLOYMENT.md`
- `docs/DAY7_REPORT.md`

수정:

- `.gitignore`
- `package.json`
- `lib/ai/types.ts`
- `lib/ai/agentRouter.ts`
- `lib/ai/providers/openaiProvider.ts`
- `app/generate/inquiry/page.tsx`
- `app/generate/review/page.tsx`
- `app/generate/promo/page.tsx`
- `docs/PROJECT_PLAN.md`
- `docs/CHECKLIST.md`
- `docs/PROGRESS.md`
- `docs/AI_AGENT_ARCHITECTURE.md`

## 8. 아직 구현하지 않은 기능

- Supabase 실제 DB 연결
- 로그인/회원가입
- 결제/구독
- 실제 알림
- 외부 채널 자동 전송
- 사용자별 서버 저장

## 9. 검증 결과

- `npx vercel whoami`: 기본 실행은 Windows 장치명 문제로 실패, 임시 ASCII 장치명 우회 후 성공
- `npm run env:check`: `.env.local` 부재로 실패
- `npm run env:vercel`: `.env.local` 부재로 실패
- `npm run lint`: 통과
- `npm run build`: 통과
- 로컬 HTTP 200 확인: `/`, `/dashboard`, `/calendar`, `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`, `/faq`, `/history`, `/api/generate`
- 브라우저 확인: 문의 답장 생성 후 `/history` 저장 확인
- 브라우저 확인: 리뷰 답글 생성 후 결과 표시 확인
- 브라우저 확인: 홍보글 생성 후 결과 표시 확인
- 사용자 화면 금지 용어 검사: 내부 import 경로 외 노출 없음
- Git 추적 확인: `.env.local` 추적 없음

## 10. 배포 결과

진행 예정

## 11. 수익화 관점에서의 판단

실제 AI 연결은 무료 체험과 유료 전환의 핵심이다. 단, 비용이 발생하므로 Day 8 이후에는 사용량 제한, 플랜별 생성 횟수, 실패 안내, 비용 모니터링을 반드시 설계해야 한다.

## 12. 발견한 문제

- 현재 프로젝트 루트에 `.env.local`이 없다.
- Vercel CLI가 Windows 한글 장치명 때문에 기본 실행에서 실패했다.
- Supabase 키는 스크립트 등록 준비만 되었고, 실제 등록은 `.env.local` 준비 후 가능하다.

## 13. Day 8에 해야 할 작업

- `.env.local` 위치 확인 후 Vercel 환경변수 동기화 재실행
- 프로덕션에서 실제 OpenAI 생성 결과 확인
- Supabase Auth/DB 연결 전 사용자별 저장 구조 확정
- 사용량 제한 UI와 플랜 경계 설계

## 14. 다음 Codex 작업 명령어

```text
AI 사장님 매출 비서 Day 8 개발을 시작해줘.

현재 상태:
Day 7에서 /api/generate 서버 Route, OpenAI provider, 환경변수 점검/동기화 스크립트, 문서화가 완료되어 있다.
다만 프로젝트 루트에 .env.local이 없어 Vercel 환경변수 동기화와 실제 OpenAI 호출 검증은 완료되지 않았다.

Day 8 목표:
Supabase 실제 DB 연결 전 사용자별 저장 구조와 테이블을 최종 확정하고, Auth/DB 연결 준비를 진행한다.

금지:
결제, 실제 알림, 외부 채널 자동 전송은 구현하지 않는다.
API 키 값은 절대 출력하거나 커밋하지 않는다.

작업 전 계획을 보고하고, 작업 후 변경 파일과 검증 결과를 요약해줘.
```
