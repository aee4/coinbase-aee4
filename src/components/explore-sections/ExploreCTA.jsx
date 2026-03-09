import React from "react";
// resolves asset with space in filename using Vite's import.meta.url pattern
const blueBottomImage = new URL("../../assets/images/blue-bottom image.png", import.meta.url).href;

const ExploreCTA = () => {
  return (
    <section className="mt-auto w-full bg-[#0052ff] px-10 pt-16 pb-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT TEXT */}
        <div className="max-w-[720px]">
          <h2 className="text-[28px] font-normal leading-[1.1] tracking-[-0.03em] text-white">
            Create a Coinbase account to trade
            <br />
            crypto. It’s quick, easy, and secure.
          </h2>

          <button className="mt-8 flex h-[54px] w-full max-w-[360px] items-center justify-between rounded-full bg-[#eef1f4] px-8 text-[16px] font-semibold text-black transition-colors hover:bg-white">
            <span>Start Trading</span>
            <span className="text-[28px] leading-none">→</span>
          </button>
        </div>

        {/* RIGHT DESIGN */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative h-[120px] w-full max-w-[380px]">
            <img 
              src={blueBottomImage} 
              alt="Start trading" 
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCTA;
