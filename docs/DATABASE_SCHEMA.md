# 데이터베이스 스키마

## 개요

Supabase Postgres를 사용한다. 모든 주요 테이블은 `user_id`로 소유자를 분리하고 Row Level Security를 적용한다.

## 테이블 목록

- `profiles`
- `stores`
- `faqs`
- `generations`
- `usage_events`

## profiles

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | Supabase auth user id |
| email | text | 사용자 이메일 |
| display_name | text | 표시 이름 |
| locale | text | 기본 언어 |
| created_at | timestamptz | 생성 시각 |
| updated_at | timestamptz | 수정 시각 |

## stores

MVP에서는 사용자 1명당 가게 1개를 기본으로 한다.

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | 가게 id |
| user_id | uuid | 소유 사용자 id |
| name | text | 가게 이름 |
| business_type | text | 업종 |
| description | text | 가게 소개 |
| address | text | 주소 |
| phone | text | 연락처 |
| opening_hours | text | 영업시간 |
| main_products | text | 대표 메뉴 또는 서비스 |
| response_tone | text | 기본 응대 톤 |
| language | text | 기본 생성 언어 |
| created_at | timestamptz | 생성 시각 |
| updated_at | timestamptz | 수정 시각 |

## faqs

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | FAQ id |
| user_id | uuid | 소유 사용자 id |
| store_id | uuid | 연결 가게 id |
| question | text | 질문 |
| answer | text | 답변 |
| is_active | boolean | 사용 여부 |
| sort_order | integer | 정렬 순서 |
| created_at | timestamptz | 생성 시각 |
| updated_at | timestamptz | 수정 시각 |

## generations

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | 생성 id |
| user_id | uuid | 소유 사용자 id |
| store_id | uuid | 연결 가게 id |
| type | text | `inquiry_reply`, `review_reply`, `promo_post` |
| input_text | text | 사용자 입력 |
| options | jsonb | 톤, 길이, 플랫폼 등 옵션 |
| output_text | text | AI 생성 결과 |
| model | text | 사용 모델 |
| prompt_version | text | 프롬프트 버전 |
| created_at | timestamptz | 생성 시각 |

## usage_events

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | uuid | 이벤트 id |
| user_id | uuid | 사용자 id |
| event_type | text | 이벤트 유형 |
| metadata | jsonb | 추가 정보 |
| created_at | timestamptz | 생성 시각 |

## 관계

- `profiles.id`는 Supabase `auth.users.id`를 참조한다.
- `stores.user_id`는 `profiles.id`를 참조한다.
- `faqs.store_id`는 `stores.id`를 참조한다.
- `generations.store_id`는 `stores.id`를 참조한다.
- `usage_events.user_id`는 `profiles.id`를 참조한다.

## RLS 정책

- 사용자는 자신의 `profile`만 조회 및 수정할 수 있다.
- 사용자는 자신의 `store`만 조회 및 수정할 수 있다.
- 사용자는 자신의 `faq`만 조회, 수정, 삭제할 수 있다.
- 사용자는 자신의 `generation`만 조회할 수 있다.
- 생성 기록 삭제는 MVP 이후로 미룬다.

## 인덱스

- `stores.user_id`
- `faqs.user_id`
- `faqs.store_id`
- `generations.user_id`
- `generations.store_id`
- `generations.created_at`
- `usage_events.user_id`
- `usage_events.created_at`

## 향후 확장

- `subscriptions`: 구독 상태와 요금제
- `teams`: 팀 또는 다점포 조직
- `store_members`: 가게별 사용자 권한
- `integrations`: 외부 플랫폼 연동
- `review_sources`: 외부 리뷰 수집 소스
- `campaigns`: 홍보 캠페인

## Day 8 MVP 임시 저장 테이블

로그인 전 MVP 검증을 위해 아래 JSON 기반 저장 테이블을 추가로 사용한다.

- `app_business_profiles`
- `app_faqs`
- `app_calendar_events`
- `app_generations`

각 테이블은 `owner_key`, `id`, `payload`, `created_at`, `updated_at` 컬럼을 가진다.

`app_calendar_events`는 달력 조회를 위해 `date` 컬럼도 가진다.

Day 9 기준 MVP 임시 저장 테이블은 로그인 전 베타 데모에서 브라우저별로 데이터가 섞이지 않도록 `owner_key`를 사용한다.

필수 인덱스:

- `app_business_profiles(owner_key)`
- `app_faqs(owner_key)`
- `app_calendar_events(owner_key, date)`
- `app_generations(owner_key, created_at)`

SQL 파일:

```text
supabase/app_storage_schema.sql
```

이 구조는 로그인 도입 전 임시 구조다. Supabase Auth를 연결한 뒤에는 위의 정식 `profiles`, `stores`, `faqs`, `generations`, `usage_events` 구조로 이전하고 RLS를 강화한다.

## Day 14 Auth 연결 상태

Day 14에서는 Supabase Auth REST 기반 로그인/회원가입을 추가했다.

현재 저장 분리 기준:

- 로그인 사용자: Supabase Auth user id 기반 계정 저장 키
- 비로그인 사용자: 브라우저별 임시 저장 키

`app_business_profiles`, `app_faqs`, `app_calendar_events`, `app_generations`의 `owner_key`는 Day 14부터 로그인 계정 저장과 비로그인 체험 저장을 모두 구분하는 임시 소유자 키로 사용한다.

주의:

- 정식 출시 전에는 `profiles`, `stores`, `faqs`, `generations`, `usage_events` 구조로 이전해야 한다.
- 로그인 기반 저장이 완성되면 RLS 정책을 user id 기준으로 강화해야 한다.
- service role key는 서버 전용이며 클라이언트에 노출하지 않는다.
- 로그인 전 기록을 계정으로 가져오는 마이그레이션은 아직 구현하지 않았다.
