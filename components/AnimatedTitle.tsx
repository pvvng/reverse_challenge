"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedTitle() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const letters = el.textContent?.split("") || [];
    el.textContent = "";

    letters.forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter; // 공백 유지
      span.style.display = "inline-block";
      span.style.opacity = "0";
      el.appendChild(span);
    });

    const spans = el.querySelectorAll("span");

    gsap.fromTo(
      spans,
      { y: 30, rotateX: -90, opacity: 0 },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: { each: 0.05, from: "end" }, // 오른쪽 글자부터 등장
        ease: "back.out(1.7)",
      }
    );
  }, []);

  return (
    <h1
      ref={titleRef}
      className="text-3xl md:text-4xl font-semibold tracking-tight whitespace-pre"
    >
      리버스 챌린지
    </h1>
  );
}
