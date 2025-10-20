import AnimatedTitle from "@/components/AnimatedTitle";
import { OpenGuideModalButton } from "@/components/OpenGuideModalButton";
import { UserFormSection } from "@/components/UserFormSection";

export default function Home() {
  return (
    <div>
      <main className="mx-auto space-y-10">
        {/* 헤더 */}
        <header className="space-y-2 text-center">
          <AnimatedTitle />
          <p className="text-sm md:text-base text-neutral-500">
            참가자 정보를 입력하고 게임을 시작해보세요.
          </p>
          <OpenGuideModalButton />
        </header>

        {/* 실제 폼 섹션 */}
        <UserFormSection />
      </main>
    </div>
  );
}
