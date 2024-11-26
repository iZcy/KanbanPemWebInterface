import { enumVisibility } from "@/helper/typesEnums";
import { MouseEventHandler } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

interface CardItemProps {
  title: string;
  description?: string;
  visibility?: enumVisibility;
  onClick: MouseEventHandler<HTMLDivElement>;
  createdAt?: string;
  dueDate?: string;
  cardType: "board" | "list" | "card";
  width?: string;
}

const CardItem = ({
  title,
  description,
  visibility,
  onClick,
  createdAt = "",
  cardType,
  dueDate = "",
  width = "w-[29.5vw]"
}: CardItemProps) => {
  const visibilityLabel =
    visibility === "public"
      ? "PBLC"
      : visibility === "private"
      ? "PRVT"
      : "RSTR";

  return (
    <div
      onClick={onClick}
      className={twMerge(
        "rounded-[.5vw] text-vw-xs text-darkGray px-[1.4vw] py-[.6vw] border-darkGray border-[.2vw]",
        "outline-none",
        "flex items-center gap-[1.5vw] justify-between",
        width,
        "group cursor-pointer",
        "hover:bg-darkGray duration-300"
      )}
    >
      <div className="flex flex-col duration-300 group-hover:text-offWhite">
        <p className="font-primary font-bold text-vw-md">{title}</p>
        {cardType !== "list" && (
          <p className="font-secondary text-vw-xs text-justify">
            {description}
          </p>
        )}

        <div className="flex justify-start gap-[.5vw] font-bold">
          {["list", "card"].includes(cardType) && (
            <p className="font-secondary text-vw-xs text-justify">
              {createdAt + " "}
            </p>
          )}
          {["list", "card"].includes(cardType) && (
            <p className="font-secondary text-vw-xs">{" until"}</p>
          )}
          {["list", "card"].includes(cardType) && (
            <p className="font-secondary text-vw-xs text-start">{dueDate}</p>
          )}
        </div>
      </div>
      {cardType === "board" && (
        <div
          className={twMerge(
            "flex flex-col p-[1vw] bg-darkGray rounded-[.6vw]",
            "group-hover:bg-offWhite duration-300"
          )}
        >
          {visibilityLabel.split("").map((letter, index) => (
            <p
              key={index}
              className={twMerge(
                "text-center my-[-.3vw] text-offWhite group-hover:text-darkGray duration-300 font-bold"
              )}
            >
              {letter}
            </p>
          ))}
        </div>
      )}
      {cardType === "list" && (
        <BsArrowRightCircleFill className="text-vw-lg group-hover:text-offWhite duration-300 cursor-pointer" />
      )}
    </div>
  );
};

export default CardItem;
