// "use client";

// import ButtonCustom from "@/components/ButtonCustom";
// import CardItem from "@/components/CardItem";
// import SearchBar from "@/components/SearchBar";
// import CreateBoardModal from "@/components/CreateBoardModal";
// import { useCredentialsContext } from "@/contexts/CredentialsContext";
// import { enumVisibility } from "@/helper/typesEnums";
// import { useRouter } from "next/navigation";

// import { useEffect, useRef, useState } from "react";
// import { HiPlusCircle } from "react-icons/hi";

// const BoardPage = () => {
//   const router = useRouter();
//   const credentialsController = useCredentialsContext();

//   const [search, setSearch] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const boardFetchRef = useRef(credentialsController.boardFetch);

//   useEffect(() => {
//     boardFetchRef.current();
//   }, []);

//   const handleCreateBoard = async (title: string, description: string, visibility: "private" | "public") => {
//     await credentialsController.boardCreate({ title, description, visibility });
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="w-full h-full flex flex-col gap-[.5vw]">
//       <div className="flex text-darkGray items-center">
//         <div className="flex items-center gap-[.5vw] grow">
//           <p className="font-primary font-bold text-vw-md">Select Board</p>
//           <HiPlusCircle
//             className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           />
//         </div>
//         <div className="flex items-center gap-[.5vw] font-secondary">
//           <p className="font-secondary text-vw-md">
//             Halo,
//             <span className="font-bold">
//               {" " + (credentialsController.accData?.username || "Guest") + "!"}
//             </span>
//           </p>
//         </div>
//       </div>
//       <div className="flex items-center justify-center gap-[1vw]">
//         <SearchBar
//           placeholder="Search board..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           classNameDiv="w-full"
//           classNameInput="w-full"
//         />
//       </div>
//       <div className="w-full flex-wrap flex gap-[1vw] mt-[2.5vw]">
//         {credentialsController.boardData.map((board, index) => (
//           <CardItem
//             key={index}
//             title={board.title}
//             description={board.description}
//             visibility={board.visibility as enumVisibility}
//             onClick={() => {
//               credentialsController.setLookingBoard(board);
//               router.push("/" + board._id);
//             }}
//             cardType="board"
//           />
//         ))}
//       </div>
//       <CreateBoardModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleCreateBoard}
//       />
//     </div>
//   );
// };

// export default BoardPage;

"use client";

import ButtonCustom from "@/components/ButtonCustom";
import CardItem from "@/components/CardItem";
import SearchBar from "@/components/SearchBar";
import CreateBoardModal from "@/components/CreateBoardModal";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { enumVisibility } from "@/helper/typesEnums";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";

const BoardPage = () => {
  const router = useRouter();
  const credentialsController = useCredentialsContext();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boardFetchRef = useRef(credentialsController.boardFetch);

  useEffect(() => {
    boardFetchRef.current();
  }, []);

  const handleCreateBoard = async (title: string, description: string, visibility: "private" | "public") => {
    await credentialsController.boardCreate({ title, description, visibility });
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full">
      {/* Wrapper for content, apply blur when modal is open */}
      <div className={`transition-filter duration-300 ${isModalOpen ? "blur-md" : ""}`}>
        <div className="w-full h-full flex flex-col gap-[.5vw]">
          <div className="flex text-darkGray items-center">
            <div className="flex items-center gap-[.5vw] grow">
              <p className="font-primary font-bold text-vw-md">Select Board</p>
              <HiPlusCircle
                className="text-vw-lg hover:opacity-50 duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            <div className="flex items-center gap-[.5vw] font-secondary">
              <p className="font-secondary text-vw-md">
                Halo,
                <span className="font-bold">
                  {" " + (credentialsController.accData?.username || "Guest") + "!"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[1vw]">
            <SearchBar
              placeholder="Search board..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              classNameDiv="w-full"
              classNameInput="w-full"
            />
          </div>
          <div className="w-full flex-wrap flex gap-[1vw] mt-[2.5vw]">
            {credentialsController.boardData.map((board, index) => (
              <CardItem
                key={index}
                title={board.title}
                description={board.description}
                visibility={board.visibility as enumVisibility}
                onClick={() => {
                  credentialsController.setLookingBoard(board);
                  router.push("/" + board._id);
                }}
                cardType="board"
              />
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateBoard}
      />
    </div>
  );
};

export default BoardPage;
