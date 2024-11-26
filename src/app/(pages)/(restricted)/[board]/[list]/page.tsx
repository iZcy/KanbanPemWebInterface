"use client";

import apiRoute from "@/api/routes";
import CardItem from "@/components/CardItem";
import SearchAndLog from "@/components/SearchAndLog";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useToasterContext } from "@/contexts/ToasterContext";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle, HiTrash } from "react-icons/hi";

const KanbanPage = () => {
  const router = useRouter();
  const params = useParams();
  const { list } = useParams();

  const credentialsController = useCredentialsContext();
  const toasterController = useToasterContext();

  const cardsFetchRef = useRef(credentialsController.cardsFetch);
  useEffect(() => {
    cardsFetchRef.current({
      listId: list as string
    });
  }, [list]);

  const progressList = ["to-do", "in-progress", "done"];

  const [selectedList, setSelectedList] = useState(
    credentialsController.lookingList
  );

  const [selectedBoard, setSelectedBoard] = useState(
    credentialsController.lookingBoard
  );

  useEffect(() => {
    axios
      .get(apiRoute.lists.singleRoute + list, {
        withCredentials: true
      })
      .then((res) => {
        setSelectedList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(apiRoute.board.singleRoute + params.board, {
        withCredentials: true
      })
      .then((res) => {
        setSelectedBoard(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [list, params.board]);

  const [titleListEditMode, setListTitleEditMode] = useState(false);
  const [presentTitle, setPresentTitle] = useState(selectedList?.title);

  const handleListTitleUpdate = () => {
    setListTitleEditMode(false);
    const currentData = credentialsController.lookingList;
    credentialsController.listsUpdate({
      title: presentTitle || "",
      _id: currentData?._id || "",
      position: currentData?.position || 0,
      createdAt: currentData?.createdAt || "",
      boardId: currentData?.boardId || ""
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-[.5vw]">
      <div className="flex text-darkGray items-center">
        <div className="flex items-center gap-[.5vw] grow">
        {titleListEditMode ? (
            <input
              type="text"
              value={presentTitle}
              onChange={(e) => setPresentTitle(e.target.value)}
              onBlur={handleListTitleUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleListTitleUpdate();
                }
              }}
              className="font-primary font-bold text-vw-md"
            />
          ) : (
            <p
            className="font-primary font-bold text-vw-md cursor-pointer"
            onClick={() => setListTitleEditMode(true)}
          >
            {presentTitle}
          </p>
        )}

          <HiTrash
            className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
            onClick={() => {
              toasterController.confirmationToast.createConfirmation({
                message: "Menghapus list " + selectedList?.title,
                onYes: () =>
                  credentialsController.listsDelete({
                    listId: list as string
                  })
              });
            }}
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
      <SearchAndLog placeholder={"Search card..."} />
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
