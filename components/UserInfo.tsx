interface UserInfoProps {
  name: string;
  nameTag?: string;
  currentTurn: number;
  headCount: number;
}

export function UserInfo({
  name,
  nameTag,
  currentTurn,
  headCount,
}: UserInfoProps) {
  return (
    <div>
      <h3 className="line-clamp-1 text-2xl">
        <span className="font-semibold">{name || "이름 없음"}</span>
        {nameTag}
      </h3>
      <p className="text-xs text-neutral-500">
        {currentTurn + 1} / {headCount} 번째 플레이어
      </p>
    </div>
  );
}
