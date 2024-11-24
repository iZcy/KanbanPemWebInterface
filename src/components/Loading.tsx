import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex space-x-2 items-center">
        <div className="w-3 h-3 bg-accentOrange rounded-full animate-bounce-delay-400"/>
        <div className="w-3 h-3 bg-accentOrange rounded-full animate-bounce-delay-200"/>
        <div className="w-3 h-3 bg-accentOrange rounded-full animate-bounce"/>
        <div className="animate-bounce font-bold">Loading</div>
        <div className="w-3 h-3 bg-accentOrange rounded-full animate-bounce"/>
        <div className="w-3 h-3 bg-accentOrange rounded-full animate-bounce-delay-200"/>
        <div className="w-3 h-3 bg-accentOrange rounded-full animate-bounce-delay-400"/>
      </div>
    </div>
  );
};

export default LoadingSpinner;
