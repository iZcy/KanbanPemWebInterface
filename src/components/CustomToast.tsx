import React from "react";
import { twMerge } from "tailwind-merge";

type CustomToastTypes = "success" | "error" | "info";

interface CustomToastProps {
  message: string;
  type: CustomToastTypes;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
  const typeStyles = {
    success: {
      background: "border-green",
      text: "text-green"
    },
    error: {
      background: "border-accentOrange",
      text: "text-accentOrange"
    },
    info: {
      background: "border-darkGray",
      text: "text-darkGray"
    }
  };

  const pickedStyle = typeStyles[type];

  return (
    <div
      className={twMerge(
        "flex w-fit bg-offWhite text-center text-vw-sm border-[.2vw] rounded-[.5vw] px-[2vw] py-[.5vw] font-primary font-bold",
        pickedStyle.background,
        pickedStyle.text
      )}
    >
      {message}
    </div>
  );
};

export default CustomToast;
export type { CustomToastProps, CustomToastTypes };
