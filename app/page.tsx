"use client";

import { useState } from "react";
import { TurnCard } from "@/components/TurnCard";

type CardColor = "blue" | "yellow" | "green" | "orange";
const COLORS: CardColor[] = ["blue", "yellow", "green", "orange"];

export default function Home() {
  const [headCount, setHeadCount] = useState(1);
  const [names, setNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0); // 현재 차례 인덱스

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const colorsForCards = [...COLORS]
    .sort(() => Math.random() - 0.5)
    .slice(0, headCount);

  const handleNextTurn = () => {
    if (currentTurn < headCount - 1) {
      setCurrentTurn(currentTurn + 1);
    } else {
      alert("모든 플레이어가 완료했습니다!");
      // 필요 시 초기화
      setCurrentTurn(0);
      setSubmitted(false);
    }
  };

  return (
    <main className="max-w-screen-md mx-auto font-paperlogy px-8 py-10 space-y-10">
      {!submitted ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label htmlFor="headcount">인원수: </label>
            <input
              type="number"
              id="headcount"
              min={1}
              max={4}
              value={headCount}
              onChange={(e) => {
                const val = Math.min(4, Math.max(1, Number(e.target.value)));
                setHeadCount(val);
                setNames(Array(val).fill(""));
              }}
              className="border rounded px-2 py-1 w-16"
            />
          </div>

          <div className="space-y-2">
            {Array.from({ length: headCount }).map((_, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Player ${i + 1} 이름`}
                value={names[i] || ""}
                onChange={(e) => handleNameChange(i, e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            ))}
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={names.some((n) => !n.trim())}
          >
            시작
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <TurnCard
            key={currentTurn + names[currentTurn]}
            currentTurn={currentTurn}
            headCount={headCount}
            name={names[currentTurn]}
            color={colorsForCards[currentTurn]}
          />
          <div className="flex justify-end">
            <button
              onClick={handleNextTurn}
              className="max-w-fit px-4 py-2 bg-black text-white rounded-2xl"
            >
              차례 넘기기
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
