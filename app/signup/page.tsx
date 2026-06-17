"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { MobileAppShell } from "@/components/MobileAppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import {
  getFriendlyAuthMessage,
  signUpWithEmail,
} from "@/lib/auth/supabaseAuthClient";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      setMessage("필수 정보를 모두 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      setMessage("비밀번호는 6자 이상으로 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const result = await signUpWithEmail({
        email: email.trim(),
        password,
        passwordConfirm,
      });

      setMessage(result.message ?? "가입이 완료됐어요.");

      if (result.session) {
        router.push("/setup");
      }
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
      title="회원가입"
      subtitle="AI 매출 비서를 내 가게에 맞게 시작하세요."
    >
      <section className="rounded-[1.75rem] bg-[linear-gradient(135deg,#10b981_0%,#14b8a6_100%)] p-5 text-white shadow-2xl shadow-emerald-200">
        <p className="text-sm font-black text-emerald-100">내 가게 시작</p>
        <h2 className="mt-2 text-3xl font-black leading-tight">
          기록이 쌓일수록 쉬워져요.
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-emerald-50">
          답장, 리뷰, 홍보글을 계정에 이어서 저장해요.
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
              autoComplete="new-password"
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="6자 이상"
              type="password"
              value={password}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black text-slate-800">
              비밀번호 확인
            </span>
            <input
              autoComplete="new-password"
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setPasswordConfirm(event.target.value)}
              placeholder="한 번 더 입력"
              type="password"
              value={passwordConfirm}
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
            {isSubmitting ? "준비 중..." : "회원가입"}
          </PrimaryButton>
        </div>
      </form>

      <section className="mt-5 grid gap-3 rounded-[1.75rem] bg-slate-50 p-5">
        <p className="text-center text-sm font-bold leading-6 text-slate-600">
          이미 계정이 있나요?
        </p>
        <PrimaryButton href="/login" variant="dark">
          로그인
        </PrimaryButton>
        <PrimaryButton href="/demo" variant="outline">
          1분 체험 계속하기
        </PrimaryButton>
      </section>

      <div className="mt-5 text-center text-sm font-bold text-slate-500">
        <Link className="text-emerald-700" href="/dashboard">
          홈으로 돌아가기
        </Link>
      </div>
    </MobileAppShell>
  );
}
