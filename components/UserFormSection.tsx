import { UserData } from "@/lib/hooks/useUsers";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserInput } from "./UserInput";

interface UserFormSectionProps {
  users: UserData[];
  addUser: () => void;
  handleChange: (id: string, name: string) => void;
  removeUser: (id: string) => void;
}

export function UserFormSection({
  users,
  addUser,
  handleChange,
  removeUser,
}: UserFormSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-medium">참가자 목록</h2>
        {users.length < 4 && (
          <button
            onClick={addUser}
            className="inline-block px-2 py-1 rounded-2xl border border-neutral-200 shadow hover:bg-neutral-100 transition text-sm"
          >
            + 사용자 추가
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">
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
      </div>
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
