# Day 11 개발 리포트

## 1. 오늘 구현한 내용

- `/pricing` 요금제 화면을 추가했다.
- 무료/베이직/프로/비즈니스 플랜 정의를 코드로 분리했다.
- 무료 체험 월 10회 기준 사용량 계산 구조를 추가했다.
- `/api/generate`와 `/api/agent/daily-action`에 사용량 보호를 적용했다.
- 대시보드, 생성 화면 3개, `/agent`에 사용량 카드를 추가했다.
- `/feedback` 베타 피드백 화면을 추가했다.
- 베타 안내 카드에 의견 남기기 버튼을 연결했다.
- 랜딩페이지에 요금제와 시간 절약 메시지를 보강했다.

## 2. 요금제 화면 구현 내용

`/pricing`에서 4개 플랜을 보여준다.

- 무료 체험: 월 10회
- 베이직: 월 300회
- 프로: 월 2,000회
- 비즈니스: 여러 매장 운영 기준

실제 결제 연결은 하지 않았고, 유료 플랜 CTA는 출시 준비 또는 의견 남기기 흐름으로 연결했다.

## 3. 사용량 제한 구조

`lib/billing/plans.ts`에서 플랜 정보를 관리하고, `lib/billing/usage.ts`에서 이번 달 사용량, 남은 횟수, 한도 초과 여부를 계산한다.

현재는 로그인과 결제가 없으므로 기본 플랜을 무료 체험으로 처리한다.

## 4. OpenAI 비용 보호 방식

개별 생성과 오늘 매출 액션 모두 서버 Route에서 사용량을 확인한다.

무료 한도를 넘으면 외부 생성 호출 전에 쉬운 안내 문구를 반환하고 `/pricing` 이동을 유도한다.

## 5. 대시보드 개선 내용

대시보드의 오늘 매출 액션 카드 아래에 현재 플랜, 이번 달 생성 횟수, 남은 횟수, 플랜 보기 버튼을 추가했다.

## 6. 생성 화면 개선 내용

아래 화면에 사용량 카드를 추가했다.

- `/generate/inquiry`
- `/generate/review`
- `/generate/promo`

한도 초과 시 생성 버튼이 비활성화되고, 무료 체험 횟수 소진 안내를 보여준다.

## 7. 베타 피드백 화면

`/feedback`에서 아래 질문을 받을 수 있게 했다.

- 실제로 쓸 것 같은지
- 가장 필요한 기능
- 월 결제 의향
- 불편했던 점

의견은 현재 브라우저에만 저장된다.

## 8. 생성 또는 수정한 파일 목록

생성:

- `app/pricing/page.tsx`
- `app/feedback/page.tsx`
- `lib/billing/plans.ts`
- `lib/billing/usage.ts`
- `lib/storage/feedbackStore.ts`
- `docs/DAY11_REPORT.md`

수정:

- `app/page.tsx`
- `app/dashboard/page.tsx`
- `app/agent/page.tsx`
- `app/api/generate/route.ts`
- `app/api/agent/daily-action/route.ts`
- `app/generate/inquiry/page.tsx`
- `app/generate/review/page.tsx`
- `app/generate/promo/page.tsx`
- `components/AppHeader.tsx`
- `components/BetaNoticeCard.tsx`
- `components/AgentRunButton.tsx`
- `components/UsageSummaryCard.tsx`
- `lib/ai/types.ts`
- `lib/ai/requestGeneration.ts`
- `lib/agent/types.ts`
- `docs/PROJECT_PLAN.md`
- `docs/CHECKLIST.md`
- `docs/PROGRESS.md`
- `docs/MONETIZATION_ROADMAP.md`

## 9. 아직 구현하지 않은 기능

- 실제 결제 연결
- 로그인/회원가입
- 실제 알림
- 외부 채널 자동 전송
- Supabase Auth 기반 사용자별 플랜 관리
- 결제 상태에 따른 실제 플랜 변경

## 10. 검증 결과

- `npm run env:check` 통과
- `npm run supabase:check` 실행 결과 Supabase 설정은 확인됐지만, 원격 테이블이 아직 생성되지 않아 `PGRST205`가 반환됨
- `npm run lint` 통과
- `npm run build` 통과
- 로컬 프로덕션 서버에서 `/`, `/dashboard`, `/agent`, `/pricing`, `/feedback`, `/calendar`, `/setup`, `/generate/inquiry`, `/generate/review`, `/generate/promo`, `/faq`, `/history` HTTP 200 확인
- `/pricing`에서 무료/베이직/프로/비즈니스 플랜 문구 확인
- `/dashboard`에서 무료 체험과 플랜 보기 문구 확인
- `/feedback`에서 의견 남기기 UI 확인
- `/api/generate` 한도 초과 요청이 HTTP 402로 막히는지 확인
- `/api/agent/daily-action` 한도 초과 요청이 HTTP 402로 막히는지 확인
- 사용자 화면 코드에서 개발자 용어 노출 여부 확인. 내부 import 경로 외 사용자 문구 노출 없음
- API 키가 Git 추적 파일에 포함되지 않았는지 확인
- `.env.local`이 Git 추적 대상이 아닌지 확인

## 11. 수익화 관점에서의 판단

Day 11 작업으로 앱이 단순 데모가 아니라 유료 SaaS처럼 보이기 시작했다.

무료 사용량 한도, 플랜 비교, 업그레이드 유도, 베타 피드백은 결제 연결 전 가격 민감도와 기능 선호도를 확인하는 데 중요하다.

## 12. 발견한 문제

Supabase 원격 테이블은 아직 생성되지 않아 `npm run supabase:check`는 SQL 적용 전까지 실패한다.

## 13. Day 12에 해야 할 작업

- 발표/데모 안정화
- 발표용 안내 페이지 또는 데모 모드 정리
- 최종 QA 체크리스트 작성
- Supabase SQL 적용 후 저장 검증
- 사용량 제한 UI의 실제 데모 시나리오 확인

## 14. 다음 Codex 작업 명령어

```text
AI 사장님 매출 비서 Day 12 작업을 진행해줘.

현재 Day 11에서 /pricing 요금제 화면, 무료 사용량 제한, /feedback 베타 피드백 화면, 대시보드/생성 화면 사용량 카드가 구현됐다.

Day 12 목표:
1. 수요일 제출용 발표/데모 안정화를 진행한다.
2. 데모 시나리오와 최종 QA 체크리스트를 만든다.
3. 주요 경로와 생성/저장/사용량 제한 흐름을 다시 검증한다.
4. Supabase SQL을 적용했다면 npm run supabase:check도 재검증한다.

주의:
실제 결제, 로그인, 실제 알림, 외부 채널 자동 전송은 아직 구현하지 않는다.
API 키를 출력하거나 커밋하지 않는다.
```
