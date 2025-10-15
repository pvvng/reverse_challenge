import { AudioType } from "./types";

interface CacheAudioParams {
  gameId: string;
  userId: string;
  blob: Blob;
  slot: AudioType;
}

export async function cacheAudio({
  gameId,
  userId,
  blob,
  slot,
}: CacheAudioParams) {
  const cacheName = "audio-cache";
  const cache = await caches.open(cacheName);

  // URL 같은 키로 식별
  const key = `/audio/${gameId}/${userId}/${slot}`;
  const request = new Request(key);

  const response = new Response(blob, {
    headers: { "Content-Type": blob.type || "audio/webm" },
  });

  await cache.put(request, response);
}

export async function getCachedAudio(
  gameId: string,
  userId: string,
  slot: AudioType
) {
  const cacheName = "audio-cache";
  const cache = await caches.open(cacheName);
  const key = `/audio/${gameId}/${userId}/${slot}`;
  const res = await cache.match(key);
  if (!res) return null;
  return await res.blob(); // Blob 반환
}

export async function deleteCachedAudio(
  gameId: string,
  userId: string,
  slot: AudioType
) {
  const cache = await caches.open("audio-cache");
  const key = `/audio/${gameId}/${userId}/${slot}`;
  await cache.delete(key);
}

export async function deleteAllForGame(gameId: string) {
  const cache = await caches.open("audio-cache");
  const keys = await cache.keys();

  for (const req of keys) {
    if (req.url.includes(`/audio/${gameId}/`)) {
      await cache.delete(req);
    }
  }
}

export async function clearAudioCache() {
  await caches.delete("audio-cache");
}
