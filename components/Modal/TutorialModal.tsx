"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Portal from "./Portal";
import Overlay from "./Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faRecordVinyl,
  faBackward,
  faHeadphones,
  faArrowRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface ShareDeokDamModalProps {
  onClose: () => void;
}

// 각 단계 정보 배열
const STEP_LIST: {
  icon: IconDefinition;
  title: string;
  label: string;
  color: string;
}[] = [
  {
    icon: faRecordVinyl,
    title: "원본 녹음",
    label: "참가자는 자신의 원본 음성을 녹음합니다.",
    color: "bg-blue-500",
  },
  {
    icon: faBackward,
    title: "역재생 청취",
    label: "녹음된 원본을 역재생으로 듣고 기억합니다.",
    color: "bg-green-500",
  },
  {
    icon: faHeadphones,
    title: "리버스 챌린지 녹음",
    label: "기억한 역재생본을 듣고, 리버스 챌린지를 녹음합니다.",
    color: "bg-orange-500",
  },
  {
    icon: faArrowRight,
    title: "다음 차례로 넘기기",
    label: "녹음이 끝나면 다음 참가자가 플레이를 이어갑니다.",
    color: "bg-purple-500",
  },
];

export default function GuideModal({ onClose }: ShareDeokDamModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: "power3.out", duration: 0.45 }
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
          className="relative shrink-0 w-full rounded-2xl max-w-120 font-paperlogy overflow-hidden bg-white border border-neutral-100 shadow-lg p-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">플레이 가이드</h2>
            <button
              onClick={onClose}
              className="text-sm p-1 rounded transition hover:bg-neutral-200"
              aria-label="튜토리얼 닫기"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>

          {/* Steps */}
          <ul className="space-y-3 text-sm text-neutral-700">
            {STEP_LIST.map((step, idx) => (
              <StepList
                key={idx}
                idx={idx + 1}
                icon={step.icon}
                title={step.title}
                label={step.label}
                colorClass={step.color}
              />
            ))}
          </ul>
        </div>
      </Overlay>
    </Portal>
  );
}

function StepList({
  icon,
  idx,
  title,
  label,
  colorClass,
}: {
  icon: IconDefinition;
  idx: number;
  title: string;
  label: string;
  colorClass: string;
}) {
  return (
    <li className="flex gap-2 items-start">
      <span
        className={`size-5 text-white rounded-full flex items-center justify-center shrink-0 ${colorClass}`}
      >
        <FontAwesomeIcon icon={icon} />
      </span>
      <div>
        <p className="font-semibold">
          {idx}. {title}
        </p>
        <p>{label}</p>
      </div>
    </li>
  );
}
