# Day 14 개발 리포트

## 1. 오늘 구현한 내용

- Supabase Auth REST 기반 이메일/비밀번호 로그인 구조를 추가했다.
- `/login`, `/signup`, `/account` 화면을 생성했다.
- 로그인 상태에서는 계정 기준으로 저장 키가 분리되도록 했다.
- 비로그인 상태에서는 기존 1분 체험과 브라우저 임시 저장을 유지했다.
- 하단 탭을 홈, 액션, 일정, 계정 구조로 정리했다.
- 대시보드와 가게 정보 저장 화면에 로그인 CTA를 추가했다.
- 인증 구현 문서 `docs/AUTH_IMPLEMENTATION.md`를 생성했다.

## 2. 로그인/회원가입 구현 내용

로그인 화면은 이메일, 비밀번호, 로그인 버튼, 회원가입 이동, 1분 체험 계속하기 버튼으로 구성했다.

회원가입 화면은 이메일, 비밀번호, 비밀번호 확인, 회원가입 버튼, 로그인 이동, 1분 체험 계속하기 버튼으로 구성했다.

문구는 짧고 쉬운 표현을 사용했고, 실패 시에도 기술적인 오류를 노출하지 않는다.

## 3. Supabase Auth 연결 방식

외부 패키지 없이 `fetch`로 Supabase Auth REST를 호출한다.

사용하는 흐름:

- 회원가입
- 로그인
- 로그아웃
- 현재 사용자 확인
- 만료 전 세션 갱신

클라이언트에서는 공개 가능한 Supabase URL과 공개 키만 사용한다.

## 4. 계정 기반 저장 분리 구조

로그인 상태에서는 사용자 ID 기반 계정 저장 키를 사용한다.

비로그인 상태에서는 기존 브라우저별 임시 저장 키를 계속 사용한다.

서버 저장 Route는 로그인 요청의 인증 정보를 확인할 수 있으면 계정 기준으로 저장하고, 비로그인 체험 요청은 기존 임시 저장 기준을 유지한다.

## 5. 비로그인 1분 체험 유지 방식

`/demo`는 로그인 없이 계속 사용할 수 있다.

빠른 체험으로 만든 가게 정보, FAQ, 일정, 생성 기록은 기존처럼 현재 브라우저 기준으로 저장된다.

## 6. 계정 화면 구현 내용

`/account`에서는 다음 내용을 보여준다.

- 로그인 상태
- 이메일
- 현재 플랜
- 내 가게 정보 저장 여부
- 생성 기록 수
- 일정 수
- FAQ 수
- 가게 정보 수정, 요금제 보기, 의견 남기기, 로그아웃 버튼

비로그인 상태에서는 로그인, 회원가입, 1분 체험 버튼을 제공한다.

## 7. 생성 또는 수정한 파일 목록

생성:

- `app/login/page.tsx`
- `app/signup/page.tsx`
- `app/account/page.tsx`
- `lib/auth/types.ts`
- `lib/auth/supabaseAuthClient.ts`
- `lib/auth/supabaseAuthServer.ts`
- `lib/auth/authStore.ts`
- `docs/AUTH_IMPLEMENTATION.md`
- `docs/DAY14_REPORT.md`

수정:

- `app/api/storage/[resource]/route.ts`
- `app/dashboard/page.tsx`
- `app/setup/page.tsx`
- `components/BottomTabNav.tsx`
- `components/MobileAppShell.tsx`
- `lib/storage/localStore.ts`
- `lib/storage/remoteStore.ts`
- `docs/CHECKLIST.md`
- `docs/PROGRESS.md`
- `docs/PROJECT_PLAN.md`
- `docs/DATABASE_SCHEMA.md`

## 8. 아직 구현하지 않은 기능

- 실제 결제 연동
- 비밀번호 재설정
- 소셜 로그인
- 이메일 인증 UX 고도화
- 로그인 전 기록을 계정으로 가져오기
- RLS 완전 적용
- 실제 알림
- 카카오톡/인스타그램/네이버 자동 전송

## 9. 검증 결과

