import { Link } from "react-router-dom";
import tradingToolsImage from "../../assets/images/trading-tools.png";

const TradingToolsSection = () => {
  return (
    <section className="w-full bg-white px-10 py-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[580px] rounded-[40px] bg-black p-5">
            <img
              src={tradingToolsImage}
              alt="Trading tools"
              className="w-full rounded-[26px] object-contain"
            />
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="flex justify-center lg:justify-start">
          <div className="max-w-[520px]">
            <h2 className="text-[42px] font-normal leading-[1.02] tracking-[-0.04em] text-black">
              Powerful tools, designed
              <br />
              for the advanced trader.
            </h2>

            <p className="mt-6 text-[18px] leading-[1.5] text-[#5b616e]">
              Powerful analytical tools with the safety and security of Coinbase
              deliver the ultimate trading experience. Tap into sophisticated
              charting capabilities, real-time order books, and deep liquidity
              across hundreds of markets.
            </p>

            <Link 
              to="/signin"
              className="mt-8 inline-flex items-center h-[54px] rounded-full bg-black px-8 text-[16px] font-semibold text-white hover:bg-[#111] transition-colors"
            >
              Start trading
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingToolsSection;
