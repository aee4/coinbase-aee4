import { useRef } from "react";
import { statsCards, topMovers, newOnCoinbase, coins } from "../data/exploreData";

import ExploreHero from "./sections/explore/ExploreHero";
import MarketStats from "./sections/explore/MarketStats";
import CryptoPrices from "./sections/explore/CryptoPrices";
import ExploreCTA from "./sections/explore/ExploreCTA";
import ExploreSidebar from "./sections/explore/ExploreSidebar";
import TopMovers from "./sections/explore/TopMovers";
import NewOnCoinbase from "./sections/explore/NewOnCoinbase";

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
          <div className="flex min-w-0 flex-col border-r border-[#e5e7eb]">
            <ExploreHero />
            <div className="border-t border-[#e5e7eb]" />
            <MarketStats statsCards={statsCards} />
            <div className="border-t border-[#e5e7eb]" />
            <CryptoPrices coins={coins} assetCharts={assetCharts} />
            <ExploreCTA />
          </div>

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
