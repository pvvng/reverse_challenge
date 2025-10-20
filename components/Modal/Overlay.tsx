"use client";

import { useEffect } from "react";

interface OverlayProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Overlay({ children, onClose }: OverlayProps) {
  useEffect(() => {
    // 모달 열리면 스크롤 막기
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // 모달 닫히면 원래대로
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="w-full h-screen fixed inset-0 bg-black/70 flex justify-center items-center z-100 p-5"
    >
      {children}
    </div>
  );
}
