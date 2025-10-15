"use client";

import React, { useState } from "react";
import { EndCard } from "@/components/EndCard";
import { UserData } from "@/lib/types";
import { COLOR_MAP } from "@/lib/contant";

interface UsersTabsProps {
  users: UserData[];
  gameId: string;
}

export function UsersTabs({ users, gameId }: UsersTabsProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!users || users.length === 0) return null;

  const selectedUser = users[selectedIdx];

  return (
    <section className="space-y-4">
      {/* 탭 네비게이션 */}
      <nav className="flex gap-2 overflow-x-auto py-2">
        {users.map((u, idx) => {
          const isActive = idx === selectedIdx;
          const colorStyle = u.color
            ? { backgroundColor: COLOR_MAP[u.color] }
            : undefined;
          return (
            <button
              key={u.id}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-colors whitespace-nowrap
                ${
                  isActive
                    ? "bg-white shadow-md border-neutral-200"
                    : "bg-neutral-50 border-neutral-100 hover:bg-neutral-100"
                }
              `}
              aria-pressed={isActive}
            >
              {/* 컬러 스와치 */}
              <span
                className="size-4 rounded-full"
                style={colorStyle}
                aria-hidden
              />
              {/* 이름 또는 id */}
              <span className="text-sm font-medium">
                {u.name || "이름 없음"}
              </span>
            </button>
          );
        })}
      </nav>

      <EndCard
        key={selectedUser.id}
        gameId={gameId}
        userTurn={selectedIdx}
        headCount={users.length}
        {...selectedUser}
      />
    </section>
  );
}
