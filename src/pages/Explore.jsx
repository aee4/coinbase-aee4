import React, { useRef } from "react";
import { statsCards, topMovers, newOnCoinbase, coins } from "../data/exploreData";

// Section Components
import ExploreHero from "../components/explore-sections/ExploreHero";
import MarketStats from "../components/explore-sections/MarketStats";
import CryptoPrices from "../components/explore-sections/CryptoPrices";
import ExploreCTA from "../components/explore-sections/ExploreCTA";
import ExploreSidebar from "../components/explore-sections/ExploreSidebar";
import TopMovers from "../components/explore-sections/TopMovers";
import NewOnCoinbase from "../components/explore-sections/NewOnCoinbase";

// Daily Charts for the CryptoPrices component
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