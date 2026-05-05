import { Link } from "react-router-dom";
import MarketCard from "../../../components/crypto/MarketCard.jsx";

const ExploreSection = ({ coinsByTab, isLoading, errorMessage = "" }) => {
  return (
    <section className="w-full bg-[#f5f5f2] px-6 md:px-10 py-16 md:py-28">
      <div className="mx-auto flex flex-col lg:grid max-w-[1500px] items-center gap-12 lg:gap-16 lg:grid-cols-[0.95fr_0.9fr]">
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

        <div className="flex justify-center lg:justify-end w-full overflow-hidden">
          <MarketCard coinsByTab={coinsByTab} isLoading={isLoading} />
          {errorMessage && (
            <p className="sr-only" role="status">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      {errorMessage && (
        <p className="mx-auto mt-6 max-w-[1500px] text-center text-[14px] font-medium text-[#cf202f] lg:text-right">
          {errorMessage}
        </p>
      )}
    </section>
  );
};

export default ExploreSection;
