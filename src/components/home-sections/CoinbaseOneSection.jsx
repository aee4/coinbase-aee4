import coinbaseOneImage from "../../assets/images/coinbase-one.png.png";

const CoinbaseOneSection = () => {
  return (
    <section className="w-full bg-white px-10 py-28">
      <div className="mx-auto grid max-w-[1300px] items-center gap-16 lg:grid-cols-[1fr_1fr]">
        {/* LEFT TEXT */}
        <div className="max-w-[520px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e5ea] px-4 py-2 text-[13px] font-medium text-[#5b616e]">
            <span className="h-4 w-4 rounded-full bg-black" />
            COINBASE ONE
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-[44px] font-normal leading-[1.02] tracking-[-0.04em] text-black">
            Zero trading fees,
            <br />
            more rewards.
          </h2>

          {/* Paragraph */}
          <p className="mt-6 text-[18px] leading-[1.5] text-[#5b616e]">
            Get more out of crypto with one membership: zero trading fees,
            boosted rewards, priority support, and more.
          </p>

          {/* Button */}
          <button className="mt-8 h-[54px] rounded-full bg-black px-8 text-[16px] font-semibold text-white hover:bg-[#111]">
            Claim free trial
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <div className="w-full max-w-[520px] rounded-[36px] bg-[#e9ebef] p-6">
            <img
              src={coinbaseOneImage}
              alt="Coinbase One"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinbaseOneSection;
