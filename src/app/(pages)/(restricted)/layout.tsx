"use client";

import { useCredentialsContext } from "@/contexts/CredentialsContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const credentialsController = useCredentialsContext();

  useEffect(() => {
    if (!credentialsController.accData) {
      redirect("/auth");
    }
  }, [credentialsController]);

  return <>{children}</>;
};

export default RootLayout;
