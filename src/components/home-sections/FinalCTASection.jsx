import { Link } from "react-router-dom";
import portfolioImage from "../../assets/images/portfolio-cta.png";

const FinalCTASection = () => {
  return (
    <section className="w-full bg-white px-10 py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1fr_1fr]">
        {/* LEFT TEXT */}
        <div className="max-w-[520px]">
          <h2 className="text-[72px] font-normal leading-[0.98] tracking-[-0.04em] text-black">
            Take control
            <br />
            of your money
          </h2>

          <p className="mt-6 text-[20px] text-[#5b616e]">
            Start your portfolio today and discover crypto
          </p>

          <div className="mt-8 flex items-center gap-4">
            <input
              type="email"
              placeholder="satoshi@nakamoto.com"
              className="h-[56px] w-[360px] rounded-xl border border-[#cfd3d8] px-4 text-[16px] outline-none"
            />

            <Link 
              to="/signup"
              className="flex items-center h-[56px] rounded-full bg-[#1652f0] px-8 text-[16px] font-semibold text-white hover:bg-[#1448d8] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src={portfolioImage}
            alt="Crypto portfolio"
            className="w-[520px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
