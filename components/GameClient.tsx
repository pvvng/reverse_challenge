"use client";

import { useEffect, useState } from "react";
import { TurnCard } from "./TurnCard";
import { UserData } from "@/lib/types";
import { updateTurn } from "@/lib/actions/updateTurn";
import { toast } from "sonner";

interface GameClientProps {
  id: string;
  users: UserData[];
  startAt: Date;
  initialCurrentTurn: number;
}

export function GameClient({
  id,
  users,
  startAt,
  initialCurrentTurn,
}: GameClientProps) {
  const [currentTurn, setCurrentTurn] = useState(initialCurrentTurn);
  const isLast = currentTurn === users.length - 1;

  const goNextTurn = async () => {
    try {
      const newTurn = await updateTurn(id);
      setCurrentTurn(newTurn);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("알 수 없는 에러 발생");
      }
    }
  };

  const endGame = async () => {};

  const goToNextStep = async () => {
    if (isLast) {
      return endGame();
    }
    return goNextTurn();
  };

  return (
    <TurnCard
      key={id}
      currentTurn={currentTurn}
      headCount={users.length}
      {...users[currentTurn]}
      isLast={isLast}
      goToNextStep={goToNextStep}
    />
  );
}
