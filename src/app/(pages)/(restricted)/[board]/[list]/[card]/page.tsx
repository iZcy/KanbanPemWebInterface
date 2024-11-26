"use client";

import ButtonCustom from "@/components/ButtonCustom";
import InputCustom from "@/components/InputCustom";
import Participants from "@/components/Pages/Popup/Participants";
import {
  ContributorData,
  useCredentialsContext
} from "@/contexts/CredentialsContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const CardPage = () => {
  const router = useRouter();

  const { card } = useParams();
  const [isActive, setIsActive] = useState(false);
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
  const [presentDescription, setPresentDescription] = useState(
    selectedCard?.description
  );
  const [contributors, setContributors] = useState<ContributorData[]>(
    selectedCard?.assignedTo || []
  );

  useEffect(() => {
    console.log(selectedCard?.assignedTo);
  }, [selectedCard]);

  const [isEditingDeadline, setIsEditingDeadline] = useState(false);
  const [newDueDate, setNewDueDate] = useState(valDue?.split("T")[0] || "");

  const [username, setUsername] = useState("");

  const handleAddUser = async () => {
    setIsActive(true);
    // try {
    //   const response = await axios.post(
    //     `${apiRoute.cards.addCollab}${selectedCard?._id}`, // Endpoint API
    //     { userId: username }, // Data body
    //     { withCredentials: true } // Opsi credentials
    //   );

    //   // Log respons untuk memastikan `username` diterima
    //   console.log("API Response:", response.data);

    //   // Ambil username dari respons
    //   const added = response.data.data;

    //   // Tambahkan username ke state contributors
    //   setContributors((prev) => {
    //     const updatedContributors = [...prev, added];
    //     console.log("Updated contributors:", updatedContributors);
    //     return updatedContributors;
    //   });

    //   // Reset input field
    //   setUsername("");
    //   toasterController.callToast({
    //     message: "Add collaborator success!",
    //     type: "success"
    //   });
    // } catch (err) {
    //   // expand error so I can read the response
    //   const error = err as {
    //     response: {
    //       data: {
    //         data: string;
    //       };
    //     };
    //   };

    //   console.error("Error adding contributor:", err);
    //   // Display in toaster
    //   toasterController.callToast({
    //     message: "Error: " + error?.response?.data?.data,
    //     type: "error"
    //   });
    // }
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

  useEffect(() => {
    if (selectedCard) {
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
    selectedCard!.dueDate = newDueDate; // Update the selected card's dueDate
    credentialsController.cardsUpdate({
      cardId: selectedCard!._id,
      data: selectedCard!
    });
  };

  // const Comments = ({ comments, userId, onCommentUpdate, onCommentDelete }) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // Track which comment is being edited
  const [currentContent, setCurrentContent] = useState<string>(""); // Track the current content during editing

  // }

  // Local state for managing whether the comment is being edited
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [updatedCommentContent, setUpdatedComentContent] = useState(comment.content);

  const handleCommentEdit = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setCurrentContent(content)
  }

  const handleCommentSave = (commentId: string) => {
    if (!currentContent.trim()) {
      alert("Comment content cannot be empty!");
      return;
    }
    credentialsController.commentsUpdate({
      commentId,
      data: { 
        // ...comment,
        cardId: card,
        content: currentContent },
    });

    setEditingCommentId(null);
    setCurrentContent("");
  };

  const handleCommentCancel = () => {
    setEditingCommentId(null);
    setCurrentContent("");
  };

  const handleCommentDelete = (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      credentialsController.commentsDelete({
        commentId,
        cardId: card as string,
      });
    }
  };

    

  return (
    <div className="w-full h-full flex flex-col gap-[.5vw]">
      <Participants
        cardId={card as string}
        isActive={isActive}
        backCallback={() => setIsActive(false)}
        alreadyParticipants={contributors}
        setAlreadyParticipants={setContributors}
      />

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
            ) : (
              <p
                className="font-primary font-bold text-vw-md"
                onClick={() => setIsEditing(true)}
              >
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
        {/* Description & Comments */}
        <div className="w-full h-full flex gap-[1vw]">
          <div className="flex gap-5 w-full">
            {/* Description */}
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
                className="font-secondary text-vw-xs text-darkGray font-bold w-full resize-none"
              >
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

          {/* Comments */}
          <div className="w-6/12 h-full overflow-hidden flex flex-col rounded-[.6vw] border-darkGray border-[.2vw] p-[1vw] gap-[1vw] grow">
            <p className="font-secondary text-vw-sm font-bold text-darkGray w-full text-right">
              Comments
            </p>
            <div className="flex flex-col gap-[.5vw] h-[50vh] overflow-y-scroll">
              {credentialsController?.commentsData &&
                credentialsController?.commentsData?.map((comment, idx) => {
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
                      <div className="w-full flex justify-between items-center text-vw-sm gap-2">
              <p className="font-secondary text-vw-sm font-bold text-darkGray">
                {typeof comment.userId === "object" && comment.userId
                  ? comment.userId.username
                  : "Anonymous"}{" "}
                <span className="italic font-normal">
                  {comment.isEdited && "(edited)"}
                </span>
              </p>
              {isTheUser && (
                <div className="flex gap-2">
                  <AiFillEdit
                    className="text-darkGray cursor-pointer"
                    onClick={() => handleCommentEdit(comment._id, comment.content)}
                  />
                  <AiFillDelete
                    className="text-darkGray cursor-pointer"
                    onClick={() => handleCommentDelete(comment._id)}
                  />
                </div>
              )}
            </div>
            {editingCommentId === comment._id ? (
              <div className="flex flex-col gap-2">
                <textarea
                  className="w-full h-[4em] border-[.2vw] border-darkGray rounded-[.4vw] p-[.5vw] resize-none"
                  value={currentContent}
                  onChange={(e) => setCurrentContent(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                  <ButtonCustom
                    text="Save"
                    type="primary"
                    onClick={() => handleCommentSave(comment._id)}
                  />
                  <ButtonCustom
                    text="Cancel"
                    type="secondary"
                    onClick={handleCommentCancel}
                  />
                </div>
              </div>
            ) : (
              <p className="font-secondary text-vw-xs/tight text-darkGray w-full text-justify">
                {comment.content}
              </p>
            )}
            </div>
                );
              })}
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
        </div>
        <div className="w-full h-fit flex items-center p-[1vw] rounded-[.6vw] border-darkGray border-[.2vw] gap-[1vw]">
          <p className="font-secondary text-vw-sm font-bold text-darkGray">
            Contributors
          </p>
          <div className="w-full flex flex-wrap text-darkGray text-vw-xs gap-[.5vw]">
            {/* Render contributors here */}
            {contributors && contributors?.length > 0 ? (
              <>
                {contributors.map((cont, idx) => {
                  return <span key={cont?._id + idx}>{cont?.username}</span>;
                })}
              </>
            ) : (
              <span>No contributors added yet.</span> // Menampilkan pesan jika tidak ada contributor
            )}
          </div>
          <ButtonCustom
            onClick={handleAddUser}
            text="Add"
            type="primary"
            classNameDiv="w-fit"
            classNameInput="w-full"
          />
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
