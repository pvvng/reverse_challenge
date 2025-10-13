"use client";

import { WaveStatus } from "@/lib/hooks/useWave";
import {
  faMicrophone,
  faMicrophoneSlash,
  faPlay,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { StatusBadge } from "./StatusBadge";
import { WaveButton } from "./WaveButton";

interface WaveControllerProps {
  status: WaveStatus;
  reversedUrl: string | null;
  onRecord: () => void;
  onPlayPause: () => void;
  colorHex: string;
}

export function WaveController({
  status,
  reversedUrl,
  onRecord,
  onPlayPause,
  colorHex,
}: WaveControllerProps) {
  const isRecording = status === WaveStatus.RECORDING;
  const isPlaying = status === WaveStatus.PLAYING;
  const showRecord = !reversedUrl;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <StatusBadge status={status} colorHex={colorHex} />
      </div>
      <div className="flex items-center gap-2">
        {showRecord ? (
          <WaveButton
            isActive={isRecording}
            onClick={onRecord}
            icon={isRecording ? faMicrophoneSlash : faMicrophone}
            label={isRecording ? "녹음 종료" : "녹음 시작"}
            colorHex={colorHex}
          />
        ) : (
          <WaveButton
            isActive={isPlaying}
            onClick={onPlayPause}
            icon={isPlaying ? faStop : faPlay}
            label={isPlaying ? "정지" : "재생"}
            colorHex={colorHex}
          />
        )}
      </div>
    </div>
  );
}
