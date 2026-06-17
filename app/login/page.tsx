"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { MobileAppShell } from "@/components/MobileAppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import {
  getFriendlyAuthMessage,
  signInWithEmail,
} from "@/lib/auth/supabaseAuthClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await signInWithEmail({
        email: email.trim(),
        password,
      });
      setMessage("로그인했어요.");
      router.push("/dashboard");
    } catch (error) {
      setMessage(getFriendlyAuthMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MobileAppShell
      actionHref="/demo"
      actionLabel="체험"
      title="로그인"
      subtitle="내 가게 기록을 이어서 사용하세요."
    >
      <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
        <p className="text-sm font-black text-emerald-300">내 가게 계정</p>
        <h2 className="mt-2 text-3xl font-black leading-tight">
          기록을 계속 이어가요.
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
          가게 정보와 만든 문구를 계정으로 확인할 수 있어요.
        </p>
      </section>

      <form
        className="mt-5 rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-black text-slate-800">이메일</span>
            <input
              autoComplete="email"
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              type="email"
              value={email}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black text-slate-800">비밀번호</span>
            <input
              autoComplete="current-password"
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
              type="password"
              value={password}
            />
          </label>

          <p
            aria-live="polite"
            className="min-h-5 text-center text-sm font-black text-emerald-700"
          >
            {message}
          </p>

          <PrimaryButton
            className="min-h-14"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "확인 중..." : "로그인"}
          </PrimaryButton>
        </div>
      </form>

      <section className="mt-5 grid gap-3 rounded-[1.75rem] bg-emerald-50 p-5">
        <p className="text-center text-sm font-bold leading-6 text-emerald-900">
          아직 계정이 없나요?
        </p>
        <PrimaryButton href="/signup" variant="dark">
          회원가입
        </PrimaryButton>
        <PrimaryButton href="/demo" variant="outline">
          1분 체험 계속하기
        </PrimaryButton>
      </section>

      <p className="mt-5 text-center text-xs font-bold leading-5 text-slate-400">
        지금은 결제 없이 베타로 체험할 수 있어요.
      </p>

      <div className="mt-4 text-center text-sm font-bold text-slate-500">
        <Link className="text-emerald-700" href="/dashboard">
          홈으로 돌아가기
        </Link>
      </div>
    </MobileAppShell>
  );
}
