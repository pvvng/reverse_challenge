"use client";

import { UserData } from "@/lib/types";
import useGame from "@/lib/hooks/useGame";
import { useMemo } from "react";
import { UserIcon } from "./UserIcon";
import { UserInfo } from "./UserInfo";
import { HoveringButton } from "./HoveringButton";
import {
  faArrowRight,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { WaveCard } from "./WaveCard";
import { COLOR_MAP } from "@/lib/contant";

interface GameClientProps {
  gameId: string;
  users: UserData[];
  startAt: Date;
  initialCurrentTurn: number;
}

export function GameClient({
  gameId,
  users,
  initialCurrentTurn,
}: GameClientProps) {
  const {
    currentTurn,
    originalDone,
    reversedDone,
    completeOriginal,
    completeReversed,
    goToNextStep,
  } = useGame({
    gameId,
    initialCurrentTurn,
    headCount: users.length,
  });

  const {
    id: userId,
    name,
    color,
  } = useMemo(() => users[currentTurn], [users, currentTurn]);
  const isLast = currentTurn === users.length - 1;

  return (
    <div className="space-y-10" key={`${gameId}:${userId}:${currentTurn}`}>
      <header className="flex gap-3 sm:flex-row flex-col sm:justify-center items-end">
        <div className="w-full flex gap-3 items-center">
          <UserIcon color={color} name={name} />
          <UserInfo
            name={name}
            nameTag="의 차례"
            currentTurn={currentTurn}
            headCount={users.length}
          />
        </div>
        <HoveringButton
          action={goToNextStep}
          icon={isLast ? faRightFromBracket : faArrowRight}
          label={isLast ? "게임 종료" : "차례 넘기기"}
          disabled={!(originalDone && reversedDone)}
        />
      </header>
      {/* Wave Card Section */}
      <section className="space-y-5">
        <WaveCard
          userId={userId}
          gameId={gameId}
          colorHex={COLOR_MAP[color]}
          onEnd={completeOriginal}
        />
        <WaveCard
          userId={userId}
          gameId={gameId}
          colorHex={COLOR_MAP[color]}
          type="reversed"
          disabled={!originalDone}
          onEnd={completeReversed}
        />
      </section>
    </div>
  );
}
