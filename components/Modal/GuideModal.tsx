"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Portal from "./Portal";
import Overlay from "./Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface ShareDeokDamModalProps {
  onClose: () => void;
}

export default function GuideModal({ onClose }: ShareDeokDamModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.45,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Portal>
      <Overlay onClose={onClose}>
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="relative shrink-0 w-full rounded-2xl max-w-120 font-paperlogy overflow-hidden"
        >
          <section className="relative bg-white border border-neutral-100 shadow-sm rounded-2xl p-5">
            <div className="w-full mb-3 flex justify-between items-center">
              <h2 className="text-lg font-semibold">참여 가이드</h2>
              <button
                onClick={onClose}
                type="button"
                aria-label="가이드 닫기"
                title="가이드 닫기"
                className="text-sm p-1 rounded transition hover:bg-neutral-200"
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
            <ul className="space-y-2 text-neutral-600 text-sm">
              <li className="flex gap-2 items-center">
                <span className="inline-block size-2 rounded-full bg-blue-500 shrink-0" />
                <span>
                  참가자를 추가하려면 <strong>+ 버튼</strong>을 눌러 이름을
                  입력하세요.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="inline-block size-2 rounded-full bg-blue-500 shrink-0" />
                <span>
                  모든 참가자 정보를 입력했다면 <strong>“게임 시작!”</strong>{" "}
                  버튼을 눌러 시작하세요.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="inline-block size-2 rounded-full bg-blue-500 shrink-0" />
                <span>
                  최대 4명까지 등록할 수 있으며, 언제든 참가자를 삭제할 수
                  있습니다.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </Overlay>
    </Portal>
  );
}
