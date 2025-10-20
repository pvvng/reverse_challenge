import Link from "next/link";

export function Footer() {
  return (
    <div>
      <div className="w-full h-12 bg-transparent opacity-0" />
      <footer
        className="fixed bottom-0 left-0 right-0 h-12 flex justify-center items-center py-4 text-center text-xs 
        text-neutral-400 border-t border-neutral-200 bg-white/30 backdrop-blur z-100"
      >
        ©{" "}
        <Link
          href="https://github.com/pvvng"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-600"
        >
          pvvng
        </Link>
        . All rights reserved.
      </footer>
    </div>
  );
}
