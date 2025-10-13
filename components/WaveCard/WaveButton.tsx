"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 버튼 컴포넌트 분리
interface WaveButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: IconDefinition;
  label: string;
  colorClass: string;
}

export function WaveButton({
  isActive,
  onClick,
  icon,
  label,
  colorClass,
}: WaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded-lg text-sm font-medium shadow transition ${
        isActive ? "text-white" : "text-black"
      }`}
      style={{
        backgroundColor: isActive ? colorClass : "transparent",
        borderColor: isActive ? colorClass : "transparent",
      }}
      aria-pressed={isActive}
    >
      <FontAwesomeIcon icon={icon} className={isActive ? "opacity-90" : ""} />
      <span>{label}</span>
    </button>
  );
}
