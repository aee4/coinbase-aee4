import React, { useRef } from "react";

// Section Components
import ExploreHero from "../components/explore-sections/ExploreHero";
import MarketStats from "../components/explore-sections/MarketStats";
import CryptoPrices from "../components/explore-sections/CryptoPrices";
import ExploreCTA from "../components/explore-sections/ExploreCTA";
import ExploreSidebar from "../components/explore-sections/ExploreSidebar";
import TopMovers from "../components/explore-sections/TopMovers";
import NewOnCoinbase from "../components/explore-sections/NewOnCoinbase";

// Assets
import totalMarketCapChart from "../assets/images/total-market-cap.png";
import tradeVolumeChart from "../assets/images/trade-volume.png";
import buySellRatioChart from "../assets/images/buy-sell-ratio.png";
import btcDominanceChart from "../assets/images/btc-dominance.png";

// Crypto Logos
import bitcoinLogo from "../assets/images/bitcoin.png";
import ethereumLogo from "../assets/images/ethereum.png";
import tetherLogo from "../assets/images/tether.png";
import bnbLogo from "../assets/images/bnb.png";
import xrpLogo from "../assets/images/xrp.png";
import usdcLogo from "../assets/images/usdc.png";
import hyperliquidLogo from "../assets/images/hyperliquid.png";
import jupiterLogo from "../assets/images/jupiter.png";
import subsquidLogo from "../assets/images/aventus.png";
import plumeLogo from "../assets/images/plume.png";
import sentientLogo from "../assets/images/sentient.png";
import walrusLogo from "../assets/images/walrus.png";
import raydiumLogo from "../assets/images/raydium.png";
import parclLogo from "../assets/images/parcl.png";
import polkastarterLogo from "../assets/images/polkastarter.png";
import kiteLogo from "../assets/images/kite.png";
import swellLogo from "../assets/images/assembleai.png";
import dogecoinLogo from "../assets/images/dogecoin.png";
import cardanoLogo from "../assets/images/cardano.png";
import alcxLogo from "../assets/images/aclx.png";
import tronLogo from "../assets/images/tron.png";
import solanaLogo from "../assets/images/solana.png";

// Daily Charts
import chart1 from "../assets/images/chart-1.png";
import chart2 from "../assets/images/chart-2.png";
import chart3 from "../assets/images/chart-3.png";
import chart4 from "../assets/images/chart-4.png";
import chart5 from "../assets/images/chart-5.png";
import chart6 from "../assets/images/chart-6.png";
import chart7 from "../assets/images/chart-7.png";
import chart8 from "../assets/images/chart-8.png";

const assetCharts = [chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8];

