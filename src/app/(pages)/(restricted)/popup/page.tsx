"use client";

import ButtonCustom from "@/components/ButtonCustom";
import InputCustom from "@/components/InputCustom";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Popup = () => {
  const [uname, setUname] = useState("");
  const [password, setPass] = useState("");

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={twMerge(
          "flex flex-col gap-[1vw] rounded-[.5vw] p-[2vw] w-[30vw]",
          "border-[.2vw] border-darkGray"
        )}
      >
        <div className="w-full flex items-center text-center mb-[1vw]">
          <p className="text-primary font-semibold text-darkGray w-full text-vw-lg">
            Apakah Anda yakin?
          </p>
        </div>
        <div className="w-full flex items-center text-center mb-[1vw]">
          <p className="text-primary font-semibold text-darkGray w-full text-vw-xs">
            You are going to do this and then this and then this. Are you really
            sure you want to do this?
          </p>
        </div>
        <div className="flex gap-[.5vw]">
          <ButtonCustom
            text="Ya"
            onClick={() => {}}
            classNameDiv="mt-[1vw] grow"
            classNameInput="w-full"
            type="secondary"
          />
          <ButtonCustom
            text="Tidak"
            onClick={() => {}}
            classNameDiv="mt-[1vw] grow"
            classNameInput="w-full"
            type="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
