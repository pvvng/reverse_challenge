"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.js";
import { reverseAudioBlob } from "../utils/audio";
import { IDBPDatabase, openDB } from "idb";

export enum WaveStatus {
  PENDING,
  RECORD_READY,
  RECORDING,
  RECORD_END,
  PLAYING,
  PAUSE,
}

interface UseWaveProps {
  id: string;
  color?: string;
}

export default function useWave({ id, color = "white" }: UseWaveProps) {
  const waveOption = {
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
        ...waveOption,
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
  }, []);

  const handleRecordEnd = async (blob: Blob) => {
    if (!ws.current) return;

    setStatus(WaveStatus.PENDING);

    const reversedBlob = await reverseAudioBlob(blob);

    // audio url 저장
    const url = URL.createObjectURL(blob);
    const reversed = URL.createObjectURL(reversedBlob);
    setRecordUrl(url);
    setReversedRecordUrl(reversed);

    ws.current.empty();
    ws.current.load(reversed);
    // 파형 색상 원복
    ws.current.setOptions({
      ...waveOption,
      cursorColor: color,
      progressColor: color,
    });
    ws.current.once("ready", () => {
      ws.current?.seekTo(0);
    });

    recordRef.current = null;
    setStatus(WaveStatus.RECORD_END);
  };

  const startRecording = async () => {
    if (!ws.current || !containerRef.current) return;
    if (status === WaveStatus.RECORDING) return;

    // 녹음 진행중일때는 파형 흰색으로 고정
    ws.current.setOptions({
      ...waveOption,
      cursorColor: "#ffffff",
      progressColor: "#ffffff",
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
    ws.current?.playPause();
  };

  const handleRecord = () => {
    if (status === WaveStatus.RECORDING) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return {
    containerRef,
    reversedRecordUrl,
    status,

    handleRecord,
    handlePlayPause,
  };
}