- `npm run env:check` 통과.
- `npm run supabase:check`는 `PGRST205`로 실패. 원격 Supabase 프로젝트에 `app_business_profiles`, `app_faqs`, `app_calendar_events`, `app_generations` 테이블이 아직 없기 때문이다.
- `npm run lint` 통과.
- `npm run build` 통과. `/login`, `/signup`, `/account`가 정적 경로로 생성되는 것을 확인했다.
- 로컬 프로덕션 서버에서 `/`, `/demo`, `/login`, `/signup`, `/account`, `/dashboard`, `/agent`, `/pricing`, `/feedback`, `/calendar`, `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`, `/faq`, `/history`가 모두 HTTP 200을 반환했다.
- 브라우저 확인으로 `/login`, `/signup`, `/account` 화면의 주요 문구와 버튼을 확인했다.
- 로그인 화면에서 빈 값 제출 시 쉬운 안내 문구가 표시되는 것을 확인했다.
- 390px 모바일 폭에서 `/login`, `/signup`, `/account`, `/dashboard`, `/setup`의 가로 넘침이 없음을 확인했다.
- GitHub `main`에 커밋 `5c811a6`을 푸시했다.
- Vercel 프로덕션 배포가 `READY` 상태임을 확인했다.
- 프로덕션 URL에서 `/`, `/demo`, `/login`, `/signup`, `/account`, `/dashboard`, `/agent`, `/pricing`, `/feedback`, `/calendar`, `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`, `/faq`, `/history`가 모두 HTTP 200을 반환했다.
- 프로덕션 HTML에서 `/login`, `/signup`, `/account`, `/dashboard`의 주요 한국어 문구가 렌더링되는 것을 확인했다.
- 사용자 화면에 개발자용 단어가 노출되지 않는지 확인했다. 내부 파일명 `mockCalendar`만 코드 import 경로에서 탐지됐고 화면 문구는 아니다.
- API 키 검색에서 커밋 대상 파일에 실제 키가 들어간 흔적은 없었다. `package-lock.json`의 무결성 문자열만 오탐으로 탐지됐다.
- 실제 신규 회원가입은 테스트 계정을 만들지 않기 위해 수행하지 않았다. 화면, 입력 검증, REST 연결 구조, 빌드 검증까지만 확인했다.

## 10. 수익화 관점에서의 판단

로그인/회원가입은 유료 전환 전 필수 단계다. 사용자가 가게 정보와 생성 기록이 계정에 쌓인다고 느끼면, 베이직/프로 플랜의 저장 가치와 반복 사용 이유가 더 분명해진다.

## 11. 발견한 문제

- Supabase 저장 테이블이 아직 원격 프로젝트에 없으면 저장 검증은 계속 `PGRST205`로 실패할 수 있다.
- 이메일 인증 설정에 따라 회원가입 직후 바로 로그인 세션이 없을 수 있다.
- 로그인 전 기록 자동 이전은 아직 구현하지 않았다.
- Supabase Auth를 프로덕션에서 완전히 확인하려면 Vercel 환경변수와 Supabase Auth 이메일 설정을 한 번 더 점검해야 한다.

## 12. Day 15에 해야 할 작업

- 수요일 제출용 최종 안정화
- PWA 설치형 앱 느낌 보강
- 최종 README와 발표 시나리오 정리
- Supabase 테이블 적용 후 저장 재검증
- RLS 정책 강화 계획 확정

## 13. 다음 Codex 작업 명령어

```text
AI 사장님 매출 비서 Day 15 최종 제출 안정화 작업을 시작해줘.

현재 Day 14까지 완료되어 있고, Supabase Auth REST 기반 로그인/회원가입, 내 계정 화면, 계정 기반 저장 분리 구조, 비로그인 1분 체험 유지 흐름이 구현되어 있다.

Day 15 목표는 수요일 제출용 최종 안정화다.
PWA 설치형 앱 느낌, 최종 README, 발표 시나리오, 프로덕션 QA, Supabase SQL 적용 후 저장 재검증 계획을 정리해줘.

실제 결제, 실제 알림, 외부 채널 자동 전송은 구현하지 말아줘.
API 키와 .env.local은 절대 커밋하지 말아줘.
```
