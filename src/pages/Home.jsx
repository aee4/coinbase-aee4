import HeroSection from "./sections/home/HeroSection.jsx";
import ExploreSection from "./sections/home/ExploreSection.jsx";
import TradingToolsSection from "./sections/home/TradingToolsSection.jsx";
import CoinbaseOneSection from "./sections/home/CoinbaseOneSection.jsx";
import BaseAppSection from "./sections/home/BaseAppSection.jsx";
import LearnSection from "./sections/home/LearnSection.jsx";
import FinalCTASection from "./sections/home/FinalCTASection.jsx";
import DisclaimerSection from "./sections/home/DisclaimerSection.jsx";

function Home() {
    return (
        <div className="bg-white">
            <HeroSection />
            <ExploreSection />
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