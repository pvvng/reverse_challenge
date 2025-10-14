"use client";

import { WaveStatus } from "@/lib/hooks/useWave";
import { StatusBadge } from "./StatusBadge";

interface WaveControllerProps {
  status: WaveStatus;
  colorHex: string;
  children: React.ReactNode;
}

export function WaveController({
  status,
  colorHex,
  children,
}: WaveControllerProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <StatusBadge status={status} colorHex={colorHex} />
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
