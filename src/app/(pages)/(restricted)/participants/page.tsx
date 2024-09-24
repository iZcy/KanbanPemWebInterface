"use client";

import ButtonCustom from "@/components/ButtonCustom";
import InputCustom from "@/components/InputCustom";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Participants = () => {
  const participantList = [
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya",
    "Benaya Benaya"
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={twMerge(
          "flex flex-col gap-[1vw] rounded-[.5vw] p-[2vw] w-[30vw]",
          "border-[.2vw] border-darkGray overflow-hidden h-full"
        )}
      >
        <div className="w-full flex items-center text-center mb-[1vw]">
          <p className="text-primary font-semibold text-darkGray w-full text-vw-lg">
            Pilih Participant
          </p>
          <ButtonCustom
            text="Back"
            onClick={() => {}}
            classNameDiv="grow"
            classNameInput="w-full text-start"
            type="primary"
          />
        </div>
        <div className="flex flex-col gap-[.2vw] overflow-y-scroll">
          {participantList.map((part, idx) => (
            <ButtonCustom
              key={idx}
              text={part}
              onClick={() => {}}
              classNameDiv="grow"
              classNameInput="w-full text-start"
              type="secondary"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Participants;
