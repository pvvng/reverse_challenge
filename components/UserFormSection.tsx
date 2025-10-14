"use client";

import {
  faGamepad,
  faSpinner,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserInput } from "./UserInput";
import useUsers from "@/lib/hooks/useUsers";
import { setUsers } from "@/lib/actions/setUsers";
import { HoveringButton } from "./HoveringButton";

export function UserFormSection() {
  const { users, handleChange, addUser, removeUser } = useUsers();

  const startGame = async (e: React.FormEvent) => {
    e.preventDefault();
    return await setUsers(users); // 서버 액션 호출
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg flex gap-2 items-center">
          <FontAwesomeIcon icon={faUsers} className="text-neutral-600" />
          <span>참가자 목록</span>
        </h2>
        {users.length < 4 && (
          <button
            onClick={addUser}
            type="button"
            className="inline-block px-2 py-1 rounded-2xl border border-neutral-200 shadow hover:bg-neutral-100 transition text-sm"
          >
            + 사용자 추가
          </button>
        )}
      </div>
      {/* user 입력 폼 */}
      <form className="flex flex-col gap-3" onSubmit={startGame}>
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
        <div className="flex justify-end">
          <HoveringButton icon={faGamepad} label="게임 시작!" />
        </div>
      </form>
    </section>
  );
}

function NoUserDataSpinner() {
  return (
    <div className="w-full h-8 my-2">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin text-xl inline-block"
      />
    </div>
  );
}
