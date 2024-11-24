"use client";

import React, { useEffect } from "react";
import ButtonCustom from "@/components/ButtonCustom";
import InputCustom from "@/components/InputCustom";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const AuthPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
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
          "flex flex-col gap-[1vw] rounded-[.5vw] p-[2vw]",
          "border-[.2vw] border-darkGray"
        )}
      >
        <div className="w-full flex items-center text-center mb-[1vw]">
          <p className="text-primary font-semibold text-darkGray w-full text-vw-lg">
            Kanban FOYAA
            <span className="text-accentOrange font-bold">{" LOGIN"}</span>
          </p>
        </div>
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
        <ButtonCustom
          text="Login"
          onClick={() => {
            credentialsController.loginAction({
              email,
              password,
              setDisabled
            });
          }}
          classNameDiv="mt-[1vw] w-full disabled:opacity-50"
          classNameInput="w-full"
          type="primary"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default AuthPage;
