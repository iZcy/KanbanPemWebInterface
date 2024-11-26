"use client";

import apiRoute from "@/api/routes";
import ButtonCustom from "@/components/ButtonCustom";
import {
  ContributorData,
  useCredentialsContext
} from "@/contexts/CredentialsContext";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ParticipantsComponentProps {
  cardId: string;
  isActive: boolean;
  backCallback: () => void;
  alreadyParticipants: ContributorData[];
  setAlreadyParticipants: React.Dispatch<
    React.SetStateAction<ContributorData[]>
  >;
}

const Participants = (props: ParticipantsComponentProps) => {
  const credentialsController = useCredentialsContext();

  const [participantsList, setParticipantsList] = useState<ContributorData[]>(
    []
  );

  const accDataRef = useRef(credentialsController.accData);

  const getParticipants = useCallback(() => {
    axios
      .get(apiRoute.auth.getAllUsersNameIdRoute, {
        withCredentials: true
      })
      .then((res) => {
        const data = res.data.data;

        // convert data list to ParticipantProps list
        const participants: ContributorData[] = data.map(
          (part: ContributorData) => {
            if (part._id === accDataRef.current?._id) return;
            // check if it's already a participant
            if (props.alreadyParticipants.find((el) => el._id === part._id))
              return;

            return {
              username: part.username,
              _id: part._id
            };
          }
        );

        setParticipantsList(participants);
      });
  }, [props.alreadyParticipants]);

  useEffect(() => {
    getParticipants();
  }, [getParticipants]);

  return (
    <div
      className={
        "w-screen h-screen flex items-center justify-center absolute top-0 left-0 bg-lightGray py-[5vh] " +
        (!props.isActive && "hidden")
      }
    >
      <div
        className={twMerge(
          "flex flex-col gap-[1vw] rounded-[.5vw] p-[2vw] w-[30vw]",
          "border-[.2vw] border-darkGray overflow-hidden h-fit"
        )}
      >
        <div className="w-full flex items-center text-center mb-[1vw]">
          <p className="text-primary font-semibold text-darkGray w-full text-vw-lg">
            Pilih Participant
          </p>
          <ButtonCustom
            text="Back"
            onClick={props.backCallback}
            classNameDiv="grow"
            classNameInput="w-full text-start"
            type="primary"
          />
        </div>
        <div className="flex flex-col gap-[.2vw] overflow-y-scroll h-fit">
          {participantsList.length > 0 &&
            participantsList.map((part, idx) => (
              <ButtonCustom
                key={idx}
                text={part?.username}
                onClick={async () => {
                  console.log(part._id);
                  await axios.post(
                    `${apiRoute.cards.addCollab}${props.cardId}`, // Endpoint API
                    { userId: part._id }, // Data body
                    { withCredentials: true } // Opsi credentials
                  );
                  getParticipants();

                  // update participants
                  const oldParticipants = props.alreadyParticipants;
                  const newParticipants = [
                    ...oldParticipants,
                    {
                      _id: part._id,
                      username: part.username,
                      email: part.email
                    }
                  ];
                  props.setAlreadyParticipants(newParticipants);
                }}
                classNameDiv="grow"
                classNameInput="w-full text-start"
                type="secondary"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Participants;
