"use client";

import { useState } from "react";
import { updateTurn } from "../actions/updateTurn";
import { toast } from "sonner";
import { updateEndAt } from "../actions/updateEndAt";
import { useRouter } from "next/navigation";

interface UseGameProps {
  gameId: string;
  initialCurrentTurn: number;
  headCount: number;
}

export default function useGame({
  gameId,
  initialCurrentTurn,
  headCount,
}: UseGameProps) {
  const router = useRouter();
  const [currentTurn, setCurrentTurn] = useState(initialCurrentTurn);

  const goNextTurn = async () => {
    try {
      const newTurn = await updateTurn(gameId);
      setCurrentTurn(newTurn);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("알 수 없는 에러 발생");
      }
    }
  };

  const endGame = async () => {
    try {
      await updateEndAt(gameId);
      return router.push(`/g/${gameId}/end`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("알 수 없는 에러 발생");
      }
    }
  };

  const goToNextStep = async () => {
    if (currentTurn === headCount - 1) {
      return endGame();
    }
    return goNextTurn();
  };

  return { currentTurn, goToNextStep };
}
