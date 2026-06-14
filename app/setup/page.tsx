"use client";

import { useEffect, useMemo, useState } from "react";

import { MobileAppShell } from "@/components/MobileAppShell";
import { PreviewReplyCard } from "@/components/PreviewReplyCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ToneSelector } from "@/components/ToneSelector";
import {
  getBusinessProfile,
  saveBusinessProfile,
} from "@/lib/storage/businessProfileStore";
import {
  getRemoteBusinessProfile,
  saveRemoteBusinessProfile,
} from "@/lib/storage/remoteStore";
import type { StoredBusinessProfile } from "@/lib/storage/types";

const businessTypes = [
  "카페",
  "음식점",
  "미용실",
  "네일샵",
  "학원",
  "숙박업",
  "소매점",
  "기타",
];

const tips = [
  "영업시간을 넣으면 답장이 빨라집니다.",
  "대표 메뉴를 넣으면 홍보글이 쉬워집니다.",
  "말투를 고르면 답글이 일정해집니다.",
];

export default function SetupPage() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<StoredBusinessProfile>({
    businessName: "",
    businessType: businessTypes[0],
    openingHours: "",
    address: "",
    phone: "",
    mainMenu: "",
    tone: "친절한 말투",
    updatedAt: "",
  });
  const completion = useMemo(() => {
    const fields = [
      profile.businessName,
      profile.businessType,
      profile.openingHours,
      profile.address,
      profile.phone,
      profile.mainMenu,
      profile.tone,
    ];
    const filled = fields.filter((value) => value.trim().length > 0).length;

    return Math.round((filled / fields.length) * 100);
  }, [profile]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadProfile();
    }, 0);

    async function loadProfile() {
      const storedProfile = getBusinessProfile();
      const remoteProfile = await getRemoteBusinessProfile();
      const nextProfile = remoteProfile ?? storedProfile;

      if (nextProfile) {
        setProfile(nextProfile);
        setSaved(true);
      }
    }

    return () => window.clearTimeout(timeoutId);
  }, []);

  function updateProfile(field: keyof StoredBusinessProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));

    if (saved) {
      setSaved(false);
    }
  }

  function handleSaveProfile() {
    const nextProfile = saveBusinessProfile(profile);

    setProfile(nextProfile);
    setSaved(true);
    void saveRemoteBusinessProfile(nextProfile);
  }

  return (
    <MobileAppShell
      actionHref="/generate/inquiry"
      actionLabel="답장"
      title="가게 정보를 넣어주세요."
      subtitle="답장이 더 자연스러워집니다."
    >
      <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
        <p className="text-sm font-bold text-emerald-300">가게 정보 완성도</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-black">{completion}%</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
              대표 메뉴와 말투를 채워보세요.
            </p>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-emerald-200">
            3분 설정
          </span>
        </div>
      </section>

      <form
        className="mt-5 rounded-[1.75rem] border border-emerald-100 bg-white p-4 shadow-lg shadow-emerald-950/5"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">가게 이름</span>
            <input
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) =>
                updateProfile("businessName", event.target.value)
              }
              placeholder="예: 연남동 초록카페"
              type="text"
              value={profile.businessName}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">업종</span>
            <select
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) =>
                updateProfile("businessType", event.target.value)
              }
              value={profile.businessType}
            >
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">영업시간</span>
            <input
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) =>
                updateProfile("openingHours", event.target.value)
              }
              placeholder="예: 매일 10:00 - 21:00, 월요일 휴무"
              type="text"
              value={profile.openingHours}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">주소</span>
            <input
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => updateProfile("address", event.target.value)}
              placeholder="예: 서울 마포구 성미산로 00"
              type="text"
              value={profile.address}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">전화번호</span>
            <input
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => updateProfile("phone", event.target.value)}
              placeholder="예: 02-000-0000"
              type="tel"
              value={profile.phone}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">대표 메뉴</span>
            <input
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => updateProfile("mainMenu", event.target.value)}
              placeholder="예: 바닐라 라떼, 딸기 케이크"
              type="text"
              value={profile.mainMenu}
            />
          </label>

          <ToneSelector
            onChange={(tone) => updateProfile("tone", tone)}
            value={profile.tone}
          />

          <div
            className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-900"
            aria-live="polite"
          >
            {saved
              ? "가게 정보를 저장했어요. 이 기기에서 다시 볼 수 있어요."
              : "저장하면 다음에 다시 볼 수 있어요."}
          </div>

          <div className="grid gap-3">
            <PrimaryButton className="min-h-14" onClick={handleSaveProfile}>
              가게 정보 저장하기
            </PrimaryButton>
            {saved ? (
              <PrimaryButton href="/generate/inquiry" variant="soft">
                답장 만들기 체험하기
              </PrimaryButton>
            ) : null}
            <PrimaryButton href="/dashboard" variant="outline">
              홈으로 돌아가기
            </PrimaryButton>
          </div>
        </div>
      </form>

      <section className="mt-5 rounded-[1.75rem] border border-emerald-100 bg-white p-4 shadow-lg shadow-emerald-950/5">
        <h2 className="text-xl font-black text-slate-950">
          입력하면 좋아지는 점
        </h2>
        <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-600">
          {tips.map((tip) => (
            <li className="rounded-2xl bg-emerald-50 p-3" key={tip}>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-5">
        <PreviewReplyCard
          label="가게 정보 반영 예시"
          question="오늘 딸기 케이크 있나요?"
          reply="안녕하세요. 오늘 딸기 케이크 준비되어 있습니다. 방문 전 연락 주시면 원하시는 시간에 맞춰 챙겨드릴게요."
        />
      </div>
    </MobileAppShell>
  );
}
