"use client";

import useWave, { WaveStatus } from "@/lib/hooks/useWave";
import { WaveController } from "./WaveController";
import { WaveContainer } from "./WaveContainer";

interface WaveCardProps {
  type?: "original" | "reversed";
  colorHex: string;
}

export function WaveCard({ type = "original", colorHex }: WaveCardProps) {
  const {
    containerRef,
    reversedRecordUrl,
    status,
    handleRecord,
    handlePlayPause,
  } = useWave({
    color: colorHex,
  });

  const isRecordEnd = status >= WaveStatus.RECORD_END;

  return (
    <div
      className="rounded-2xl p-4 shadow-lg border"
      style={{ borderColor: `${colorHex}33` /* faint border */ }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: type === "original" ? "#999999" : colorHex,
            }}
          />
          <h4 className="font-semibold text-sm">
            {type === "original" ? "원본 녹음" : "리버스 챌린지"}
          </h4>
        </div>
      </div>

      {/* 컨트롤러 */}
      <WaveController
        status={status}
        reversedUrl={reversedRecordUrl}
        onRecord={handleRecord}
        onPlayPause={handlePlayPause}
        colorHex={colorHex}
      />

      {/* 파형 컨테이너 */}
      <div className="mt-3">
        <WaveContainer
          containerRef={containerRef}
          status={status}
          colorHex={colorHex}
          isRecordEnd={isRecordEnd}
        />
      </div>
    </div>
  );
}
