"use client"; // This makes the component client-side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiRoute from "@/api/routes";
import BoardPage from "@/components/Pages/Main/MainPage";
import LoadingSpinner from "@/components/Loading";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Perform client-side fetch for authentication check
    const checkAuth = async () => {
      try {
        const res = await fetch(apiRoute.auth.roleRoute, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          // If authentication fails, redirect to /auth
          router.replace("/auth");
        } else {
          setIsLoading(false); // Authentication successful, stop loading
        }
      } catch (error) {
        console.error("Failed to fetch authentication status:", error);
        router.replace("/auth");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    // Optionally, show a loading indicator while checking auth
    return <LoadingSpinner />;
  }

  // Render the main page if authentication succeeds
  return <BoardPage />;
}
