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
  // original, reversed 각각 끝났는지 상태
  const [originalDone, setOriginalDone] = useState(false);
  const [reversedDone, setReversedDone] = useState(false);

  const goNextTurn = async () => {
    try {
      const newTurn = await updateTurn(gameId); // currentTurn 업데이트
      setCurrentTurn(newTurn);
      // 상태 초기화
      setOriginalDone(false);
      setReversedDone(false);
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
      await updateEndAt(gameId); // 게임 종료 시간 업데이트
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

  const completeOriginal = () => setOriginalDone(true);
  const completeReversed = () => setReversedDone(true);

  return {
    currentTurn,
    originalDone,
    reversedDone,
    completeOriginal,
    completeReversed,
    goToNextStep,
  };
}
