import { LoaderPinwheel } from "lucide-react";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderPinwheel className="animate-spin text-gray-600 dark:text-white text-2xl" />
    </div>
  );
};

export default LoadingScreen;
