import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  ArrowLeftRight,
  CreditCard,
  Globe2,
  Grid3X3,
  Home,
  MoreHorizontal,
  Search,
  Send,
  GraduationCap,
  TrendingUp,
  Wallet,
} from "lucide-react";
import api from "../api/api";

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "My assets", icon: Wallet },
  { label: "Trade", icon: ArrowLeftRight },
  { label: "Earn", icon: TrendingUp },
  { label: "Learning rewards", icon: GraduationCap },
  { label: "Web3", icon: Globe2 },
  { label: "Card", icon: CreditCard },
  { label: "More", icon: MoreHorizontal },
];

const chartPaths = [
  "M2 34 L8 28 L14 31 L20 19 L26 23 L32 12 L38 16 L44 8 L50 11 L56 4",
  "M2 22 L8 26 L14 16 L20 19 L26 11 L32 15 L38 7 L44 10 L50 5 L56 2",
  "M2 12 L8 18 L14 14 L20 24 L26 17 L32 21 L38 10 L44 15 L50 8 L56 11",
  "M2 28 L8 20 L14 25 L20 14 L26 17 L32 8 L38 12 L44 6 L50 10 L56 3",
];

const getCryptoArray = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  if (Array.isArray(responseData?.crypto)) {
    return responseData.crypto;
  }

  return [];
};

const getNumericValue = (value) => {
  const numericValue = Number.parseFloat(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isNaN(numericValue) ? 0 : numericValue;
};

const formatPrice = (price) => {
  if (typeof price === "string" && price.trim().startsWith("$")) {
    return price;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 6,
  }).format(getNumericValue(price));
};

const formatChange = (change24h) => {
  const changeValue = getNumericValue(change24h);
  return `${changeValue >= 0 ? "+" : ""}${changeValue.toFixed(2)}%`;
};

const normalizeCrypto = (coin) => ({
  id: coin.id || coin._id || coin.symbol || coin.name,
  name: coin.name || "Unknown asset",
  symbol: coin.symbol || "N/A",
  price: formatPrice(coin.price),
  change: formatChange(coin.change24h),
  change24h: getNumericValue(coin.change24h),
  logo: coin.image || coin.logo,
  marketCap: coin.marketCap || coin.market_cap || coin.market_capitalization,
});

const normalizeProfile = (data) => data?.user || data?.data?.user || data?.data || data || null;

