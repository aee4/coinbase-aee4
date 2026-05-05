import { createElement, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  CandlestickChart,
  CircleHelp,
  Coins,
  Grid3X3,
  Home,
  LineChart,
  MoreVertical,
  ReceiptText,
  Search,
  Shield,
  WalletCards,
} from "lucide-react";
import api from "../api/api";
import { getProfile } from "../api/profile";
import { clearAuthTokens } from "../utils/auth";

const getInitials = (name, email) => {
  const source = name || email || "M";
  return source
    .split(/[ @]/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Markets", icon: LineChart },
  { label: "Cash", icon: WalletCards },
  { label: "Activity", icon: ReceiptText },
  { label: "More", icon: MoreVertical },
];

const cryptoRows = [
  { name: "Bitcoin", subtitle: "Most popular", symbol: "B", color: "#f7931a", action: "Buy" },
  { name: "Ethereum", subtitle: "Most popular", symbol: "ETH", color: "#627eea", action: "Buy" },
  { name: "Dogecoin", subtitle: "Most traded today", symbol: "D", color: "#c2a633", action: "Buy", muted: true },
];

const derivativeRows = [
  { name: "BTC Perpetual", symbol: "B", color: "#f7931a" },
  { name: "ETH Perpetual", symbol: "ETH", color: "#627eea" },
  { name: "SOL Perpetual", symbol: "SOL", color: "#111827", muted: true },
];

function CoinbaseMark() {
  return (
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 rounded-full border-[8px] border-[#0052ff]" />
      <div className="absolute right-0 top-1/2 h-2 w-5 -translate-y-1/2 bg-white" />
    </div>
  );
}

function CoinBadge({ color, symbol }) {
  const isEth = symbol === "ETH";
  const isSol = symbol === "SOL";

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[19px] font-bold text-white" style={{ backgroundColor: color }}>
      {isEth ? (
        <span className="relative h-6 w-4">
          <span className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-x-[8px] border-b-[13px] border-x-transparent border-b-white/90" />
          <span className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[8px] border-t-[13px] border-x-transparent border-t-white/70" />
        </span>
      ) : isSol ? (
        <span className="flex h-5 w-6 flex-col justify-between">
          <span className="h-1.5 rounded-full bg-[#14f195]" />
          <span className="h-1.5 rounded-full bg-[#9945ff]" />
          <span className="h-1.5 rounded-full bg-[#14f195]" />
        </span>
      ) : (
        symbol
      )}
    </span>
  );
}

function UnsupportedIllustration() {
  return (
    <div className="relative mx-auto h-[92px] w-[92px]" aria-hidden="true">
      <div className="absolute left-3 top-0 h-[76px] w-[76px] bg-[#69707d]" />
      <div className="absolute left-3 top-0 h-[76px] w-[76px] rounded-br-full border-b-[11px] border-l-[11px] border-[#4f5866]" />
      <div className="absolute left-3 top-0 h-[76px] w-[76px] rounded-br-full border-r-[11px] border-t-[11px] border-[#5a8bff]" />
      <div className="absolute left-6 top-2 h-[54px] w-[54px] rounded-full border-[6px] border-[#1fd5e4]" />
      <div className="absolute left-[34px] top-[20px] h-[42px] w-[42px] rounded-full border-[6px] border-[#f4d35e]" />
      <div className="absolute left-[50px] top-0 h-[76px] w-[38px] bg-white" />
      <div className="absolute left-[50px] top-[38px] h-[38px] w-[38px] border-b-[10px] border-r-[10px] border-[#5a8bff]" />
      <div className="absolute left-[50px] top-[20px] h-[42px] w-[42px] rounded-full border-[5px] border-[#f4d35e]" />
    </div>
  );
}

function WatchlistIllustration() {
  return (
    <div className="relative mx-auto h-[38px] w-[38px]" aria-hidden="true">
      <span className="absolute left-[14px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#f4d35e] text-[15px] font-semibold text-[#0a0b0d]">+</span>
      <span className="absolute left-0 top-5 h-4 w-4 rounded-full bg-[#5a8bff]" />
      <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#4f5866]" />
      <span className="absolute left-0.5 top-5 h-4 w-4 rounded-full bg-[#0a0b0d]/70" />
      <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#0a0b0d]/70" />
    </div>
  );
}

function SideRail() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-16 flex-col border-r border-[#e6e8eb] bg-white max-[768px]:hidden">
      <div className="flex h-14 items-center justify-center">
        <CoinbaseMark />
      </div>
      <nav className="flex flex-1 flex-col items-center gap-4 pt-3">
        {navItems.map(({ label, icon, active }) => (
          <button key={label} type="button" aria-label={label} className={`group relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${active ? "bg-[#eef4ff] text-[#0052ff]" : "text-[#0a0b0d] hover:bg-[#f7f8fa]"}`}>
            {createElement(icon, { size: 20, strokeWidth: active ? 0 : 2.5, fill: active ? "currentColor" : "none" })}
            <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 rounded bg-[#20242d] px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              {label}
            </span>
          </button>
        ))}
      </nav>
      <div className="pb-4 text-center text-[#0a0b0d]">
        <CandlestickChart className="mx-auto" size={20} strokeWidth={2.4} />
        <p className="mt-2 text-[10px] font-bold">Advanced</p>
        <button className="mx-auto mt-3 flex h-[22px] w-10 items-center rounded-full bg-[#dfe3eb] p-1" type="button" aria-label="Advanced mode">
          <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
        </button>
      </div>
    </aside>
  );
}

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 hidden h-[64px] border-t border-[#e6e8eb] bg-white px-3 max-[768px]:flex">
      <div className="grid w-full grid-cols-5">
        {navItems.map(({ label, icon, active }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className={`flex min-h-11 flex-col items-center justify-center gap-1 text-[10px] font-bold ${
              active ? "text-[#0052ff]" : "text-[#5b616e]"
            }`}
          >
            {createElement(icon, { size: 20, strokeWidth: active ? 2.8 : 2.2 })}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function Header({ profile, profileOpen, profileError, onProfileClick, onLogout }) {
  const initials = useMemo(() => getInitials(profile?.name, profile?.email), [profile]);

  return (
    <header className="sticky top-0 z-20 grid h-14 grid-cols-[1fr_auto] items-center border-b border-[#e6e8eb] bg-white px-6 max-[768px]:h-auto max-[768px]:grid-cols-1 max-[768px]:gap-3 max-[768px]:px-4 max-[768px]:py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="hidden items-center gap-3 max-[768px]:flex">
          <CoinbaseMark />
          <span className="text-[18px] font-bold text-[#0052ff]">coinbase</span>
        </div>
        <h1 className="text-[18px] font-semibold tracking-[-0.03em] text-[#0a0b0d] max-[768px]:hidden">Home</h1>
      </div>
      <div className="flex items-center gap-3 max-[768px]:w-full">
        <label className="flex h-10 w-[360px] max-w-[34vw] items-center gap-3 rounded-full bg-[#f4f5f8] px-5 max-[768px]:min-h-11 max-[768px]:w-full max-[768px]:max-w-none max-[768px]:px-4">
          <Search size={18} className="text-[#0a0b0d]" strokeWidth={2.5} />
          <input className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-[#0a0b0d] outline-none placeholder:text-[#6b7280] max-[480px]:text-[14px]" placeholder="Search" type="search" />
        </label>
        {[
          { label: "Notifications", icon: Bell },
          { label: "Help", icon: CircleHelp },
          { label: "Apps", icon: Grid3X3 },
        ].map(({ label, icon }) => (
          <button key={label} type="button" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d] transition-colors hover:bg-[#e9edf5] max-[768px]:hidden">
            {createElement(icon, { size: 18 })}
          </button>
        ))}
        <div className="relative">
          <button onClick={onProfileClick} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0aa7d6] text-[16px] font-medium text-black max-[768px]:h-11 max-[768px]:w-11" type="button" aria-label="Profile">
            {initials}
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 z-40 w-[280px] rounded-[12px] border border-[#e6e8eb] bg-white p-4 text-left shadow-[0_14px_40px_rgba(15,23,42,0.14)]">
              <p className="text-[16px] font-bold text-[#0a0b0d]">{profile?.name || "Coinbase user"}</p>
              <p className="mt-1 break-all text-[14px] font-medium text-[#5b616e]">{profile?.email || (profileError ? "Unable to load profile" : "Loading profile")}</p>
              <button onClick={onLogout} type="button" className="mt-4 h-10 w-full rounded-full bg-[#f4f5f8] text-[14px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function SectionArrow({ label }) {
  return (
    <button type="button" aria-label={label} className="absolute right-6 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d] hover:bg-[#e9edf5]">
      <ArrowRight size={20} />
    </button>
  );
}

function SummarySection() {
  return (
    <section className="border-b border-[#e6e8eb] px-6 py-5 max-[768px]:w-full max-[768px]:px-4">
      <h2 className="text-[30px] font-medium tracking-[-0.05em] text-[#0a0b0d] max-[768px]:text-[22px]">GHS 0.00</h2>
      <div className="mt-6 space-y-3.5">
        {[
          { label: "Crypto", value: "GHS 0.00", icon: Coins },
          { label: "Cash", value: "Deposit", detail: "3.35% APY", icon: WalletCards, accent: true },
          { label: "Derivatives", value: "0 positions", icon: Shield },
        ].map(({ label, value, detail, icon, accent }) => (
          <button key={label} type="button" className="grid min-h-11 w-full grid-cols-[1fr_auto_24px] items-center gap-4 text-left max-[480px]:grid-cols-[1fr_20px]">
            <span className="flex items-center gap-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d]">
                {createElement(icon, { size: 20, strokeWidth: 2.4 })}
              </span>
              <span className="text-[17px] font-bold text-[#0a0b0d]">
                {label}
                {detail && <span className="font-medium text-[#00a86b]"> · {detail}</span>}
              </span>
            </span>
            <span className={`text-[16px] font-bold max-[480px]:hidden ${accent ? "text-[#0052ff]" : "text-[#0a0b0d]"}`}>{value}</span>
            <ArrowRight className="text-[#7c8595]" size={20} />
          </button>
        ))}
      </div>
    </section>
  );
}

function WatchlistSection() {
  return (
    <section className="relative border-b border-[#e6e8eb] px-6 py-6 max-[768px]:w-full max-[768px]:px-4">
      <SectionArrow label="Open watchlist" />
      <h2 className="text-[20px] font-bold text-[#0a0b0d] max-[768px]:text-[15px]">Watchlist</h2>
      <div className="mx-auto mt-5 flex max-w-[680px] flex-col items-center text-center">
        <WatchlistIllustration />
        <h3 className="mt-3 text-[15px] font-bold tracking-[-0.01em] text-[#0a0b0d]">Build your watchlist</h3>
        <p className="mt-2 text-[14px] font-medium text-[#6b7280]">Keep track of crypto prices by adding assets to your watchlist</p>
        <button type="button" className="mt-5 h-10 w-full rounded-full bg-[#f4f5f8] text-[15px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]">
          Add to watchlist
        </button>
      </div>
    </section>
  );
}

function CryptoSection() {
  return (
    <section className="relative border-b border-[#e6e8eb] px-6 py-5 max-[768px]:w-full max-[768px]:px-4">
      <SectionArrow label="Open crypto" />
      <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#0a0b0d] max-[768px]:text-[15px]">Crypto</h2>
      <p className="mt-1.5 text-[17px] font-medium text-[#5b616e] max-[768px]:text-[14px]">Trade millions of assets</p>
      <div className="mt-8">
        {cryptoRows.map((coin) => (
          <div key={coin.name} className={`grid min-h-[72px] grid-cols-[1fr_76px] items-center gap-4 max-[480px]:grid-cols-1 max-[480px]:py-3 ${coin.muted ? "bg-[#f7f8fa]" : ""}`}>
            <div className="flex items-center gap-5">
              <CoinBadge color={coin.color} symbol={coin.symbol} />
              <div>
                <p className={`text-[20px] font-bold leading-tight ${coin.muted ? "text-[#303642]" : "text-[#0a0b0d]"}`}>{coin.name}</p>
                <p className="mt-1 text-[18px] font-medium leading-tight text-[#5b616e]">{coin.subtitle}</p>
              </div>
            </div>
            <button type="button" className="h-11 rounded-full bg-[#f4f5f8] text-[18px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5] max-[480px]:w-full max-[480px]:text-[15px]">
              {coin.action}
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 h-10 w-full rounded-full bg-[#f4f5f8] text-[15px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]">
        Explore all crypto
      </button>
    </section>
  );
}

function CashSection() {
  return (
    <section className="relative border-b border-[#e6e8eb] px-6 py-6 max-[768px]:w-full max-[768px]:px-4">
      <SectionArrow label="Open cash" />
      <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#0a0b0d] max-[768px]:text-[15px]">Cash</h2>
      <p className="mt-2 text-[17px] font-medium text-[#5b616e] max-[768px]:text-[14px]">
        Earn <span className="text-[#00c176]">3.35% APY</span>
      </p>
      <button type="button" className="mt-10 h-10 w-full rounded-full bg-[#f4f5f8] text-[15px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]">
        Deposit cash
      </button>
    </section>
  );
}

function DerivativesSection() {
  return (
    <section className="relative border-b border-[#e6e8eb] px-6 py-5 max-[768px]:w-full max-[768px]:px-4">
      <SectionArrow label="Open derivatives" />
      <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#0a0b0d] max-[768px]:text-[15px]">Derivatives</h2>
      <p className="mt-1.5 text-[16px] font-medium text-[#5b616e] max-[768px]:text-[14px]">Trade with up to 50x leverage</p>
      <div className="mt-8">
        {derivativeRows.map((coin) => (
          <div key={coin.name} className={`grid min-h-[72px] grid-cols-[1fr_76px] items-center gap-4 max-[480px]:grid-cols-1 max-[480px]:py-3 ${coin.muted ? "bg-[#f7f8fa]" : ""}`}>
            <div className="flex items-center gap-5">
              <CoinBadge color={coin.color} symbol={coin.symbol} />
              <div>
                <p className={`text-[20px] font-bold leading-tight ${coin.muted ? "text-[#303642]" : "text-[#0a0b0d]"}`}>
                  {coin.name} <span className="rounded-[5px] bg-[#eef0f3] px-1.5 py-0.5 text-[15px] text-[#5b616e]">50X</span>
                </p>
                <p className="mt-1 text-[16px] font-medium leading-tight text-[#5b616e]">INTX</p>
              </div>
            </div>
            <button type="button" className="h-11 rounded-full bg-[#f4f5f8] text-[18px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5] max-[480px]:w-full max-[480px]:text-[15px]">
              Trade
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterLinks() {
  return (
    <footer className="px-6 py-6 text-[#5b616e] max-[768px]:px-4 max-[768px]:pb-24">
      <div className="flex flex-wrap items-center gap-6 text-[14px]">
        <a className="underline" href="#">Careers</a>
        <a className="underline" href="#">Legal & Privacy</a>
        <a className="underline" href="#">Accessibility Statement</a>
        <span>© 2026 Coinbase</span>
      </div>
      <button type="button" className="mt-6 flex h-10 items-center gap-2 rounded-full bg-[#f4f5f8] px-4 text-[15px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]">
        English <span className="text-[18px]">⌄</span>
      </button>
    </footer>
  );
}

function BuyPanel() {
  return (
    <aside className="border-l border-[#e6e8eb] bg-white max-[768px]:border-l-0 max-[768px]:border-t">
      <div className="sticky top-14 max-[768px]:static">
        <section className="border-b border-[#e6e8eb] px-7 py-5 max-[768px]:px-4">
          <div className="inline-flex h-10 rounded-full bg-[#f4f5f8] p-1">
            {["Buy", "Sell", "Convert"].map((tab, index) => (
              <button key={tab} type="button" className={`h-8 rounded-full px-4 text-[14px] font-bold ${index === 0 ? "bg-white text-[#0a0b0d] shadow-sm" : "text-[#20242d]"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center text-center">
            <UnsupportedIllustration />
            <h2 className="mt-8 text-[25px] font-bold tracking-[-0.04em] text-[#0a0b0d]">Buys not supported</h2>
            <p className="mt-4 max-w-[330px] text-[15px] font-medium leading-[1.45] text-[#0a0b0d]">
              Coinbase doesn't currently support buys in your country. Subscribe to our blog to be notified when we add support for your country.
            </p>
            <button type="button" className="mt-8 h-12 w-full max-w-[300px] rounded-full bg-[#0052ff] text-[15px] font-bold text-white">
              Subscribe now
            </button>
          </div>
        </section>
        <section className="space-y-5 px-7 py-7">
          {[
            { label: "Send crypto", icon: ArrowUp },
            { label: "Receive crypto", icon: ArrowDown },
          ].map(({ label, icon }) => (
            <button key={label} type="button" className="flex items-center gap-4 text-[18px] font-bold text-[#0a0b0d]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0052ff] text-white">
                {createElement(icon, { size: 22 })}
              </span>
              {label}
            </button>
          ))}
        </section>
      </div>
    </aside>
  );
}

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileError, setProfileError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        if (isMounted) {
          setProfile(await getProfile());
          setProfileError("");
        }
      } catch {
        if (isMounted) {
          setProfileError("Unable to load profile");
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAuthTokens();
      navigate("/signin", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0a0b0d] max-[768px]:pb-[64px]">
      <SideRail />
      <div className="ml-16 min-h-screen max-[768px]:ml-0">
        <Header
          profile={profile}
          profileOpen={profileOpen}
          profileError={profileError}
          onProfileClick={() => setProfileOpen((isOpen) => !isOpen)}
          onLogout={handleLogout}
        />
        <main className="grid min-h-[calc(100vh-56px)] grid-cols-[minmax(0,1fr)_420px] max-[768px]:grid-cols-1">
          <div className="min-w-0">
            <SummarySection />
            <WatchlistSection />
            <CryptoSection />
            <CashSection />
            <DerivativesSection />
            <FooterLinks />
          </div>
          <BuyPanel />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default Dashboard;
