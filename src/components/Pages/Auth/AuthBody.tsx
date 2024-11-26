"use client";

import React from "react";
import ButtonCustom from "@/components/ButtonCustom";
import InputCustom from "@/components/InputCustom";
import { Role, useCredentialsContext } from "@/contexts/CredentialsContext";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useToasterContext } from "@/contexts/ToasterContext";

export interface AuthBodyProps {
  username?: string;
  setUname?: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPass: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword?: string;
  setConPass?: React.Dispatch<React.SetStateAction<string>>;
  role?: Role;
  setRole?: React.Dispatch<React.SetStateAction<Role>>;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  type: "register" | "login" | "profile";
}

const AuthBody = (props: AuthBodyProps) => {
  const toasterController = useToasterContext();
  const router = useRouter();

  const credentialsController = useCredentialsContext();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={twMerge(
          "flex flex-col gap-[.25vw] rounded-[.5vw] p-[2vw]",
          "border-[.2vw] border-darkGray"
        )}
      >
        <div className="w-full flex items-center text-center mb-[1vw]">
          <p className="text-primary font-semibold text-darkGray w-full text-vw-lg">
            Kanban FORYA
            <span className="text-accentOrange font-bold">
              {" " +
                (props.type === "register"
                  ? "Register"
                  : props.type === "login"
                  ? "Login"
                  : props.type === "profile"
                  ? "Profile"
                  : "Action")}
            </span>
          </p>
        </div>
        <InputCustom
          title="Name"
          placeholder="ex. Budiono Siregar"
          value={props.username || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            if (props?.setUname) {
              props.setUname(e.target.value);
            }
          }}
          classNameDiv={
            "w-full disabled:opacity-50 " + (props.type === "login" && "hidden")
          }
          classNameInput="w-full"
          disabled={props.disabled}
        />
        <InputCustom
          title="Email"
          placeholder="ex. budionosiregar@gmail.com"
          value={props.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            props.setEmail(e.target.value);
          }}
          classNameDiv="w-full disabled:opacity-50"
          classNameInput="w-full"
          disabled={props.disabled}
        />
        <InputCustom
          title="Password"
          placeholder="ex. findit123"
          value={props.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            props.setPass(e.target.value);
          }}
          classNameDiv="w-full disabled:opacity-50"
          classNameInput="w-full"
          type="password"
          disabled={props.disabled}
        />
        <InputCustom
          title="Confirm Password"
          placeholder=""
          value={props?.confirmPassword || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            if (props?.setConPass) {
              props.setConPass(e.target.value);
            }
          }}
          classNameDiv={
            "w-full disabled:opacity-50 " + (props.type === "login" && "hidden")
          }
          classNameInput="w-full"
          type="password"
          disabled={props.disabled}
        />
        <div
          className={
            "flex flex-col " + (props.type === "login" ? "hidden" : "")
          }
        >
          <div className="w-full flex">
            <p className="font-secondary font-bold text-darkGray">Role</p>
          </div>
          <select
            className={twMerge(
              "rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw] bg-[#FFFFFF]",
              "outline-none",
              props?.role && props.role === "none" && "opacity-50",
              "disabled:opacity-50"
            )}
            value={props?.role}
            onChange={(e) => {
              e.preventDefault();
              const role = e.target.value as Role;
              if (props?.setRole) {
                props.setRole(role);
              }
            }}
            disabled={props.disabled}
          >
            <option value="none">-- Please Choose One --</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>

        <div className="flex gap-[1vw]">
          <ButtonCustom
            text={
              props.type === "register"
                ? "Register"
                : props.type === "login"
                ? "Login"
                : props.type === "profile"
                ? "Save"
                : "Action"
            }
            onClick={() => {
              if (props.type === "register") {
                if (props.role === "none") {
                  // Inform
                  toasterController.callToast({
                    message: "Pilih role terlebih dahulu!",
                    type: "error"
                  });
                  return;
                }

                credentialsController.registerAction({
                  reg: {
                    email: props.email,
                    password: props.password,
                    confirmPassword: props.confirmPassword || "",
                    username: props.username || "",
                    role: props.role || "none"
                  },
                  setDisabled: props.setDisabled
                });
              } else if (props.type === "login") {
                credentialsController.loginAction({
                  email: props.email,
                  password: props.password,
                  setDisabled: props.setDisabled
                });
              } else if (props.type === "profile") {
                credentialsController.updateAccAction({
                  data: {
                    email: props.email,
                    password: props.password,
                    confirmPassword: props.confirmPassword || "",
                    username: props.username || "",
                    role: props.role || "none"
                  },
                  setDisabled: props.setDisabled,
                  userId: credentialsController.accData?._id || ""
                });

                // clear password
                props.setPass("");

                if (props?.setConPass) props.setConPass("");
              }
            }}
            classNameDiv="mt-[1vw] w-full disabled:opacity-50"
            classNameInput="w-full"
            type="primary"
            disabled={props.disabled}
          />
          <ButtonCustom
            text={"Delete"}
            onClick={() => {
              credentialsController.deleteAccAction({
                setDisabled: props.setDisabled,
                userId: credentialsController.accData?._id || ""
              });
            }}
            classNameDiv={
              "mt-[1vw] w-full disabled:opacity-50 " +
              (props.type !== "profile" && "hidden")
            }
            classNameInput="w-full"
            type="secondary"
            disabled={props.disabled}
          />
        </div>

        <div className="text-center flex gap-[.5vw] text-vw-sm w-fit self-center text-darkGray cursor-default">
          <p>
            {props.type === "register"
              ? "Already have an account? "
              : props.type === "login"
              ? "Don't have an account? "
              : ""}
          </p>
          <p
            className="underline hover:font-bold duration-500 cursor-pointer"
            onClick={() => {
              if (props.type === "register") {
                router.push("/auth");
              } else if (props.type === "login") {
                router.push("/auth/register");
              } else if (props.type === "profile") {
                router.back();
              }
            }}
          >
            {props.type === "register"
              ? "Login here"
              : props.type === "login"
              ? "Register here"
              : "Back to Home"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthBody;
