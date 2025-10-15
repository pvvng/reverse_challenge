import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GameLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center p-8 font-paperlogy">
      <div className="text-center space-y-3">
        <FontAwesomeIcon icon={faGamepad} className="animate-spin text-2xl" />
        <p>로딩중...</p>
      </div>
    </div>
  );
}
