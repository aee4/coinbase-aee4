import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const NewOnCoinbase = ({ newOnCoinbase, scrollRef, onScroll }) => {
  return (
    <div className="px-10 py-12">
      <div className="flex items-center justify-between">
        <h3 className="text-[25px] font-semibold tracking-[-0.02em] text-black">
          New on Coinbase
        </h3>

        <div className="flex items-center gap-7 pt-1 text-black">
          <button type="button" onClick={() => onScroll(scrollRef, "left")}>
            <ArrowLeft size={24} />
          </button>
          <button type="button" onClick={() => onScroll(scrollRef, "right")}>
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="mt-7 flex overflow-x-hidden scroll-smooth gap-5 pb-2"
      >
        {newOnCoinbase.map((coin) => (
          <div
            key={coin.name}
            className="min-w-[170px] rounded-[24px] bg-[#f1f3f5] px-5 py-5"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${coin.logoBg}`}
            >
              {coin.logo && (
                <img
                  src={coin.logo}
                  alt={coin.name}
                  className="h-6 w-6 object-contain"
                />
              )}
            </div>

            <p className="mt-7 text-[13px] text-[#6b7280]">
              {coin.symbol}
            </p>

            <p className="mt-2 text-[15px] font-semibold text-black">
              {coin.name}
            </p>

            <p className="mt-2 text-[13px] text-black">
              {coin.added}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOnCoinbase;
