import { EndCard } from "@/components/EndCard";
import { getGameSession } from "@/lib/gameSession";
import { notFound } from "next/navigation";

interface IParams {
  params: Promise<{ id: string }>;
}

export default async function GameEnd({ params }: IParams) {
  return notFound();

  // const gameId = (await params).id;
  // const gameSession = await getGameSession();
  // const users = gameSession.users;
  // const startAt = gameSession.startAt ?? new Date();
  // const endAt = gameSession.endAt ?? new Date();

  // // 게임 아이디 확인 실패
  // if (!gameId || !gameSession.id) {
  //   return notFound();
  // }

  // // unauthroized
  // if (gameId !== gameSession.id) {
  //   return notFound();
  // }

  // // 게이머 확인 실패
  // if (!users || users.length <= 0) {
  //   return notFound();
  // }

  // return users.map((user, idx) => (
  //   <EndCard key={user.id} userTurn={idx} headCount={users.length} {...user} />
  // ));
}
