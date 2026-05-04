import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  CandlestickChart,
  ChartNoAxesCombined,
  ChevronDown,
  CircleHelp,
  Grid3X3,
  Home,
  MoreVertical,
  ReceiptText,
  Search,
  WalletCards,
} from "lucide-react";

const cryptoRows = [
  { name: "Bitcoin", sub: "Most popular", symbol: "B", color: "#f7931a", action: "Buy" },
  { name: "Ethereum", sub: "Most popular", symbol: "ETH", color: "#627eea", action: "Buy" },
  { name: "Dogecoin", sub: "Most traded today", symbol: "D", color: "#c2a633", action: "Buy", muted: true },
];

const derivativeRows = [
  { name: "BTC Perpetual", symbol: "B", color: "#f7931a" },
  { name: "ETH Perpetual", symbol: "ETH", color: "#627eea" },
  { name: "SOL Perpetual", symbol: "S", color: "#111827", muted: true },
];

const railItems = [
  { icon: Home, active: true },
  { icon: ChartNoAxesCombined },
  { icon: WalletCards },
  { icon: ReceiptText },
  { icon: MoreVertical },
];

function CoinbaseMark() {
  return (
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full border-[12px] border-[#0052ff]" />
      <div className="absolute right-0 top-1/2 h-3 w-7 -translate-y-1/2 bg-white" />
    </div>
  );
}

function UnsupportedGraphic() {
  return (
    <div className="relative mx-auto h-36 w-36">
      <div className="absolute left-3 top-0 h-28 w-28 bg-[#566070]" />
      <div className="absolute left-3 top-0 h-28 w-28 rounded-br-full border-b-[16px] border-l-[16px] border-[#58606d]" />
      <div className="absolute left-3 top-0 h-28 w-28 rounded-br-full border-r-[16px] border-t-[16px] border-[#5a8bff]" />
      <div className="absolute left-8 top-3 h-20 w-20 rounded-full border-[8px] border-[#22d3ee]" />
      <div className="absolute left-12 top-7 h-16 w-16 rounded-full border-[8px] border-[#f4d35e]" />
      <div className="absolute left-[67px] top-0 h-28 w-16 bg-white" />
      <div className="absolute left-[67px] top-14 h-14 w-16 border-b-[14px] border-r-[14px] border-[#5a8bff]" />
      <div className="absolute left-[67px] top-7 h-14 w-14 rounded-full border-[6px] border-[#f4d35e]" />
    </div>
  );
}

function CoinBadge({ color, symbol }) {
  const isEth = symbol === "ETH";

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[24px] font-bold text-white" style={{ backgroundColor: color }}>
      {isEth ? (
        <span className="relative h-8 w-5">
          <span className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-x-[10px] border-b-[17px] border-x-transparent border-b-white/90" />
          <span className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[10px] border-t-[17px] border-x-transparent border-t-white/70" />
        </span>
      ) : (
        symbol
      )}
    </span>
  );
}

function TopBar({ onProfileClick }) {
  return (
    <header className="sticky top-0 z-20 grid h-[104px] grid-cols-[1fr_auto] items-center border-b border-[#e6e8eb] bg-white px-12">
      <h1 className="text-[40px] font-semibold tracking-[-0.04em] text-[#0a0b0d]">Home</h1>
      <div className="flex items-center gap-3">
        <label className="flex h-[62px] w-[545px] max-w-[42vw] items-center gap-5 rounded-full bg-[#f4f5f8] px-7 text-[#5b616e]">
          <Search size={27} className="text-[#0a0b0d]" strokeWidth={2.4} />
          <input className="min-w-0 flex-1 bg-transparent text-[26px] font-medium text-[#0a0b0d] outline-none placeholder:text-[#6b7280]" placeholder="Search" type="search" />
        </label>
        <button className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d]" type="button" aria-label="Notifications">
          <Bell size={25} />
        </button>
        <button className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d]" type="button" aria-label="Help">
          <CircleHelp size={29} />
        </button>
        <button className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d]" type="button" aria-label="Apps">
          <Grid3X3 size={29} />
        </button>
        <button onClick={onProfileClick} className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#0aa7d6] text-[25px] font-medium text-black" type="button" aria-label="Profile">
          M
        </button>
      </div>
    </header>
  );
}

