import { useEffect, useState } from "react";
import api from "../api/api";

import HeroSection from "./sections/home/HeroSection.jsx";
import ExploreSection from "./sections/home/ExploreSection.jsx";
import TradingToolsSection from "./sections/home/TradingToolsSection.jsx";
import CoinbaseOneSection from "./sections/home/CoinbaseOneSection.jsx";
import BaseAppSection from "./sections/home/BaseAppSection.jsx";
import LearnSection from "./sections/home/LearnSection.jsx";
import FinalCTASection from "./sections/home/FinalCTASection.jsx";
import DisclaimerSection from "./sections/home/DisclaimerSection.jsx";

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

const normalizeCrypto = (coin) => ({
    id: coin.id || coin._id || coin.symbol || coin.name,
    name: coin.name,
    symbol: coin.symbol,
    price: formatPrice(coin.price),
    change: formatChange(coin.change24h),
    change24h: getNumericValue(coin.change24h),
    logo: coin.image || coin.logo,
});

const getDateValue = (coin) => {
    return new Date(coin.createdAt || coin.listedAt || coin.created_at || 0).getTime();
};

function Home() {
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

                const tradable = getCryptoArray(cryptoResponse.data).slice(0, 6).map(normalizeCrypto);
                const gainers = getCryptoArray(gainersResponse.data)
                    .map(normalizeCrypto)
                    .sort((firstCoin, secondCoin) => secondCoin.change24h - firstCoin.change24h)
                    .slice(0, 6);
                const newListings = getCryptoArray(newResponse.data)
                    .map(normalizeCrypto)
                    .sort((firstCoin, secondCoin) => getDateValue(secondCoin) - getDateValue(firstCoin))
                    .slice(0, 6);

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

    return (
        <div className="bg-white">
            <HeroSection />
            <ExploreSection coinsByTab={marketCardCoinsByTab} isLoading={isLoadingCrypto} errorMessage={cryptoError} />
            <TradingToolsSection />
            <CoinbaseOneSection />
            <BaseAppSection />
            <LearnSection />
            <FinalCTASection />
            <DisclaimerSection />
        </div>
    );
}

export default Home;
