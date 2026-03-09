import React from "react";
import { Search, Info } from "lucide-react";

const ExploreHero = () => {
  return (
    <div className="grid grid-cols-1 items-start gap-10 px-9 py-10 lg:grid-cols-[1fr_560px]">
      <div>
        <h1 className="text-[42px] font-normal leading-none tracking-[-0.04em] text-black">
          Explore crypto
        </h1>

        <div className="mt-2 flex items-center gap-2 text-[17px] text-black">
          <span>Coinbase 50 Index is down</span>
          <span className="text-[#ea3943]">↘ 1.64%</span>
          <span>(24hrs)</span>
          <Info size={14} className="text-[#6b7280]" />
        </div>
      </div>

      <div className="flex justify-start lg:justify-end">
        <div className="flex h-[60px] w-full max-w-[440px] items-center rounded-full bg-[#f1f3f5] px-7">
          <Search size={24} className="text-black" />
          <input
            type="text"
            placeholder="Search for an asset"
            className="ml-4 w-full bg-transparent text-[15px] text-[#5b616e] outline-none placeholder:text-[#5b616e]"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreHero;
