import { twMerge } from "tailwind-merge";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameInput?: string;
  classNameDiv?: string;
}

const SearchBar = ({
  value,
  placeholder = "Please input value...",
  onChange,
  classNameInput = "",
  classNameDiv = ""
}: SearchBarProps) => {
  return (
    <div className={twMerge(classNameDiv, "hover:opacity-50 duration-300")}>
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={twMerge(
          classNameInput,
          "rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-darkGray border-[.2vw]",
          "outline-none"
        )}
        type={"text"}
      />
    </div>
  );
};

export default SearchBar;
