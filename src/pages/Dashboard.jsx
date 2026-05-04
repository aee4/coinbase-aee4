import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Bell,
  BookOpen,
  ArrowLeftRight,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Eye,
  Globe2,
  HelpCircle,
  Home,
  Minus,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Search,
  GraduationCap,
  TrendingUp,
  Wallet,
} from "lucide-react";
import api from "../api/api";
import AppQrCode from "../components/common/AppQrCode";

const navItems = [
  { label: "Home", icon: Home, to: "/dashboard", active: true },
  { label: "My assets", icon: Wallet, to: "/dashboard/assets" },
  { label: "Trade", icon: ArrowLeftRight, to: "/dashboard" },
  { label: "Earn", icon: TrendingUp, to: "/dashboard" },
  { label: "Learning rewards", icon: GraduationCap, to: "/learn" },
  { label: "Web3", icon: Globe2, to: "/dashboard" },
  { label: "Card", icon: CreditCard, to: "/dashboard" },
  { label: "More", icon: MoreHorizontal, to: "/dashboard" },
];

const chartPaths = [
  "M2 34 L8 28 L14 31 L20 19 L26 23 L32 12 L38 16 L44 8 L50 11 L56 4",
  "M2 22 L8 26 L14 16 L20 19 L26 11 L32 15 L38 7 L44 10 L50 5 L56 2",
  "M2 12 L8 18 L14 14 L20 24 L26 17 L32 21 L38 10 L44 15 L50 8 L56 11",
  "M2 28 L8 20 L14 25 L20 14 L26 17 L32 8 L38 12 L44 6 L50 10 L56 3",
];

const assetChartColors = ["#f7931a", "#0052ff", "#8247e5", "#0052ff", "#098551", "#cf202f"];

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

