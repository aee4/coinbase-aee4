import { ChevronDown } from "lucide-react";

const CryptoPrices = ({ coins, assetCharts }) => {
  return (
    <div className="px-6 md:px-9 pt-12 md:pt-16 pb-0">
      <div>
        <h2 className="text-[28px] md:text-[34px] font-semibold text-black">
          Crypto market prices
          <span className="ml-2 md:ml-3 block sm:inline text-[16px] md:text-[18px] font-normal text-[#6b7280]">
            18,561 assets
          </span>
        </h2>

        <p className="mt-3 md:mt-4 max-w-[900px] text-[16px] md:text-[18px] text-[#5b616e]">
          The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24 trillion, representing a 0.34% increase from last week.
        </p>

        <button className="mt-3 md:mt-4 text-[15px] md:text-[16px] font-medium text-[#1652f0]">
          Read more
        </button>
      </div>

      <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
        <button className="flex items-center gap-1 md:gap-2 rounded-full bg-[#f1f3f5] px-4 md:px-5 py-2.5 md:py-3 text-[13px] md:text-[14px] font-medium">
          All assets <ChevronDown size={14} className="md:w-4 md:h-4" />
        </button>

        <button className="flex items-center gap-1 md:gap-2 rounded-full bg-[#f1f3f5] px-4 md:px-5 py-2.5 md:py-3 text-[13px] md:text-[14px] font-medium">
          1D <ChevronDown size={14} className="md:w-4 md:h-4" />
        </button>

        <button className="flex items-center gap-1 md:gap-2 rounded-full bg-[#f1f3f5] px-4 md:px-5 py-2.5 md:py-3 text-[13px] md:text-[14px] font-medium">
          GHS <ChevronDown size={14} className="md:w-4 md:h-4" />
        </button>

        <button className="flex items-center gap-1 md:gap-2 rounded-full bg-[#f1f3f5] px-4 md:px-5 py-2.5 md:py-3 text-[13px] md:text-[14px] font-medium">
          10 rows <ChevronDown size={14} className="md:w-4 md:h-4" />
        </button>
      </div>

      <div className="mt-8 md:mt-10 w-full pb-4">
        <div className="hidden w-full md:block">
          <div className="grid grid-cols-[30px_1.5fr_1fr_0.8fr_0.7fr_0.8fr_0.8fr_80px] items-center border-b border-[#e5e7eb] pb-3 text-[13px] font-medium text-[#6b7280]">
            <div></div>
            <div>Asset</div>
            <div>Market price</div>
            <div>Chart</div>
            <div>Change</div>
            <div className="text-[#1652f0]">Mkt cap</div>
            <div>Volume</div>
            <div>Actions</div>
          </div>

          {coins.map((coin, index) => (
            <div
              key={coin.name}
              className="grid grid-cols-[30px_1.5fr_1fr_0.8fr_0.7fr_0.8fr_0.8fr_80px] items-center border-b border-[#e5e7eb] py-4"
            >
              <div className="text-[18px] text-[#6b7280]">☆</div>

              <div className="flex items-center gap-3">
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f1f3f5] shrink-0">
                  {coin.logo && (
                    <img
                      src={coin.logo}
                      alt={coin.name}
                      className="h-6 w-6 object-contain"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[14.5px] font-semibold text-black truncate">
                    {coin.name}
                  </div>
                  <div className="text-[12px] text-[#6b7280] truncate">
                    {coin.symbol}
                  </div>
                </div>
              </div>

              <div className="text-[14px] text-black shrink-0">{coin.price}</div>

              <div className="flex justify-center shrink-0">
                <img 
                  src={assetCharts[index % assetCharts.length]} 
                  alt="Price chart" 
                  loading="lazy"
                  className="h-10 w-24 object-contain"
                />
              </div>

              <div className={`text-[14px] ${coin.changeColor} shrink-0`}>
                {coin.change}
              </div>

              <div className="text-[14px] text-black shrink-0">{coin.cap}</div>

              <div className="text-[14px] text-black shrink-0">{coin.volume}</div>

              <div className="shrink-0">
                <button className="rounded-full bg-[#1652f0] px-4 py-2 text-[13px] font-semibold text-white">
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:hidden">
          {coins.length > 0 ? (
            coins.map((coin, index) => (
              <div key={coin.name} className="rounded-[8px] border border-[#e5e7eb] bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#f1f3f5]">
                      {coin.logo && (
                        <img
                          src={coin.logo}
                          alt={coin.name}
                          className="h-6 w-6 object-contain"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-semibold text-black">
                        {coin.name}
                      </div>
                      <div className="truncate text-[12px] text-[#6b7280]">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>
                  <button className="min-h-11 shrink-0 rounded-full bg-[#1652f0] px-4 py-2 text-[13px] font-semibold text-white">
                    Trade
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                  <div>
                    <p className="text-[#6b7280]">Market price</p>
                    <p className="mt-1 font-semibold text-black">{coin.price}</p>
                  </div>
                  <div>
                    <p className="text-[#6b7280]">Change</p>
                    <p className={`mt-1 font-semibold ${coin.changeColor}`}>{coin.change}</p>
                  </div>
                  <div>
                    <p className="text-[#6b7280]">Mkt cap</p>
                    <p className="mt-1 font-semibold text-black">{coin.cap}</p>
                  </div>
                  <div>
                    <p className="text-[#6b7280]">Volume</p>
                    <p className="mt-1 font-semibold text-black">{coin.volume}</p>
                  </div>
                </div>

                <img
                  src={assetCharts[index % assetCharts.length]}
                  alt="Price chart"
                  loading="lazy"
                  className="mt-3 h-10 w-full object-contain"
                />
              </div>
            ))
          ) : (
            <p className="rounded-[8px] border border-[#e5e7eb] p-4 text-center text-[14px] text-[#5b616e]">
              No crypto market price data available
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 md:mt-12 flex flex-col items-center gap-4 md:gap-5 pb-12 md:pb-16">
        <div className="flex items-center gap-4 md:gap-8 text-[16px] md:text-[18px] text-black">
          <button className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#1652f0] text-white">
            1
          </button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>1,857</button>
          <button className="text-[#6b7280]">›</button>
        </div>

        <p className="text-[13px] md:text-[14px] text-[#6b7280]">
          1-10 of 18,561 assets
        </p>
      </div>
    </div>
  );
};

export default CryptoPrices;
