# AI 에이전트 구조 문서

## 1. 현재 구조

현재 앱은 `/api/generate` 서버 Route를 통해 생성 요청을 처리한다.

생성 화면은 직접 외부 생성 서비스를 호출하지 않는다. 클라이언트는 `/api/generate`에 요청하고, 서버 Route가 `lib/ai/agentRouter.ts`를 통해 provider를 선택한다.

현재 흐름:

1. 사용자가 문의, 리뷰, 홍보 내용을 입력한다.
2. 화면에서 `GenerateRequest`와 저장된 가게 정보, FAQ, 일정, 최근 기록을 함께 보낸다.
3. `/api/generate`가 서버에서 요청을 받는다.
4. `AI_PROVIDER=openai`이고 서버에 `OPENAI_API_KEY`가 있으면 `openaiProvider`를 사용한다.
5. 키가 없거나 호출이 실패하면 `mockProvider`로 fallback한다.
6. 화면은 결과 문구, 절약 시간, 확인 안내를 보여준다.

## 2. 파일 구조

- `lib/ai/types.ts`: 생성 요청, 응답, 말투, 업종, 채널 타입
- `lib/ai/agentRouter.ts`: provider 선택 진입점
- `lib/ai/providers/mockProvider.ts`: 현재 화면에서 사용하는 로컬 생성 provider
- `lib/ai/providers/openaiProvider.ts`: 실제 생성 provider
- `app/api/generate/route.ts`: 서버 전용 생성 Route
- `lib/ai/requestGeneration.ts`: 클라이언트에서 서버 Route를 호출하는 helper
- `lib/ai/generationContext.ts`: 브라우저에 저장된 업무 맥락을 생성 요청에 포함하는 helper
- `lib/ai/prompts/customerReply.ts`: 문의 답장 작성 지침
- `lib/ai/prompts/reviewReply.ts`: 리뷰 답글 작성 지침
- `lib/ai/prompts/promoPost.ts`: 홍보글 작성 지침
- `lib/ai/prompts/faqAnswer.ts`: 자주 묻는 질문 답변 작성 지침
- `lib/historyTypes.ts`: 향후 생성 기록 저장 타입

## 3. Day 7 연결 상태

Day 7에서 실제 provider 연결 코드는 구현했다.

연결 완료 조건:

- `.env.local`에 필수 환경변수가 있어야 한다.
- Vercel 환경변수 등록이 완료되어야 한다.
- Production 재배포 후 실제 생성 결과를 확인해야 한다.

연결 전 확인할 것:

- 환경변수 이름과 Vercel 설정
- 호출 비용과 무료 플랜 제한
- 실패 시 사용자에게 보여줄 쉬운 안내 문구
- 생성 기록 저장 여부
- 개인정보 또는 손님 정보 입력 시 주의 문구

## 4. 장기 확장 방향

장기적으로 provider를 작업 성격에 맞게 나눌 수 있다.

- 짧은 문의 답장: OpenAI
- 긴 리뷰 분석과 고객 감정 정리: Claude
- 최신 트렌드 검색형 홍보 소재: Perplexity 또는 Liner
- 한국어 특화 답변: A.X

## 5. 작업별 추천 구조

| 작업 | 추천 provider | 이유 |
| --- | --- | --- |
| 손님 문의 답장 | OpenAI | 짧고 자연스러운 응대 문장에 적합 |
| 리뷰 답글 | Claude | 긴 리뷰 맥락과 감정 해석에 유리 |
| 홍보글 작성 | OpenAI + 트렌드 검색 provider | 기본 문구 생성과 최신 소재 조합 가능 |
| FAQ 답변 | OpenAI | 반복 질문에 대한 빠른 답변 생성에 적합 |
| 주간 홍보 아이디어 | Perplexity/Liner | 최신 이벤트, 날씨, 소비 트렌드 참고 가능 |

## 6. 실제 연결 전 주의사항

- 사용자 화면에 provider 이름을 노출하지 않는다.
- 화면에서는 “문구를 준비하고 있어요”, “답장을 정리했어요”처럼 사장님이 이해하기 쉬운 표현을 쓴다.
- 실제 호출은 서버 쪽에서 처리하고 비밀 값은 브라우저로 보내지 않는다.
- 비용이 발생하는 기능은 호출 제한과 사용량 안내가 필요하다.
- 자동 전송은 MVP 이후 기능으로 남기고, 먼저 사장님이 확인 후 복사하는 방식을 유지한다.

## 7. 사용자 화면 원칙

사용자 화면에서는 기술 이름보다 실제 이득을 보여준다.

- 답장 시간 절약
- 리뷰 관리 부담 감소
- 오늘 올릴 홍보글 준비
- 자주 묻는 질문 정리
- 가게 말투 유지
