"use client";

import React, { useEffect } from "react";
import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthBody from "@/components/Pages/Auth/AuthBody";

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
    <AuthBody
      email={email}
      setEmail={setEmail}
      password={password}
      setPass={setPass}
      disabled={disabled}
      setDisabled={setDisabled}
      type="login"
    />
  );
};

export default AuthPage;
