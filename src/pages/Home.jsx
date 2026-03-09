import HeroSection from "../components/home-sections/HeroSection.jsx";
import ExploreSection from "../components/home-sections/ExploreSection.jsx";
import TradingToolsSection from "../components/home-sections/TradingToolsSection.jsx";
import CoinbaseOneSection from "../components/home-sections/CoinbaseOneSection.jsx";
import BaseAppSection from "../components/home-sections/BaseAppSection.jsx";
import LearnSection from "../components/home-sections/LearnSection.jsx";
import FinalCTASection from "../components/home-sections/FinalCTASection.jsx";
import DisclaimerSection from "../components/home-sections/DisclaimerSection.jsx";

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