"use client";

import ButtonCustom from "@/components/ButtonCustom";
import CardItem from "@/components/CardItem";
import SearchBar from "@/components/SearchBar";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle, HiTrash } from "react-icons/hi";

const KanbanPage = () => {
  const router = useRouter();

  const { list } = useParams();
  const credentialsController = useCredentialsContext();

  const cardsFetchRef = useRef(credentialsController.cardsFetch);
  useEffect(() => {
    cardsFetchRef.current({
      listId: list as string,
    });
  }, [list]);

  const [search, setSearch] = useState("");
  const [titleEditMode, setTitleEditMode] = useState(false); // Tambahkan state untuk mode edit nama
  const [presentTitle, setPresentTitle] = useState(
    credentialsController.lookingList?.title
  ); // Simpan nama list yang sedang diedit

  const [editingListId, setEditingListId] = useState<string | null>(null); // ID list yang sedang diedit
  const [listTitles, setListTitles] = useState<{ [key: string]: string }>({}); // State lokal untuk judul list

  const progressList = ["to-do", "in-progress", "done"];

  const selectedList = credentialsController.lookingList;
  const selectedBoard = credentialsController.lookingBoard;

  // Inisialisasi nama list saat data dimuat
  useEffect(() => {
    if (credentialsController.listsData) {
      const initialTitles = credentialsController.listsData.reduce(
        (acc: any, list: any) => {
          acc[list._id] = list.title;
          return acc;
        },
        {}
      );
      setListTitles(initialTitles);
    }
  }, [credentialsController.listsData]);

  // Fungsi untuk memperbarui nama list
  const handleListUpdate = (listId: string) => {
    setEditingListId(null); // Keluar dari mode edit
    const newTitle = listTitles[listId];
    const currentList = credentialsController.listsData.find(
      (list: any) => list._id === listId
    );

    if (currentList && newTitle !== currentList.title) {
      credentialsController.listsUpdate({
        listId: listId,
        data: {
          _id: listId,
          title: newTitle || "",
          position: currentList.position,
          boardId: currentList.boardId || selectedBoard?._id || "",
          createdAt: currentList.createdAt || "",
        },
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-[.5vw]">
      <div className="flex text-darkGray items-center">
        <div className="flex items-center gap-[.5vw] grow">
          {titleEditMode ? (
            <input
              type="text"
              value={presentTitle}
              onChange={(e) => {
                e.preventDefault();
                setPresentTitle(e.target.value);
              }}
              onBlur={handleListUpdate} // Simpan nama saat input kehilangan fokus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleListUpdate(); // Simpan nama saat Enter ditekan
                }
              }}
              className="font-primary font-bold text-vw-md"
            />
          ) : (
            <p
              className="font-primary font-bold text-vw-md cursor-pointer"
              onClick={() => setTitleEditMode(true)} // Masuk ke mode edit saat diklik
            >
              {selectedBoard?.title + " / " + selectedList?.title}
            </p>
          )}
          <HiTrash
            className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
            onClick={() =>
              credentialsController.listsDelete({
                listId: list as string,
              })
            }
          />
          <HiPlusCircle
            className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
            onClick={() =>
              credentialsController.cardsCreate({
                listId: list as string,
              })
            }
          />
        </div>
        <div className="flex items-center gap-[.5vw] font-secondary">
          <p className="font-secondary text-vw-md">
            Hello,
            <span className="font-bold">
              {" " + credentialsController.accData?.username + "!"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-[1vw]">
        <SearchBar
          placeholder="Search list..."
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
          classNameDiv="w-full"
          classNameInput="w-full"
        />
        <ButtonCustom
          onClick={() => {
            router.back();
            credentialsController.emptyAll();
          }}
          text="Back"
          type="primary"
          classNameDiv="w-fit"
          classNameInput="w-full"
        />
        <ButtonCustom
          onClick={credentialsController.logoutAction}
          text="Logout"
          type="secondary"
          classNameDiv="w-fit"
          classNameInput="w-full"
        />
      </div>
      <div className="w-full h-[70vh] flex gap-[1vw]">
        {progressList.map((prog, idx) => (
          <div
            key={idx}
            className="w-4/12 h-full flex-col flex gap-[1vw] mt-[2.5vw] rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] grow overflow-hidden"
          >
            <div className="flex flex-col items-center">
              <p className="font-secondary font-bold text-vw-md text-darkGray text-center">
                {prog
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join("-")}
              </p>
              <div className="bg-darkGray w-full h-[.3vw]" />
            </div>
            <div className="flex flex-col gap-[1vw] overflow-y-scroll">
              {credentialsController.listsData
                .filter((list: any) => list.status === prog)
                .map((list: any) => (
                  <div key={list._id} className="list-item">
                    {editingListId === list._id ? (
                      <input
                        type="text"
                        value={listTitles[list._id] || ""}
                        onChange={(e) =>
                          setListTitles({
                            ...listTitles,
                            [list._id]: e.target.value,
                          })
                        }
                        onBlur={() => handleListUpdate(list._id)} // Simpan saat input kehilangan fokus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleListUpdate(list._id); // Simpan saat tekan Enter
                          }
                        }}
                        className="font-primary font-bold text-vw-md"
                        autoFocus
                      />
                    ) : (
                      <p
                        className="font-primary font-bold text-vw-md cursor-pointer"
                        onClick={() => setEditingListId(list._id)} // Masuk ke mode edit saat diklik
                      >
                        {list.title}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanPage;