function SideRail() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[120px] flex-col border-r border-[#e6e8eb] bg-white">
      <div className="flex h-[120px] items-center justify-center">
        <CoinbaseMark />
      </div>
      <nav className="flex flex-1 flex-col items-center gap-7 pt-2 text-[#0a0b0d]">
        {railItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button key={index} className={`flex h-[86px] w-[86px] items-center justify-center rounded-full ${item.active ? "bg-[#eef4ff] text-[#0052ff]" : "text-[#0a0b0d]"}`} type="button">
              <Icon size={34} strokeWidth={item.active ? 0 : 2.8} fill={item.active ? "currentColor" : "none"} />
            </button>
          );
        })}
      </nav>
      <div className="pb-7 text-center text-[#0a0b0d]">
        <CandlestickChart className="mx-auto" size={34} strokeWidth={2.7} />
        <p className="mt-5 text-[16px] font-bold">Advanced</p>
        <button className="mx-auto mt-4 flex h-[34px] w-[62px] items-center rounded-full bg-[#d9dee7] p-1" type="button" aria-label="Advanced mode">
          <span className="h-[28px] w-[28px] rounded-full bg-white" />
        </button>
      </div>
    </aside>
  );
}

function SectionArrow() {
  return (
    <button className="absolute right-12 top-8 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f4f5f8] text-[#0a0b0d]" type="button" aria-label="Open section">
      <ArrowRight size={31} />
    </button>
  );
}

function ActionPanel() {
  return (
    <aside className="sticky top-[104px] h-[calc(100vh-104px)] border-l border-[#e6e8eb] bg-white">
      <section className="flex min-h-[632px] flex-col items-center justify-start border-b border-[#e6e8eb] px-16 pt-3 text-center text-[#0a0b0d]">
        <UnsupportedGraphic />
        <h2 className="mt-12 text-[42px] font-bold tracking-[-0.04em]">Buys not supported</h2>
        <p className="mt-5 max-w-[475px] text-[25px] font-medium leading-[1.45]">
          Coinbase doesn't currently support buys in your country. Subscribe to our blog to be notified when we add support for your country.
        </p>
        <button className="mt-12 h-[84px] w-full max-w-[440px] rounded-full bg-[#0052ff] text-[24px] font-bold text-white" type="button">
          Subscribe now
        </button>
      </section>
      <section className="space-y-8 px-12 py-12 text-[#0a0b0d]">
        <button className="flex items-center gap-6 text-[26px] font-bold" type="button">
          <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#0052ff] text-white">
            <ArrowUp size={31} />
          </span>
          Send crypto
        </button>
        <button className="flex items-center gap-6 text-[26px] font-bold" type="button">
          <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#0052ff] text-white">
            <ArrowDown size={31} />
          </span>
          Receive crypto
        </button>
      </section>
    </aside>
  );
}

function CryptoSection() {
  return (
    <section className="relative border-b border-[#e6e8eb] px-12 py-6 text-[#0a0b0d]">
      <SectionArrow />
      <h2 className="text-[30px] font-bold">Crypto</h2>
      <p className="mt-1 text-[25px] font-medium text-[#5b616e]">Trade millions of assets</p>
      <div className="mt-10">
        {cryptoRows.map((coin) => (
          <div key={coin.name} className={`grid h-[90px] grid-cols-[1fr_95px] items-center px-0 ${coin.muted ? "bg-[#f7f8fa]" : ""}`}>
            <div className="flex items-center gap-6">
              <CoinBadge color={coin.color} symbol={coin.symbol} />
              <div>
                <p className={`text-[24px] font-bold ${coin.muted ? "text-[#343841]" : ""}`}>{coin.name}</p>
                <p className="text-[22px] font-medium text-[#5b616e]">{coin.sub}</p>
              </div>
            </div>
            <button className="h-[60px] rounded-full bg-[#f4f5f8] text-[24px] font-bold text-[#0a0b0d]" type="button">
              {coin.action}
            </button>
          </div>
        ))}
      </div>
      <button className="mt-5 h-[60px] w-full rounded-full bg-[#f4f5f8] text-[24px] font-bold text-[#0a0b0d]" type="button">
        Explore all crypto
      </button>
    </section>
  );
}

