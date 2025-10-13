"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 버튼 컴포넌트 분리
interface WaveButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: IconDefinition;
  label: string;
  colorHex: string;
}

export function WaveButton({
  isActive,
  onClick,
  icon,
  label,
  colorHex,
}: WaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded-lg text-sm font-medium shadow transition ${
        isActive ? ` text-white` : "text-black"
      }`}
      aria-pressed={isActive}
      style={{ background: isActive ? colorHex : "#f5f5f5" }}
    >
      <FontAwesomeIcon icon={icon} className={isActive ? "opacity-90" : ""} />
      <span>{label}</span>
    </button>
  );
}
