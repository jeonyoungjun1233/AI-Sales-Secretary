# 환경변수 및 배포 안내

## 1. 로컬 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 필요한 변수명을 저장한다.

필수 변수:

- `OPENAI_API_KEY`
- `AI_PROVIDER`
- `OPENAI_MODEL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

주의:

- 실제 키 값은 문서, 코드, 커밋 메시지에 적지 않는다.
- `.env.local`은 Git에 올리지 않는다.
- 현재 `.gitignore`는 `.env`, `.env.local`, `.env.*.local`, `.env*`를 제외한다.

## 2. 로컬 점검

```bash
npm run env:check
```

이 명령은 값 자체를 출력하지 않고, 각 변수의 존재 여부만 `OK` 또는 `MISSING`으로 보여준다.

## 3. Vercel 환경변수 동기화

```bash
npm run env:vercel
```

이 명령은 `.env.local`에서 값을 읽어 Vercel의 Production, Preview, Development 환경에 등록한다.

동기화 대상:

- `OPENAI_API_KEY`
- `AI_PROVIDER`
- `OPENAI_MODEL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

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

## 5. Supabase 키 종류

- `NEXT_PUBLIC_SUPABASE_URL`: 브라우저에 공개되어도 되는 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 브라우저에서 사용하는 공개 anon 키
- `SUPABASE_SERVICE_ROLE_KEY`: 서버에서만 사용해야 하는 강한 권한의 키

Day 7에서는 Supabase 키를 배포 환경에 등록할 준비만 한다. 실제 DB 연결은 Day 8 이후에 진행한다.

## 6. OpenAI 키 보안

- `OPENAI_API_KEY`는 서버 Route에서만 읽는다.
- 클라이언트 컴포넌트에서 직접 읽거나 전송하지 않는다.
- 키가 없거나 호출이 실패하면 앱은 기존 생성 방식으로 안전하게 이어진다.

## 7. 재배포

Vercel 환경변수를 추가하거나 수정한 뒤에는 Production 재배포가 필요하다.

```bash
npx vercel --prod
```

또는 GitHub `main` 브랜치에 푸쉬해 자동 배포를 진행한다.
