import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MarketStats = ({ statsCards }) => {
  return (
    <div className="px-9 py-12">
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-[900px]">
          <h2 className="text-[31px] font-semibold tracking-[-0.02em] text-black">
            Market stats
          </h2>

          <p className="mt-7 text-[15px] leading-[1.45] text-[#5b616e]">
            The overall crypto market is growing this week. As of today,
            the total crypto market capitalization is 23.97 trillion,
            representing a 0.55% increase from last week.
          </p>

          <button className="mt-5 text-[13px] font-medium text-[#1652f0] hover:underline">
            Read more
          </button>
        </div>

        <div className="flex items-center gap-8 pt-2 text-black">
          <button type="button">
            <ArrowLeft size={28} />
          </button>
          <button type="button">
            <ArrowRight size={28} />
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[24px] bg-[#f1f3f5] px-5 py-4"
          >
            <p className="text-[13px] text-[#5b616e]">{card.title}</p>

            <div className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-black">
              <span>{card.value}</span>
              <span className={card.changeColor}>{card.change}</span>
            </div>

            <div className="mt-5">
              <img
                src={card.chart}
                alt={card.title}
                className="h-[80px] w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketStats;
