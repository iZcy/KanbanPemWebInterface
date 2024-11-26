import { useState } from "react";
import ButtonCustom from "@/components/ButtonCustom";

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, position: number, createdAt: string) => void;
}

const CreateListModal = ({ isOpen, onClose, onSave }: CreateListModalProps) => {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<string>(
    new Date().toISOString().split("T")[0]
  ); // Default ke tanggal hari ini

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg w-1/3 border-2 border-darkGray shadow-lg">
        {/* Centered Header */}
        <h2 className="text-2xl font-bold text-darkGray mb-6 text-center">
          Create New List
        </h2>
        {/* Inputs */}
        <div className="mb-4">
          <label className="font-secondary font-bold text-darkGray mb-1 block">
            List Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw] outline-none w-full"
            placeholder="Please input title..."
          />
        </div>
        <div className="mb-4">
          <label className="font-secondary font-bold text-darkGray mb-1 block">
            Position
          </label>
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw] outline-none w-full"
            placeholder="Please input position..."
          />
        </div>
        <div className="mb-4">
          <label className="font-secondary font-bold text-darkGray mb-1 block">
            Created At
          </label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw] outline-none w-full"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <ButtonCustom text="Cancel" onClick={onClose} type="secondary" />
          <ButtonCustom
            text="Save"
            onClick={() => {
              if (!title.trim()) {
                alert("Title is required!");
                return;
              }
              if (position < 0) {
                alert("Position must be a positive number!");
                return;
              }
              onSave(title, position, createdAt);
            }}
            type="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;
