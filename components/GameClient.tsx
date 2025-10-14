"use client";

import { TurnCard } from "./TurnCard";
import { UserData } from "@/lib/types";
import useGame from "@/lib/hooks/useGame";

interface GameClientProps {
  id: string;
  users: UserData[];
  startAt: Date;
  initialCurrentTurn: number;
}

export function GameClient({ id, users, initialCurrentTurn }: GameClientProps) {
  const { currentTurn, goToNextStep } = useGame({
    id,
    initialCurrentTurn,
    headCount: users.length,
  });

  return (
    <TurnCard
      key={`${id}-${currentTurn}`}
      currentTurn={currentTurn}
      headCount={users.length}
      {...users[currentTurn]}
      isLast={currentTurn === users.length - 1}
      goToNextStep={goToNextStep}
    />
  );
}
