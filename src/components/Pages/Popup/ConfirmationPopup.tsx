"use client";

import ButtonCustom from "@/components/ButtonCustom";
import { useToasterContext } from "@/contexts/ToasterContext";
import { twMerge } from "tailwind-merge";

const Popup = () => {
  const toasterController = useToasterContext();

  return (
    <div
      className={
        "w-screen h-screen flex items-center justify-center absolute top-0 left-0 z-[100] bg-lightGray " +
        (!toasterController?.confirmationToast.active && "hidden")
      }
    >
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
            {toasterController?.confirmationToast.message}
          </p>
        </div>
        <div className="flex gap-[.5vw]">
          <ButtonCustom
            text="Ya"
            onClick={toasterController?.confirmationToast.onYes}
            classNameDiv="mt-[1vw] grow"
            classNameInput="w-full"
            type="secondary"
          />
          <ButtonCustom
            text="Tidak"
            onClick={toasterController?.confirmationToast.onNo}
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
