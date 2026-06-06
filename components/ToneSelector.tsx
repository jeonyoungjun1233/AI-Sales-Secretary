"use client";

import { useState } from "react";

const tones = [
  {
    label: "친절한 말투",
    description: "처음 오는 손님에게도 부드럽고 자세하게 답합니다.",
  },
  {
    label: "짧고 깔끔한 말투",
    description: "바쁜 시간에 바로 보낼 수 있게 핵심만 전합니다.",
  },
  {
    label: "밝고 귀여운 말투",
    description: "카페, 디저트, 뷰티 업종에 잘 어울립니다.",
  },
  {
    label: "고급스러운 말투",
    description: "예약제 매장이나 프리미엄 서비스에 어울립니다.",
  },
];

export function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState(tones[0].label);

  return (
    <fieldset className="grid gap-3">
      <legend className="mb-2 text-sm font-bold text-slate-800">
        기본 답장 말투
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {tones.map((tone) => {
          const selected = selectedTone === tone.label;

          return (
            <label
              className={`flex cursor-pointer gap-3 rounded-lg border p-4 transition ${
                selected
                  ? "border-emerald-400 bg-emerald-50 shadow-sm shadow-emerald-100"
                  : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40"
              }`}
              key={tone.label}
            >
              <input
                checked={selected}
                className="mt-1 h-4 w-4 accent-emerald-600"
                name="tone"
                onChange={() => setSelectedTone(tone.label)}
                type="radio"
                value={tone.label}
              />
              <span className="flex flex-col gap-1">
                <span className="font-bold text-slate-950">{tone.label}</span>
                <span className="text-sm leading-6 text-slate-600">
                  {tone.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
