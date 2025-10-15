"use client";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { HoveringButton } from "./HoveringButton";
import { deleteAllForGame } from "@/lib/cacheAudio";
import { redirect } from "next/navigation";
import { destroySession } from "@/lib/actions/destroySession";

interface GameExitButtonProps {
  gameId: string;
  goTo?: string;
}

export function GameExitButton({ gameId, goTo = "/" }: GameExitButtonProps) {
  return (
    <HoveringButton
      icon={faHome}
      label="메인 화면으로"
      action={async () => {
        await deleteAllForGame(gameId);
        await destroySession();
        redirect(goTo);
      }}
    />
  );
}
