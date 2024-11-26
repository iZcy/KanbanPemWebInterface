"use client";

import React, { useEffect } from "react";
import { Role, useCredentialsContext } from "@/contexts/CredentialsContext";
import { useState } from "react";
import AuthBody from "@/components/Pages/Auth/AuthBody";
import LoadingSpinner from "@/components/Loading";

const ProfilePage = () => {
  const credentialsController = useCredentialsContext();

  const [username, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConPass] = useState("");
  const [role, setRole] = useState<Role>("none");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (credentialsController.accData) {
      setUname(credentialsController.accData.username);
      setEmail(credentialsController.accData.email);
      setRole(credentialsController.accData.role);
    }
  }, [credentialsController.accData]);

  return credentialsController.accData ? (
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
      type="profile"
    />
  ) : (
    <LoadingSpinner />
  );
};

export default ProfilePage;
