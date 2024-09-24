"use client";

import ButtonCustom from "@/components/ButtonCustom";
import CardItem from "@/components/CardItem";
import SearchBar from "@/components/SearchBar";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle, HiTrash } from "react-icons/hi";

const ListPage = () => {
  const router = useRouter();

  const { board } = useParams();

  const credentialsController = useCredentialsContext();

  const [search, setSearch] = useState("");

  const listFetchRef = useRef(credentialsController.listsFetch);

  const selectedBoard = credentialsController.lookingBoard;

  useEffect(() => {
    listFetchRef.current({
      boardId: board as string
    });
  }, [board]);

  return (
    <div className="w-full h-full flex flex-col gap-[.5vw]">
      <div className="flex text-darkGray items-center">
        <div className="flex items-center gap-[.5vw] grow">
          <p className="font-primary font-bold text-vw-md">
            {selectedBoard?.title}
          </p>
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
        <p className="font-secondary text-vw-xs text-darkGray font-bold">
          {selectedBoard?.description}
        </p>
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
            credentialsController.emptyAll();
            router.back();
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
      <div className="w-full flex-wrap flex gap-[1vw] mt-[2.5vw]">
        {credentialsController.listsData.map((list, index) => (
          <CardItem
            key={index}
            title={list.title}
            onClick={() => {
              credentialsController.setLookingList(list);
              // add route to list page
              router.push(`${board}/${list._id}`);
            }}
            createdAt={list.createdAt}
            // createdBy={List.createdBy}
            cardType="list"
          />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
