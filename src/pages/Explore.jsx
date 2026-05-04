import { useEffect, useRef, useState } from "react";
import { coins, statsCards } from "../data/exploreData";
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
  const [isLoadingCrypto, setIsLoadingCrypto] = useState(true);
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
          setIsLoadingCrypto(false);
        }
      } catch {
        if (isMounted) {
          setCryptoError("Unable to load live crypto data right now.");
          setIsLoadingCrypto(false);
        }
      }
    };

    loadCryptoData();

    return () => {
      isMounted = false;
    };
  }, []);

  const marketCardCoinsByTab = {
    tradable: tradableCrypto,
    gainers: gainerCrypto,
    new: newListingCrypto,
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 200;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderStatusState = (title, message) => (
    <div className="px-6 md:px-10 py-8 md:py-12">
      <h3 className="text-[20px] md:text-[25px] font-semibold tracking-[-0.02em] text-black">
        {title}
      </h3>
      <p className="mt-4 text-[14px] text-[#5b616e]">{message}</p>
    </div>
  );

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
              <MarketCard
                coinsByTab={marketCardCoinsByTab}
                initialTab="tradable"
                isLoading={isLoadingCrypto}
              />
              {cryptoError && (
                <p className="mt-4 text-[14px] font-medium text-[#ea3943]">
                  {cryptoError}
                </p>
              )}
            </div>
            <CryptoPrices coins={coins} assetCharts={assetCharts} />
            <ExploreCTA />
          </div>

          <ExploreSidebar>
            {isLoadingCrypto ? (
              renderStatusState("Gainers", "Loading top gainer data...")
            ) : gainerCrypto.length > 0 ? (
              <TopMovers
                title="Gainers"
                topMovers={gainerCrypto}
                scrollRef={topMoversRef}
                onScroll={scroll}
              />
            ) : (
              renderStatusState("Gainers", "No top gainer data available")
            )}
            <div className="border-t border-[#e5e7eb]" />
            {isLoadingCrypto ? (
              renderStatusState("New Listings", "Loading new listing data...")
            ) : newListingCrypto.length > 0 ? (
              <NewOnCoinbase
                title="New Listings"
                newOnCoinbase={newListingCrypto}
                scrollRef={newOnCoinbaseRef}
                onScroll={scroll}
              />
            ) : (
              renderStatusState("New Listings", "No new listing data available")
            )}
          </ExploreSidebar>
        </div>
      </section>
    </div>
  );
}

export default Explore;
