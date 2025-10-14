"use client";

import { CardColor } from "@/lib/types";
import { WaveCard } from "./WaveCard";
import { COLOR_MAP } from "@/lib/contant";
import { UserIcon } from "./UserIcon";
import { useEffect, useState } from "react";

interface EndCardProps {
  userTurn: number;
  headCount: number;
  id: string;
  name: string;
  color: CardColor;
}

export function EndCard({
  userTurn,
  headCount,
  id,
  name,
  color,
}: EndCardProps) {
  return (
    <div className="space-y-5" key={id}>
      <header className="flex gap-3 items-center">
        <UserIcon color={color} name={name} />
        <div className="w-full flex justify-between items-end">
          <Info name={name} userTurn={userTurn} headCount={headCount} />
        </div>
      </header>
      <UserWave userId={id} color={color} />
    </div>
  );
}

function Info({
  name,
  userTurn,
  headCount,
}: {
  name: string;
  userTurn: number;
  headCount: number;
}) {
  return (
    <div>
      <h3 className="line-clamp-1 text-lg">
        <span className="font-semibold">{name || "이름 없음"}</span>
      </h3>
      <p className="text-xs text-neutral-500">
        {userTurn + 1} / {headCount} 번째 플레이어
      </p>
    </div>
  );
}

function UserWave({ userId, color }: { userId: string; color: CardColor }) {
  // urls for original and reversed blobs
  const [origUrl, setOrigUrl] = useState<string | null>(null);
  const [revUrl, setRevUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let oUrl: string | null = sessionStorage.getItem(`${userId}:original`);
    let rUrl: string | null = sessionStorage.getItem(`${userId}:original`);

    setOrigUrl(oUrl);
    setRevUrl(rUrl);

    return () => {
      mounted = false;
      if (oUrl) URL.revokeObjectURL(oUrl);
      if (rUrl) URL.revokeObjectURL(rUrl);
    };
  }, [userId]);

  return (
    <>
      <WaveCard id={userId} colorHex={COLOR_MAP[color]} />
      <WaveCard
        id={userId + "-rev"}
        colorHex={COLOR_MAP[color]}
        type="reversed"
      />
    </>
  );
}
