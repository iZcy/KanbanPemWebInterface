import React, { useState } from "react";
import ButtonCustom from "@/components/ButtonCustom";

interface CreateListModalProps {
  isOpen: boolean; // Kontrol visibilitas modal
  onClose: () => void; // Fungsi untuk menutup modal
  onSave: (listData: { title: string; position: number; createdAt: string }) => void; // Fungsi untuk menyimpan data list
}

const CreateListModal: React.FC<CreateListModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState<string>(""); // State untuk title list
  const [position, setPosition] = useState<number>(0); // State untuk posisi list
  const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().split("T")[0]); // Default ke tanggal hari ini

  const handleSave = () => {
    // Validasi input
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }
    if (position < 0) {
      alert("Position must be a positive number!");
      return;
    }

    // Panggil fungsi `onSave` dengan data list
    onSave({
      title,
      position,
      createdAt,
    });

    // Reset state setelah berhasil menyimpan
    setTitle("");
    setPosition(0);
    setCreatedAt(new Date().toISOString().split("T")[0]);
    onClose(); // Tutup modal
  };

  if (!isOpen) return null; // Jangan render jika modal tidak terbuka

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-lg font-bold mb-4">Create New List</h2>

        {/* Input Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            List Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Input Position */}
        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            id="position"
            type="number" // Mendukung input angka
            placeholder="Enter position"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Input Created At */}
        <div className="mb-4">
          <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
            Created At
          </label>
          <input
            id="createdAt"
            type="date" // Mendukung input tanggal
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)} // Update nilai tanggal
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <ButtonCustom
            onClick={onClose} // Tutup modal
            text="Cancel"
            type="secondary"
            classNameDiv="w-fit"
            classNameInput="px-4 py-2"
          />
          <ButtonCustom
            onClick={handleSave} // Simpan data list
            text="Save"
            type="primary"
            classNameDiv="w-fit"
            classNameInput="px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;
