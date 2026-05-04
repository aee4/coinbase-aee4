import { useEffect, useRef, useState } from "react";
import { statsCards, topMovers, newOnCoinbase, coins } from "../data/exploreData";
import api from "../api/api";

import ExploreHero from "./sections/explore/ExploreHero";
import MarketStats from "./sections/explore/MarketStats";
import CryptoPrices from "./sections/explore/CryptoPrices";
import ExploreCTA from "./sections/explore/ExploreCTA";
import ExploreSidebar from "./sections/explore/ExploreSidebar";
import TopMovers from "./sections/explore/TopMovers";
import NewOnCoinbase from "./sections/explore/NewOnCoinbase";
import MarketCard from "../components/crypto/MarketCard";

import chart1 from "../assets/images/chart-1.png";
import chart2 from "../assets/images/chart-2.png";
import chart3 from "../assets/images/chart-3.png";
import chart4 from "../assets/images/chart-4.png";
import chart5 from "../assets/images/chart-5.png";
import chart6 from "../assets/images/chart-6.png";
import chart7 from "../assets/images/chart-7.png";
import chart8 from "../assets/images/chart-8.png";

const assetCharts = [chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8];

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
  if (typeof price === "string" && price.trim()) {
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

  if (changeValue === 0) {
    return "0.00%";
  }

  return `${changeValue > 0 ? "+" : ""}${changeValue.toFixed(2)}%`;
};

const getChangeColor = (change24h) => {
  const changeValue = getNumericValue(change24h);

  if (changeValue > 0) {
    return "text-[#098551]";
  }

  if (changeValue < 0) {
    return "text-[#ea3943]";
  }

  return "text-black";
};

const getDateValue = (coin) => {
  return new Date(coin.createdAt || coin.listedAt || coin.created_at || 0).getTime();
};

const normalizeCrypto = (coin) => ({
  id: coin.id || coin._id || coin.symbol || coin.name,
  name: coin.name,
  symbol: coin.symbol,
  price: formatPrice(coin.price),
  change: formatChange(coin.change24h),
  change24h: getNumericValue(coin.change24h),
  changeColor: getChangeColor(coin.change24h),
  logo: coin.image || coin.logo,
  logoBg: "bg-white",
  cap: coin.marketCap ? formatPrice(coin.marketCap) : "--",
  volume: coin.volume24h ? formatPrice(coin.volume24h) : "--",
  createdAt: coin.createdAt || coin.listedAt || coin.created_at,
});

function Explore() {
  const topMoversRef = useRef(null);
  const newOnCoinbaseRef = useRef(null);
  const [tradableCrypto, setTradableCrypto] = useState([]);
  const [gainerCrypto, setGainerCrypto] = useState([]);
  const [newListingCrypto, setNewListingCrypto] = useState([]);
  const [cryptoError, setCryptoError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCryptoData = async () => {
      try {
        const [cryptoResponse, gainersResponse, newResponse] = await Promise.all([
          api.get("/crypto"),
          api.get("/crypto/gainers"),
          api.get("/crypto/new"),
        ]);

        const tradable = getCryptoArray(cryptoResponse.data).map(normalizeCrypto);
        const gainers = getCryptoArray(gainersResponse.data)
          .map(normalizeCrypto)
          .sort((firstCoin, secondCoin) => secondCoin.change24h - firstCoin.change24h);
        const newListings = getCryptoArray(newResponse.data)
          .map(normalizeCrypto)
          .sort((firstCoin, secondCoin) => getDateValue(secondCoin) - getDateValue(firstCoin));

        if (isMounted) {
          setTradableCrypto(tradable);
          setGainerCrypto(gainers);
          setNewListingCrypto(newListings);
          setCryptoError("");
        }
      } catch {
        if (isMounted) {
          setCryptoError("Unable to load live crypto data right now.");
        }
      }
    };

    loadCryptoData();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleTradableCrypto = tradableCrypto.length > 0 ? tradableCrypto : coins;
  const visibleGainerCrypto = gainerCrypto.length > 0 ? gainerCrypto : topMovers;
  const visibleNewListingCrypto = newListingCrypto.length > 0 ? newListingCrypto : newOnCoinbase;
  const marketCardCoinsByTab =
    tradableCrypto.length > 0 || gainerCrypto.length > 0 || newListingCrypto.length > 0
      ? {
          tradable: visibleTradableCrypto,
          gainers: visibleGainerCrypto,
          new: visibleNewListingCrypto,
        }
      : undefined;

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 200;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white">
      <section className="w-full">
        <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="flex min-w-0 flex-col border-r border-[#e5e7eb]">
            <ExploreHero />
            <div className="border-t border-[#e5e7eb]" />
            <MarketStats statsCards={statsCards} />
            <div className="border-t border-[#e5e7eb]" />
            <div className="px-6 md:px-9 pt-12 md:pt-16">
              <MarketCard coinsByTab={marketCardCoinsByTab} initialTab="tradable" />
              {cryptoError && (
                <p className="mt-4 text-[14px] font-medium text-[#ea3943]">
                  {cryptoError}
                </p>
              )}
            </div>
            <CryptoPrices coins={visibleTradableCrypto} assetCharts={assetCharts} />
            <ExploreCTA />
          </div>

          <ExploreSidebar>
            <TopMovers
              title="Gainers"
              topMovers={visibleGainerCrypto}
              scrollRef={topMoversRef}
              onScroll={scroll}
            />
            <div className="border-t border-[#e5e7eb]" />
            <NewOnCoinbase
              title="New Listings"
              newOnCoinbase={visibleNewListingCrypto}
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
