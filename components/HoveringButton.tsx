"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes } from "react";

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
  ...rest
}: HoveringButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className="px-3 py-1.5 rounded-2xl bg-black text-white flex gap-1 items-center font-semibold text-sm 
      disabled:bg-[#999999] disabled:cursor-not-allowed group"
      {...rest}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`duration-1000 ${
          disabled ? "" : "group-hover:animate-bounce"
        }`}
      />
      <span>{label}</span>
    </button>
  );
}
