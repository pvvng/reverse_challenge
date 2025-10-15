"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HoveringButtonProps {
  action?: () => void;
  icon: IconDefinition;
  label: string;
  disabled?: boolean;
}

export function HoveringButton({
  action,
  icon,
  label,
  disabled = false,
}: HoveringButtonProps) {
  return (
    <button
      className="px-3 py-1.5 rounded-2xl bg-black text-white flex gap-1 items-center font-semibold text-sm group
      disabled:bg-[#999999]"
      onClick={action}
      disabled={disabled}
    >
      <FontAwesomeIcon
        icon={icon}
        className="group-hover:animate-bounce duration-1000"
      />
      <span>{label}</span>
    </button>
  );
}
