import { GameExitButton } from "@/components/GameExitButton";
import { UsersTabs } from "@/components/UsersTab";
import { getGameSession } from "@/lib/gameSession";
import { formatPlayTime } from "@/lib/utils/time";
import { notFound } from "next/navigation";

interface IParams {
  params: Promise<{ id: string }>;
}

export default async function GameEnd({ params }: IParams) {
  const gameId = (await params).id;
  const gameSession = await getGameSession();
  const users = gameSession.users ?? [];
  const startAt = gameSession.startAt ?? new Date();
  const endAt = gameSession.endAt ?? new Date();

  // 게임 아이디 확인 실패
  if (!gameId || !gameSession.id) return notFound();

  // unauthroized
  if (gameId !== gameSession.id) return notFound();

  // 게이머 확인 실패
  if (!users || users.length <= 0) return notFound();

  const playTime = formatPlayTime(
    new Date(endAt).getTime() - new Date(startAt).getTime()
  );

  return (
    <>
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold">게임 종료!</h1>
          <p className="text-sm text-gray-600">플레이타임: {playTime}</p>
        </div>
        <GameExitButton gameId={gameId} goTo="/" />
      </header>
      <UsersTabs users={users} gameId={gameId} />
    </>
  );
}
