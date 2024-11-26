"use client";
import { useRouter } from "next/navigation";
import ButtonCustom from "./ButtonCustom";
import SearchBar from "./SearchBar";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useSearchContext } from "@/contexts/SearchContext";
import { useToasterContext } from "@/contexts/ToasterContext";

const SearchAndLog = ({
  placeholder,
  noBack = false
}: {
  placeholder: string;
  noBack?: boolean;
}) => {
  const router = useRouter();
  const credentialsController = useCredentialsContext();
  const toasterController = useToasterContext();
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
          onClick={() => {
            router.push("/profile");
            credentialsController.emptyAll();
          }}
          text="Account"
          type="primary"
          classNameDiv={"w-fit " + (!noBack && "hidden")}
          classNameInput="w-full"
        />
        <ButtonCustom
          onClick={() => {
            toasterController.confirmationToast.createConfirmation({
              message: "Melanjutkan proses Logout?",
              onYes: credentialsController.logoutAction
            });
          }}
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