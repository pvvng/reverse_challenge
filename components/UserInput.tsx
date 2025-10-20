"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CardColor } from "@/lib/types";
import { UserIcon } from "./UserIcon";

interface UserInputPropt {
  id: string;
  color: CardColor;
  name: string;
  handleChange: (id: string, name: string) => void;
  removeUser: (id: string) => void;
}

const KO_COLOR_NAME: Record<CardColor, string> = {
  blue: "파랑",
  green: "초록",
  orange: "주황",
  yellow: "노랑",
  white: "하양",
};

export function UserInput({
  id,
  color,
  name,
  handleChange,
  removeUser,
}: UserInputPropt) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const iconWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current!;
      const icon = iconWrapRef.current!;

      // timeline으로 자연스러운 시퀀스 구성
      const tl = gsap.timeline();

      // 전체 카드: 살짝 회전/스케일/왜곡으로 등장 (탄성)
      tl.fromTo(
        root,
        {
          opacity: 0,
          y: 28,
          scale: 0.96,
          rotate: -3,
          skewY: 6,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          skewY: 0,
          duration: 0.72,
          ease: "elastic.out(1.1, 0.55)",
        }
      );

      // 아이콘 팝 (빠르게, back easing)
      tl.fromTo(
        icon,
        { scale: 0.6, y: 6, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.46, ease: "back.out(1.6)" },
        "-=0.48" // 약간 겹치게 재생
      );

      // 하이라이트 쉐도우/배경 플래시 (아주 짧게)
      tl.to(
        root,
        {
          boxShadow: "0 12px 30px rgba(16,24,40,0.08)",
          duration: 0.28,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        "-=0.36"
      );
    }, rootRef);

    return () => {
      ctx.revert(); // 클린업
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex items-center gap-3 py-2 transition rounded-2xl opacity-0"
    >
      <div ref={iconWrapRef} className="flex-shrink-0">
        <UserIcon color={color} name={name} />
      </div>

      <div className="relative flex-1">
        <input
          value={name}
          onChange={(e) => handleChange(id, e.target.value)}
          placeholder="이름 입력"
          className="w-full bg-transparent border-b border-neutral-400 pb-1
          transition-all focus:outline-none focus:py-1 peer"
          minLength={1}
          maxLength={20}
        />
        <div
          className="absolute left-0 top-full mt-1 text-xs text-gray-400
          transition-all duration-300 ease-in-out
          peer-focus:opacity-0 peer-focus:-translate-y-1 peer-focus:scale-95"
        >
          색상: {KO_COLOR_NAME[color]}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <button
          type="button"
          onClick={() => removeUser(id)}
          className="text-xs text-red-600 hover:underline"
          aria-label={`Remove ${id}`}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
