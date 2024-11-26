"use client";

import React, { useEffect } from "react";
import ButtonCustom from "@/components/ButtonCustom";
import InputCustom from "@/components/InputCustom";
import { Role, useCredentialsContext } from "@/contexts/CredentialsContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useToasterContext } from "@/contexts/ToasterContext";

const RegisterPage = () => {
  const toasterController = useToasterContext();
  const router = useRouter();

  const [username, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConPass] = useState("");
  const [role, setRole] = useState<Role>("none");
  const [disabled, setDisabled] = useState(false);
  const credentialsController = useCredentialsContext();

  useEffect(() => {
    if (credentialsController.accData) {
      router.push("/");
    }
  }, [credentialsController.accData, router]);

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
            Kanban FOYAA
            <span className="text-accentOrange font-bold">{" REGISTER"}</span>
          </p>
        </div>
        <InputCustom
          title="Name"
          placeholder="ex. Budiono Siregar"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setUname(e.target.value);
          }}
          classNameDiv="w-full disabled:opacity-50"
          classNameInput="w-full"
          disabled={disabled}
        />
        <InputCustom
          title="Email"
          placeholder="ex. budionosiregar@gmail.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
          classNameDiv="w-full disabled:opacity-50"
          classNameInput="w-full"
          disabled={disabled}
        />
        <InputCustom
          title="Password"
          placeholder="ex. findit123"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setPass(e.target.value);
          }}
          classNameDiv="w-full disabled:opacity-50"
          classNameInput="w-full"
          type="password"
          disabled={disabled}
        />
        <InputCustom
          title="Confirm Password"
          placeholder=""
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setConPass(e.target.value);
          }}
          classNameDiv="w-full disabled:opacity-50"
          classNameInput="w-full"
          type="password"
          disabled={disabled}
        />
        <div className="flex flex-col">
          <div className="w-full flex">
            <p className="font-secondary font-bold text-darkGray">Role</p>
          </div>
          <select
            className={twMerge(
              "rounded-[.5vw] text-vw-xs text-darkGray px-[.6vw] py-[.4vw] border-lightGray border-[.2vw] bg-[#FFFFFF]",
              "outline-none",
              role === "none" && "opacity-50"
            )}
            value={role}
            onChange={(e) => {
              e.preventDefault();
              const role = e.target.value as Role;
              setRole(role);
            }}
          >
            <option value="none">-- Please Choose One --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <ButtonCustom
          text="Register"
          onClick={() => {
            if (role === "none") {
              // Inform
              toasterController.callToast({
                message: "Pilih role terlebih dahulu!",
                type: "error"
              });
              return;
            }

            credentialsController.registerAction({
              reg: {
                email,
                password,
                confirmPassword,
                username,
                role
              },
              setDisabled
            });
          }}
          classNameDiv="mt-[1vw] w-full disabled:opacity-50"
          classNameInput="w-full"
          type="primary"
          disabled={disabled}
        />
        <div
          className="text-center text-vw-sm underline text-darkGray hover:font-bold duration-500 w-fit self-center cursor-pointer"
          onClick={() => router.push("/auth")}
        >
          Login?
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
