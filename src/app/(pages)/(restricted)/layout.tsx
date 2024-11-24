"use client";

import apiRoute from "@/api/routes";
import { AccountData, useCredentialsContext } from "@/contexts/CredentialsContext";
import { useToasterContext } from "@/contexts/ToasterContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const toasterController = useToasterContext();
  const credentialsController = useCredentialsContext();
  const { setIsLoading } = toasterController.confirmationToast;

  useEffect(() => {
    axios.get(apiRoute.auth.loginRoute, {
      withCredentials: true
    }).then((res) => {
      const data = res.data.data as AccountData;
      console.log(data)
      if (!data.role) router.replace("/auth");
      else credentialsController.setAccData(data);

      setIsLoading(false);
    }).catch((error) => {
      console.error("Failed to fetch authentication status:", error);
      router.replace("/auth");
    }).finally(() => {
      setIsLoading(false); // Stop loading on
    });
    
  }, []);

  if (!toasterController.confirmationToast.isLoading) {
    return children;
  }
};

export default RootLayout;
