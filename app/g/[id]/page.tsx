import { GameClient } from "@/components/GameClient";
import { getGameSession } from "@/lib/gameSession";

interface IParams {
  params: Promise<{ id: string }>;
}

export default async function Game({ params }: IParams) {
  const gameId = (await params).id;
  const gameSession = await getGameSession();
  const users = gameSession.users;
  const startAt = gameSession.startAt ?? new Date();
  const currentTurn = gameSession.curTurn ?? 0;

  // 게임 아이디 확인 실패
  if (!gameId || !gameSession.id) {
    return;
  }

  // unauthroized
  if (gameId !== gameSession.id) {
    return;
  }

  // 게이머 확인 실패
  if (!users || users.length <= 0) {
    return;
  }

  return (
    <main className="max-w-screen-md p-8 space-y-8 mx-auto font-paperlogy">
      <GameClient
        id={gameId}
        users={users}
        startAt={startAt}
        initialCurrentTurn={currentTurn}
      />
    </main>
  );
}
