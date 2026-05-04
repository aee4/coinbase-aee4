import { useState } from "react";

function MarketCard({ coinsByTab = {}, initialTab = "new", isLoading = false }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: "tradable", label: "Tradable" },
    { id: "gainers", label: "Top gainers" },
    { id: "new", label: "New on Coinbase" },
  ];

  const getCoins = () => {
    if (activeTab === "tradable") return coinsByTab.tradable || [];
    if (activeTab === "gainers") return coinsByTab.gainers || [];
    return coinsByTab.new || [];
  };

  const coins = getCoins();

  return (
    <div className="w-full max-w-[680px] rounded-[40px] bg-black px-10 py-9 text-white">
      {/* Tabs */}
      <div className="flex items-center gap-4 text-[18px] font-medium">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-6 py-3 transition ${
                isActive ? "bg-[#23262d] text-white" : "text-white hover:bg-[#181b20]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Coin list */}
      <div className="mt-10 space-y-7">
        {isLoading && (
          <p className="py-8 text-center text-[16px] text-[#8b93a6]">Loading...</p>
        )}

        {!isLoading && coins.length === 0 && (
          <p className="py-8 text-center text-[16px] text-[#8b93a6]">No data available</p>
        )}

        {!isLoading && coins.map((coin) => {
          const isPositive = coin.change.includes("+") || Number.parseFloat(coin.change) > 0;
          const isNeutral = coin.change === "--" || coin.change === "0.00%";

          return (
            <div key={`${coin.symbol || coin.name}-${coin.name}`} className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  {coin.logo && (
                    <img
                      src={coin.logo}
                      alt={coin.name}
                      className="h-7 w-7 object-contain"
                    />
                  )}
                </div>

                <div>
                  <span className="block text-[30px] font-normal tracking-[-0.04em]">
                    {coin.name}
                  </span>
                  {coin.symbol && (
                    <span className="block text-[15px] uppercase text-[#8b93a6]">
                      {coin.symbol}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-[22px] font-normal">{coin.price}</p>

                <p
                  className={`text-[17px] ${
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