function MiniSparkline({ index, positive = true, large = false, color }) {
  const path = chartPaths[index % chartPaths.length];
  const stroke = color || (positive ? "#098551" : "#cf202f");
  const balancePath = "M1 30 C5 25 8 27 12 20 C16 13 20 16 24 18 C28 20 31 24 35 27 C39 31 43 25 47 20 C51 15 55 13 58 10 C62 7 65 12 69 9 C73 6 76 2 80 5 C84 8 87 3 90 7 C94 12 97 8 100 5";

  return (
    <svg
      className={large ? "h-48 w-full" : "h-10 w-24"}
      viewBox={large ? "0 0 100 38" : "0 0 58 38"}
      fill="none"
      aria-hidden="true"
    >
      {large ? (
        <>
          <path d={`${balancePath} L100 38 L1 38 Z`} fill="#0052ff" opacity="0.08" />
          <path
            d={balancePath}
            stroke="#0052ff"
            strokeWidth="1.7"
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
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
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

  const loadProfileDetails = async () => {
    setIsProfileLoading(true);
    setProfileError("");

    try {
      const profileResponse = await api.get("/profile").catch(() => api.get("/users/profile"));
      setProfile(normalizeProfile(profileResponse.data));
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("jwt");
      setProfileError("Unable to load profile.");
      setShouldRedirect(true);
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleProfileClick = () => {
    setIsProfileOpen((isOpen) => {
      const nextOpenState = !isOpen;

      if (nextOpenState) {
        loadProfileDetails();
      }

      return nextOpenState;
    });
  };

  const initials = useMemo(() => getInitials(profile?.name, profile?.email), [profile]);
  const visibleAssets = watchlist.slice(0, 4);
  const priceAssets = topMovers.length > 0 ? topMovers.slice(0, 3) : watchlist.slice(0, 3);

  if (shouldRedirect) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-[#0a0b0d]">
      <div className="grid min-h-screen lg:grid-cols-[245px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#e6e8eb] bg-white lg:flex lg:flex-col">
          <div className="flex h-[70px] items-center px-6">
            <span className="text-[27px] font-bold tracking-[-0.05em] text-[#0052ff]">coinbase</span>
          </div>

          <nav className="flex-1 space-y-3 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`group flex h-14 w-full items-center gap-4 rounded-[18px] px-5 text-left text-[14px] font-semibold transition-all duration-200 active:scale-[0.98] ${
                    item.active
                      ? "bg-[#f2f6ff] text-[#0052ff] shadow-[0_10px_26px_rgba(0,82,255,0.08)]"
                      : "border-transparent text-[#1f2937] hover:bg-[#f5f7fa] hover:text-[#0052ff]"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 ${
                      item.active ? "bg-[#0052ff] text-white shadow-sm" : "group-hover:bg-white group-hover:shadow-sm"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2.4} />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#eef0f3] px-5 py-5">
            <div className="mb-6 flex items-center justify-between text-[13px] font-medium text-[#5b616e]">
              <span>Advanced</span>
              <span className="flex h-5 w-9 items-center justify-end rounded-full bg-[#0052ff] p-0.5">
                <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
              </span>
            </div>
            <div className="rounded-[12px] bg-[#f7faff] p-4 shadow-[inset_0_0_0_1px_#edf2fb]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[13px] font-bold">Get the Coinbase app</p>
                  <p className="mt-1 text-[12px] leading-4 text-[#5b616e]">
                    Manage your assets
                    <br />
                    on the go
                  </p>
                </div>
                <AppQrCode />
              </div>
              <button type="button" className="mt-3 text-[12px] font-bold text-[#0052ff]">
                Download app
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 bg-[#fbfcfe]">
          <header className="flex h-[70px] items-center gap-4 border-b border-[#e6e8eb] bg-white px-5 md:px-7">
            <h1 className="mr-auto text-[21px] font-semibold tracking-[-0.03em]">Home</h1>
            <div className="hidden h-10 w-full max-w-[270px] items-center gap-3 rounded-full bg-[#f4f5f8] px-4 text-[#5b616e] md:flex">
              <Search size={18} />
              <input
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#6b7280]"
                placeholder="Search for an asset"
                type="search"
              />
            </div>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111827] shadow-[0_0_0_1px_#e6e8eb] transition-all duration-200 hover:bg-[#eef4ff] hover:text-[#0052ff] active:scale-95">
              <Bell size={18} />
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111827] shadow-[0_0_0_1px_#e6e8eb] transition-all duration-200 hover:bg-[#eef4ff] hover:text-[#0052ff] active:scale-95">
              <HelpCircle size={18} />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={handleProfileClick}
                className="flex h-10 items-center gap-2 rounded-full text-[13px] font-bold text-white transition-all duration-200 active:scale-95"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0052ff] shadow-[0_6px_16px_rgba(0,82,255,0.22)]">
                  {initials}
                </span>
                <ChevronDown size={16} className="text-[#111827]" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 top-12 z-20 w-64 rounded-[8px] border border-[#e6e8eb] bg-white p-4 shadow-xl">
                  {isProfileLoading ? (
                    <div className="flex items-center gap-3 text-[13px] font-semibold text-[#5b616e]">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0052ff] border-t-transparent" />
                      Loading profile
                    </div>
                  ) : profileError ? (
                    <p className="text-[13px] font-semibold text-[#cf202f]">{profileError}</p>
                  ) : (
                    <>
                      <p className="text-[15px] font-semibold">{profile?.name || "Coinbase user"}</p>
                      <p className="mt-1 break-all text-[13px] text-[#5b616e]">{profile?.email || "Profile loading"}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </header>

          <div className="grid gap-6 px-5 py-5 md:px-7 xl:grid-cols-[minmax(0,1fr)_350px]">
            <div className="space-y-5">
              <section className="rounded-[12px] border border-[#e1e6ef] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[17px] font-semibold">Your balance</p>
                      <Eye size={17} className="text-[#111827]" />
                    </div>
                    <p className="mt-4 text-[39px] font-medium tracking-[-0.05em]">$12,345.67</p>
                    <div className="mt-3 flex items-center gap-3 text-[14px]">
                      <span className="font-semibold text-[#098551]">↗ $1,234.56 (11.11%)</span>
                      <span className="text-[#5b616e]">All time</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-7 pt-14 text-[14px] font-medium text-[#5b616e]">
                    {["1H", "1D", "1W", "1M", "1Y", "ALL"].map((range) => (
                      <button
                        key={range}
                        type="button"
                        className={`rounded-full px-3 py-1 transition-colors duration-200 ${
                          range === "1M" ? "bg-[#eef4ff] text-[#0052ff]" : "hover:bg-[#f5f7fa]"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <MiniSparkline index={1} large />
                </div>
              </section>

              <section className="overflow-hidden rounded-[12px] border border-[#e1e6ef] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between px-6 py-5">
                  <h2 className="text-[18px] font-semibold">Your assets</h2>
                  <button type="button" className="flex h-10 items-center gap-2 rounded-full border border-[#e1e6ef] px-4 text-[14px] font-semibold transition-colors duration-200 hover:bg-[#f5f7fa]">
                    Balance
                    <ChevronDown size={16} />
                  </button>
                </div>

                <div>
                  {visibleAssets.map((coin, index) => (
                    <div key={coin.id} className="grid grid-cols-[minmax(170px,1.2fr)_130px_130px_105px_32px] items-center border-t border-[#eef0f3] px-6 py-4 transition-colors duration-200 hover:bg-[#fbfcff]">
                      <div className="flex items-center gap-4">
                        <CoinIcon coin={coin} index={index} />
                        <div>
                          <p className="text-[15px] font-semibold">{coin.name}</p>
                          <p className="text-[14px] text-[#5b616e]">{coin.symbol}</p>
                        </div>
                      </div>
                      <MiniSparkline index={index} positive={coin.change24h >= 0} color={assetChartColors[index]} />
                      <div>
                        <p className="text-[15px] font-medium">{coin.price}</p>
                        <p className="text-[14px] text-[#5b616e]">
                          {index === 0 ? "0.081 BTC" : index === 1 ? "0.7321 ETH" : index === 2 ? "8.29 SOL" : "1,081.39 USDC"}
                        </p>
                      </div>
                      <p className={`text-[15px] font-semibold ${coin.change24h >= 0 ? "text-[#098551]" : "text-[#cf202f]"}`}>
                        {coin.change24h >= 0 ? "↗" : "↘"} {coin.change.replace("+", "")}
                      </p>
                      <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full text-[#5b616e] transition-colors duration-200 hover:bg-[#f5f7fa] hover:text-[#0052ff]">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4">
                  <button type="button" className="h-12 w-full rounded-full bg-[#f4f5f8] text-[14px] font-semibold transition-colors duration-200 hover:bg-[#eef0f3]">
                    View all assets
                  </button>
                </div>
              </section>

              <section className="rounded-[12px] border border-[#e1e6ef] bg-white p-5">
                <h2 className="text-[17px] font-semibold">Explore Coinbase</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {["Recurring buys", "Learn rewards", "Wallet"].map((label, index) => (
                    <div key={label} className="h-28 rounded-[8px] bg-gradient-to-br from-[#eef4ff] to-[#f7f8fb] p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0052ff] text-white">
                        {index === 0 ? <TrendingUp size={18} /> : index === 1 ? <BookOpen size={18} /> : <Wallet size={18} />}
                      </div>
                      <p className="mt-4 text-[14px] font-semibold">{label}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <section className="grid grid-cols-4 gap-4 rounded-[12px] border border-[#e1e6ef] bg-white p-6">
                {[
                  { label: "Buy", icon: Plus },
                  { label: "Sell", icon: Minus },
                  { label: "Send", icon: ArrowUp },
                  { label: "Receive", icon: ArrowDown },
                ].map((action) => {
                  const Icon = action.icon;

                  return (
                    <button key={action.label} type="button" className="group flex flex-col items-center gap-3 text-[13px] font-medium">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0052ff] text-white shadow-[0_8px_18px_rgba(0,82,255,0.25)] transition-transform duration-200 group-hover:-translate-y-0.5">
                        <Icon size={22} />
                      </span>
                      {action.label}
                    </button>
                  );
                })}
              </section>

              <section className="rounded-[12px] border border-[#e1e6ef] bg-white p-5">
                <h2 className="text-[18px] font-semibold">For you</h2>
                <div className="mt-5 space-y-5">
                  {[
                    { title: "Earn 4.1% APY on USDC", body: "Add USDC to your balance to earn monthly rewards", icon: CircleDollarSign },
                    { title: "Learn and earn", body: "Earn $3 in BTC by watching a short video", icon: BookOpen },
                    { title: "Get started with Web3", body: "Explore decentralized apps and more", icon: Globe2 },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <button key={item.title} type="button" className="flex w-full items-center gap-4 rounded-[8px] text-left transition-colors duration-200 hover:bg-[#f8faff]">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[#0052ff]">
                          <Icon size={22} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-semibold">{item.title}</span>
                          <span className="mt-1 block text-[13px] leading-5 text-[#5b616e]">{item.body}</span>
                        </span>
                        <ChevronRight size={18} className="text-[#5b616e]" />
                      </button>
                    );
                  })}
                </div>
                <button type="button" className="mt-4 w-full text-center text-[14px] font-semibold text-[#0052ff]">View more</button>
              </section>

              <section className="rounded-[12px] border border-[#e1e6ef] bg-white p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-[18px] font-semibold">Prices</h2>
                  <button type="button" className="flex h-9 items-center gap-1 rounded-full border border-[#e1e6ef] px-3 text-[13px] font-semibold">
                    Watchlist
                    <ChevronDown size={14} />
                  </button>
                </div>
                <div className="space-y-5">
                  {priceAssets.map((coin, index) => (
                    <div key={coin.id} className="grid grid-cols-[1fr_90px_86px] items-center gap-3">
                      <div className="flex items-center gap-3">
                        <CoinIcon coin={coin} index={index} />
                        <div>
                          <p className="text-[14px] font-semibold">{coin.name}</p>
                          <p className="text-[13px] text-[#5b616e]">{coin.symbol}</p>
                        </div>
                      </div>
                      <MiniSparkline index={index} positive={coin.change24h >= 0} color={assetChartColors[index]} />
                      <div className="text-right">
                        <p className="text-[14px] font-medium">{coin.price}</p>
                        <p className={`mt-1 text-[13px] font-semibold ${coin.change24h >= 0 ? "text-[#098551]" : "text-[#cf202f]"}`}>
                          {coin.change24h >= 0 ? "↗" : "↘"} {coin.change.replace("+", "")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-6 w-full text-center text-[14px] font-semibold text-[#0052ff]">View all assets</button>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
