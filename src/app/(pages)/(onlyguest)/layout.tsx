"use client";

import apiRoute from "@/api/routes";
import {
  AccountData,
  useCredentialsContext
} from "@/contexts/CredentialsContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const credentialsController = useCredentialsContext();

  const setAccDataRef = useRef(credentialsController.setAccData);

  useEffect(() => {
    axios
      .get(apiRoute.auth.loginRoute, {
        withCredentials: true
      })
      .then((res) => {
        const data = res.data.data as AccountData;

        if (data.role) {
          setAccDataRef.current(data);
          // Redirect to home /
          router.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return children;
};

export default RootLayout;
