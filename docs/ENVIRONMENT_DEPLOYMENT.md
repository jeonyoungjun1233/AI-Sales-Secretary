# 환경변수 및 배포 안내

## 1. 로컬 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 필요한 변수명을 저장한다.

필수 변수:

- `OPENAI_API_KEY`
- `AI_PROVIDER`
- `OPENAI_MODEL`
- `NEXT_PUBLIC_SUPABASE_URL`

Supabase 공개 키는 아래 둘 중 하나를 사용한다.

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

서버 저장을 안전하게 운영하려면 아래 둘 중 하나를 추가한다.

- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_SECRET_KEY`

주의:

- 실제 키 값은 문서, 코드, 커밋 메시지에 적지 않는다.
- `.env.local`은 Git에 올리지 않는다.
- `.env.local`은 프로젝트 루트에 있어야 한다.
- `app/.env.local`처럼 하위 폴더에 있으면 Next.js 서버 Route와 배포 스크립트가 값을 읽지 못한다.

## 2. 로컬 점검

```bash
npm run env:check
```

이 명령은 값 자체를 출력하지 않고, 각 변수의 존재 여부만 보여준다.

```bash
npm run supabase:check
```

이 명령은 Supabase 저장 테이블 준비 상태를 확인한다.

## 3. Vercel 환경변수 동기화

```bash
npm run env:vercel
```

이 명령은 `.env.local`에서 값을 읽어 Vercel Production, Development 환경에 등록한다.

Preview 브랜치 환경변수가 필요하면 아래처럼 브랜치를 지정한다.

```bash
$env:VERCEL_PREVIEW_BRANCH="feature-branch"
npm run env:vercel
```

스크립트는 실제 값을 출력하지 않는다.

## 4. Vercel CLI 준비

Vercel CLI 로그인이 필요하면 먼저 실행한다.

```bash
npx vercel login
```

프로젝트 연결이 필요하면 먼저 실행한다.

```bash
npx vercel link
```

Windows 장치명에 한글이 포함된 경우 Vercel CLI가 실패할 수 있어, 동기화 스크립트는 임시 ASCII 장치명 우회 처리를 포함한다.

## 5. Supabase 테이블 준비

서버 저장을 사용하려면 Supabase SQL Editor에서 아래 파일 내용을 실행한다.

```text
supabase/app_storage_schema.sql
```

실행 후 아래 명령으로 테이블 준비 상태를 확인한다.

```bash
npm run supabase:check
```

## 6. Supabase 키 종류

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 또는 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: 공개 키
- `SUPABASE_SERVICE_ROLE_KEY` 또는 `SUPABASE_SECRET_KEY`: 서버 전용 강한 권한 키

서버 전용 키는 브라우저 코드에서 절대 사용하지 않는다.

## 7. OpenAI 키 보안

- `OPENAI_API_KEY`는 서버 Route에서만 읽는다.
- 클라이언트 컴포넌트에서 직접 읽거나 전송하지 않는다.
- 키가 없거나 호출이 실패하면 앱은 기존 생성 방식으로 안전하게 이어진다.

## 8. 재배포

Vercel 환경변수를 추가하거나 수정한 뒤에는 Production 재배포가 필요하다.

```bash
npx vercel --prod
```

또는 GitHub `main` 브랜치에 푸쉬해 자동 배포를 진행한다.
