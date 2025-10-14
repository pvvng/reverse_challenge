"use server";

import { getGameSession } from "../gameSession";

export async function updateTurn(gameId: string) {
  const gameSession = await getGameSession();

  if (!gameId || !gameSession.id) {
    throw new Error("게임 ID가 유효하지 않습니다.");
  }

  if (gameId !== gameSession.id) {
    throw new Error("게임 참여 권한이 없습니다.");
  }

  const curTurn = gameSession.curTurn ?? 0;
  gameSession.curTurn = curTurn + 1;

  await gameSession.save();

  return gameSession.curTurn;
}
