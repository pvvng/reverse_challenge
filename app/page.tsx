import { UserFormSection } from "@/components/UserFormSection";

export default function Home() {
  return (
    <main className="max-w-screen-md p-8 space-y-8 mx-auto font-paperlogy">
      <header>
        <h1 className="text-2xl font-semibold">리버스 챌린지</h1>
        <p className="text-sm text-gray-600">참가자 정보 입력. 최대 4명</p>
      </header>

      <hr className="border-neutral-200" />
      <UserFormSection />
    </main>
  );
}
