"use client";

import ButtonCustom from "@/components/ButtonCustom";
import SearchBar from "@/components/SearchBar";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle, HiTrash } from "react-icons/hi";

const KanbanPage = () => {
  const router = useRouter();
  const { list, board } = useParams();
  const credentialsController = useCredentialsContext();

  const cardsFetchRef = useRef(credentialsController.cardsFetch);
  useEffect(() => {
    cardsFetchRef.current({
      listId: list as string
    });
  }, [list]);

  const [search, setSearch] = useState("");
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [presentTitle, setPresentTitle] = useState(credentialsController.lookingBoard?.title);
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [presentDescription, setPresentDescription] = useState(credentialsController.lookingBoard?.description);

  const progressList: string[] = ["to-do", "in-progress", "done"];
  const selectedList = credentialsController.lookingList;
  const selectedBoard = credentialsController.lookingBoard;

  const handleTitleUpdate = () => {
    setTitleEditMode(false);
    const currentData = credentialsController.lookingBoard;
    credentialsController.boardUpdate({
      title: presentTitle || "",
      _id: currentData?._id || "",
      description: currentData?.description || "",
      visibility: currentData?.visibility || "private",
      createdAt: currentData?.createdAt || "",
      userId: currentData?.userId || ""
    });
  };

  const handleDescriptionUpdate = () => {
    setDescriptionEditMode(false);
    const currentData = credentialsController.lookingBoard;
    credentialsController.boardUpdate({
      title: currentData?.title || "",
      _id: currentData?._id || "",
      description: presentDescription || "",
      visibility: currentData?.visibility || "private",
      createdAt: currentData?.createdAt || "",
      userId: currentData?.userId || ""
    });
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
              onBlur={handleTitleUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTitleUpdate();
                }
              }}
              className="font-primary font-bold text-vw-md"
            />
          ) : (
            <p
              className="font-primary font-bold text-vw-md cursor-pointer"
              onClick={() => setTitleEditMode(true)}
            >
              {selectedBoard?.title + " / " + selectedList?.title}
            </p>
          )}
          <HiTrash
            className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
            onClick={() => {
              credentialsController.boardDelete({ boardId: board as string });
            }}
          />
          <HiPlusCircle
            className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
            onClick={() => {
              credentialsController.listsCreate({ boardId: board as string });
            }}
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
      <div className="flex items-center gap-[.5vw] font-secondary">
        {descriptionEditMode ? (
          <input
            type="text"
            value={presentDescription}
            onChange={(e) => {
              e.preventDefault();
              setPresentDescription(e.target.value);
            }}
            onBlur={handleDescriptionUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleDescriptionUpdate();
              }
            }}
            className="font-secondary text-vw-xs text-darkGray font-bold"
          />
        ) : (
          <p
            className="font-secondary text-vw-xs text-darkGray font-bold cursor-pointer"
            onClick={() => setDescriptionEditMode(true)}
          >
            {selectedBoard?.description || "Click to add description"}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-[1vw]">
        <SearchBar
          placeholder="Search list..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
        {progressList.map((prog: string, idx: number) => (
          <div
            key={idx}
            className="w-4/12 h-full flex-col flex gap-[1vw] mt-[2.5vw] rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] grow overflow-hidden"
          >
            {/* Your card items here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanPage;