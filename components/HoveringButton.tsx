import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function HoveringButton({
  action,
  icon,
  label,
}: {
  action?: () => void;
  icon: IconDefinition;
  label: string;
}) {
  return (
    <button
      className="px-3 py-1.5 rounded-2xl bg-black text-white flex gap-1 items-center font-semibold text-sm group"
      onClick={action}
    >
      <FontAwesomeIcon
        icon={icon}
        className="group-hover:animate-bounce duration-1000"
      />
      <span>{label}</span>
    </button>
  );
}
