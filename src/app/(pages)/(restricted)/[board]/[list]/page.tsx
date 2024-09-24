"use client";

import ButtonCustom from "@/components/ButtonCustom";
import CardItem from "@/components/CardItem";
import SearchBar from "@/components/SearchBar";
import { enumDeadline } from "@/helper/typesEnums";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiPlusCircle, HiTrash } from "react-icons/hi";

const KanbanPage = () => {
  const router = useRouter();

  const uname = "Benaya Imanuela";
  const [search, setSearch] = useState("");

  const progressList = ["to-do", "in-progress", "done"];

  const lists = [
    {
      title: "Card Title",
      createdAt: "2021-10-10",
      createdBy: "Benaya Imanuela",
      dueDate: "2021-11-10",
      description: "Loerm ispum dolor sit amet",
      assignedTo: ["Benaya Imanuela", "Benaya"],
      status: "done" as enumDeadline
    },
    {
      title: "Card Title",
      createdAt: "2021-10-10",
      createdBy: "Benaya Imanuela",
      dueDate: "2021-11-10",
      description: "Loerm ispum dolor sit amet",
      assignedTo: ["Benaya Imanuela", "Benaya"],
      status: "in-progress" as enumDeadline
    },
    {
      title: "Card Title",
      createdAt: "2021-10-10",
      createdBy: "Benaya Imanuela",
      dueDate: "2021-11-10",
      description: "Loerm ispum dolor sit amet",
      assignedTo: ["Benaya Imanuela", "Benaya"],
      status: "to-do" as enumDeadline
    },
    {
      title: "Card Title",
      createdAt: "2021-10-10",
      createdBy: "Benaya Imanuela",
      dueDate: "2021-11-10",
      description: "Loerm ispum dolor sit amet",
      assignedTo: ["Benaya Imanuela", "Benaya"],
      status: "to-do" as enumDeadline
    },
    {
      title: "Card Title",
      createdAt: "2021-10-10",
      createdBy: "Benaya Imanuela",
      dueDate: "2021-11-10",
      description: "Loerm ispum dolor sit amet",
      assignedTo: ["Benaya Imanuela", "Benaya"],
      status: "to-do" as enumDeadline
    },
    {
      title: "Card Title",
      createdAt: "2021-10-10",
      createdBy: "Benaya Imanuela",
      dueDate: "2021-11-10",
      description: "Loerm ispum dolor sit amet",
      assignedTo: ["Benaya Imanuela", "Benaya"],
      status: "to-do" as enumDeadline
    }
  ];

  return (
    <div className="w-full h-full flex flex-col gap-[.5vw]">
      <div className="flex text-darkGray items-center">
        <div className="flex items-center gap-[.5vw] grow">
          <p className="font-primary font-bold text-vw-md">Select List</p>
          <HiTrash className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer" />
          <HiPlusCircle className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer" />
        </div>
        <div className="flex items-center gap-[.5vw] font-secondary">
          <p className="font-secondary text-vw-md">
            Hello,<span className="font-bold">{" " + uname + "!"}</span>
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
          onClick={() => {}}
          text="Back"
          type="primary"
          classNameDiv="w-fit"
          classNameInput="w-full"
        />
        <ButtonCustom
          onClick={() => {}}
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
            className="w-fit h-full flex-col flex gap-[1vw] mt-[2.5vw] rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] grow overflow-hidden"
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
              {lists
                .filter((list) => list.status === prog)
                .map((List, index) => (
                  <CardItem
                    key={index}
                    title={List.title}
                    onClick={() => {
                      console.log("List: ", List.title);
                    }}
                    createdAt={List.createdAt}
                    createdBy="Benaya Imanuela"
                    dueDate={List.dueDate}
                    description={List.description}
                    cardType="card"
                    width="grow"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanPage;
