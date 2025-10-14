"use server";

import { getGameSession } from "../gameSession";

export async function destroySession() {
  const gameSession = await getGameSession();
  gameSession.destroy();
}
