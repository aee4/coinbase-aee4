import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Eye,
  Grid2X2,
  HelpCircle,
  Home,
  LayoutList,
  MoreHorizontal,
  MoreVertical,
  Search,
  ArrowLeftRight,
  TrendingUp,
  Wallet,
  CreditCard,
  BookOpen,
  Globe2,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import api from "../api/api";
import { getProfile } from "../api/profile";
import { clearAuthTokens } from "../utils/auth";
import bitcoinLogo from "../assets/images/bitcoin.png";
import ethereumLogo from "../assets/images/ethereum.png";
import solanaLogo from "../assets/images/solana.png";
import usdcLogo from "../assets/images/usdc.png";
import dogecoinLogo from "../assets/images/dogecoin.png";
import avalancheLogo from "../assets/images/aventus.png";
import AppQrCode from "../components/common/AppQrCode";

const navItems = [
  { label: "Home", icon: Home, to: "/dashboard" },
  { label: "My assets", icon: Wallet, to: "/dashboard/assets", active: true },
  { label: "Trade", icon: BarChart3, to: "/dashboard/assets" },
  { label: "Earn", icon: TrendingUp, to: "/dashboard/assets" },
  { label: "Web3", icon: Globe2, to: "/dashboard/assets" },
  { label: "Card", icon: CreditCard, to: "/dashboard/assets" },
  { label: "Learn", icon: BookOpen, to: "/learn" },
  { label: "More", icon: MoreHorizontal, to: "/dashboard/assets" },
];

const assets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: bitcoinLogo,
    balance: "0.081 BTC",
    price: "$67,123.45",
    change: 2.56,
    value: "$5,441.05",
    allocation: "50.1%",
    color: "#0052ff",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: ethereumLogo,
    balance: "0.7321 ETH",
    price: "$3,451.67",
    change: -1.39,
    value: "$2,529.18",
    allocation: "20.3%",
    color: "#8247e5",
  },
  {
    name: "Solana",
    symbol: "SOL",
    logo: solanaLogo,
    balance: "8.29 SOL",
    price: "$145.22",
    change: 4.39,
    value: "$1,204.77",
    allocation: "10.6%",
    color: "#f59e0b",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    logo: usdcLogo,
    balance: "1,081.39 USDC",
    price: "$1.00",
    change: 0.01,
    value: "$1,081.39",
    allocation: "7.8%",
    color: "#75cbd4",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    logo: dogecoinLogo,
    balance: "2,500.00 DOGE",
    price: "$0.1224",
    change: 3.24,
    value: "$306.00",
    allocation: "2.8%",
    color: "#d6b64d",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    logo: avalancheLogo,
    balance: "3.12 AVAX",
    price: "$36.38",
    change: -2.45,
    value: "$113.46",
    allocation: "0.9%",
    color: "#ef4444",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    balance: "153.23 MATIC",
    price: "$0.56",
    change: 1.15,
    value: "$85.81",
    allocation: "0.6%",
    color: "#8247e5",
  },
];

const allocation = [
  { label: "Bitcoin", value: "50.1%", color: "#0052ff" },
  { label: "Ethereum", value: "20.3%", color: "#8247e5" },
  { label: "Solana", value: "10.6%", color: "#f59e0b" },
  { label: "USD Coin", value: "7.8%", color: "#75cbd4" },
  { label: "Other assets", value: "11.2%", color: "#cbd5e1" },
];

