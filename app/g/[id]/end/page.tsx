import { DeleteAudioCacheButton } from "@/components/DeleteAudioCacheButton";
import { EndCard } from "@/components/EndCard";
import { HoveringButton } from "@/components/HoveringButton";
import { UsersTabs } from "@/components/UsersTab";
import { deleteAllForGame } from "@/lib/cacheAudio";
import { getGameSession } from "@/lib/gameSession";
import { formatPlayTime } from "@/lib/utils/time";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";

interface IParams {
  params: Promise<{ id: string }>;
}

export default async function GameEnd({ params }: IParams) {
  const gameId = (await params).id;
  const gameSession = await getGameSession();
  const users = gameSession.users;
  const startAt = gameSession.startAt ?? new Date();
  const endAt = gameSession.endAt ?? new Date();

  // 게임 아이디 확인 실패
  if (!gameId || !gameSession.id) {
    return notFound();
  }

  // unauthroized
  if (gameId !== gameSession.id) {
    return notFound();
  }

  // 게이머 확인 실패
  if (!users || users.length <= 0) {
    return notFound();
  }

  return (
    <main className="max-w-screen-lg p-8 space-y-8 mx-auto font-paperlogy">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold">게임 종료!</h1>
          <p className="text-sm text-gray-600">
            플레이타임:{" "}
            {formatPlayTime(
              new Date(endAt).getTime() - new Date(startAt).getTime()
            )}
          </p>
        </div>
        <DeleteAudioCacheButton gameId={gameId} />
      </header>
      <UsersTabs users={users} gameId={gameId} />
    </main>
  );
}
