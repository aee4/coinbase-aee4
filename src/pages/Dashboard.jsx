import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  CandlestickChart,
  CircleHelp,
  Grid3X3,
  Home,
  LineChart,
  MoreVertical,
  ReceiptText,
  Search,
  WalletCards,
} from "lucide-react";
import api from "../api/api";

const normalizeProfile = (data) => data?.user || data?.data?.user || data?.data || data || null;

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
  { name: "BTC Perpetual", symbol: "B", color: "#f7931a" },
  { name: "ETH Perpetual", symbol: "ETH", color: "#627eea" },
  { name: "SOL Perpetual", symbol: "SOL", color: "#111827", muted: true },
];

function CoinbaseMark() {
  return (
    <div className="relative h-10 w-10">
      <div className="absolute inset-0 rounded-full border-[10px] border-[#0052ff]" />
      <div className="absolute right-0 top-1/2 h-2.5 w-6 -translate-y-1/2 bg-white" />
    </div>
  );
}

function CoinBadge({ color, symbol }) {
  const isEth = symbol === "ETH";

  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[19px] font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {isEth ? (
        <span className="relative h-6 w-4">
          <span className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-x-[8px] border-b-[13px] border-x-transparent border-b-white/90" />
          <span className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[8px] border-t-[13px] border-x-transparent border-t-white/70" />
        </span>
      ) : symbol === "SOL" ? (
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

function SideRail() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[92px] flex-col border-r border-[#e6e8eb] bg-white">
      <div className="flex h-[78px] items-center justify-center">
        <CoinbaseMark />
      </div>
      <nav className="flex flex-1 flex-col items-center gap-5 pt-4">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className={`flex h-[64px] w-[64px] items-center justify-center rounded-full transition-colors ${
              active ? "bg-[#eef4ff] text-[#0052ff]" : "text-[#0a0b0d] hover:bg-[#f7f8fa]"
            }`}
          >
            <Icon size={25} strokeWidth={active ? 0 : 2.5} fill={active ? "currentColor" : "none"} />
          </button>
        ))}
      </nav>
      <div className="pb-5 text-center text-[#0a0b0d]">
        <CandlestickChart className="mx-auto" size={25} strokeWidth={2.4} />
        <p className="mt-3 text-[12px] font-bold">Advanced</p>
        <button
          className="mx-auto mt-4 flex h-[26px] w-[48px] items-center rounded-full bg-[#dfe3eb] p-1"
          type="button"
          aria-label="Advanced mode"
        >
          <span className="h-[20px] w-[20px] rounded-full bg-white shadow-sm" />
        </button>
      </div>
    </aside>
  );
}

