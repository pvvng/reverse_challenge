"use server";

import { getGameSession } from "../gameSession";
import { UserData } from "../types";
import { redirect } from "next/navigation";
import { getRandomId } from "../utils/random";

export async function setUsers(users: UserData[]) {
  const gameSession = await getGameSession();
  const gameId = getRandomId();

  // 이전 게임 정보는 파괴
  if (gameSession.id) {
    gameSession.destroy();
  }

  gameSession.id = gameId;
  gameSession.users = users;
  gameSession.startAt = new Date();
  gameSession.curTurn = 0;

  await gameSession.save();

  return redirect(`/g/${gameId}`);
}
