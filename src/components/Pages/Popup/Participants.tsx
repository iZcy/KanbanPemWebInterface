"use client";

import apiRoute from "@/api/routes";
import ButtonCustom from "@/components/ButtonCustom";
import {
  ContributorData,
  useCredentialsContext
} from "@/contexts/CredentialsContext";
import { useToasterContext } from "@/contexts/ToasterContext";
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
  const toasterController = useToasterContext();

  const [participantsList, setParticipantsList] = useState<ContributorData[]>(
    []
  );

  const accDataRef = useRef(credentialsController.accData);
  const callToastRef = useRef(toasterController.callToast);

  const getParticipants = useCallback(() => {
    axios
      .get(apiRoute.auth.getAllUsersNameIdRoute, {
        withCredentials: true
      })
      .then((res) => {
        const data = res.data.data;

        // filter data list to ParticipantProps list
        const filteredData = data.filter(
          (part: ContributorData) =>
            part._id !== accDataRef.current?._id &&
            !props.alreadyParticipants.find((el) => el._id === part._id)
        );

        const participants: ContributorData[] = filteredData.map(
          (part: ContributorData) => {
            return {
              username: part.username,
              _id: part._id,
              email: part.email
            };
          }
        );

        setParticipantsList(participants);

        // toast success
        callToastRef.current({
          message: "Participant loaded",
          type: "success"
        });
      })
      .catch((err) => {
        // toast error
        callToastRef.current({
          message: "Failed to load participants: " + err,
          type: "error"
        });
      });
  }, [props.alreadyParticipants]);

  useEffect(() => {
    getParticipants();
  }, [getParticipants]);

  return (
    <div
      className={
        "w-screen h-screen flex items-center justify-center absolute top-0 left-0 bg-lightGray/[75%] py-[5vh] z-[100] " +
        (!props.isActive && "hidden")
      }
    >
      <div
        className={twMerge(
          "flex flex-col gap-[1vw] rounded-[.5vw] p-[2vw] w-[30vw]",
          "border-[.2vw] border-darkGray overflow-hidden h-fit bg-lightGray"
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
                  await axios
                    .post(
                      `${apiRoute.cards.collab}${props.cardId}`, // Endpoint API
                      { userId: part._id }, // Data body
                      { withCredentials: true } // Opsi credentials
                    )
                    .then(() => {
                      // toast success
                      callToastRef.current({
                        message: "Participant " + part.username + " added",
                        type: "success"
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      // toast error
                      callToastRef.current({
                        message: "Failed to add participant: " + err,
                        type: "error"
                      });
                    });
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
