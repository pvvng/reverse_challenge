"use client";

import { CardColor } from "@/lib/types";
import { WaveCard } from "./WaveCard";
import { COLOR_MAP } from "@/lib/contant";
import { useEffect, useState } from "react";
import { getCachedAudio } from "@/lib/cacheAudio";

interface GameResultWavesProps {
  gameId: string;
  id: string;
  color: CardColor;
}

export function GameResultWaves({
  gameId,
  id: userId,
  color,
}: GameResultWavesProps) {
  // urls for original and reversed blobs
  const [origUrl, setOrigUrl] = useState<string | null>(null);
  const [revUrl, setRevUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let oUrl: string | null = null;
    let rUrl: string | null = null;

    const getSavedAudio = async () => {
      try {
        const blob = await getCachedAudio(gameId, userId, "original");
        const rBlob = await getCachedAudio(gameId, userId, "reversed");

        if (!mounted) return; // 언마운트 됐으면 무시

        if (blob) {
          oUrl = URL.createObjectURL(blob);
          setOrigUrl(oUrl);
        }
        if (rBlob) {
          rUrl = URL.createObjectURL(rBlob);
          setRevUrl(rUrl);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          // Abort-type 에러는 무시, 그 외는 로깅
          if (e.name === "AbortError") return;
          console.error("getSavedAudio failed:", e);
        } else {
          console.error("getSavedAudio failed:", e);
        }
      }
    };

    getSavedAudio();

    return () => {
      mounted = false;
      if (oUrl) {
        try {
          URL.revokeObjectURL(oUrl);
        } catch {}
      }
      if (rUrl) {
        try {
          URL.revokeObjectURL(rUrl);
        } catch {}
      }
    };
  }, [gameId, userId]);

  return (
    <section key={userId} className="space-y-5">
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
