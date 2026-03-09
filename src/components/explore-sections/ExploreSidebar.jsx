import React from "react";
import getStartedImage from "../../assets/icons/get-started-image.svg";

const ExploreSidebar = ({ children }) => {
  return (
    <aside className="bg-white">
      {/* GET STARTED CARD */}
      <div className="px-10 py-10">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0052ff] px-6 py-7 text-white shadow-xl">
          <div className="relative z-10 max-w-[150px]">
            <h3 className="text-[21px] font-bold leading-tight">
              Get started
            </h3>
            <p className="mt-2 text-[14px] font-medium opacity-90">
              Create your account today
            </p>
            <button className="mt-6 rounded-full bg-[#f0f3f6] px-5 py-2 text-[14px] font-bold text-black transition hover:bg-white">
              Sign up
            </button>
          </div>

          <div className="absolute right-[-10px] top-1/2 h-[160px] w-[180px] -translate-y-1/2">
            <img src={getStartedImage} alt="" className="h-full w-full object-contain" />
          </div>
        </div>
      </div>

      <div className="border-t border-[#e5e7eb]" />
      
      {children}
    </aside>
  );
};

export default ExploreSidebar;
