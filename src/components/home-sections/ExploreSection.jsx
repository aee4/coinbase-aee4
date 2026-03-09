import { Link } from "react-router-dom";
import MarketCard from "../crypto/MarketCard.jsx";

const ExploreSection = () => {
  return (
    <section className="w-full bg-[#f5f5f2] px-6 md:px-10 py-16 md:py-28">
      <div className="mx-auto flex flex-col lg:grid max-w-[1500px] items-center gap-12 lg:gap-16 lg:grid-cols-[0.95fr_0.9fr]">
        {/* LEFT TEXT */}
        <div className="w-full max-w-[700px] text-center lg:text-left">
          <h2 className="text-[32px] sm:text-[38px] lg:text-[45px] font-normal leading-[1.1] md:leading-[1.02] tracking-[-0.04em] text-black">
            Explore crypto like Bitcoin,
            <br className="hidden sm:block" />
            {" "}Ethereum, and Dogecoin.
          </h2>

          <p className="mt-6 md:mt-8 text-[16px] md:text-[20px] leading-[1.45] text-[#5b616e]">
            Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
          </p>

          <Link 
            to="/explore"
            className="mt-8 md:mt-10 inline-flex items-center justify-center w-full sm:w-auto h-[54px] md:h-[60px] rounded-full bg-black px-8 md:px-12 text-[16px] md:text-[20px] font-semibold text-white hover:bg-[#111] transition-colors"
          >
            See more assets
          </Link>
        </div>

        {/* RIGHT CARD */}
        <div className="flex justify-center lg:justify-end w-full overflow-hidden">
          <MarketCard />
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
