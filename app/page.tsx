import { WaveCard } from "@/components/WaveCard";

export default function Home() {
  return (
    <main className="max-w-screen-md mx-auto font-paperlogy px-8 py-10 space-y-10">
      <div className="flex gap-5 items-center">
        <div className="aspect-square w-28 rounded-2xl bg-blue-500 shrink-0" />
        <div className="space-y-1">
          <p className="line-clamp-2">옆집 강아지 김동산</p>
          <p className="text-neutral-700 text-xs line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <WaveCard cardColor="blue" />
      <WaveCard cardColor="blue" type="reversed" />
    </main>
  );
}
