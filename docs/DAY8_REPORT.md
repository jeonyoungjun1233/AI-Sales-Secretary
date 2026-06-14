# Day 8 개발 리포트

## 1. 오늘 구현한 내용

- 루트 `.env.local`에서 OpenAI와 Supabase 환경변수를 읽도록 정리했다.
- OpenAI 실제 생성 경로를 로컬에서 확인했다.
- Supabase REST 기반 서버 저장 레이어를 추가했다.
- 가게 정보, FAQ, 일정, 생성 기록을 서버 저장 Route와 연결했다.
- 기존 브라우저 저장 fallback은 유지했다.
- Vercel production/development 환경변수 동기화를 완료했다.

## 2. OpenAI 작동 상태

`/api/generate` 서버 Route가 `OPENAI_API_KEY`를 읽고 OpenAI Responses API를 호출한다.

로컬 생성 화면에서 실제 생성 결과가 표시되는 것을 확인했다.

## 3. Supabase 작동 상태

Supabase URL과 공개 키는 인식됐다.

다만 원격 Supabase 프로젝트에 MVP 저장용 테이블이 아직 없어 저장 요청은 `unavailable` 상태로 돌아온다.

## 4. 추가한 Supabase 구조

- `/api/storage/[resource]`
- `lib/supabase/server.ts`
- `lib/storage/remoteStore.ts`
- `supabase/app_storage_schema.sql`

지원 리소스:

- `business-profile`
- `faqs`
- `calendar-events`
- `generations`

## 5. 생성 또는 수정한 파일 목록

생성:

- `app/api/storage/[resource]/route.ts`
- `lib/supabase/types.ts`
- `lib/supabase/server.ts`
- `lib/storage/remoteStore.ts`
- `scripts/check-supabase-storage.mjs`
- `supabase/app_storage_schema.sql`
- `docs/DAY8_REPORT.md`

수정:

- `package.json`
- `scripts/check-env.mjs`
- `scripts/sync-vercel-env.mjs`
- `app/setup/page.tsx`
- `app/faq/page.tsx`
- `app/calendar/page.tsx`
- `app/history/page.tsx`
- `app/dashboard/page.tsx`
- `app/generate/inquiry/page.tsx`
- `app/generate/review/page.tsx`
- `app/generate/promo/page.tsx`
- `docs/PROJECT_PLAN.md`
- `docs/CHECKLIST.md`
- `docs/PROGRESS.md`
- `docs/ENVIRONMENT_DEPLOYMENT.md`
- `docs/DATABASE_SCHEMA.md`

## 6. 검증 결과

- `npm run env:check`: 통과
- `npm run env:vercel`: production/development 동기화 완료
- `npm run lint`: 통과
- `npm run build`: 통과
- 로컬 `/api/generate`: 실제 생성 결과 확인
- 로컬 `/api/storage/status`: Supabase 설정 인식 확인
- `npm run supabase:check`: 설정은 OK, 테이블은 아직 없음
- 사용자 화면 금지 용어 검사: 내부 import 경로 외 노출 없음
- 비밀값 검사: 코드/문서에 API 키 없음

## 7. 남은 문제

- Supabase 테이블이 아직 생성되지 않았다.
- 서버 전용 Supabase 키가 아직 없다.
- 프로덕션에서 실제 생성과 서버 저장을 최종 확인해야 한다.

## 8. 바로 해야 할 일

1. Supabase SQL Editor에서 `supabase/app_storage_schema.sql` 실행
2. `npm run supabase:check` 재실행
3. 커밋/푸쉬 후 Vercel 배포 확인

## 9. 다음 Codex 작업 명령어

```text
AI 사장님 매출 비서 Supabase 테이블 적용 후 검증을 진행해줘.

현재 상태:
OpenAI 실제 생성은 로컬에서 작동 확인됐다.
Supabase REST 저장 레이어와 /api/storage/[resource] Route가 구현됐다.
Vercel production/development 환경변수 동기화도 완료됐다.
다만 Supabase 원격 프로젝트에 app_business_profiles, app_faqs, app_calendar_events, app_generations 테이블이 아직 없어 서버 저장은 unavailable 상태다.

작업:
1. Supabase SQL Editor에서 supabase/app_storage_schema.sql 실행 후 진행한다.
2. npm run supabase:check를 실행한다.
3. npm run lint, npm run build를 실행한다.
4. /setup, /faq, /calendar, /generate/inquiry, /history가 서버 저장과 함께 정상 동작하는지 확인한다.
5. GitHub commit/push와 Vercel production 배포를 확인한다.

주의:
API 키 값은 절대 출력하거나 커밋하지 않는다.
로그인, 결제, 실제 알림은 아직 구현하지 않는다.
```
