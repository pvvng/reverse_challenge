import { WaveCard } from "./WaveCard";

export type CardColor = "blue" | "yellow" | "green" | "orange";
const COLOR_MAP: Record<CardColor, string> = {
  blue: "#3B82F6",
  yellow: "#FBBF24",
  green: "#22C55E",
  orange: "#FB923C",
};

export function TurnCard({
  currentTurn,
  headCount,
  name,
  color,
}: {
  currentTurn: number;
  headCount: number;
  name: string;
  color: CardColor;
}) {
  return (
    <div className="space-y-10">
      <div className="flex gap-3 items-center">
        <div
          className="aspect-square w-10 rounded-full shrink-0"
          style={{ background: COLOR_MAP[color] }}
        />
        <div>
          <h3 className="line-clamp-2 font-semibold text-2xl">{name}의 차례</h3>
          <p className="text-sm text-neutral-500">
            {currentTurn + 1} / {headCount} 번째 플레이어
          </p>
        </div>
      </div>
      <WaveCard colorHex={COLOR_MAP[color]} />
      <WaveCard colorHex={COLOR_MAP[color]} type="reversed" />
    </div>
  );
}
