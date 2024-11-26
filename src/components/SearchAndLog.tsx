//udah bisa mau update dikit
"use client";
import { useRouter } from "next/navigation";
import ButtonCustom from "./ButtonCustom";
import SearchBar from "./SearchBar";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useSearchContext } from "@/contexts/SearchContext";

const SearchAndLog = ({
  placeholder,
  noBack = false
}: {
  placeholder: string;
  noBack?: boolean;
}) => {
  const router = useRouter();
  const credentialsController = useCredentialsContext();
  const searchController = useSearchContext();

  return (
    <>
      <div className="flex items-center justify-center gap-[1vw]">
        <SearchBar
          placeholder={placeholder}
          value={searchController.search}
          onChange={(e) => {
            e.preventDefault();
            searchController.setSearch(e.target.value);
          }}
          classNameDiv="w-full"
          classNameInput="w-full"
        />
        <ButtonCustom
          onClick={() => {
            router.back();
            credentialsController.emptyAll();
          }}
          text="Back"
          type="primary"
          classNameDiv={"w-fit " + (noBack && "hidden")}
          classNameInput="w-full"
        />
        <ButtonCustom
          onClick={credentialsController.logoutAction}
          text="Logout"
          type="secondary"
          classNameDiv="w-fit"
          classNameInput="w-full"
        />
      </div>
    </>
  );
};

export default SearchAndLog;

