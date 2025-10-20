"use client";

import { useState } from "react";
import GuideModal from "./Modal/GuideModal";

export function OpenGuideModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <div>
      {isOpen && <GuideModal onClose={toggleModal} />}
      <button
        className="text-blue-500 hover:text-blue-600 transition text-sm"
        onClick={toggleModal}
      >
        가이드
      </button>
    </div>
  );
}
