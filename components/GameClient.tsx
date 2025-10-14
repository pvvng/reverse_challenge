"use client";

import { useState } from "react";
import { TurnCard } from "./TurnCard";
import { UserData } from "@/lib/types";
import { updateTurn } from "@/lib/actions/updateTurn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { destroySession } from "@/lib/actions/destroySession";
import useGame from "@/lib/hooks/useGame";

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
  const { currentTurn, goToNextStep } = useGame({
    id,
    initialCurrentTurn,
    headCount: users.length,
  });

  return (
    <TurnCard
      key={id}
      currentTurn={currentTurn}
      headCount={users.length}
      {...users[currentTurn]}
      isLast={currentTurn === users.length - 1}
      goToNextStep={goToNextStep}
    />
  );
}
