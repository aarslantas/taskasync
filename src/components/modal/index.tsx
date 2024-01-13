"use client";

import { Modal } from "react-daisyui";

interface ModalProps {
  headerText: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomModal({
  headerText,
  isOpen,
  onClose,
  children,
}: ModalProps) {
  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <div className="flex justify-between  items-center">
          <h2 className="text-xl font-bold">{headerText}</h2>
          <button onClick={onClose}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