function CashSection() {
  return (
    <section className="relative border-b border-[#e6e8eb] px-12 py-10 text-[#0a0b0d]">
      <SectionArrow />
      <h2 className="text-[30px] font-bold">Cash</h2>
      <p className="mt-1 text-[25px] font-medium text-[#5b616e]">
        Earn <span className="text-[#19c784]">3.35% APY</span>
      </p>
      <button className="mt-14 h-[60px] w-full rounded-full bg-[#f4f5f8] text-[24px] font-bold text-[#0a0b0d]" type="button">
        Deposit cash
      </button>
    </section>
  );
}

function DerivativesSection() {
  return (
    <section className="relative border-b border-[#e6e8eb] px-12 py-10 text-[#0a0b0d]">
      <SectionArrow />
      <h2 className="text-[30px] font-bold">Derivatives</h2>
      <p className="mt-1 text-[25px] font-medium text-[#5b616e]">Trade with up to 50x leverage</p>
      <div className="mt-10">
        {derivativeRows.map((item) => (
          <div key={item.name} className={`grid h-[90px] grid-cols-[1fr_125px] items-center ${item.muted ? "bg-[#f7f8fa]" : ""}`}>
            <div className="flex items-center gap-6">
              <CoinBadge color={item.color} symbol={item.symbol} />
              <div>
                <p className={`text-[24px] font-bold ${item.muted ? "text-[#343841]" : ""}`}>
                  {item.name} <span className="rounded-[5px] bg-[#eef0f3] px-2 py-1 text-[20px] text-[#5b616e]">50X</span>
                </p>
                <p className="text-[22px] font-medium text-[#5b616e]">INTX</p>
              </div>
            </div>
            <button className="h-[60px] rounded-full bg-[#f4f5f8] text-[24px] font-bold text-[#0a0b0d]" type="button">
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
    <footer className="px-12 py-12 text-[#5b616e]">
      <div className="flex flex-wrap items-center gap-7 text-[18px]">
        <a className="underline" href="#">Careers</a>
        <a className="underline" href="#">Legal & Privacy</a>
        <a className="underline" href="#">Accessibility Statement</a>
        <span>© 2026 Coinbase</span>
      </div>
      <button className="mt-9 flex h-[50px] items-center gap-2 rounded-full bg-[#f4f5f8] px-5 text-[20px] font-bold text-[#0a0b0d]" type="button">
        English <ChevronDown size={24} />
      </button>
    </footer>
  );
}

function Dashboard() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0a0b0d]">
      <SideRail />
      <div className="ml-[120px] min-h-screen">
        <TopBar onProfileClick={() => setProfileOpen((open) => !open)} />
        {profileOpen && (
          <div className="fixed right-12 top-[88px] z-40 w-64 rounded-[8px] border border-[#e6e8eb] bg-white p-4 text-[#0a0b0d] shadow-2xl">
            <p className="text-[15px] font-bold">Coinbase user</p>
            <p className="mt-1 text-[13px] text-[#5b616e]">Profile</p>
          </div>
        )}
        <main className="grid min-h-[calc(100vh-104px)] grid-cols-[minmax(0,1fr)_590px]">
          <div className="min-w-0">
            <CryptoSection />
            <CashSection />
            <DerivativesSection />
            <FooterLinks />
          </div>
          <ActionPanel />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
