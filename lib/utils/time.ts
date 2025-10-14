export function formatPlayTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = "";
  if (hours > 0) result += `${hours}시 `;
  if (minutes > 0) result += `${minutes}분 `;
  result += `${seconds}초`;

  return result.trim();
}
