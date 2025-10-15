import { UserFormSection } from "@/components/UserFormSection";

export default function Home() {
  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold">리버스 챌린지</h1>
        <p className="text-sm text-gray-600">참가자 정보 입력. 최대 4명</p>
      </header>

      <UserFormSection />
    </>
  );
}
