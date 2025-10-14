"use server";

import { getGameSession } from "../gameSession";

export async function updateEndAt(gameId: string) {
  const gameSession = await getGameSession();

  if (!gameId || !gameSession.id) {
    throw new Error("게임 ID가 유효하지 않습니다.");
  }

  if (gameId !== gameSession.id) {
    throw new Error("게임 참여 권한이 없습니다.");
  }

  // 현재 시각으로 종료 시점 업데이트
  const now = new Date();
  gameSession.endAt = now;

  await gameSession.save();

  return gameSession.endAt;
}
