# Day 1 개발 리포트

## 1. 오늘 구현한 내용

- 랜딩페이지 `/`를 Canva처럼 쉽고 직관적인 SaaS 스타일로 개선
- 히어로 영역에 손님 질문과 추천 답장 미리보기 카드 추가
- 문제 영역, 기능 영역, 사용 방법 영역, CTA 영역을 명확하게 재구성
- 대시보드 `/dashboard`를 사장님용 업무 시작 화면으로 개선
- 오늘 사용량, 추천 작업, 주요 기능, 최근 답장 미리보기 영역 추가
- 모바일 하단에 “답장 만들기” 고정 CTA 추가
- 가게 정보 등록 화면 `/setup`에 대표 메뉴 입력 UI 추가
- 말투 선택, 안내 카드, 가게 정보 반영 예시 답장 카드를 더 보기 쉽게 개선
- 화면에서 개발자스러운 단어를 제거하고 사장님이 이해하기 쉬운 표현으로 정리
- OpenAI API, Supabase, 로그인, 결제 없이 mock 데이터 기반 UI만 유지

## 2. 생성 또는 수정한 파일 목록

### 생성

- `components/PreviewReplyCard.tsx`
- `components/UsageSummaryCard.tsx`

### 수정

- `components/AppHeader.tsx`
- `components/FeatureCard.tsx`
- `components/PrimaryButton.tsx`
- `components/SectionTitle.tsx`
- `components/DashboardActionCard.tsx`
- `components/ToneSelector.tsx`
- `app/page.tsx`
- `app/dashboard/page.tsx`
- `app/setup/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `docs/DAY1_REPORT.md`
- `docs/CHECKLIST.md`
- `docs/PROGRESS.md`

## 3. 디자인 개선 포인트

- 흰색 배경과 연한 민트/초록 포인트로 더 부드러운 첫인상 적용
- 큰 제목, 큰 버튼, 넓은 여백으로 모바일에서 읽기 쉽게 개선
- 손님 질문과 추천 답장이 보이는 실제 사용 장면을 첫 화면에 배치
- 기능 카드는 이모지 아이콘과 짧은 설명으로 즉시 이해되도록 정리
- 대시보드는 “오늘 어떤 일을 줄일지” 중심으로 재구성
- “복사해서 쓰는 안전한 방식” 메시지를 랜딩과 미리보기 카드에 반영

## 4. 아직 구현하지 않은 기능

- 실제 답장 생성
- 실제 복사 기능
- 실제 저장 기능
- FAQ 추가, 수정, 삭제
- 생성 이력 저장
- OpenAI API 연결
- Supabase 연결
- 로그인 및 인증
- 결제
- 외부 플랫폼 자동 연동

## 5. 검증 결과

- `npm run lint` 통과
- `npm run build` 통과
- `/` HTTP 200 확인
- `/dashboard` HTTP 200 확인
- `/setup` HTTP 200 확인
- 사용자 화면 코드에서 `프롬프트`, `토큰`, `모델`, `API`, `Supabase`, `OpenAI`, `mock` 단어가 노출되지 않는지 확인

## 6. 발견한 문제

- 처음 `npm run build` 실행 시 dev 서버 로그 파일이 `.next` 안에 있어 잠금 오류가 발생했다.
- dev 서버를 잠시 종료하고 다시 빌드하니 정상 통과했다.
- 이후 dev 서버는 다시 실행했고 현재 `http://127.0.0.1:3000`에서 확인 가능하다.
- Playwright가 설치되어 있지 않아 스크린샷 기반 검증은 수행하지 않았다.
- Day 1 원칙에 따라 추가 패키지는 설치하지 않았다.

## 7. Day 2에 해야 할 작업

- 가게 정보 입력값을 local state로 관리
- “가게 정보 저장하기” 버튼 클릭 시 화면 안에서 임시 저장 상태 표시
- FAQ 관리 페이지 추가
- FAQ 추가, 수정, 삭제를 local state로 구현
- 대시보드의 추천 작업과 FAQ/가게 정보 상태를 local state 흐름과 연결
- 최근 답장 카드의 “복사하기” 버튼 동작 연결
- `npm run lint`, `npm run build`로 검증

## 8. 다음 Codex 작업 명령어

```text
너는 “AI 사장님 매출 비서” SaaS 웹앱의 Day 2 개발을 담당한다.

Day 2 목표:
OpenAI API, Supabase, 로그인, 결제 없이 프론트엔드 local state 기반으로 가게 정보 입력 흐름과 FAQ 관리 흐름을 구현한다.

작업 전 반드시 확인할 것:
1. docs/PRD.md, docs/MVP.md, docs/USER_FLOW.md, docs/SCREEN_FLOW.md, docs/CODEX_TASKS.md, docs/PROJECT_PLAN.md, docs/CHECKLIST.md, docs/PROGRESS.md, docs/DAY1_REPORT.md를 읽는다.
2. Next.js 코드를 수정하기 전 node_modules/next/dist/docs/ 안의 관련 App Router 문서를 읽는다.
3. 기존 파일을 삭제하지 않는다.
4. OpenAI API, Supabase, 로그인, 결제 기능은 구현하지 않는다.
5. 불필요한 패키지를 설치하지 않는다.
6. 작업 전 어떤 파일을 수정할지 짧게 계획을 보고한다.

구현할 내용:
1. app/setup/page.tsx를 client component 또는 하위 client component 구조로 개선한다.
2. 가게 이름, 업종, 영업시간, 주소, 전화번호, 대표 메뉴, 말투 선택값을 local state로 관리한다.
3. 저장 버튼을 누르면 실제 서버 저장 없이 “임시 저장됨” 상태와 요약 카드가 보이도록 한다.
4. app/faq/page.tsx를 생성한다.
5. FAQ 질문/답변 추가, 수정, 삭제 UI를 local state로 구현한다.
6. components 안에 필요한 FAQ 관련 공통 컴포넌트를 추가한다.
7. app/dashboard/page.tsx에 FAQ 관리 진입 카드와 가게 정보 완성도 표시를 더 자연스럽게 연결한다.
8. PreviewReplyCard의 “복사하기” 버튼에 임시 복사 동작 또는 복사 완료 상태를 연결한다.
9. 모바일 우선 반응형 디자인을 유지한다.
10. 사장님이 이해하기 쉬운 문구를 사용한다.

검증:
1. npm run lint 실행
2. npm run build 실행
3. /setup 페이지가 정상 렌더링되는지 확인
4. /faq 페이지가 정상 렌더링되는지 확인
5. /dashboard 페이지가 정상 렌더링되는지 확인
6. OpenAI, Supabase, 로그인, 결제 코드가 들어가지 않았는지 확인

작업 완료 후 docs/DAY2_REPORT.md를 생성한다.
마지막에는 변경 파일 목록, 실행한 검증 명령어, 남은 문제를 텍스트로 깔끔하게 요약해서 보고한다.
```
