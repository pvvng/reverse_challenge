export function Header({
  type,
  colorHex,
}: {
  type: "original" | "reversed";
  colorHex: string;
}) {
  return (
    <header className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-1">
        <div
          className="size-3 rounded-full"
          style={{
            backgroundColor: type === "original" ? "#999999" : colorHex,
          }}
        />
        <h4 className="font-semibold text-sm">
          {type === "original" ? "원본 녹음" : "리버스 챌린지"}
        </h4>
      </div>
    </header>
  );
}
