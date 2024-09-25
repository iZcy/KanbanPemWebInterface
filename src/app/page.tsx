// src/app/page.tsx
"use client";
// import { useCredentialsContext } from "@/contexts/CredentialsContext";
// import { redirect } from "next/navigation";

export default function Home() {
  // Logic to determine whether to redirect
  // const credentialsController = useCredentialsContext();

  // const creds = credentialsController.roleAction();
  // console.log(creds);
  // if (!credentialsController.roleAction()) {
  //   redirect("/auth"); // Redirects to another route
  // }

  return (
    <div>
      <h1>Welcome to the homepage</h1>
      <p>If you see this, redirection did not occur.</p>
    </div>
  );
}
