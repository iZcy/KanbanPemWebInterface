"use client";

import apiRoute from "@/api/routes";
import ButtonCustom from "@/components/ButtonCustom";
import InputCustom from "@/components/InputCustom";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState} from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
// import { CardData } from "@/contexts/CredentialsContext";

const CardPage = () => {
  const router = useRouter();

  const { card } = useParams();

  const [comment, setComment] = useState("");

  const credentialsController = useCredentialsContext();

  const commentFetchRef = useRef(credentialsController.commentsFetch);
  useEffect(() => {
    commentFetchRef.current({
      cardId: card as string
    });
  }, [card]);

  const selectedBoard = credentialsController.lookingBoard;
  const selectedList = credentialsController.lookingList;
  const selectedCard = credentialsController.lookingCard;
  const valCreated = selectedCard?.createdAt;
  const valDue = selectedCard?.dueDate;

  const [isEditing, setIsEditing] = useState(false); 
  const [newTitle, setNewTitle] = useState(selectedCard?.title || "");

  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [presentDescription, setPresentDescription] = useState(selectedCard?.description);
  const [contributors, setContributors] = useState<string[]>([]);

  const [isEditingDeadline, setIsEditingDeadline] = useState(false);
  const [newDueDate, setNewDueDate] = useState(valDue?.split("T")[0] || "");
    
    // const handleDateChange = (e) => {
    //   setNewDueDate(e.target.value);
    // };

  const [username, setUsername] = useState(""); 

  // const handleAddUser = async () => {
  //   try {
  //     axios.post(apiRoute.cards.addCollab + card, {
  //       userId: username
  //     }, {
  //       withCredentials: true
  //     }).then(() => {
  //       console.log("Success");
  //     }).catch(() => {
  //       console.log("Failed");
  //     });

  //     setContributors(prev => {
  //       return [...prev, username]; // Tambah contributor baru ke daftar
  //     });

  //     setUsername("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        `${apiRoute.cards.addCollab}${card}`, // Endpoint API
        { userId: username }, // Data body
        { withCredentials: true } // Opsi credentials
      );
  
      // Log respons untuk memastikan `username` diterima
      console.log("API Response:", response.data);
  
      // Ambil username dari respons
      const addedUsername = response.data.username;
  
      // Tambahkan username ke state contributors
      setContributors((prev) => {
        const updatedContributors = [...prev, addedUsername];
        console.log("Updated contributors:", updatedContributors);
        return updatedContributors;
      });
      
  
      // Reset input field
      setUsername('');
      console.log('Contributor added:', addedUsername);
    } catch (err) {
      console.error('Error adding contributor:', err);
    }
  };
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const res = await fetch("/api/users");
        // const data = await res.json();
        // setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

  useEffect(() => { if (selectedCard) { 
    setPresentDescription(selectedCard.description);
  } 
  }, [selectedCard]);

  const handleTitleUpdate = () => {
    setIsEditing(false);
    selectedCard!.title = newTitle;
    credentialsController.cardsUpdate({
      cardId: selectedCard!._id,
      data: selectedCard!
    });
  };
  

  const handleDescriptionUpdate = () => {
    setDescriptionEditMode(false);
    if (selectedCard) {
      selectedCard.description = presentDescription!;
      console.log("Updating card:", selectedCard);
      
      try {
        credentialsController.cardsUpdate({
          cardId: selectedCard._id,
          data: selectedCard
        });
        console.log("Update successful");
      } catch (error) {
        console.error("Update failed:", error);
      }
    } else {
      console.error("Selected card is null or undefined");
    }
  };

  const handleDeadlineUpdate = () => {
    setIsEditingDeadline(false);
    selectedCard!.dueDate = newDueDate;  // Update the selected card's dueDate
    credentialsController.cardsUpdate({
      cardId: selectedCard!._id,
      data: selectedCard!,
    });
  };
  
  return (
    <div className="w-full h-full flex flex-col gap-[.5vw] ">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="flex items-center gap-[.5vw] grow text-darkGray">
          {isEditing ? (
            <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleTitleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTitleUpdate();
              }
            }}
            className="font-primary font-bold text-vw-md"
          />
              // <InputCustom
              //   value={newTitle}
              //   onChange={(e) => setNewTitle(e.target.value)}
              //   onKeyDown={(e) => {
              //     if (e.key === "Enter") {
              //       handleTitleUpdate();
              //     }
              //   }}
              //   classNameDiv="w-full"
              //   classNameInput="w-full border-darkGray"
              // />
            ) : (
            <p className="font-primary font-bold text-vw-md" onClick={() => setIsEditing(true)}>
              {selectedCard?.title}
            </p>
            )}  
          </div>
          <div className="flex gap-[.5vw]">
            <ButtonCustom
              onClick={() => {}}
              text="Status"
              type="secondary"
              classNameDiv="w-fit"
              classNameInput="w-full"
            />
            <ButtonCustom
              onClick={() => {
                router.back();
              }}
              text="Back"
              type="primary"
              classNameDiv="w-fit"
              classNameInput="w-full"
            />
          </div>
        </div>
        <p className="font-secondary text-vw-xs text-darkGray">
          {selectedBoard?.title + " / " + selectedList?.title}
        </p>
      </div>
      <div className="w-full h-full flex-col flex gap-[1vw] ">
        <div className="w-full h-full flex gap-[1vw]">
          <div className="w-6/12 h-full flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] grow">
            <p className="font-secondary text-vw-sm font-bold text-darkGray w-full">
              Description
            </p>
            {descriptionEditMode ? (
              <textarea
                value={presentDescription}
                onChange={(e) => setPresentDescription(e.target.value)}
                onBlur={handleDescriptionUpdate}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { 
                    e.preventDefault(); 
                  }
                }}
                rows={20}
                className="font-secondary text-vw-xs text-darkGray font-bold w-full resize-none">
                {presentDescription}
              </textarea>
            ) : (
              <p
                className="font-secondary text-vw-xs text-darkGray w-full text-justify"
                onClick={() => setDescriptionEditMode(true)}
              >
                {selectedCard?.description}
              </p>
            )}
          </div>
          <div className="w-6/12 h-full overflow-hidden flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] gap-[1vw] grow">
            <p className="font-secondary text-vw-sm font-bold text-darkGray w-full text-right">
              Comments
            </p>
            <div className="flex flex-col gap-[.5vw] h-[50vh] overflow-y-scroll">
              {credentialsController.commentsData.map((comment, idx) => {
                const isTheUser =
                  comment?.userId?._id === credentialsController.accData?._id;
                return (
                  <div
                    key={idx}
                    className={
                      "w-10/12 h-fit flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] " +
                      (isTheUser ? "self-end bg-[#9faec7]" : "self-start")
                    }
                  >
                    <div className="w-full flex justify-end items-center text-vw-sm -mb-5 gap-2">
{/* {isTheUser && <AiFillEdit className="text-darkGray justify-end items-end text-right" />} */}
                      {/* Edit Button */}
                      {/* <div className="">
                        <AiFillEdit 
                          className="text-darkGray justify-end items-end text-right"
                          onClick={() => {}} />
                      </div> */}

                      {/* Delete Button */}
                      {/* <div>
                        <AiFillDelete 
                          className="text-darkGray justify-end items-end text-right"
                          onClick={() => {}}/>
                      </div> */}

                      {/* ChatGPT */}
                      {/* {isTheUser && ( */}
                      {isTheUser && (
                        <>
                          {/* Edit Button */}
                          <div className="cursor-pointer">
                            <AiFillEdit
                              className="text-darkGray cursor-pointer"
                              onClick={() => {
                                const updatedContent = prompt(
                                  "Edit your comment:",
                                  comment.content
                                );
                                if (updatedContent !== null && updatedContent.trim()) {
                                  credentialsController.commentsUpdate({
                                    commentId: comment._id,
                                    data: {
                                      ...comment,
                                      content: updatedContent
                                    }
                                  });
                                }
                              }}
                              />
                          </div>
                          
                          {/* Delete Button */}
                          <div className="cursor-pointer">
                            <AiFillDelete
                              className="text-darkGray cursor-pointer"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this comment?")) {
                                  credentialsController.commentsDelete({
                                    commentId: comment._id,
                                    cardId: card as string
                                  });
                                }
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <p className="font-secondary text-vw-sm font-bold text-darkGray w-11/12">
                      {/* {comment.userId + " "} */}
                      {typeof comment?.userId === "object" && comment?.userId != null
                        ? comment?.userId?.username
                        : "Anonymous" }{" "}
                      <span className="italic font-normal">
                        {comment.isEdited && " (edited)"}
                      </span>
                    </p>
                    <p className="font-secondary text-vw-xs/tight text-darkGray w-full text-justify">
                      {comment.content}
                    </p>
                  </div>
                );
              })}
              {/* <div className="w-10/12 h-fit flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] self-end">
                <div className="flex items-center justify-end w-full gap-[.5vw]">
                  <AiFillEdit className="text-darkGray" />
                  <p className="font-secondary text-vw-sm font-bold text-darkGray">
                    Benaya
                  </p>
                </div>
                <p className="font-secondary text-vw-xs/tight text-darkGray w-full text-justify rtl">
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet.
                </p>
              </div> */}
            </div>
            <div className="w-full h-fit flex items-center rounded-[.6vw] gap-[1vw] align-bottom">
              <InputCustom
                placeholder="Type your comment here..."
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setComment(e.target.value);
                }}
                classNameDiv="w-full"
                classNameInput="w-full border-darkGray"
              />
              <ButtonCustom
                onClick={() => {
                  // Check if the comment is empty or not
                  if (!comment.trim()) {
                    alert("Comment can't be empty!");
                    return;
                  }
                  
                  // Use the commentsCreate function
                  credentialsController.commentsCreate({
                    cardId: card as string,
                    content: comment
                  });
                  
                  setComment("");
                }}
                text="Send"
                type="primary"
                classNameDiv="w-fit"
                classNameInput="w-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex items-center p-[1vw] rounded-[.6vw] border-darkGray border-[.2vw] gap-[1vw]">
  <p className="font-secondary text-vw-sm font-bold text-darkGray">
    Contributors
  </p>
  <div className="w-full flex flex-wrap text-darkGray text-vw-xs gap-[.5vw]">
    {/* Render contributors here */}
    {contributors.length > 0 ? (
    contributors.map((contributor, idx) => (
      <span key={idx} className="flex items-center gap-[.5vw]">
        {contributor}
      </span>
    ))
  ) : (
    <span>No contributors added yet.</span> // Menampilkan pesan jika tidak ada contributor
  )}
  </div>
  <div className="flex gap-[.5vw]">
    <InputCustom
      type="text"
      placeholder="Add contributor..."
      value={username}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
      }}
  classNameDiv="w-fit"
  classNameInput="w-[200px] border-darkGray h-[50px] text-[16px]"
/>
    <ButtonCustom
      onClick={handleAddUser}
      text="Add"
      type="primary"
      classNameDiv="w-fit"
      classNameInput="w-full"
    />
  </div>
    </div>
        <div className="w-fit h-fit flex gap-[1vw]">
          <p className="font-secondary text-vw-xs text-darkGray">
            created at:{" "}
            <span className="font-bold">{valCreated?.split("T")[0]}</span>
          </p>
          <p className="font-secondary text-vw-xs text-darkGray">
          deadline:{" "}
          {isEditingDeadline ? (
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              onBlur={handleDeadlineUpdate}
              className="font-bold"
            />
          ) : (
            <span
              className="font-bold"
              onClick={() => setIsEditingDeadline(true)} // Set to edit mode
            >
              {valDue?.split("T")[0]}
            </span>
          )}
            {/* deadline: <span className="font-bold">{valDue?.split("T")[0]}</span> */}
          </p>
        </div>
      </div>
    </div>
  );
};


export default CardPage;
