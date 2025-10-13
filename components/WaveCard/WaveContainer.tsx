"use client";

import { WaveStatus } from "@/lib/hooks/useWave";

interface WaveContainerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  status: WaveStatus;
  colorHex: string;
  isRecordEnd: boolean;
}

export function WaveContainer({
  containerRef,
  status,
  colorHex,
  isRecordEnd,
}: WaveContainerProps) {
  // 배경 규칙: isPending -> neutral-100, !isRecordEnd -> colorHex, otherwise white
  const isPending =
    status === WaveStatus.PENDING || status === WaveStatus.RECORD_READY;

  const bgClass = isPending ? "bg-neutral-100" : !isRecordEnd ? "" : "bg-white";

  const inlineStyle =
    !isPending && !isRecordEnd ? { backgroundColor: colorHex } : undefined;

  return (
    <div
      ref={containerRef}
      className={`w-full h-[124px] p-3 rounded-2xl transition-colors duration-250 ${bgClass} ${
        !isPending && !isRecordEnd ? "" : ""
      }`}
      style={inlineStyle}
    />
  );
}
