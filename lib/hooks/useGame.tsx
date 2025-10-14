"use client";

import { useState } from "react";
import { updateTurn } from "../actions/updateTurn";
import { toast } from "sonner";
import { updateEndAt } from "../actions/updateEndAt";
import { useRouter } from "next/navigation";

export default function useGame({
  id,
  initialCurrentTurn,
  headCount,
}: {
  id: string;
  initialCurrentTurn: number;
  headCount: number;
}) {
  const router = useRouter();
  const [currentTurn, setCurrentTurn] = useState(initialCurrentTurn);

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

  const endGame = async () => {
    try {
      await updateEndAt(id);
      return router.push("/");
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
