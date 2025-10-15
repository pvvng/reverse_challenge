"use client";

import { CardColor } from "@/lib/types";
import { WaveCard } from "./WaveCard";
import { COLOR_MAP } from "@/lib/contant";
import { UserIcon } from "./UserIcon";
import { useEffect, useState } from "react";
import { getCachedAudio } from "@/lib/cacheAudio";
import { UserInfo } from "./UserInfo";

interface EndCardProps {
  userTurn: number;
  headCount: number;
  gameId: string;
  id: string;
  name: string;
  color: CardColor;
}

export function EndCard({
  userTurn,
  headCount,
  gameId,
  id: userId,
  name,
  color,
}: EndCardProps) {
  return (
    <div className="space-y-5" key={userId}>
      <header className="flex gap-3 items-center">
        <UserIcon color={color} name={name} />
        <div className="w-full flex justify-between items-end">
          <UserInfo name={name} currentTurn={userTurn} headCount={headCount} />
        </div>
      </header>
      <UserWaves gameId={gameId} userId={userId} color={color} />
    </div>
  );
}

function UserWaves({
  gameId,
  userId,
  color,
}: {
  gameId: string;
  userId: string;
  color: CardColor;
}) {
  // urls for original and reversed blobs
  const [origUrl, setOrigUrl] = useState<string | null>(null);
  const [revUrl, setRevUrl] = useState<string | null>(null);

  useEffect(() => {
    let oUrl: string | null = null;
    let rUrl: string | null = null;

    const getSavedAudio = async () => {
      const blob = await getCachedAudio(gameId, userId, "original");
      const rBlob = await getCachedAudio(gameId, userId, "reversed");

      if (blob) {
        oUrl = URL.createObjectURL(blob);
        setOrigUrl(oUrl);
      }
      if (rBlob) {
        rUrl = URL.createObjectURL(rBlob);
        setRevUrl(rUrl);
      }
    };

    getSavedAudio();

    // 클린업
    return () => {
      if (oUrl) URL.revokeObjectURL(oUrl);
      if (rUrl) URL.revokeObjectURL(rUrl);
    };
  }, [userId]);

  return (
    <section className="space-y-5">
      <WaveCard
        gameId={gameId}
        userId={userId}
        colorHex={COLOR_MAP[color]}
        initialUrl={origUrl} // 초기 오디오 URL 전달
      />
      <WaveCard
        gameId={gameId}
        userId={userId + "-rev"}
        colorHex={COLOR_MAP[color]}
        type="reversed"
        initialUrl={revUrl} // 리버스 오디오 URL 전달
      />
    </section>
  );
}
