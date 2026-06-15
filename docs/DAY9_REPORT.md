# Day 9 개발 리포트

## 1. 오늘 구현한 내용

- 로그인 전 베타 데모를 위한 브라우저별 임시 분리 저장 구조를 추가했다.
- Supabase 저장 Route가 분리 키 기준으로만 조회, 저장, 삭제하도록 보강했다.
- Supabase SQL schema에 `owner_key` 컬럼과 필수 인덱스를 추가했다.
- 발표용 데모 데이터 버튼과 베타 안내 카드를 추가했다.
- 대시보드 하단에 베타 안내와 데모 데이터 불러오기 흐름을 연결했다.
- Supabase 적용 가이드와 베타 테스트 계획 문서를 생성했다.

## 2. Supabase 저장 안정화 내용

`/api/storage/[resource]` Route는 요청에 포함된 내부 분리 값을 기준으로만 데이터를 처리한다.

분리 값이 없으면 서버 저장을 시도하지 않고 빈 응답을 반환해 앱이 깨지지 않도록 했다.

## 3. ownerKey 기반 임시 사용자 분리 구조

브라우저별 임시 분리 값은 `lib/storage/ownerKey.ts`에서 생성하고 재사용한다.

사용자 화면에는 이 값을 절대 보여주지 않는다.

## 4. 서버 저장과 fallback 구조

- 서버 저장 가능: Supabase Route에 저장한다.
- 서버 저장 불가: 기존 브라우저 저장으로 계속 동작한다.
- Supabase 테이블이 없어도 화면은 유지된다.

## 5. 대시보드 가치 강화 내용

- 베타 안내 카드를 추가했다.
- 발표용 데모 데이터 버튼을 하단에 작게 배치했다.
- 데모 데이터 로드 후 최근 기록, 일정, 절약 시간이 바로 반영되도록 했다.

## 6. 데모 데이터 기능

`components/DemoDataButton.tsx`를 추가했다.

버튼을 누르면 아래 예시가 채워진다.

- 샘플 가게 정보
- 샘플 FAQ
- 샘플 일정
- 샘플 생성 기록

운영 전에는 이 버튼을 숨기는 것을 권장한다.

## 7. 생성 또는 수정한 파일 목록

생성:

- `lib/storage/ownerKey.ts`
- `components/BetaNoticeCard.tsx`
- `components/DemoDataButton.tsx`
- `docs/SUPABASE_APPLY_GUIDE.md`
- `docs/BETA_TEST_PLAN.md`
- `docs/DAY9_REPORT.md`

수정:

- `lib/storage/localStore.ts`
- `lib/storage/businessProfileStore.ts`
- `lib/storage/faqStore.ts`
- `lib/storage/calendarStore.ts`
- `lib/storage/generationHistoryStore.ts`
- `lib/storage/remoteStore.ts`
- `lib/supabase/server.ts`
- `lib/supabase/types.ts`
- `app/api/storage/[resource]/route.ts`
- `app/dashboard/page.tsx`
- `scripts/check-supabase-storage.mjs`
- `supabase/app_storage_schema.sql`
- `docs/PROJECT_PLAN.md`
- `docs/CHECKLIST.md`
- `docs/PROGRESS.md`
- `docs/DATABASE_SCHEMA.md`
- `docs/MONETIZATION_ROADMAP.md`

## 8. 아직 구현하지 않은 기능

- 로그인/회원가입
- 결제/구독
- 실제 알림
- 카카오톡, 인스타그램, 네이버 자동 전송
- Supabase Auth 기반 RLS

## 9. 검증 결과

- `npm run env:check`: 통과
- `npm run supabase:check`: Supabase 설정은 OK, 테이블은 아직 없음
- `npm run lint`: 통과
- `npm run build`: 통과
- 로컬 주요 경로 9개 HTTP 200 확인
- 로컬 `/api/generate`: 실제 생성 결과 확인
- 로컬 `/api/storage/status`: Supabase 설정 인식 확인
- 로컬 `/api/storage/business-profile`: 테이블 미생성 상태에서 안전한 fallback 확인
- 사용자 화면 금지 용어 검사: 사용자 UI 문구 노출 없음
- 비밀값 검사: 코드/문서에 API 키 없음

## 10. 수익화 관점에서의 판단

기록, 일정, FAQ, 가게 정보가 유지되면 사용자는 앱이 자신의 업무를 기억한다고 느낀다.

이 경험은 무료 체험 이후 유료 플랜 전환의 핵심 근거가 된다.

## 11. 발견한 문제

Supabase SQL은 Codex가 Dashboard에서 직접 실행할 수 없다.

사용자가 `supabase/app_storage_schema.sql`을 SQL Editor에서 실행해야 원격 저장 검증이 통과한다.

현재 `npm run supabase:check`는 테이블 미생성으로 `PGRST205`를 보고한다.

## 12. Supabase SQL 적용 방법

자세한 순서는 `docs/SUPABASE_APPLY_GUIDE.md`에 정리했다.

핵심 순서:

1. Supabase Dashboard 접속
2. SQL Editor 열기
3. `supabase/app_storage_schema.sql` 전체 복사
4. Run 실행
5. `npm run supabase:check` 실행

## 13. Day 10에 해야 할 작업

- Supabase Auth 설계
- 사용자별 정식 데이터 구조 확정
- RLS 정책 강화
- 데모 데이터 버튼 운영 숨김 처리
- 베타 피드백 기반 생성 품질 개선

## 14. 다음 Codex 작업 명령어

```text
AI 사장님 매출 비서 Day 10 작업을 진행해줘.

현재 Day 9에서 브라우저별 임시 분리 저장 구조, Supabase 저장 Route 보강, 데모 데이터 버튼, 베타 안내 카드, Supabase 적용 가이드가 구현됐다.

다음 목표:
1. Supabase Auth 도입 전 사용자별 정식 데이터 구조를 확정한다.
2. RLS 정책을 설계한다.
3. 로그인 구현 여부는 사용자 승인 후 결정한다.
4. 베타 테스트 결과를 기록할 문서와 플랜별 기능 제한 UI를 설계한다.

주의:
API 키를 출력하거나 커밋하지 않는다.
결제와 실제 알림은 아직 구현하지 않는다.
```
