# 최종 QA 체크리스트

## 1. 주요 경로

- [ ] `/` HTTP 200 확인
- [ ] `/guide` HTTP 200 확인
- [ ] `/submission` HTTP 200 확인
- [ ] `/roadmap` HTTP 200 확인
- [ ] `/demo` HTTP 200 확인
- [ ] `/login` HTTP 200 확인
- [ ] `/signup` HTTP 200 확인
- [ ] `/account` HTTP 200 확인
- [ ] `/dashboard` HTTP 200 확인
- [ ] `/agent` HTTP 200 확인
- [ ] `/pricing` HTTP 200 확인
- [ ] `/feedback` HTTP 200 확인
- [ ] `/calendar` HTTP 200 확인
- [ ] `/setup` HTTP 200 확인
- [ ] `/generate/inquiry` HTTP 200 확인
- [ ] `/generate/review` HTTP 200 확인
- [ ] `/generate/promo` HTTP 200 확인
- [ ] `/faq` HTTP 200 확인
- [ ] `/history` HTTP 200 확인

## 2. 핵심 데모 흐름

- [ ] `/submission`에서 앱 핵심과 시연 순서 확인 가능
- [ ] `/guide`에서 6단계 사용법 확인 가능
- [ ] `/demo`에서 업종 선택 가능
- [ ] “예시 가게로 시작하기” 클릭 가능
- [ ] 예시 가게 준비 완료 피드백 표시
- [ ] `/agent`로 이동 가능
- [ ] `/agent`에서 오늘 매출 액션 생성 가능
- [ ] 홍보글 복사 가능
- [ ] 액션을 기록에 저장 가능
- [ ] 일정에 추가 가능
- [ ] `/history`에서 저장된 문구 확인 가능
- [ ] `/calendar`에서 추가된 일정 확인 가능

## 3. 기존 기능

- [ ] `/generate/inquiry`에서 문의 답장 생성 가능
- [ ] `/generate/review`에서 리뷰 답글 생성 가능
- [ ] `/generate/promo`에서 홍보글 생성 가능
- [ ] `/setup`에서 가게 정보 저장 가능
- [ ] `/faq`에서 자주 묻는 질문 추가 가능
- [ ] `/pricing`에서 요금제 4개 표시
- [ ] `/feedback`에서 의견 남기기 가능
- [ ] 사용량 제한 안내가 자연스럽게 표시
- [ ] 로그인/회원가입 화면이 정상 표시
- [ ] 계정 화면에서 체험 또는 로그인 상태 확인 가능
- [ ] `/roadmap`에서 향후 업데이트 방향 확인 가능

## 4. 보안과 금지 사항

- [ ] API 키가 코드에 없음
- [ ] API 키가 문서에 없음
- [ ] `.env.local`이 Git에 포함되지 않음
- [ ] 사용자 화면에 개발자 용어가 보이지 않음
- [ ] 실제 결제 연결 없음
- [ ] 실제 알림 없음
- [ ] 카카오톡, 인스타그램, 네이버 자동 전송 없음

## 5. 모바일 화면

- [ ] 9:16 모바일 앱 쉘에서 버튼이 충분히 큼
- [ ] 텍스트가 카드 밖으로 넘치지 않음
- [ ] 첫 화면에서 다음 행동이 명확함
- [ ] 하단 탭이 주요 이동을 방해하지 않음
- [ ] 카드 간 여백이 답답하지 않음
- [ ] `/guide` 단계 카드의 번호와 화살표가 잘 보임

## 6. 제출 전 명령어

- [ ] `npm run env:check`
- [ ] `npm run supabase:check`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Git 커밋 전 `.env.local` 미포함 확인
- [ ] Vercel Production 배포 READY 확인
