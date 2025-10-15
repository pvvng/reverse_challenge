"use client";

import { useState } from "react";
import { GameResultWaves } from "@/components/GameResultWaves";
import { UserData } from "@/lib/types";
import { TabButton } from "./TabButton";

interface UsersTabsProps {
  users: UserData[];
  gameId: string;
}

export function UsersTabs({ users, gameId }: UsersTabsProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!users || users.length === 0) return <p>데이터가 존재하지 않습니다.</p>;

  const selectedUser = users[selectedIdx];

  const changeIndex = (idx: number) =>
    setSelectedIdx(Math.min(users.length - 1, Math.max(0, idx)));

  return (
    <section className="space-y-8">
      {/* 탭 네비게이션 */}
      <nav className="flex gap-2 overflow-x-auto">
        {users.map((user, idx) => (
          <TabButton
            key={user.id}
            {...user}
            idx={idx}
            isActive={idx === selectedIdx}
            changeIndex={changeIndex}
          />
        ))}
      </nav>

      <GameResultWaves
        key={selectedUser.id}
        gameId={gameId}
        {...selectedUser}
      />
    </section>
  );
}
