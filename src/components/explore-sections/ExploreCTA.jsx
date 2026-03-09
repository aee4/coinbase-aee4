import React from "react";
// resolves asset with space in filename using Vite's import.meta.url pattern
const blueBottomImage = new URL("../../assets/images/blue-bottom image.png", import.meta.url).href;

const ExploreCTA = () => {
  return (
    <section className="mt-auto w-full bg-[#0052ff] px-6 md:px-10 pt-12 md:pt-16 pb-12">
      <div className="flex flex-col lg:grid items-center gap-8 lg:gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT TEXT */}
        <div className="w-full max-w-[720px] text-center lg:text-left mx-auto lg:mx-0">
          <h2 className="text-[24px] md:text-[28px] font-normal leading-[1.2] md:leading-[1.1] tracking-[-0.03em] text-white">
            Create a Coinbase account to trade
            <br className="hidden md:block" />
            {" "}crypto. It’s quick, easy, and secure.
          </h2>

          <button className="mt-6 md:mt-8 flex h-[50px] md:h-[54px] w-full lg:max-w-[360px] items-center justify-between rounded-full bg-[#eef1f4] px-6 md:px-8 text-[15px] md:text-[16px] font-semibold text-black transition-colors hover:bg-white mx-auto lg:mx-0">
            <span>Start Trading</span>
            <span className="text-[24px] md:text-[28px] leading-none">→</span>
          </button>
        </div>

        {/* RIGHT DESIGN */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="relative h-[100px] md:h-[120px] w-full max-w-[320px] md:max-w-[380px]">
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
