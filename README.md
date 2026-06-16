# AI Sales Secretary

AI 사장님 매출 비서는 한국 및 글로벌 소상공인, 자영업자, 1인 사업자를 위한 AI 업무 보조 SaaS 웹앱입니다.

현재 구현 범위는 Day 12 데모 제출 버전입니다.

## Production

- URL: https://ai-sales-secretary.vercel.app/
- 빠른 체험: https://ai-sales-secretary.vercel.app/demo

## 주요 기능

- 랜딩페이지
- 모바일 앱형 대시보드
- 1분 빠른 체험
- 오늘 매출 액션 센터
- 손님 문의 답장 생성
- 리뷰 답글 생성
- 홍보글 생성
- FAQ 관리
- 월간 캘린더 일정 관리
- 가게 정보 등록
- 생성 기록 저장
- 요금제 화면
- 베타 피드백 화면

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- OpenAI server route
- Supabase REST storage layer
- Vercel

## 구현 상태

- OpenAI 생성은 서버 Route를 통해 연결되어 있습니다.
- Supabase 저장 구조는 구현되어 있지만, 원격 테이블은 Supabase SQL 적용 후 완전히 검증됩니다.
- 브라우저별 임시 저장으로 발표 데모는 로그인 없이도 작동합니다.
- 실제 로그인, 결제, 알림, 외부 채널 자동 전송은 아직 구현하지 않았습니다.

## 데모 흐름

1. `/demo`에서 업종을 선택합니다.
2. “예시 가게로 시작하기”를 누릅니다.
3. `/agent`에서 “오늘 액션 만들기”를 누릅니다.
4. 생성된 문구를 복사하거나 기록에 저장합니다.
5. 일정 제안을 캘린더에 추가합니다.
6. `/pricing`과 `/feedback`으로 수익화와 베타 테스트 흐름을 설명합니다.

## Local Development

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다.

## Verification

```bash
npm run lint
npm run build
```

## 보안 주의

- API 키를 코드, 문서, 커밋 메시지에 쓰지 않습니다.
- `.env.local`은 Git에 커밋하지 않습니다.
- 브라우저 코드에서 서버 전용 키를 사용하지 않습니다.
