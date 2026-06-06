# AI Sales Secretary

AI 사장님 매출 비서는 한국 및 글로벌 소상공인, 자영업자, 1인 사업자를 위한 AI 업무 보조 SaaS 웹앱입니다.

현재 구현 범위는 Day 2 MVP 화면입니다.

- 랜딩페이지
- 사장님용 대시보드
- 가게 정보 등록 기본 화면
- 손님 문의 답장 생성 화면
- 리뷰 답글 생성 화면
- 홍보글 생성 화면
- mock 데이터 기반 결과 미리보기와 복사 피드백

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel

OpenAI API, Supabase, 로그인, 결제 기능은 아직 연결하지 않았습니다.

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
