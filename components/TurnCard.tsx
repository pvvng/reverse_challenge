"use client";

import { CardColor } from "@/lib/types";
import { WaveCard } from "./WaveCard";
import { COLOR_MAP } from "@/lib/contant";
import {
  faArrowRight,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { UserIcon } from "./UserIcon";
import { HoveringButton } from "./HoveringButton";
import { useState } from "react";

interface TurnCardProps {
  currentTurn: number;
  headCount: number;
  id: string;
  name: string;
  color: CardColor;
  isLast: boolean;
  goToNextStep: () => void;
}

export function TurnCard({
  currentTurn,
  headCount,
  id,
  name,
  color,
  isLast,
  goToNextStep,
}: TurnCardProps) {
  // original, reversed 각각 끝났는지 상태
  const [originalDone, setOriginalDone] = useState(false);
  const [reversedDone, setReversedDone] = useState(false);

  // 모든 녹음이 끝나야 버튼 활성화
  const canProceed = originalDone && reversedDone;

  return (
    <div className="space-y-10" key={id}>
      <header className="flex gap-3 items-center">
        <UserIcon color={color} name={name} />
        <div className="w-full flex justify-between items-end">
          <Info name={name} currentTurn={currentTurn} headCount={headCount} />
          <HoveringButton
            action={goToNextStep}
            icon={isLast ? faRightFromBracket : faArrowRight}
            label={isLast ? "게임 종료" : "차례 넘기기"}
            disabled={!canProceed}
          />
        </div>
      </header>
      <WaveCard
        id={id}
        colorHex={COLOR_MAP[color]}
        onEnd={() => setOriginalDone(true)}
      />
      <WaveCard
        id={id}
        colorHex={COLOR_MAP[color]}
        type="reversed"
        disabled={!originalDone}
        onEnd={() => setReversedDone(true)}
      />
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
