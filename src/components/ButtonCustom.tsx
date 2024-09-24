import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  classNameInput?: string;
  classNameDiv?: string;
  type: "primary" | "secondary";
  disabled?: boolean;
}

const ButtonCustom = ({
  text,
  onClick,
  classNameInput = "",
  classNameDiv = "",
  type,
  disabled
}: ButtonProps) => {
  interface ButtonDeco {
    backgroundColor: string;
    textColor: string;
  }

  const buttonDeco: ButtonDeco = {
    backgroundColor: "",
    textColor: ""
  };

  if (type === "primary") {
    buttonDeco.backgroundColor = "bg-darkGray";
    buttonDeco.textColor = "text-offWhite";
  } else if (type === "secondary") {
    buttonDeco.backgroundColor = "bg-lightGray";
    buttonDeco.textColor = "text-darkGray";
  }

  return (
    <div className={twMerge(classNameDiv)}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={twMerge(
          "rounded-[.5vw] text-vw-xs py-[.6vw] px-[1.2vw] font-primary font-bold cursor-pointer",
          buttonDeco.backgroundColor,
          buttonDeco.textColor,
          "hover:opacity-50 duration-300 border-[.2vw] border-darkGray",
          type === "secondary" ? "border-darkGray" : "",
          classNameInput
        )}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonCustom;
