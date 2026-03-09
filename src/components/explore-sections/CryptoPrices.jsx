import React from "react";
import { ChevronDown } from "lucide-react";

const CryptoPrices = ({ coins, assetCharts }) => {
  return (
    <div className="px-5 md:px-9 pt-10 md:pt-16 pb-0">
      <div>
        <h2 className="text-[24px] md:text-[34px] font-semibold text-black">
          Crypto market prices
          <span className="hidden sm:inline ml-3 text-[16px] md:text-[18px] font-normal text-[#6b7280]">
            18,561 assets
          </span>
        </h2>

        <p className="mt-4 max-w-[900px] text-[15px] md:text-[18px] text-[#5b616e]">
          The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24 trillion, representing a 0.34% increase from last week.
        </p>

        <button className="mt-4 text-[15px] md:text-[16px] font-medium text-[#1652f0]">
          Read more
        </button>
      </div>

      <div className="mt-8 flex flex-row overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-5 px-5 md:mx-0 md:px-0">
        <button className="flex whitespace-nowrap items-center gap-2 rounded-full bg-[#f1f3f5] px-5 py-2.5 text-[14px] font-medium shrink-0">
          All assets <ChevronDown size={16} />
        </button>

        <button className="flex whitespace-nowrap items-center gap-2 rounded-full bg-[#f1f3f5] px-5 py-2.5 text-[14px] font-medium shrink-0">
          1D <ChevronDown size={16} />
        </button>

        <button className="flex whitespace-nowrap items-center gap-2 rounded-full bg-[#f1f3f5] px-5 py-2.5 text-[14px] font-medium shrink-0">
          GHS <ChevronDown size={16} />
        </button>

        <button className="flex whitespace-nowrap items-center gap-2 rounded-full bg-[#f1f3f5] px-5 py-2.5 text-[14px] font-medium shrink-0">
          10 rows <ChevronDown size={16} />
        </button>
      </div>

      <div className="mt-8 w-full overflow-hidden">
        <div className="w-full">
          {/* Table Header: Hidden columns on small screens */}
          <div className="grid grid-cols-[1fr_0.8fr_0.8fr_80px] md:grid-cols-[30px_1.5fr_1fr_0.8fr_0.7fr_0.8fr_0.8fr_80px] items-center border-b border-[#e5e7eb] pb-3 text-[13px] font-medium text-[#6b7280]">
            <div className="hidden md:block"></div>
            <div>Asset</div>
            <div>Market price</div>
            <div className="hidden md:block">Chart</div>
            <div className="hidden md:block">Change</div>
            <div className="hidden md:block text-[#1652f0]">Mkt cap</div>
            <div className="hidden md:block">Volume</div>
            <div>Actions</div>
          </div>

          {coins.map((coin, index) => (
            <div
              key={coin.name}
              className="grid grid-cols-[1fr_0.8fr_0.8fr_80px] md:grid-cols-[30px_1.5fr_1fr_0.8fr_0.7fr_0.8fr_0.8fr_80px] items-center border-b border-[#e5e7eb] py-4"
            >
              <div className="hidden md:block text-[18px] text-[#6b7280]">☆</div>

              <div className="flex items-center gap-3">
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f1f3f5]">
                  {coin.logo && (
                    <img
                      src={coin.logo}
                      alt={coin.name}
                      className="h-6 w-6 object-contain"
                    />
                  )}
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold text-black">
                    {coin.name}
                  </div>
                  <div className="text-[12px] text-[#6b7280]">
                    {coin.symbol}
                  </div>
                </div>
              </div>

              <div className="text-[14px] md:text-[15px] font-medium text-black px-2 md:px-0">
                {coin.price}
                <div className={`md:hidden mt-0.5 text-[12.5px] font-medium ${coin.changeColor}`}>
                  {coin.change}
                </div>
              </div>

              <div className="hidden md:flex justify-center">
                <img 
                  src={assetCharts[index % assetCharts.length]} 
                  alt="Price chart" 
                  className="h-10 w-24 object-contain"
                />
              </div>

              <div className={`hidden md:block text-[14px] md:text-[15px] font-medium ${coin.changeColor}`}>
                {coin.change}
              </div>

              <div className="hidden md:block text-[14px] text-black">{coin.cap}</div>

              <div className="hidden md:block text-[14px] text-black">{coin.volume}</div>

              <div>
                <button className="rounded-full bg-[#1652f0] px-4 py-2 text-[13px] font-semibold text-white">
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-5 pb-16">
        <div className="flex items-center gap-8 text-[18px] text-black">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1652f0] text-white">
            1
          </button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>1,857</button>
          <button className="text-[#6b7280]">›</button>
        </div>

        <p className="text-[14px] text-[#6b7280]">
          1-10 of 18,561 assets
        </p>
      </div>
    </div>
  );
};

export default CryptoPrices;
