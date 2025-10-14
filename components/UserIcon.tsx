import { COLOR_MAP } from "@/lib/contant";
import { CardColor } from "@/lib/types";

export function UserIcon({ color, name }: { color: CardColor; name: string }) {
  return (
    <div
      className="size-10 rounded-full shrink-0 flex justify-center items-center"
      style={{ background: COLOR_MAP[color] }}
    >
      <span className="font-semibold text-white">{name[0]}</span>
    </div>
  );
}
