"use client";

import CardItem from "@/components/CardItem";
import CreateBoardModal from "@/components/Pages/Popup/CreateBoardModal";
import {
  useCredentialsContext,
  BoardData
} from "@/contexts/CredentialsContext";
import { enumVisibility } from "@/helper/typesEnums";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import SearchAndLog from "@/components/SearchAndLog";

const BoardPage = () => {
  const router = useRouter();
  const credentialsController = useCredentialsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState<BoardData[]>([]);

  const boardFetchRef = useRef(credentialsController.boardFetch);

  useEffect(() => {
    boardFetchRef.current();
  }, []);

  useEffect(() => {
    setBoards(credentialsController.boardData);
  }, [credentialsController.boardData]);

  const handleCreateBoard = async (
    title: string,
    description: string,
    visibility: "private" | "public"
  ) => {
    const newBoard = await credentialsController.boardCreate({
      title,
      description,
      visibility
    });
    if (newBoard) {
      setBoards((prevBoards) => [...prevBoards, newBoard]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full overflow-clip">
      {/* Wrapper for content, apply blur when modal is open */}
      <div
        className={`transition-filter duration-300 ${
          isModalOpen ? "blur-md" : ""
        } h-full`}
      >
        <div className="w-full h-full flex flex-col gap-[.5vw]">
          <div className="flex text-darkGray items-center">
            <div className="flex items-center gap-[.5vw] grow">
              <p className="font-primary font-bold text-vw-md">Select Board</p>
              <HiPlusCircle
                className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            <div className="flex items-center gap-[.5vw] font-secondary">
              <p className="font-secondary text-vw-md">
                Halo,
                <span className="font-bold">
                  {" " +
                    (credentialsController.accData?.username || "Guest") +
                    "!"}
                </span>
              </p>
            </div>
          </div>
          <SearchAndLog placeholder="Search board..." noBack={true} />
          <div className="w-full h-full flex-wrap flex gap-[1vw] mt-[2.5vw] overflow-y-scroll">
            {boards.map((board, index) => (
              <CardItem
                key={index}
                title={board.title}
                description={board.description}
                visibility={board.visibility as enumVisibility}
                onClick={() => {
                  credentialsController.setLookingBoard(board);
                  router.push("/" + board._id);
                }}
                cardType="board"
              />
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateBoard}
      />
    </div>
  );
};

export default BoardPage;
