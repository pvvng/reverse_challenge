"use client";

import { useEffect, useState } from "react";
import { CardColor } from "../types";
import { getRandomId } from "../utils/random";
import { toast } from "sonner";

export type UserData = {
  id: string;
  color: CardColor;
  name: string;
};

const COLORS: CardColor[] = ["blue", "yellow", "green", "orange"];

const pickAvailableColor = (currentUsers: UserData[]) => {
  const used = new Set(currentUsers.map((u) => u.color));
  const available = COLORS.find((c) => !used.has(c));
  // 사용 가능한 색이 있으면 그걸, 없으면 순환으로 선택
  return available ?? COLORS[currentUsers.length % COLORS.length];
};

export default function useUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  useEffect(() => {
    setUsers([{ id: getRandomId(), color: "blue", name: getRandomId() }]);
  }, []);

  const handleChange = (id: string, newName: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, name: newName } : user))
    );
  };

  const addUser = () => {
    if (users.length >= 4) {
      return toast.error("최대 4명까지 동록할 수 있습니다.");
    }

    setUsers((prev) => [
      ...prev,
      {
        id: getRandomId(),
        color: pickAvailableColor(prev),
        name: getRandomId(),
      },
    ]);
  };

  const removeUser = (id: string) => {
    if (users.length <= 1) {
      return toast.error("게임 플레이를 위해선 최소 1명이 필요합니다.");
    }

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    users,
    handleChange,
    addUser,
    removeUser,
  };
}
