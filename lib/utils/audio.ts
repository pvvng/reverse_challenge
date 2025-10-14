/** Blob을 뒤집어서 새로운 Blob 반환 */
export const reverseAudioBlob = async (blob: Blob): Promise<Blob> => {
  const arrayBuffer = await blob.arrayBuffer();
  const audioCtx = new AudioContext();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  // 채널별 데이터 뒤집기
  const numberOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  const sampleRate = audioBuffer.sampleRate;

  const reversedBuffer = audioCtx.createBuffer(
    numberOfChannels,
    length,
    sampleRate
  );

  for (let channel = 0; channel < numberOfChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    const reversedData = reversedBuffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      reversedData[i] = channelData[length - 1 - i]; // 뒤집기
    }
  }

  // AudioBuffer → WAV Blob
  return audioBufferToWavBlob(reversedBuffer);
};

/** AudioBuffer를 WAV Blob으로 변환 */
export const audioBufferToWavBlob = (buffer: AudioBuffer): Blob => {
  const numOfChan = buffer.numberOfChannels,
    length = buffer.length * numOfChan * 2 + 44,
    bufferArray = new ArrayBuffer(length),
    view = new DataView(bufferArray);

  // WAV 헤더 작성
  let offset = 0;
  function writeString(str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset++, str.charCodeAt(i));
    }
  }

  writeString("RIFF");
  view.setUint32(offset, length - 8, true);
  offset += 4;
  writeString("WAVE");
  writeString("fmt ");
  view.setUint32(offset, 16, true);
  offset += 4;
  view.setUint16(offset, 1, true); // PCM
  offset += 2;
  view.setUint16(offset, numOfChan, true);
  offset += 2;
  view.setUint32(offset, buffer.sampleRate, true);
  offset += 4;
  view.setUint32(offset, buffer.sampleRate * 2 * numOfChan, true);
  offset += 4;
  view.setUint16(offset, numOfChan * 2, true);
  offset += 2;
  view.setUint16(offset, 16, true); // 16bit
  offset += 2;
  writeString("data");
  view.setUint32(offset, length - offset - 4, true);
  offset += 4;

  // PCM 데이터 작성
  const interleaved = interleave(buffer);
  let pos = offset;
  for (let i = 0; i < interleaved.length; i++, pos += 2) {
    let sample = Math.max(-1, Math.min(1, interleaved[i]));
    view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }

  return new Blob([view], { type: "audio/wav" });
};

// AudioBuffer 채널 데이터를 interleave
export const interleave = (buffer: AudioBuffer) => {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length;
  const result = new Float32Array(length * numOfChan);
  let index = 0;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numOfChan; channel++) {
      result[index++] = buffer.getChannelData(channel)[i];
    }
  }
  return result;
};
