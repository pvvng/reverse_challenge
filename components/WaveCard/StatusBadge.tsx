import { WaveStatus } from "@/lib/hooks/useWave";

interface StatusBadgeProps {
  status: WaveStatus;
  colorHex: string;
}

export function StatusBadge({ status, colorHex }: StatusBadgeProps) {
  const mapping: Record<
    WaveStatus,
    { label: string; bg: string; text: string }
  > = {
    [WaveStatus.PENDING]: {
      label: "대기",
      bg: "bg-neutral-200",
      text: "text-neutral-800",
    },
    [WaveStatus.RECORD_READY]: {
      label: "준비",
      bg: "bg-neutral-100",
      text: "text-neutral-800",
    },
    [WaveStatus.RECORDING]: { label: "녹음중", bg: "", text: "text-white" },
    [WaveStatus.RECORD_END]: {
      label: "녹음 완료",
      bg: "bg-green-100",
      text: "text-green-800",
    },
    [WaveStatus.PLAYING]: { label: "재생중", bg: "", text: "text-white" },
    [WaveStatus.PAUSE]: {
      label: "일시정지",
      bg: "bg-neutral-100",
      text: "text-neutral-800",
    },
  };

  const info = mapping[status];
  // recording, playing 일땐 props로 전달받은 색상 렌더
  const style =
    status === WaveStatus.RECORDING || status === WaveStatus.PLAYING
      ? { backgroundColor: colorHex }
      : undefined;

  return (
    <div
      className={`text-xs px-2 py-1 rounded-full font-semibold ${info.bg} ${info.text}`}
      style={style}
      aria-label={`status-${info.label}`}
    >
      {info.label}
    </div>
  );
}
