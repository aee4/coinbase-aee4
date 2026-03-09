import { Link } from "react-router-dom";
import heroImage from "../../assets/images/Hero__4_.png";

const HeroSection = () => {
  return (
    <section className="w-full px-6 md:px-10 pt-10 pb-16 md:pb-20">
      <div className="mx-auto flex flex-col-reverse lg:grid max-w-[1500px] items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left side */}
        <div className="flex justify-start w-full mt-8 lg:mt-0">
          <div className="w-full max-w-[680px]">
            <img
              src={heroImage}
              alt="Coinbase hero"
              className="w-full rounded-2xl md:rounded-[36px] object-contain"
            />
            <p className="mt-3 text-[11px] md:text-[13px] text-[#5b616e]">
              Stocks and prediction markets not available in your jurisdiction.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full max-w-[560px] text-center lg:text-left">
          <h1 className="text-[48px] sm:text-[56px] md:text-[72px] font-normal tracking-[-0.04em] leading-[1.02] text-black">
            The future of
            <br className="hidden sm:block" />
            {" "}finance is here.
          </h1>

          <p className="mt-5 md:mt-7 text-[18px] md:text-[22px] leading-[1.35] text-black">
            Trade crypto and more on a platform you can trust.
          </p>

          <div className="mt-6 md:mt-7 flex flex-col sm:flex-row w-full max-w-[620px] items-center gap-4">
            <input
              type="email"
              placeholder="satoshi@nakamoto.com"
              className="h-[54px] w-full sm:flex-1 rounded-xl border border-[#cfd3d8] px-4 text-[16px] md:text-[18px] text-[#5b616e] outline-none"
            />

            <Link 
              to="/signup"
              className="flex items-center justify-center w-full sm:w-auto h-[54px] rounded-full bg-[#1652f0] px-9 text-[16px] md:text-[18px] font-semibold text-white hover:bg-[#1448d8] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
