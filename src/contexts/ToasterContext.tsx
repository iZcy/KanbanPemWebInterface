"use client";

import { toast } from "react-toastify";
import CustomToast, { CustomToastProps } from "@/components/CustomToast";
import { useContext, createContext, useState } from "react";

interface ConfirmationProps {
  message: string;
  onYes: () => void;
  onNo: () => void;
}

interface ConfirmationToastProps {
  active: boolean;
  message: string;
  onYes: () => void;
  onNo: () => void;
  createConfirmation: (props: ConfirmationProps) => void;
  clearConfirmation: () => void;
}

interface ToasterController {
  callToast: (prop: CustomToastProps) => void;
  dismissToast: () => void;
  confirmationToast: ConfirmationToastProps;
}

const ToasterContext = createContext<ToasterController | undefined>(undefined);

export const ToasterProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // Toast Handlers
  const callToast = (props: CustomToastProps) => {
    if (toast) {
      toast(<CustomToast message={props.message} type={props.type} />);
    }
  };

  const dismissToast = () => {
    toast.dismiss();
  };

  // Confirmation Handlers
  const [confirmationActive, setCA] = useState<boolean>(false);
  const [confirmationMessage, setCM] = useState<string>("");
  const [onYes, setOnYes] = useState<() => void>(() => () => {});
  const [onNo, setOnNo] = useState<() => void>(() => () => {});
  const createConfirmation = (props: ConfirmationProps) => {
    setCA(true);
    setCM(props.message);
    setOnYes(() => props.onYes);
    setOnNo(() => props.onNo);
  };

  const clearConfirmation = () => {
    setCA(false);
    setCM("");
    setOnYes(() => () => {});
    setOnNo(() => () => {});
  };

  return (
    <ToasterContext.Provider
      value={{
        callToast,
        dismissToast,
        confirmationToast: {
          active: confirmationActive,
          message: confirmationMessage,
          onYes,
          onNo,
          createConfirmation,
          clearConfirmation
        }
      }}
    >
      {children}
    </ToasterContext.Provider>
  );
};

export const useToasterContext = (): ToasterController => {
  const context = useContext(ToasterContext);
  if (context === undefined) {
    throw new Error("useToasterContext must be used within a ToasterProvider");
  }
  return context;
};