function Header({ profile, profileOpen, profileError, onProfileClick, onLogout }) {
  const initials = useMemo(() => getInitials(profile?.name, profile?.email), [profile]);

  return (
    <header className="sticky top-0 z-20 grid h-[78px] grid-cols-[1fr_auto] items-center border-b border-[#e6e8eb] bg-white px-9">
      <h1 className="text-[31px] font-semibold tracking-[-0.04em] text-[#0a0b0d]">Home</h1>
      <div className="flex items-center gap-3">
        <label className="flex h-[48px] w-[430px] max-w-[37vw] items-center gap-4 rounded-full bg-[#f4f5f8] px-6">
          <Search size={22} className="text-[#0a0b0d]" strokeWidth={2.5} />
          <input
            className="min-w-0 flex-1 bg-transparent text-[20px] font-medium text-[#0a0b0d] outline-none placeholder:text-[#6b7280]"
            placeholder="Search"
            type="search"
          />
        </label>
        {[
          { label: "Notifications", icon: Bell },
          { label: "Help", icon: CircleHelp },
          { label: "Apps", icon: Grid3X3 },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d] transition-colors hover:bg-[#e9edf5]"
          >
            <Icon size={21} />
          </button>
        ))}
        <div className="relative">
          <button
            onClick={onProfileClick}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#0aa7d6] text-[19px] font-medium text-black"
            type="button"
            aria-label="Profile"
          >
            {initials}
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-[60px] z-40 w-[280px] rounded-[12px] border border-[#e6e8eb] bg-white p-4 text-left shadow-[0_14px_40px_rgba(15,23,42,0.14)]">
              <p className="text-[16px] font-bold text-[#0a0b0d]">{profile?.name || "Coinbase user"}</p>
              <p className="mt-1 break-all text-[14px] font-medium text-[#5b616e]">
                {profile?.email || (profileError ? "Unable to load profile" : "Loading profile")}
              </p>
              <button
                onClick={onLogout}
                type="button"
                className="mt-4 h-10 w-full rounded-full bg-[#f4f5f8] text-[14px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function DepositTail() {
  return (
    <section className="border-b border-[#e6e8eb] px-9 py-6">
      <button type="button" className="h-12 w-full rounded-full bg-[#f4f5f8] text-[18px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]">
        Deposit cash
      </button>
    </section>
  );
}

function DerivativesSection() {
  return (
    <section className="relative border-b border-[#e6e8eb] px-9 py-7">
      <button
        type="button"
        aria-label="Open derivatives"
        className="absolute right-9 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d] hover:bg-[#e9edf5]"
      >
        <ArrowRight size={25} />
      </button>
      <h2 className="text-[26px] font-bold tracking-[-0.03em] text-[#0a0b0d]">Derivatives</h2>
      <p className="mt-2 text-[18px] font-medium text-[#5b616e]">Trade with up to 50x leverage</p>

      <div className="mt-12">
        {cryptoRows.map((coin) => (
          <div
            key={coin.name}
            className={`grid h-[72px] grid-cols-[1fr_76px] items-center gap-4 ${coin.muted ? "bg-[#f7f8fa]" : ""}`}
          >
            <div className="flex items-center gap-5">
              <CoinBadge color={coin.color} symbol={coin.symbol} />
              <div>
                <p className={`text-[20px] font-bold leading-tight ${coin.muted ? "text-[#303642]" : "text-[#0a0b0d]"}`}>
                  {coin.name} <span className="rounded-[5px] bg-[#eef0f3] px-1.5 py-0.5 text-[15px] text-[#5b616e]">50X</span>
                </p>
                <p className="mt-1 text-[16px] font-medium leading-tight text-[#5b616e]">INTX</p>
              </div>
            </div>
            <button type="button" className="h-11 rounded-full bg-[#f4f5f8] text-[18px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]">
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
    <footer className="px-9 py-9 text-[#5b616e]">
      <div className="flex flex-wrap items-center gap-6 text-[14px]">
        <a className="underline" href="#">Careers</a>
        <a className="underline" href="#">Legal & Privacy</a>
        <a className="underline" href="#">Accessibility Statement</a>
        <span>© 2026 Coinbase</span>
      </div>
      <button type="button" className="mt-8 flex h-11 items-center gap-2 rounded-full bg-[#f4f5f8] px-4 text-[16px] font-bold text-[#0a0b0d] hover:bg-[#e9edf5]">
        English <span className="text-[18px]">⌄</span>
      </button>
    </footer>
  );
}

function BuyPanel() {
  return (
    <aside className="border-l border-[#e6e8eb] bg-white">
      <section className="border-b border-[#e6e8eb] px-10 py-0">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[31px] font-bold tracking-[-0.04em] text-[#0a0b0d]">Buys not supported</h2>
          <p className="mt-5 max-w-[390px] text-[18px] font-medium leading-[1.45] text-[#0a0b0d]">
            Coinbase doesn't currently support buys in your country. Subscribe to our blog to be notified when we add support for your country.
          </p>
          <button type="button" className="mt-10 h-[62px] w-full max-w-[360px] rounded-full bg-[#0052ff] text-[18px] font-bold text-white">
            Subscribe now
          </button>
        </div>
      </section>
      <section className="space-y-7 px-10 py-10">
        {[
          { label: "Send crypto", icon: ArrowUp },
          { label: "Receive crypto", icon: ArrowDown },
        ].map(({ label, icon: Icon }) => (
          <button key={label} type="button" className="flex items-center gap-5 text-[22px] font-bold text-[#0a0b0d]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0052ff] text-white">
              <Icon size={25} />
            </span>
            {label}
          </button>
        ))}
      </section>
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
        const response = await api.get("/profile").catch(() => api.get("/users/profile"));
        if (isMounted) {
          setProfile(normalizeProfile(response.data));
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
      localStorage.removeItem("token");
      localStorage.removeItem("jwt");
      navigate("/signin", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0a0b0d]">
      <SideRail />
      <div className="ml-[92px] min-h-screen">
        <Header
          profile={profile}
          profileOpen={profileOpen}
          profileError={profileError}
          onProfileClick={() => setProfileOpen((isOpen) => !isOpen)}
          onLogout={handleLogout}
        />
        <main className="grid min-h-[calc(100vh-78px)] grid-cols-[minmax(0,1fr)_460px]">
          <div className="min-w-0">
            <DepositTail />
            <DerivativesSection />
            <FooterLinks />
          </div>
          <BuyPanel />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
