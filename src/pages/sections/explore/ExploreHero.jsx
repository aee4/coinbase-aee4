import { Search, Info } from "lucide-react";

const ExploreHero = () => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_560px] items-start gap-6 lg:gap-10 px-6 md:px-9 py-6 md:py-10">
      <div>
        <h1 className="text-[32px] md:text-[42px] font-normal leading-[1.1] md:leading-none tracking-[-0.04em] text-black">
          Explore crypto
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-1 md:gap-2 text-[15px] md:text-[17px] text-black">
          <span>Coinbase 50 Index is down</span>
          <span className="text-[#ea3943]">↘ 1.64%</span>
          <span>(24hrs)</span>
          <Info size={14} className="text-[#6b7280] hidden sm:block" />
        </div>
      </div>

      <div className="flex justify-start lg:justify-end w-full mt-4 lg:mt-0">
        <div className="flex h-[54px] md:h-[60px] w-full lg:max-w-[440px] items-center rounded-full bg-[#f1f3f5] px-5 md:px-7">
          <Search size={20} className="text-black shrink-0 md:w-[24px]" />
          <input
            type="text"
            placeholder="Search for an asset"
            className="ml-3 md:ml-4 w-full bg-transparent text-[15px] text-[#5b616e] outline-none placeholder:text-[#5b616e]"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreHero;
