import { twMerge } from "tailwind-merge";

interface InputProps {
  title?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameInput?: string;
  classNameDiv?: string;
  type?: "text" | "password";
  disabled?: boolean;
}

const InputCustom = ({
  title = "",
  value,
  placeholder = "Please input value...",
  onChange,
  classNameInput = "",
  classNameDiv = "",
  type = "text",
  disabled = false
}: InputProps) => {
  return (
    <div className={twMerge(classNameDiv)}>
      {title && (
        <p className="font-secondary font-bold text-darkGray">{title}</p>
      )}
      <input
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={twMerge(
          "rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw]",
          "outline-none",
          classNameInput
        )}
        type={type}
      />
    </div>
  );
};

export default InputCustom;
