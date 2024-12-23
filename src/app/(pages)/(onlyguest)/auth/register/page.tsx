"use client";

import React, { useEffect } from "react";
import { Role, useCredentialsContext } from "@/contexts/CredentialsContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthBody from "@/components/Pages/Auth/AuthBody";

const AuthPage = () => {
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
    <AuthBody
      username={username}
      setUname={setUname}
      email={email}
      setEmail={setEmail}
      password={password}
      setPass={setPass}
      confirmPassword={confirmPassword}
      setConPass={setConPass}
      role={role}
      setRole={setRole}
      disabled={disabled}
      setDisabled={setDisabled}
      type="register"
    />
  );
};

export default AuthPage;
