"use client";

import ButtonCustom from "@/components/ButtonCustom";
import CardItem from "@/components/CardItem";
import SearchBar from "@/components/SearchBar";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { enumVisibility } from "@/helper/typesEnums";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";

const BoardPage = () => {
  const router = useRouter();

  const credentialsController = useCredentialsContext();

  const [search, setSearch] = useState("");

  const boardFetchRef = useRef(credentialsController.boardFetch);

  useEffect(() => {
    boardFetchRef.current();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-[.5vw]">
      <div className="flex text-darkGray items-center">
        <div className="flex items-center gap-[.5vw] grow">
          <p className="font-primary font-bold text-vw-md">Select Board</p>
          <HiPlusCircle
            className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
            onClick={credentialsController.boardCreate}
          />
        </div>
        <div className="flex items-center gap-[.5vw] font-secondary">
          <p className="font-secondary text-vw-md">
            Halo,
            <span className="font-bold">
              {" " + (credentialsController.accData?.username || "Guest") + "!"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-[1vw]">
        <SearchBar
          placeholder="Search board..."
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
          classNameDiv="w-full"
          classNameInput="w-full"
        />
        <ButtonCustom
          onClick={() => {}}
          text="Terminate"
          type="primary"
          classNameDiv="w-fit"
          classNameInput="w-fit"
        />
        <ButtonCustom
          onClick={credentialsController.logoutAction}
          text="Logout"
          type="secondary"
          classNameDiv="w-fit"
          classNameInput="w-full"
        />
      </div>
      <div className="w-full flex-wrap flex gap-[1vw] mt-[2.5vw]">
        {credentialsController.boardData.map((board, index) => (
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
  );
};

export default BoardPage;