const getInitials = (name, email) => {
  const source = name || email || "AK";
  return source
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

function Sidebar({ onLogout }) {
  return (
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
        <button
          type="button"
          onClick={onLogout}
          className="mt-4 h-10 w-full rounded-full text-[13px] font-semibold text-[#5b616e] transition-colors duration-200 hover:bg-[#f5f7fa] hover:text-[#cf202f]"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[64px] border-t border-[#e6e8eb] bg-white px-2 lg:hidden">
      <div className="grid w-full grid-cols-5">
        {navItems.slice(0, 5).map((item) => {
          const NavIcon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex min-h-11 flex-col items-center justify-center gap-1 text-[10px] font-bold ${
                item.active ? "text-[#0052ff]" : "text-[#5b616e]"
              }`}
            >
              <NavIcon size={20} strokeWidth={item.active ? 2.8 : 2.2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function BalanceChart() {
  const path =
    "M2 86 L18 86 L30 76 L42 80 L54 64 L66 58 L78 42 L90 52 L102 48 L114 56 L126 45 L138 43 L150 37 L162 56 L174 68 L186 62 L198 72 L210 59 L222 70 L234 63 L246 78 L258 84 L270 74 L282 89 L294 79 L306 73 L318 78 L330 62 L342 54 L354 50 L366 44 L378 56 L390 47 L402 61 L414 58 L426 41 L438 45 L450 35 L462 32 L474 21 L486 28 L498 25 L510 36 L522 27 L534 35 L546 26 L558 18 L570 25 L582 41 L594 32 L606 28 L618 43 L630 38 L642 22 L654 31";

  return (
    <svg className="h-[148px] w-full" viewBox="0 0 656 112" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d={`${path} L654 112 L2 112 Z`} fill="#0052ff" opacity="0.03" />
      <path d={path} stroke="#0052ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DonutChart() {
  return (
    <div className="flex items-center gap-9 max-[480px]:flex-col max-[480px]:items-start">
      <div
        className="h-[166px] w-[166px] rounded-full"
        style={{
          background:
            "conic-gradient(#0052ff 0deg 180deg, #8247e5 180deg 253deg, #f59e0b 253deg 291deg, #75cbd4 291deg 319deg, #cbd5e1 319deg 360deg)",
        }}
      >
        <div className="m-auto mt-[42px] h-[82px] w-[82px] rounded-full bg-white" />
      </div>
      <div className="min-w-[170px] space-y-4 max-[480px]:w-full">
        {allocation.map((item) => (
          <div key={item.label} className="grid grid-cols-[14px_1fr_auto] items-center gap-3 text-[14px]">
            <span className="h-[9px] w-[9px] rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-medium text-[#1f2937]">{item.label}</span>
            <span className="font-semibold text-[#0a0b0d]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoinIcon({ asset }) {
  if (asset.logo) {
    return <img src={asset.logo} alt="" className="h-9 w-9 rounded-full bg-[#eef2f7] object-cover" />;
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8247e5] text-[13px] font-bold text-white">
      {asset.symbol.slice(0, 1)}
    </div>
  );
}

function Assets() {
  const [profile, setProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        if (isMounted) {
          setProfile(await getProfile());
        }
      } catch {
        if (isMounted) {
          clearAuthTokens();
          setShouldRedirect(true);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadProfileDetails = async () => {
    setIsProfileLoading(true);
    setProfileError("");

    try {
      setProfile(await getProfile());
    } catch {
      clearAuthTokens();
      setProfileError("Unable to load profile.");
      setShouldRedirect(true);
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleProfileClick = () => {
    setIsProfileOpen((isOpen) => {
      const nextOpenState = !isOpen;

      if (nextOpenState && !profile) {
        loadProfileDetails();
      }

      return nextOpenState;
    });
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAuthTokens();
      navigate("/signin", { replace: true });
    }
  };

  const initials = useMemo(() => getInitials(profile?.name, profile?.email), [profile]);

  if (shouldRedirect) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-white pb-[64px] text-[#0a0b0d] lg:pb-0">
      <div className="grid min-h-screen lg:grid-cols-[245px_minmax(0,1fr)]">
        <Sidebar onLogout={handleLogout} />

        <main className="min-w-0 bg-[#fbfcfe]">
          <header className="flex min-h-[70px] items-center gap-4 border-b border-[#e6e8eb] bg-white px-5 md:px-7 max-[480px]:flex-wrap max-[480px]:gap-3 max-[480px]:py-3">
            <h1 className="mr-auto text-[21px] font-semibold tracking-[-0.03em] max-[480px]:w-full max-[480px]:text-[18px]">My assets</h1>
            <div className="hidden h-10 w-full max-w-[300px] items-center gap-3 rounded-full bg-[#f4f5f8] px-4 text-[#5b616e] md:flex">
              <Search size={18} />
              <input className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#6b7280]" placeholder="Search for an asset" type="search" />
            </div>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111827] shadow-[0_0_0_1px_#e6e8eb] transition-all duration-200 hover:bg-[#eef4ff] hover:text-[#0052ff] active:scale-95">
              <Bell size={18} />
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111827] shadow-[0_0_0_1px_#e6e8eb] transition-all duration-200 hover:bg-[#eef4ff] hover:text-[#0052ff] active:scale-95">
              <HelpCircle size={18} />
            </button>
            <div className="relative">
              <button type="button" onClick={handleProfileClick} className="flex h-10 items-center gap-2 rounded-full text-[13px] font-bold text-white transition-all duration-200 active:scale-95">
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

          <div className="px-5 py-5 md:px-7">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,1fr)]">
              <section className="w-full rounded-[12px] border border-[#e1e6ef] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.03)] max-[480px]:p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[17px] font-semibold">My balance</p>
                      <Eye size={17} className="text-[#111827]" />
                    </div>
                    <p className="mt-4 text-[39px] font-medium tracking-[-0.05em] max-[480px]:text-[22px]">$12,345.67</p>
                    <div className="mt-3 flex items-center gap-2 text-[14px]">
                      <span className="font-semibold text-[#098551]">↗ $1,234.56 (11.11%)</span>
                      <span className="text-[#5b616e]">all time</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pt-2 text-[13px] font-medium text-[#5b616e] sm:pt-8">
                    {["1H", "1D", "1W", "1M", "1Y", "ALL"].map((range) => (
                      <button key={range} type="button" className={`rounded-full px-2.5 py-1 transition-colors duration-200 ${range === "1M" ? "bg-[#eef4ff] text-[#0052ff]" : "hover:bg-[#f5f7fa]"}`}>
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <BalanceChart />
                </div>
              </section>

              <section className="w-full overflow-hidden rounded-[12px] border border-[#e1e6ef] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.03)] max-[480px]:p-4">
                <h2 className="text-[18px] font-semibold max-[480px]:text-[15px]">Portfolio allocation</h2>
                <div className="mt-6">
                  <DonutChart />
                </div>
              </section>
            </div>

            <section className="mt-5 overflow-hidden rounded-[12px] border border-[#e1e6ef] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
                <h2 className="text-[18px] font-semibold max-[480px]:text-[15px]">My assets</h2>
                <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium">
                  <label className="flex items-center gap-2 text-[#1f2937]">
                    <input type="checkbox" className="h-4 w-4 accent-[#0052ff]" />
                    Hide zero balances
                  </label>
                  <button type="button" className="flex h-10 min-w-[174px] items-center justify-between rounded-full border border-[#e1e6ef] px-4 font-semibold text-[#1f2937]">
                    All assets
                    <ChevronDown size={16} />
                  </button>
                  <div className="flex h-10 items-center rounded-full border border-[#e1e6ef] bg-white p-1">
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f5f8] text-[#111827]">
                      <LayoutList size={17} />
                    </button>
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280]">
                      <Grid2X2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <table className="w-full min-w-[920px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#eef0f3] text-[12px] font-semibold text-[#374151]">
                      <th className="px-6 py-3">Asset <span className="text-[#0052ff]">⌃</span></th>
                      <th className="px-4 py-3">Balance</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Change (24h)</th>
                      <th className="px-4 py-3">Value <span className="text-[#0052ff]">⌄</span></th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.symbol} className="border-b border-[#eef0f3] text-[14px] transition-colors duration-200 last:border-b-0 hover:bg-[#fbfcff]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <CoinIcon asset={asset} />
                            <div>
                              <p className="font-semibold">{asset.name}</p>
                              <p className="mt-0.5 text-[#5b616e]">{asset.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium text-[#374151]">{asset.balance}</td>
                        <td className="px-4 py-4 font-medium">{asset.price}</td>
                        <td className={`px-4 py-4 font-semibold ${asset.change >= 0 ? "text-[#098551]" : "text-[#cf202f]"}`}>
                          {asset.change >= 0 ? "↗" : "↘"} {Math.abs(asset.change).toFixed(2)}%
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium">{asset.value}</p>
                          <p className="mt-0.5 text-[#5b616e]">{asset.allocation}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-7 text-[13px] font-bold text-[#0052ff]">
                            <button type="button">Buy</button>
                            <button type="button">Sell</button>
                            <button type="button">Convert</button>
                            <button type="button" className="text-[#5b616e]">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 px-4 pb-4 md:hidden">
                {assets.length > 0 ? (
                  assets.map((asset) => (
                    <div key={asset.symbol} className="rounded-[8px] border border-[#eef0f3] bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <CoinIcon asset={asset} />
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-semibold">{asset.name}</p>
                            <p className="mt-0.5 truncate text-[12px] text-[#5b616e]">{asset.symbol}</p>
                          </div>
                        </div>
                        <p className="shrink-0 text-right text-[14px] font-semibold">{asset.value}</p>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                        <div>
                          <p className="text-[#5b616e]">Balance</p>
                          <p className="mt-1 font-semibold text-[#374151]">{asset.balance}</p>
                        </div>
                        <div>
                          <p className="text-[#5b616e]">Price</p>
                          <p className="mt-1 font-semibold">{asset.price}</p>
                        </div>
                        <div>
                          <p className="text-[#5b616e]">Change (24h)</p>
                          <p className={`mt-1 font-semibold ${asset.change >= 0 ? "text-[#098551]" : "text-[#cf202f]"}`}>
                            {asset.change >= 0 ? "up" : "down"} {Math.abs(asset.change).toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-[#5b616e]">Allocation</p>
                          <p className="mt-1 font-semibold">{asset.allocation}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2 text-[13px] font-bold text-[#0052ff]">
                        <button type="button" className="min-h-11 rounded-full bg-[#f4f5f8]">Buy</button>
                        <button type="button" className="min-h-11 rounded-full bg-[#f4f5f8]">Sell</button>
                        <button type="button" className="min-h-11 rounded-full bg-[#f4f5f8]">Convert</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[8px] border border-[#eef0f3] p-4 text-center text-[14px] text-[#5b616e]">
                    No assets available
                  </p>
                )}
              </div>

              <div className="border-t border-[#eef0f3] px-6 py-4 text-center">
                <button type="button" className="inline-flex items-center gap-2 text-[14px] font-semibold">
                  View more assets
                  <ChevronDown size={16} />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default Assets;
