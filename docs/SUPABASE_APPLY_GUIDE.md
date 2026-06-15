# Supabase 적용 가이드

## 1. 목적

Day 9에서는 로그인 전 베타 데모를 위해 브라우저별로 데이터가 섞이지 않도록 임시 분리 저장 구조를 사용한다.

Codex는 Supabase Dashboard의 SQL Editor 버튼을 직접 대신 누를 수 없다. 아래 단계는 사용자가 Supabase 화면에서 직접 실행해야 한다.

## 2. 실행 순서

1. Supabase Dashboard에 접속한다.
2. `AI 사장님 매출 비서` 프로젝트를 연다.
3. 왼쪽 메뉴에서 SQL Editor를 연다.
4. 프로젝트 파일 `supabase/app_storage_schema.sql` 내용을 전체 복사한다.
5. SQL Editor에 붙여넣고 Run을 누른다.
6. Table Editor에서 아래 4개 테이블이 보이는지 확인한다.
   - `app_business_profiles`
   - `app_faqs`
   - `app_calendar_events`
   - `app_generations`
7. 터미널에서 `npm run supabase:check`를 실행한다.
8. 모든 테이블이 `OK_OWNER_FILTER`로 나오면 저장 준비가 된 상태다.

## 3. 확인할 테이블 구조

각 테이블에는 아래 기준이 들어간다.

- `owner_key`
- `id`
- `payload`
- `created_at`
- `updated_at`

`app_calendar_events`에는 일정 확인을 위해 `date` 컬럼도 포함한다.

## 4. 테스트할 화면

- `/setup`
- `/faq`
- `/calendar`
- `/generate/inquiry`
- `/history`

각 화면에서 저장 후 새로고침해도 내용이 유지되는지 확인한다.

## 5. 보안 주의

- API 키 값은 SQL Editor, 코드, 문서, 채팅에 쓰지 않는다.
- `.env.local`은 Git에 올리지 않는다.
- 현재 구조는 로그인 전 베타용 임시 구조다.
- 로그인 도입 후에는 Supabase Auth와 RLS 정책을 강화해야 한다.