function Explore() {
  const topMoversRef = useRef(null);
  const newOnCoinbaseRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 200;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const statsCards = [
    {
      title: "Total market cap",
      value: "GHS 23.97T",
      change: "↘ 1.35%",
      changeColor: "text-[#ea3943]",
      chart: totalMarketCapChart,
    },
    {
      title: "Trade volume",
      value: "GHS 1.27T",
      change: "↗ 18.33%",
      changeColor: "text-[#098551]",
      chart: tradeVolumeChart,
    },
    {
      title: "Buy-sell ratio",
      value: "GHS 0.76",
      change: "↘ 1.76%",
      changeColor: "text-[#ea3943]",
      chart: buySellRatioChart,
    },
    {
      title: "BTC dominance",
      value: "60.03%",
      change: "↘ 0.06%",
      changeColor: "text-[#ea3943]",
      chart: btcDominanceChart,
    },
  ];

  const topMovers = [
    {
      symbol: "ALCX",
      change: "↙ 23.80%",
      price: "GHS 63.46",
      changeColor: "text-[#ea3943]",
      logoBg: "bg-[#1d1717]",
      logo: alcxLogo,
    },
    {
      symbol: "SQD",
      change: "↗ 22.30%",
      price: "GHS 0.47",
      changeColor: "text-[#098551]",
      logoBg: "bg-[#2d2f92]",
      logo: subsquidLogo,
    },
    {
      symbol: "SENT",
      change: "↘ 4.22%",
      price: "GHS 0.25",
      changeColor: "text-[#ea3943]",
      logoBg: "bg-[#000000]",
      logo: sentientLogo,
    },
    {
      symbol: "PLUME",
      change: "↗ 16.73%",
      price: "GHS 0.14",
      changeColor: "text-[#098551]",
      logoBg: "bg-[#ff5a14]",
      logo: plumeLogo,
    },
  ];

  const newOnCoinbase = [
    {
      symbol: "SQD",
      name: "Subsquid",
      added: "Added Feb 5",
      logoBg: "bg-[#2d2f92]",
      logo: subsquidLogo,
    },
    {
      symbol: "PLUME",
      name: "Plume",
      added: "Added Jan 28",
      logoBg: "bg-[#ff5a14]",
      logo: plumeLogo,
    },
    {
      symbol: "HYPE",
      name: "Hyperliquid",
      added: "Added Feb 5",
      logoBg: "bg-[#0f3a35]",
      logo: hyperliquidLogo,
    },
    {
      symbol: "JUPITER",
      name: "Jupiter",
      added: "Added Dec 9",
      logoBg: "bg-[#10253d]",
      logo: jupiterLogo,
    },
  ];

  const coins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "GHS 722,128.37",
      change: "↘ 0.96%",
      changeColor: "text-[#ea3943]",
      cap: "GHS 14.4T",
      volume: "GHS 313.6B",
      logo: bitcoinLogo,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "GHS 20,981.75",
      change: "↘ 1.43%",
      changeColor: "text-[#ea3943]",
      cap: "GHS 2.5T",
      volume: "GHS 150.4B",
      logo: ethereumLogo,
    },
    {
      name: "Tether",
      symbol: "USDT",
      price: "GHS 10.77",
      change: "↗ 0.00%",
      changeColor: "text-[#098551]",
      cap: "GHS 2.0T",
      volume: "GHS 618.2B",
      logo: tetherLogo,
    },
    {
      name: "BNB",
      symbol: "BNB",
      price: "GHS 6,636.57",
      change: "↘ 1.20%",
      changeColor: "text-[#ea3943]",
      cap: "GHS 901.2B",
      volume: "GHS 13.4B",
      logo: bnbLogo,
    },
    {
      name: "XRP",
      symbol: "XRP",
      price: "GHS 14.55",
      change: "↘ 0.59%",
      changeColor: "text-[#ea3943]",
      cap: "GHS 887.2B",
      volume: "GHS 15.5B",
      logo: xrpLogo,
    },
    {
      name: "USDC",
      symbol: "USDC • Earns 3.35% APY",
      price: "GHS 10.77",
      change: "0.00%",
      changeColor: "text-black",
      cap: "GHS 832.3B",
      volume: "GHS 57.6B",
      logo: usdcLogo,
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "GHS 887.53",
      change: "↘ 0.11%",
      changeColor: "text-[#ea3943]",
      cap: "GHS 507.0B",
      volume: "GHS 24.9B",
      logo: solanaLogo,
    },
    {
      name: "TRON",
      symbol: "TRX",
      price: "GHS 3.12",
      change: "↗ 1.43%",
      changeColor: "text-[#098551]",
      cap: "GHS 295.8B",
      volume: "GHS 4.8B",
      logo: tronLogo,
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: "GHS 0.96",
      change: "↘ 0.33%",
      changeColor: "text-[#ea3943]",
      cap: "GHS 162.9B",
      volume: "GHS 8.0B",
      logo: dogecoinLogo,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "GHS 2.73",
      change: "↘ 0.35%",
      changeColor: "text-[#ea3943]",
      cap: "GHS 98.6B",
      volume: "GHS 3.8B",
      logo: cardanoLogo,
    },
  ];

  return (
    <div className="bg-white">
      <section className="w-full">
        <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[minmax(0,1fr)_430px]">
          {/* LEFT MAIN AREA */}
          <div className="flex min-w-0 flex-col border-r border-[#e5e7eb]">
            <ExploreHero />
            <div className="border-t border-[#e5e7eb]" />
            <MarketStats statsCards={statsCards} />
            <div className="border-t border-[#e5e7eb]" />
            <CryptoPrices coins={coins} assetCharts={assetCharts} />
            <ExploreCTA />
          </div>

          {/* RIGHT SIDEBAR */}
          <ExploreSidebar>
            <TopMovers 
              topMovers={topMovers} 
              scrollRef={topMoversRef} 
              onScroll={scroll} 
            />
            <div className="border-t border-[#e5e7eb]" />
            <NewOnCoinbase 
              newOnCoinbase={newOnCoinbase} 
              scrollRef={newOnCoinbaseRef} 
              onScroll={scroll} 
            />
          </ExploreSidebar>
        </div>
      </section>
    </div>
  );
}

export default Explore;