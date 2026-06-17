"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { MobileAppShell } from "@/components/MobileAppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import {
  getAccountLabel,
  getAuthState,
  refreshAuthState,
  signOutAndClearAuth,
} from "@/lib/auth/authStore";
import type { AuthState } from "@/lib/auth/types";
import { getBusinessProfile } from "@/lib/storage/businessProfileStore";
import { getCalendarEvents } from "@/lib/storage/calendarStore";
import { getFaqs } from "@/lib/storage/faqStore";
import { getGenerationHistory } from "@/lib/storage/generationHistoryStore";

type AccountSummary = {
  hasProfile: boolean;
  generationCount: number;
  eventCount: number;
  faqCount: number;
};

const emptySummary: AccountSummary = {
  hasProfile: false,
  generationCount: 0,
  eventCount: 0,
  faqCount: 0,
};

export default function AccountPage() {
  const [authState, setAuthState] = useState<AuthState>(() => getAuthState());
  const [summary, setSummary] = useState<AccountSummary>(emptySummary);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAccount();
    }, 0);

    async function loadAccount() {
      const nextAuthState = await refreshAuthState();

      setAuthState(nextAuthState);
      setSummary({
        hasProfile: Boolean(getBusinessProfile()),
        generationCount: getGenerationHistory().length,
        eventCount: getCalendarEvents().length,
        faqCount: getFaqs([]).length,
      });
    }

    return () => window.clearTimeout(timeoutId);
  }, []);

  async function handleSignOut() {
    await signOutAndClearAuth();
    setAuthState(getAuthState());
    setSummary(emptySummary);
    setMessage("로그아웃했어요.");
  }

  if (!authState.signedIn) {
    return (
      <MobileAppShell
        actionHref="/demo"
        actionLabel="체험"
        title="내 계정"
        subtitle="계정으로 저장해보세요."
      >
        <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-black text-emerald-300">체험 중</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            기록을 이어서 쓰려면 로그인하세요.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            계정으로 가게 정보와 만든 문구를 이어서 볼 수 있어요.
          </p>
        </section>

        <section className="mt-5 grid gap-3 rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5">
          <PrimaryButton href="/login" variant="dark">
            로그인
          </PrimaryButton>
          <PrimaryButton href="/signup">회원가입</PrimaryButton>
          <PrimaryButton href="/demo" variant="outline">
            1분 체험
          </PrimaryButton>
        </section>

        {message ? (
          <p className="mt-5 text-center text-sm font-black text-emerald-700">
            {message}
          </p>
        ) : null}
      </MobileAppShell>
    );
  }

  return (
    <MobileAppShell
      actionHref="/pricing"
      actionLabel="플랜"
      title="내 계정"
      subtitle="내 가게 기록을 관리해요."
    >
      <section className="rounded-[1.75rem] bg-[linear-gradient(135deg,#10b981_0%,#14b8a6_100%)] p-5 text-white shadow-2xl shadow-emerald-200">
        <p className="text-sm font-black text-emerald-100">로그인됨</p>
        <h2 className="mt-2 break-words text-2xl font-black leading-8">
          {getAccountLabel()}
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-emerald-50">
          무료 체험 플랜으로 사용 중입니다.
        </p>
      </section>

      <section className="mt-5 rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-emerald-700">저장 상태</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">
              내 가게 업무
            </h2>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            계정 저장
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          <AccountStatusRow
            label="내 가게 정보"
            value={summary.hasProfile ? "저장됨" : "필요"}
          />
          <AccountStatusRow
            label="생성 기록"
            value={`${summary.generationCount}개`}
          />
          <AccountStatusRow label="일정" value={`${summary.eventCount}개`} />
          <AccountStatusRow label="FAQ" value={`${summary.faqCount}개`} />
        </div>

        <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs font-bold leading-5 text-slate-500">
          이 기기의 체험 기록은 로그인 전 기록일 수 있어요.
        </p>
      </section>

      <section className="mt-5 grid gap-3">
        <PrimaryButton href="/setup" variant="dark">
          가게 정보 수정
        </PrimaryButton>
        <PrimaryButton href="/pricing" variant="soft">
          요금제 보기
        </PrimaryButton>
        <PrimaryButton href="/feedback" variant="outline">
          의견 남기기
        </PrimaryButton>
        <button
          className="min-h-14 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-base font-black text-slate-700 shadow-sm transition active:scale-[0.99]"
          onClick={handleSignOut}
          type="button"
        >
          로그아웃
        </button>
      </section>

      <p
        aria-live="polite"
        className="mt-4 min-h-5 text-center text-sm font-black text-emerald-700"
      >
        {message}
      </p>

      <div className="mt-4 text-center text-sm font-bold text-slate-500">
        <Link className="text-emerald-700" href="/dashboard">
          홈으로 돌아가기
        </Link>
      </div>
    </MobileAppShell>
  );
}

function AccountStatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <span className="text-sm font-black text-emerald-700">{value}</span>
    </div>
  );
}
