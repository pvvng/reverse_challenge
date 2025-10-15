import { COLOR_MAP } from "@/lib/contant";
import { CardColor } from "@/lib/types";

interface TabButtonProps {
  id: string;
  name: string;
  color: CardColor;
  idx: number;
  isActive: boolean;
  changeIndex: (idx: number) => void;
}

export function TabButton({
  name,
  idx,
  isActive,
  color,
  changeIndex,
}: TabButtonProps) {
  const activeClass = isActive ? "shadow-inner bg-neutral-100" : "bg-white";
  const colorStyle = color ? { backgroundColor: COLOR_MAP[color] } : undefined;

  return (
    <button
      onClick={() => changeIndex(idx)}
      className={`flex items-center gap-3 px-3 py-2 rounded-2xl transition whitespace-nowrap ${activeClass}`}
      aria-pressed={isActive}
    >
      {/* 컬러 스와치 */}
      <span className="size-4 rounded-full" style={colorStyle} aria-hidden />
      {/* 이름 또는 id */}
      <span className="text-sm font-medium">{name || "이름 없음"}</span>
    </button>
  );
}
