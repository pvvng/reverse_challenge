import { CardColor } from "@/lib/types";
import { WaveCard } from "./WaveCard";
import { COLOR_MAP } from "@/lib/contant";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { UserIcon } from "./UserIcon";
import { HoveringButton } from "./HoveringButton";
import { getRandomId } from "@/lib/utils/random";

interface TurnCardProps {
  currentTurn: number;
  headCount: number;
  id: string;
  name: string;
  color: CardColor;
  goToNextTurn: () => void;
}

export function TurnCard({
  currentTurn,
  headCount,
  id,
  name,
  color,
  goToNextTurn,
}: TurnCardProps) {
  return (
    <div className="space-y-10" key={id}>
      <header className="flex gap-3 items-center">
        <UserIcon color={color} name={name} />
        <div className="w-full flex justify-between items-end">
          <Info name={name} currentTurn={currentTurn} headCount={headCount} />
          <HoveringButton
            action={goToNextTurn}
            icon={faArrowRight}
            label="차례 넘기기"
          />
        </div>
      </header>
      <WaveCard id={id} colorHex={COLOR_MAP[color]} />
      <WaveCard id={id} colorHex={COLOR_MAP[color]} type="reversed" />
    </div>
  );
}

function Info({
  name,
  currentTurn,
  headCount,
}: {
  name: string;
  currentTurn: number;
  headCount: number;
}) {
  return (
    <div>
      <h3 className="line-clamp-1 text-2xl">
        <span className="font-semibold">{name || "이름 없음"}</span>의 차례
      </h3>
      <p className="text-xs text-neutral-500">
        {currentTurn + 1} / {headCount} 번째 플레이어
      </p>
    </div>
  );
}
