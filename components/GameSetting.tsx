import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { HoveringButton } from "./HoveringButton";

interface GameSettingProps {
  startGame: () => void;
  children: React.ReactNode;
}

export function GameSetting({ startGame, children }: GameSettingProps) {
  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold">리버스 챌린지</h1>
        <p className="text-sm text-gray-500">참가자 정보 입력. 최대 4명</p>
      </header>

      <hr className="border-neutral-200" />

      {/* 입력 폼 */}
      {children}

      <div className="flex justify-end">
        <HoveringButton
          action={startGame}
          icon={faGamepad}
          label="게임 시작!"
        />
      </div>
    </>
  );
}
