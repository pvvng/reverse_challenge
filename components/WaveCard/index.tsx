"use client";

import useWave, { WaveStatus } from "@/lib/hooks/useWave";
import { WaveController } from "./WaveController";
import { WaveContainer } from "./WaveContainer";
import { Header } from "./Header";
import { WaveButton } from "./WaveButton";
import {
  faMicrophone,
  faMicrophoneSlash,
  faPlay,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { AudioType } from "@/lib/types";

interface WaveCardProps {
  userId: string;
  gameId: string;
  type?: AudioType;
  colorHex: string;
  disabled?: boolean;
  initialUrl?: string | null;
  onEnd?: () => void;
}

export function WaveCard({
  userId,
  gameId,
  type = "original",
  colorHex,
  disabled = false,
  initialUrl,
  onEnd,
}: WaveCardProps) {
  const {
    containerRef,
    reversedRecordUrl,
    status,
    handleRecord,
    handlePlayPause,
  } = useWave({
    gameId,
    userId,
    color: colorHex,
    type,
    disabled,
    initialUrl,
    onEnd,
  });

  const isRecordEnd = status >= WaveStatus.RECORD_END;
  const isRecording = status === WaveStatus.RECORDING;
  const isPlaying = status === WaveStatus.PLAYING;
  const showRecord = !reversedRecordUrl;

  return (
    <div
      key={`${gameId}:${userId}:${type}`}
      className="relative rounded-2xl p-4 shadow-lg border"
      style={{ borderColor: `${colorHex}33` }}
    >
      {/* disabled overlay */}
      {disabled && (
        <div className="absolute inset-0 bg-neutral-300/80 rounded-2xl pointer-events-none" />
      )}
      {/* 카드 내용 */}
      <div className={`${disabled ? "opacity-60" : ""} pointer-events-auto`}>
        {/* 헤더 */}
        <Header type={type} colorHex={colorHex} />
        {/* 컨트롤러 */}
        <WaveController status={status} colorHex={colorHex}>
          {showRecord ? (
            <WaveButton
              isActive={isRecording}
              onClick={handleRecord}
              icon={isRecording ? faMicrophoneSlash : faMicrophone}
              label={isRecording ? "녹음 종료" : "녹음 시작"}
              colorHex={colorHex}
            />
          ) : (
            <WaveButton
              isActive={isPlaying}
              onClick={handlePlayPause}
              icon={isPlaying ? faStop : faPlay}
              label={isPlaying ? "정지" : "재생"}
              colorHex={colorHex}
            />
          )}
        </WaveController>

        {/* 파형 컨테이너 */}
        <div className="mt-3">
          <WaveContainer
            containerRef={containerRef}
            status={status}
            colorHex={colorHex}
            isRecordEnd={isRecordEnd}
          />
        </div>
      </div>
    </div>
  );
}
