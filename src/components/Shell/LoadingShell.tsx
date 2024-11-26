"use client";

// import { useToasterContext } from "@/contexts/ToasterContext";
// import LoadingSpinner from "../Loading";

const LoadingShell: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // const toasterController = useToasterContext();

  // // Conditional rendering based on loading state
  // return toasterController.confirmationToast.isLoading ? (
  //   <LoadingSpinner />
  // ) : (
  //   <>{children}</>
  // );
  return <>{children}</>;
};

export default LoadingShell;