const getInitials = (name, email) => {
  const source = name || email || "User";
  return source
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const getMarketCap = (coin, index) => {
  if (coin.marketCap) {
    return coin.marketCap;
  }

  const mockCaps = ["$484.0B", "$198.1B", "$10.5B", "$3.5B", "$684.0M", "$421.8M"];
  return mockCaps[index % mockCaps.length];
};

function MiniSparkline({ index, positive = true, large = false }) {
  const path = chartPaths[index % chartPaths.length];
  const stroke = positive ? "#098551" : "#cf202f";
  const balancePath = "M4 31 C10 27 13 29 18 22 C23 15 28 19 33 13 C38 7 44 11 49 8 C53 6 55 3 57 2";
  const balanceFill = `${balancePath} L57 38 L4 38 Z`;

  return (
    <svg
      className={large ? "h-24 w-80 max-w-full" : "h-10 w-20"}
      viewBox="0 0 58 38"
      fill="none"
      aria-hidden="true"
    >
      {large ? (
        <>
          <path d={balanceFill} fill="#0052ff" opacity="0.12" />
          <path
            d={balancePath}
            stroke="#0052ff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path d={path} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function CoinIcon({ coin, index }) {
  const colors = ["#f7931a", "#627eea", "#8247e5", "#0052ff", "#d4a72c", "#111827"];

  if (coin.logo) {
    return (
      <img
        src={coin.logo}
        alt=""
        className="h-9 w-9 rounded-full bg-[#eef2f7] object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white"
      style={{ backgroundColor: colors[index % colors.length] }}
    >
      {coin.symbol.slice(0, 1).toUpperCase()}
    </div>
  );
}

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [topMovers, setTopMovers] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const [profileResponse, cryptoResponse, gainersResponse] = await Promise.all([
          api.get("/profile").catch(() => api.get("/users/profile")),
          api.get("/crypto"),
          api.get("/crypto/gainers"),
        ]);

        if (!isMounted) {
          return;
        }

        setProfile(normalizeProfile(profileResponse.data));
        setWatchlist(getCryptoArray(cryptoResponse.data).slice(0, 6).map(normalizeCrypto));
        setTopMovers(
          getCryptoArray(gainersResponse.data)
            .map(normalizeCrypto)
            .sort((firstCoin, secondCoin) => secondCoin.change24h - firstCoin.change24h)
            .slice(0, 6)
        );
      } catch {
        if (isMounted) {
          localStorage.removeItem("token");
          localStorage.removeItem("jwt");
          setShouldRedirect(true);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const initials = useMemo(() => getInitials(profile?.name, profile?.email), [profile]);

  if (shouldRedirect) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0052ff] p-2 text-[#0a0b0d]">
      <div className="grid min-h-[calc(100vh-16px)] overflow-hidden rounded-[22px] bg-white lg:grid-cols-[214px_minmax(0,1fr)_330px]">
        <aside className="hidden border-r border-[#e6e8eb] bg-white lg:flex lg:flex-col">
          <div className="flex h-16 items-center px-7">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0052ff] text-[22px] font-bold text-white">
              C
            </div>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`flex h-11 w-full items-center gap-3 rounded-[8px] border-l-[3px] px-4 text-left text-[14px] font-semibold ${
                    item.active
                      ? "border-[#0052ff] bg-[#f4f8ff] text-[#0052ff]"
                      : "border-transparent text-[#1f2937] hover:bg-[#f5f7fa]"
                  }`}
                >
                  <Icon size={19} strokeWidth={item.active ? 3 : 2.4} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-[#eef0f3] p-5">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-[8px] p-2 text-left hover:bg-[#f5f7fa]"
              onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0052ff] text-[13px] font-bold text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold">{profile?.name || "Coinbase user"}</p>
                <p className="truncate text-[12px] text-[#5b616e]">{profile?.email || "Loading profile"}</p>
              </div>
            </button>
          </div>
        </aside>

        <main className="min-w-0 bg-white">
          <header className="flex h-16 items-center gap-4 border-b border-[#e6e8eb] px-5 md:px-6">
            <h1 className="hidden text-[16px] font-semibold md:block">Home</h1>
            <div className="mx-auto flex h-10 w-full max-w-[290px] items-center gap-3 rounded-full bg-[#f0f2f5] px-4 text-[#5b616e]">
              <Search size={18} />
              <input
                className="w-full bg-transparent text-[14px] outline-none placeholder:text-[#6b7280]"
                placeholder="Search"
                type="search"
              />
            </div>
            <button type="button" className="hidden h-10 items-center rounded-full bg-[#0052ff] px-5 text-[13px] font-bold text-white md:flex">
              Buy & Sell
            </button>
            <button type="button" className="hidden h-10 items-center rounded-full bg-[#eef0f3] px-5 text-[13px] font-bold md:flex">
              Send & Receive
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f7fa]">
              <Bell size={18} />
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f7fa]">
              <Grid3X3 size={18} />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0052ff] text-[13px] font-bold text-white"
              >
                {initials}
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 top-12 z-20 w-64 rounded-[8px] border border-[#e6e8eb] bg-white p-4 shadow-xl">
                  <p className="text-[15px] font-semibold">{profile?.name || "Coinbase user"}</p>
                  <p className="mt-1 break-all text-[13px] text-[#5b616e]">{profile?.email || "Profile loading"}</p>
                </div>
              )}
            </div>
          </header>

          <section className="border-b border-[#e6e8eb] px-5 py-6 md:px-6">
            <div className="grid gap-6 rounded-[8px] border border-[#e6e8eb] bg-[#f9fafb] p-5 shadow-[0_1px_2px_rgba(10,11,13,0.04)] md:grid-cols-[1fr_330px] md:items-center">
              <div>
                <p className="text-[12px] font-semibold text-[#5b616e]">My balance</p>
                <p className="mt-1 text-[30px] font-semibold tracking-[-0.03em]">$11,308.91</p>
              </div>
              <div className="justify-self-start md:justify-self-end">
                <MiniSparkline index={1} large />
              </div>
            </div>
          </section>

          <section className="px-5 py-6 md:px-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold tracking-[-0.02em]">Watchlist</h2>
              <button type="button" className="text-[13px] font-bold text-[#0052ff]">See all</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse">
                <thead>
                  <tr className="border-b border-[#eef0f3]">
                    <th className="w-[250px] px-5 pb-3 text-left text-[12px] font-semibold text-[#8a919e]">Asset</th>
                    <th className="min-w-[150px] px-5 pb-3 text-right text-[12px] font-semibold text-[#8a919e]">Price</th>
                    <th className="px-5 pb-3 text-center text-[12px] font-semibold text-[#8a919e]">Chart</th>
                    <th className="px-5 pb-3 text-right text-[12px] font-semibold text-[#8a919e]">24h change</th>
                    <th className="px-5 pb-3 text-right text-[12px] font-semibold text-[#8a919e]">Market cap</th>
                    <th className="px-5 pb-3 text-right text-[12px] font-semibold text-[#8a919e]">Trade</th>
                    <th className="px-5 pb-3 text-right text-[12px] font-semibold text-[#8a919e]">Watch</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((coin, index) => (
                    <tr key={coin.id} className="border-b border-[#e9ecef] last:border-b-0">
                      <td className="w-[250px] px-5 py-4">
                        <div className="flex items-center gap-4">
                          <CoinIcon coin={coin} index={index} />
                          <div>
                            <p className="text-[13px] font-bold">{coin.name}</p>
                            <p className="text-[12px] font-medium text-[#6b7280]">{coin.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="min-w-[150px] px-5 py-4 text-right text-[13px] font-medium">{coin.price}</td>
                      <td className="px-5 py-4 text-center">
                        <MiniSparkline index={index} positive={coin.change24h >= 0} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                            coin.change24h >= 0 ? "bg-[#e7f6ee] text-[#098551]" : "bg-[#fdecee] text-[#cf202f]"
                          }`}
                        >
                          {coin.change}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right text-[13px] font-medium">{getMarketCap(coin, index)}</td>
                      <td className="px-5 py-4 text-right">
                        <button type="button" className="rounded-full bg-[#0052ff] px-4 py-1.5 text-[13px] font-bold text-white">Buy</button>
                      </td>
                      <td className="px-5 py-4 text-right text-[#0052ff]">★</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-t border-[#e6e8eb] px-5 py-6 md:px-6">
            <p className="text-[18px] font-medium text-[#5b616e]">Monday, February 1</p>
            <div className="mt-6 grid gap-5 md:grid-cols-[320px_1fr]">
              <div className="h-40 rounded-[8px] bg-[#c7d7d5] p-4">
                <div className="h-full w-28 bg-[#f5ca22] shadow-[38px_20px_0_#ff8f4a,76px_42px_0_#0052ff]" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex items-center gap-3 text-[13px] font-semibold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0052ff] text-white">?</span>
                  Coinbase Learn
                  <span className="font-medium text-[#6b7280]">Explainers</span>
                </div>
                <h3 className="text-[16px] font-semibold">What is a non-fungible token (NFT)?</h3>
                <p className="mt-2 max-w-xl text-[14px] leading-6 text-[#5b616e]">
                  Non-fungible tokens are unique crypto assets. Learn how they work and why people collect them.
                </p>
              </div>
            </div>
          </section>
        </main>

        <aside className="hidden border-l border-[#d9dee7] bg-[#fbfcfd] px-5 py-6 lg:block">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Top movers</h2>
            <button type="button" className="text-[13px] font-bold text-[#0052ff]">See all</button>
          </div>

          <div className="rounded-[8px] border border-[#e6e8eb] bg-white px-4 py-2">
            {topMovers.map((coin, index) => (
              <div key={coin.id} className="flex items-center gap-3 border-b border-[#eef0f3] py-3 last:border-b-0">
                <CoinIcon coin={coin} index={index + 5} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold">{coin.name}</p>
                  <p className="text-[12px] font-medium text-[#6b7280]">{coin.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-medium">{coin.price}</p>
                  <p className={`mt-1 text-[12px] font-semibold ${coin.change24h >= 0 ? "text-[#098551]" : "text-[#cf202f]"}`}>
                    {coin.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="fixed bottom-4 left-4 right-4 z-10 flex justify-around rounded-full border border-[#e6e8eb] bg-white p-2 shadow-lg lg:hidden">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`flex h-11 w-11 items-center justify-center rounded-full ${item.active ? "bg-[#eef4ff] text-[#0052ff]" : "text-[#5b616e]"}`}
                aria-label={item.label}
              >
                <Icon size={20} />
              </button>
            );
          })}
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full text-[#0052ff]" aria-label="Send">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
