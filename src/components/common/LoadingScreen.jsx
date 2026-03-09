import React from "react";
import loadingImage from "../../assets/images/white-load-page.jpeg";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <img
        src={loadingImage}
        alt="Loading..."
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default LoadingScreen;
