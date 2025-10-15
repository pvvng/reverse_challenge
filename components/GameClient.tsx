"use client";

import { TurnCard } from "./TurnCard";
import { UserData } from "@/lib/types";
import useGame from "@/lib/hooks/useGame";

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
  const { currentTurn, goToNextStep } = useGame({
    gameId,
    initialCurrentTurn,
    headCount: users.length,
  });

  return (
    <TurnCard
      key={`${gameId}-${currentTurn}`}
      gameId={gameId}
      currentTurn={currentTurn}
      headCount={users.length}
      {...users[currentTurn]}
      isLast={currentTurn === users.length - 1}
      goToNextStep={goToNextStep}
    />
  );
}
