# AI 사장님 매출 비서

한국 및 글로벌 소상공인, 자영업자, 1인 사업자를 위한 AI 업무 보조 SaaS 웹앱입니다.

답장, 리뷰, 홍보글, 일정 관리를 한 번에 도와주는 “사장님 전용 AI 업무 비서”를 목표로 합니다.

## Production

- 서비스: https://ai-sales-secretary.vercel.app/
- 사용법: https://ai-sales-secretary.vercel.app/guide
- 제출용 요약: https://ai-sales-secretary.vercel.app/submission
- 앞으로 업데이트: https://ai-sales-secretary.vercel.app/roadmap

## 주요 화면

- `/` 랜딩페이지
- `/guide` 사용 가이드
- `/submission` 제출용 한눈에 보기
- `/roadmap` 앞으로 업데이트 방향
- `/demo` 1분 빠른 체험
- `/dashboard` 모바일 앱형 대시보드
- `/agent` 오늘 매출 액션 센터
- `/generate/inquiry` 손님 문의 답장
- `/generate/review` 리뷰 답글
- `/generate/promo` 홍보글
- `/history` 생성 기록
- `/calendar` 월간 일정
- `/faq` FAQ 관리
- `/setup` 가게 정보
- `/account` 계정 화면
- `/pricing` 요금제
- `/feedback` 베타 피드백

## 핵심 기능

- 업종별 1분 체험
- 오늘 매출 액션 생성
- 손님 문의 답장 생성
- 리뷰 답글 생성
- 홍보글 생성
- 결과 복사와 기록 저장
- 월간 캘린더 일정 관리
- 계정 기반 저장 흐름
- 요금제와 베타 피드백 흐름

## 기술 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- OpenAI server route
- Supabase REST storage and Auth structure
- Vercel

## 수익화 구조

- 무료 체험: 제한된 생성 횟수
- 베이직: 혼자 운영하는 가게
- 프로: 매일 홍보하고 리뷰 관리하는 사장님
- 비즈니스: 여러 매장과 직원 계정

실제 결제는 아직 연결하지 않았습니다.

## 향후 로드맵

- Supabase 테이블과 RLS 완전 적용
- 로그인 전 기록을 계정으로 가져오기
- 실제 결제와 구독
- 카카오톡, 인스타그램, 네이버 작업 연결
- 날씨와 상권에 맞는 홍보 추천
- 여러 매장 관리
- 영어 버전

## Local Development

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다.

## Verification

```bash
npm run env:check
npm run supabase:check
npm run lint
npm run build
```

Supabase 원격 테이블이 아직 없으면 `npm run supabase:check`는 실패할 수 있습니다.

## 보안 주의

- API 키를 코드, 문서, 커밋 메시지에 쓰지 않습니다.
- `.env.local`은 Git에 커밋하지 않습니다.
- 브라우저 코드에서 서버 전용 키를 사용하지 않습니다.
- 실제 결제, 실제 알림, 외부 채널 자동 전송은 아직 연결하지 않았습니다.
