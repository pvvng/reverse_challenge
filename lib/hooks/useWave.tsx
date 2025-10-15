"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.js";
import { reverseAudioBlob } from "../utils/audio";
import { toast } from "sonner";
import { cacheAudio } from "../cacheAudio";
import { AudioType } from "../types";

export enum WaveStatus {
  PENDING,
  RECORD_READY,
  RECORDING,
  RECORD_END,
  PLAYING,
  PAUSE,
}

export type IDS = { gameId: string; userId: string };
export type Options = {
  type?: AudioType;
  colorHex?: string;
  disabled?: boolean;
  initialUrl?: string | null;
};
export type Callback = {
  onStart?: () => void;
  onEnd?: () => void;
};

export interface WaveProps {
  id: IDS;
  options?: Options;
  callback?: Callback;
}

const createWaveOption = (color: string) => {
  return {
    cursorWidth: 2,
    barRadius: 20,
    barWidth: 6,
    height: 100,
    normalize: false,
    interact: true,
    dragToSeek: true,
    hideScrollbar: true,
    autoPlay: true,
    waveColor: "#dddddd",
    cursorColor: color,
    progressColor: color,
  };
};

export default function useWave({
  id,
  options = {
    type: "original",
    colorHex: "#ffffff",
    initialUrl: null,
    disabled: false,
  },
  callback = {},
}: WaveProps) {
  const { gameId, userId } = id;
  const type = options.type ?? "original";
  const color = options.colorHex ?? "#ffffff";
  const disabled = options.disabled ?? false;
  const initialUrl = options.initialUrl ?? null;

  const containerRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WaveSurfer>(null);
  const recordRef = useRef<RecordPlugin>(null);

  const [recordUrl, setRecordUrl] = useState<string | null>(null);
  const [reversedRecordUrl, setReversedRecordUrl] = useState<string | null>(
    null
  );
  const [status, setStatus] = useState(WaveStatus.PENDING);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!ws.current) {
      ws.current = WaveSurfer.create({
        ...createWaveOption(color),
        container: containerRef.current,
      });
      setStatus(WaveStatus.RECORD_READY);

      ws.current.on("play", () => {
        setStatus(WaveStatus.PLAYING);
      });
      ws.current.on("pause", () => {
        setStatus(WaveStatus.PAUSE);
      });
    }

    // url 초깃값으로 들어오면 로드
    if (initialUrl) {
      // url 로드
      setRecordUrl(initialUrl);
      setReversedRecordUrl(initialUrl);
      ws.current.load(initialUrl);
      ws.current.once("ready", () => {
        try {
          ws.current?.seekTo(0);
        } catch {}
      });
      setStatus(WaveStatus.RECORD_END);
      callback.onEnd?.();
    }

    return () => {
      try {
        ws.current?.destroy();
      } catch {}
      ws.current = null;
    };
  }, [initialUrl, color, callback]);

  // recordUrl 변화 감지, 이전 URL 해제
  useEffect(() => {
    return () => {
      if (recordUrl) URL.revokeObjectURL(recordUrl);
    };
  }, [recordUrl]);

  useEffect(() => {
    return () => {
      if (reversedRecordUrl) URL.revokeObjectURL(reversedRecordUrl);
    };
  }, [reversedRecordUrl]);

  const handleRecordEnd = async (blob: Blob) => {
    if (!ws.current) return;

    setStatus(WaveStatus.PENDING);

    const reversedBlob = await reverseAudioBlob(blob);

    // cache에 오디오 블롭 저장
    try {
      await cacheAudio({
        gameId,
        userId,
        blob: type === "original" ? blob : reversedBlob,
        slot: type,
      });
    } catch (e) {
      console.error(e);
    }

    const url = URL.createObjectURL(blob);
    const reversed = URL.createObjectURL(reversedBlob);
    setRecordUrl(url);
    setReversedRecordUrl(reversed);

    ws.current.empty();
    ws.current.load(reversed);
    // 파형 색상 원복
    ws.current.setOptions({
      ...createWaveOption(color),
      cursorColor: color,
      progressColor: color,
    });
    ws.current.once("ready", () => {
      ws.current?.seekTo(0);
    });

    recordRef.current = null;
    setStatus(WaveStatus.RECORD_END);
    callback.onEnd?.();
  };

  const startRecording = async () => {
    if (!ws.current || !containerRef.current) return;
    if (status === WaveStatus.RECORDING) return;

    callback.onStart?.();

    // 녹음 진행중일때는 파형 흰색으로 고정
    ws.current.setOptions({
      ...createWaveOption("#ffffff"),
    });

    recordRef.current = ws.current.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform: false,
        continuousWaveform: true,
        continuousWaveformDuration: 30,
      })
    );

    recordRef.current.on("record-end", handleRecordEnd);

    await recordRef.current.startRecording();
    setStatus(WaveStatus.RECORDING);
  };

  const stopRecording = () => {
    if (!recordRef.current) return;
    if (status === WaveStatus.PAUSE) return;
    recordRef.current?.stopRecording();
    setStatus(WaveStatus.PENDING);
  };

  const handlePlayPause = () => {
    if (disabled) return toast.error("비활성화 상태입니다.");

    ws.current?.playPause();
  };

  const handleRecord = () => {
    if (disabled) return toast.error("비활성화 상태입니다.");

    if (status === WaveStatus.RECORDING) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return {
    containerRef,
    recordUrl,
    reversedRecordUrl,
    status,
    handleRecord,
    handlePlayPause,
  };
}
