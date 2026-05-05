import { useState } from "react";

function MarketCard({ coinsByTab = {}, initialTab = "new", isLoading = false }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: "tradable", label: "Tradable", emptyLabel: "tradable crypto" },
    { id: "gainers", label: "Top gainers", emptyLabel: "top gainer" },
    { id: "new", label: "New on Coinbase", emptyLabel: "new listing" },
  ];

  const getCoins = () => {
    if (activeTab === "tradable") return coinsByTab.tradable || [];
    if (activeTab === "gainers") return coinsByTab.gainers || [];
    return coinsByTab.new || [];
  };

  const coins = getCoins();
  const activeTabDetails = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <div className="w-full max-w-[680px] rounded-[28px] bg-black px-4 py-5 text-white sm:rounded-[34px] sm:px-7 sm:py-7 lg:rounded-[40px] lg:px-10 lg:py-9">
      {/* Tabs */}
      <div className="-mx-1 flex flex-nowrap items-center gap-2 overflow-x-auto px-1 pb-1 text-[14px] font-medium [scrollbar-width:none] sm:gap-3 sm:text-[16px] lg:gap-4 lg:text-[18px] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-none whitespace-nowrap rounded-full px-4 py-2.5 transition sm:px-5 sm:py-3 lg:px-6 ${
                isActive ? "bg-[#23262d] text-white" : "text-white hover:bg-[#181b20]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.08em] text-[#8b93a6] sm:mt-5 sm:text-[13px]">
        {activeTabDetails.label} - {coins.length} {coins.length === 1 ? "asset" : "assets"}
      </p>

      {/* Coin list */}
      <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6 lg:mt-10 lg:space-y-7">
        {isLoading && (
          <p className="py-8 text-center text-[16px] text-[#8b93a6]">
            Loading {activeTabDetails.emptyLabel} data...
          </p>
        )}

        {!isLoading && coins.length === 0 && (
          <p className="py-8 text-center text-[16px] text-[#8b93a6]">
            No {activeTabDetails.emptyLabel} data available
          </p>
        )}

        {!isLoading && coins.map((coin) => {
          const isPositive = coin.change.includes("+") || Number.parseFloat(coin.change) > 0;
          const isNeutral = coin.change === "--" || coin.change === "0.00%";

          return (
            <div
              key={`${coin.symbol || coin.name}-${coin.name}`}
              className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:gap-4 lg:gap-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white sm:h-11 sm:w-11">
                {coin.logo && (
                  <img
                    src={coin.logo}
                    alt={coin.name}
                    className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                  />
                )}
              </div>

              <div className="min-w-0">
                <span className="block truncate text-[20px] font-normal tracking-[-0.02em] sm:text-[24px] lg:text-[30px] lg:tracking-[-0.04em]">
                  {coin.name}
                </span>
                {coin.symbol && (
                  <span className="block truncate text-[12px] uppercase text-[#8b93a6] sm:text-[14px] lg:text-[15px]">
                    {coin.symbol}
                  </span>
                )}
              </div>

              <div className="min-w-[84px] text-right sm:min-w-[110px]">
                <p className="text-[16px] font-normal sm:text-[19px] lg:text-[22px]">{coin.price}</p>

                <p
                  className={`text-[13px] sm:text-[15px] lg:text-[17px] ${
                    isNeutral
                      ? "text-[#8b93a6]"
                      : isPositive
                      ? "text-[#16c784]"
                      : "text-[#ff4d5a]"
                  }`}
                >
                  {coin.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MarketCard;
