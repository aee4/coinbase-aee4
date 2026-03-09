import { Link } from "react-router-dom";
import portfolioImage from "../../assets/images/portfolio-cta.png";

const FinalCTASection = () => {
  return (
    <section className="w-full bg-white px-6 md:px-10 py-16 md:py-32">
      <div className="mx-auto flex flex-col-reverse lg:grid max-w-[1400px] items-center gap-12 lg:gap-16 lg:grid-cols-[1fr_1fr]">
        {/* LEFT TEXT */}
        <div className="w-full max-w-[520px] text-center lg:text-left mx-auto lg:mx-0">
          <h2 className="text-[48px] md:text-[72px] font-normal leading-[1.05] md:leading-[0.98] tracking-[-0.04em] text-black">
            Take control
            <br className="hidden md:block" />
            {" "}of your money
          </h2>

          <p className="mt-5 md:mt-6 text-[18px] md:text-[20px] text-[#5b616e]">
            Start your portfolio today and discover crypto
          </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="satoshi@nakamoto.com"
              className="h-[56px] w-full sm:w-[360px] rounded-xl border border-[#cfd3d8] px-4 text-[16px] outline-none"
            />

            <Link 
              to="/signup"
              className="flex items-center justify-center w-full sm:w-auto h-[56px] rounded-full bg-[#1652f0] px-8 text-[16px] font-semibold text-white hover:bg-[#1448d8] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center w-full pb-4 lg:pb-0">
          <img
            src={portfolioImage}
            loading="lazy"
            alt="Crypto portfolio"
            className="w-full max-w-[400px] lg:max-w-[520px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
