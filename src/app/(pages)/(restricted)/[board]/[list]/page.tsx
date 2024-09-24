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
      listId: list as string
    });
  }, [list]);

  const [search, setSearch] = useState("");

  const progressList = ["to-do", "in-progress", "done"];

  const selectedList = credentialsController.lookingList;
  const selectedBoard = credentialsController.lookingBoard;

  return (
    <div className="w-full h-full flex flex-col gap-[.5vw]">
      <div className="flex text-darkGray items-center">
        <div className="flex items-center gap-[.5vw] grow">
          <p className="font-primary font-bold text-vw-md">
            {selectedBoard?.title + " / " + selectedList?.title}
          </p>
          <HiTrash
            className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
            onClick={() =>
              credentialsController.cardsCreate({
                listId: list as string
              })
            }
          />
          <HiPlusCircle
            className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
            onClick={() =>
              credentialsController.cardsCreate({
                listId: list as string
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
              {credentialsController.cardsData
                .filter((card) => card.status === prog)
                .map((crd, index) => {
                  const valCreate = new Date(crd.createdAt);
                  const valDue = new Date(crd.dueDate);

                  return (
                    <CardItem
                      key={index}
                      title={crd.title}
                      onClick={() => {
                        // set current card
                        credentialsController.setLookingCard(crd);
                        // take current link and add card id
                        const currentLink = window.location.href;
                        // add with card id
                        router.push(`${currentLink}/${crd._id}`);
                      }}
                      createdAt={`${valCreate.getDate()}/${valCreate.getMonth()}/${valCreate.getFullYear()}`}
                      // createdBy="Benaya Imanuela"
                      dueDate={`${valDue.getDate()}/${valDue.getMonth()}/${valDue.getFullYear()}`}
                      description={crd.description}
                      cardType="card"
                      width="grow"
                    />
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanPage;
