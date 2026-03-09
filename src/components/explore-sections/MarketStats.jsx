import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MarketStats = ({ statsCards }) => {
  return (
    <div className="px-6 md:px-9 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="w-full lg:max-w-[900px]">
          <h2 className="text-[26px] md:text-[31px] font-semibold tracking-[-0.02em] text-black">
            Market stats
          </h2>

          <p className="mt-4 md:mt-7 text-[14px] md:text-[15px] leading-[1.45] md:leading-[1.45] text-[#5b616e]">
            The overall crypto market is growing this week. As of today,
            the total crypto market capitalization is 23.97 trillion,
            representing a 0.55% increase from last week.
          </p>

          <button className="mt-4 md:mt-5 text-[13px] font-medium text-[#1652f0] hover:underline">
            Read more
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-8 pt-2 text-black">
          <button type="button">
            <ArrowLeft size={28} />
          </button>
          <button type="button">
            <ArrowRight size={28} />
          </button>
        </div>
      </div>

      <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[20px] md:rounded-[24px] bg-[#f1f3f5] px-4 md:px-5 py-4"
          >
            <p className="text-[13px] text-[#5b616e]">{card.title}</p>

            <div className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-black">
              <span>{card.value}</span>
              <span className={card.changeColor}>{card.change}</span>
            </div>

            <div className="mt-4 md:mt-5">
              <img
                src={card.chart}
                alt={card.title}
                loading="lazy"
                className="h-[60px] md:h-[80px] w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketStats;
