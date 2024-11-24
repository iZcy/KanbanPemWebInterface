"use client";

import { useToasterContext } from "@/contexts/ToasterContext";
import LoadingSpinner from "../Loading";

const LoadingShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoading } = useToasterContext().confirmationToast;
    
    if (isLoading) {
      return <LoadingSpinner />;
    }
  
    return <>{children}</>; // Render children when not loading
  };
  
  export default LoadingShell;