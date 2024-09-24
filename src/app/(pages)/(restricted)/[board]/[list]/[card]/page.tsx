"use client";

import ButtonCustom from "@/components/ButtonCustom";
import InputCustom from "@/components/InputCustom";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const CardPage = () => {
  const router = useRouter();

  const { card } = useParams();

  const [comment, setComment] = useState("");

  const credentialsController = useCredentialsContext();

  const commentFetchRef = useRef(credentialsController.commentsFetch);
  useEffect(() => {
    commentFetchRef.current({
      cardId: card as string
    });
  }, [card]);

  const selectedBoard = credentialsController.lookingBoard;
  const selectedList = credentialsController.lookingList;
  const selectedCard = credentialsController.lookingCard;
  const valCreated = selectedCard?.createdAt;
  const valDue = selectedCard?.dueDate;

  return (
    <div className="w-full h-full flex flex-col gap-[.5vw] ">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="flex items-center gap-[.5vw] grow text-darkGray">
            <p className="font-primary font-bold text-vw-md">
              {selectedCard?.title}
            </p>
          </div>
          <div className="flex gap-[.5vw]">
            <ButtonCustom
              onClick={() => {}}
              text="Status"
              type="secondary"
              classNameDiv="w-fit"
              classNameInput="w-full"
            />
            <ButtonCustom
              onClick={() => {
                router.back();
              }}
              text="Back"
              type="primary"
              classNameDiv="w-fit"
              classNameInput="w-full"
            />
          </div>
        </div>
        <p className="font-secondary text-vw-xs text-darkGray">
          {selectedBoard?.title + " / " + selectedList?.title}
        </p>
      </div>
      <div className="w-full h-full flex-col flex gap-[1vw] ">
        <div className="w-full h-full flex gap-[1vw]">
          <div className="w-6/12 h-full flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] grow">
            <p className="font-secondary text-vw-sm font-bold text-darkGray w-full">
              Description
            </p>
            <p className="font-secondary text-vw-xs text-darkGray w-full text-justify">
              {selectedCard?.description}
            </p>
          </div>
          <div className="w-6/12 h-full overflow-hidden flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] gap-[1vw] grow">
            <p className="font-secondary text-vw-sm font-bold text-darkGray w-full text-right">
              Comments
            </p>
            <div className="flex flex-col gap-[.5vw] h-[50vh] overflow-y-scroll">
              {credentialsController.commentsData.map((comment, idx) => {
                const isTheUser =
                  comment.userId === credentialsController.accData?._id;
                return (
                  <div
                    key={idx}
                    className={
                      "w-10/12 h-fit flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] " +
                      (isTheUser ? "self-end" : "self-start")
                    }
                  >
                    {isTheUser && <AiFillEdit className="text-darkGray" />}
                    <p className="font-secondary text-vw-sm font-bold text-darkGray w-full">
                      {comment.userId + " "}
                      <span className="italic font-normal">
                        {comment.isEdited && " (edited)"}
                      </span>
                    </p>
                    <p className="font-secondary text-vw-xs/tight text-darkGray w-full text-justify">
                      {comment.content}
                    </p>
                  </div>
                );
              })}
              {/* <div className="w-10/12 h-fit flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] self-end">
                <div className="flex items-center justify-end w-full gap-[.5vw]">
                  <AiFillEdit className="text-darkGray" />
                  <p className="font-secondary text-vw-sm font-bold text-darkGray">
                    Benaya
                  </p>
                </div>
                <p className="font-secondary text-vw-xs/tight text-darkGray w-full text-justify rtl">
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet.
                </p>
              </div> */}
            </div>
            <div className="w-full h-fit flex items-center rounded-[.6vw] gap-[1vw] align-bottom">
              <InputCustom
                placeholder="Please type here..."
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setComment(e.target.value);
                }}
                classNameDiv="w-full"
                classNameInput="w-full border-darkGray"
              />
              <ButtonCustom
                onClick={() => {}}
                text="Send"
                type="primary"
                classNameDiv="w-fit"
                classNameInput="w-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex items-center p-[1vw] rounded-[.6vw] border-darkGray border-[.2vw] gap-[1vw]">
          <p className="font-secondary text-vw-sm font-bold text-darkGray">
            Contributors
          </p>
          <div className="w-full flex text-darkGray text-vw-xs gap-[.5vw]">
            {selectedCard?.assignedTo.map((cont, idx) => (
              <p key={idx}>
                {cont + (idx + 1 < selectedCard?.assignedTo.length ? "," : "")}
              </p>
            ))}
          </div>
          <ButtonCustom
            onClick={() => {}}
            text="Add"
            type="primary"
            classNameDiv="w-fit"
            classNameInput="w-full"
          />
        </div>
        <div className="w-fit h-fit flex gap-[1vw]">
          <p className="font-secondary text-vw-xs text-darkGray">
            created at:{" "}
            <span className="font-bold">{valCreated?.split("T")[0]}</span>
          </p>
          <p className="font-secondary text-vw-xs text-darkGray">
            deadline: <span className="font-bold">{valDue?.split("T")[0]}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
