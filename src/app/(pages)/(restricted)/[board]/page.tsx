"use client";

import CardItem from "@/components/CardItem";
import SearchAndLog from "@/components/SearchAndLog";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle, HiTrash } from "react-icons/hi";

const ListPage = () => {
  const router = useRouter();
  const { board } = useParams();
  const credentialsController = useCredentialsContext();

  const listFetchRef = useRef(credentialsController.listsFetch);

  const selectedBoard = credentialsController.lookingBoard;

  useEffect(() => {
    listFetchRef.current({
      boardId: board as string
    });
  }, [board]);

  const [titleEditMode, setTitleEditMode] = useState(false);
  const [presentTitle, setPresentTitle] = useState(selectedBoard?.title);

  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [presentDescription, setPresentDescription] = useState(
    selectedBoard?.description
  );

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
    <div className="w-full h-full flex flex-col gap-[.5vw] overflow-clip">
      <div className="flex text-darkGray items-center">
        <div className="flex items-center gap-[.5vw] grow">
          {titleEditMode ? (
            <input
              type="text"
              value={presentTitle}
              onChange={(e) => setPresentTitle(e.target.value)}
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
              {presentTitle}
            </p>
          )}
          <p className="font-primary text-vw-md">{" / Select List"}</p>
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
            onChange={(e) => setPresentDescription(e.target.value)}
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
            {presentDescription || "Click to add description"}
          </p>
        )}
      </div>
      <SearchAndLog placeholder="Search list..." />
      <div className="w-full flex-wrap flex gap-[1vw] mt-[2.5vw] overflow-y-scroll h-full">
        {credentialsController.listsData.map((list, index) => (
          <CardItem
            key={index}
            title={list.title}
            onClick={() => {
              credentialsController.setLookingList(list);
              router.push(`${board}/${list._id}`);
            }}
            createdAt={list.createdAt}
            cardType="list"
          />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
