import { useState } from "react";
import InputCustom from "@/components/InputCustom";
import ButtonCustom from "@/components/ButtonCustom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string, visibility: "private" | "public") => void;
}

const CreateBoardModal = ({ isOpen, onClose, onSave }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center">
      {/* Modal Content */}
      <div className="bg-[#FFFFFF] p-6 rounded-lg w-1/3 border-2 border-darkGray shadow-lg">
        {/* Centered Header */}
        <h2 className="text-2xl font-bold text-darkGray mb-6 text-center">
          Create New Board
        </h2>
        {/* Inputs */}
        <div className="mb-4">
          <label className="font-secondary font-bold text-darkGray mb-1 block">
            Board Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw] outline-none w-full"
            placeholder="Please input value..."
          />
        </div>
        <div className="mb-4">
          <label className="font-secondary font-bold text-darkGray mb-1 block">
            Board Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw] outline-none w-full resize-none"
            placeholder="Please input value..."
          />
        </div>
        <div className="mb-4">
          <label className="font-secondary font-bold text-darkGray mb-1 block">
            Visibility
          </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as "private" | "public")}
            className="rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw] outline-none w-full"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <ButtonCustom text="Cancel" onClick={onClose} type="secondary" />
          <ButtonCustom
            text="Save"
            onClick={() => onSave(title, description, visibility)}
            type="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBoardModal;
