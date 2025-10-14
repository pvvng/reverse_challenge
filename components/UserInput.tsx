import { CardColor } from "@/lib/types";
import { UserIcon } from "./UserIcon";

interface UserInputPropt {
  id: string;
  color: CardColor;
  name: string;
  handleChange: (id: string, name: string) => void;
  removeUser: (id: string) => void;
}

export function UserInput({
  id,
  color,
  name,
  handleChange,
  removeUser,
}: UserInputPropt) {
  return (
    <div className="flex items-center gap-3 py-2 hover:bg-white transition rounded-2xl">
      <UserIcon color={color} name={name} />

      <div className="relative flex-1">
        <input
          value={name}
          onChange={(e) => handleChange(id, e.target.value)}
          placeholder="이름 입력"
          className="w-full bg-transparent border-b border-neutral-400 pb-1 text-sm
    transition-all focus:outline-none focus:py-1
    peer"
          minLength={1}
          maxLength={20}
        />
        <div
          className="absolute left-0 top-full mt-1 text-xs text-gray-400
    transition-all duration-300 ease-in-out
    peer-focus:opacity-0 peer-focus:-translate-y-1 peer-focus:scale-95"
        >
          색상: {color}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <button
          type="button"
          onClick={() => removeUser(id)}
          className="text-xs text-red-600 hover:underline"
          aria-label={`Remove ${id}`}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
