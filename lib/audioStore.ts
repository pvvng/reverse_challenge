// lib/audioStore.ts
import { openDB, IDBPDatabase } from "idb";

type AudioKeys = "original" | "reversed";

let dbPromise: Promise<IDBPDatabase> | null = null;
const DB_PREFIX = "audioDB_"; // + id

async function getDB(id: string) {
  if (!dbPromise) {
    dbPromise = (async () =>
      openDB(`${DB_PREFIX}${id}`, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("audio"))
            db.createObjectStore("audio");
        },
      }))();
  }
  // create separate DB per id — ensure dbPromise resets when switching id
  const db = await dbPromise;
  // If caller wants per-id DB, they should call openDB directly; for simplicity we open per-id below
  return openDB(`${DB_PREFIX}${id}`, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("audio")) db.createObjectStore("audio");
    },
  });
}

// 저장
export async function saveAudio(id: string, key: AudioKeys, blob: Blob) {
  const db = await getDB(id);
  await db.put("audio", blob, key);
  // notify other tabs
  broadcastUpdate(id, key);
}

// 읽기
export async function getAudio(
  id: string,
  key: AudioKeys
): Promise<Blob | undefined> {
  const db = await getDB(id);
  return await db.get("audio", key);
}

// 삭제 (키 하나 또는 전체)
export async function deleteAudioKey(id: string, key: AudioKeys) {
  const db = await getDB(id);
  await db.delete("audio", key);
  broadcastUpdate(id, key);
}
export async function clearAllAudio(id: string) {
  const db = await getDB(id);
  await db.clear("audio");
  broadcastUpdate(id, "original");
  broadcastUpdate(id, "reversed");
}

// 목록(존재 여부 체크)
export async function hasAudio(
  id: string
): Promise<{ original: boolean; reversed: boolean }> {
  const db = await getDB(id);
  const original = !!(await db.get("audio", "original"));
  const reversed = !!(await db.get("audio", "reversed"));
  return { original, reversed };
}

// lib/audioBroadcast.ts
const CHANNEL_NAME = "audio-store-updates";

export function broadcastUpdate(id: string, key: string) {
  try {
    const ch = new BroadcastChannel(CHANNEL_NAME);
    ch.postMessage({ id, key, ts: Date.now() });
    ch.close();
  } catch (e) {
    // 브라우저가 BroadcastChannel 미지원 시 fallback으로 localStorage 이벤트 사용 가능
    try {
      localStorage.setItem(`audio:update:${id}:${key}`, String(Date.now()));
    } catch {}
  }
}

export function subscribeUpdates(
  handler: (msg: { id: string; key: string }) => void
) {
  const ch = new BroadcastChannel(CHANNEL_NAME);
  const listener = (ev: MessageEvent) => handler(ev.data);
  ch.addEventListener("message", listener);
  return () => {
    ch.removeEventListener("message", listener);
    ch.close();
  };
}
