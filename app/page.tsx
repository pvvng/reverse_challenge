"use client";

import { TurnCard } from "@/components/TurnCard";
import useUsers from "@/lib/hooks/useUsers";
import { useState } from "react";
import { GameSetting } from "@/components/GameSetting";
import { UserFormSection } from "@/components/UserFormSection";

export default function Home() {
  const { users, handleChange, addUser, removeUser, initUsers } = useUsers();
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isGamePlaying, setIsGamePlaying] = useState(false);

  const startGame = () => setIsGamePlaying(true);
  const endGame = () => {
    setIsGamePlaying(false);
    initUsers();
    setCurrentTurn(0);
  };
  const goToNextTurn = () =>
    setCurrentTurn((prev) => Math.min(users.length - 1, prev + 1));

  return (
    <main className="max-w-screen-md p-8 space-y-8 mx-auto font-paperlogy">
      <GameSetting startGame={startGame}>
        <UserFormSection
          users={users}
          addUser={addUser}
          handleChange={handleChange}
          removeUser={removeUser}
        />
      </GameSetting>
    </main>
  );
}
