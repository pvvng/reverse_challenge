"use client";

import {
  faGamepad,
  faSpinner,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { UserInput } from "./UserInput";
import { HoveringButton } from "./HoveringButton";

import useUsers from "@/lib/hooks/useUsers";
import { setUsers } from "@/lib/actions/setUsers";

export function UserFormSection() {
  const { users, handleChange, addUser, removeUser } = useUsers();

  const startGame = async (e: React.FormEvent) => {
    e.preventDefault();
    return await setUsers(users); // 서버 액션 호출
  };

  return (
    <section className="space-y-5">
      <div className="flex gap-2 items-center justify-between">
        <h2 className="flex gap-2 items-center md:text-lg text-md">
          <FontAwesomeIcon icon={faUsers} className="text-neutral-600" />
          <span>참가자 목록</span>
        </h2>
        <AddUserButton headCount={users.length} addUser={addUser} />
      </div>
      {/* user 입력 폼 */}
      <form className="space-y-5" onSubmit={startGame}>
        {users.length === 0 ? (
          <NoUserDataSpinner />
        ) : (
          users.map((user) => (
            <UserInput
              key={user.id}
              {...user}
              handleChange={handleChange}
              removeUser={removeUser}
            />
          ))
        )}
        {users.length > 0 && (
          <div className="flex justify-end mt-12">
            <HoveringButton icon={faGamepad} label="게임 시작!" type="submit" />
          </div>
        )}
      </form>
    </section>
  );
}

function AddUserButton({
  headCount,
  addUser,
}: {
  headCount: number;
  addUser: () => void;
}) {
  if (headCount >= 4) return null;

  return (
    <button
      onClick={addUser}
      type="button"
      className="inline-block px-2 py-1 rounded-2xl border bg-white border-neutral-200 hover:bg-neutral-100 transition text-xs"
      title="새로운 플레이어 추가"
      aria-label="새로운 플레이어 추가"
    >
      + <FontAwesomeIcon icon={faUser} />
    </button>
  );
}

function NoUserDataSpinner() {
  return (
    <div className="w-full h-8 mt-8">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin text-2xl inline-block"
      />
    </div>
  );
}
