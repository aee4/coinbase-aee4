import baseAppImage from "../../assets/images/base-app.png";

const BaseAppSection = () => {
  return (
    <section className="w-full bg-white px-10 py-28">
      <div className="mx-auto grid max-w-[1300px] items-center gap-16 lg:grid-cols-[0.95fr_1fr]">
        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <div className="w-full max-w-[520px] rounded-[36px] bg-[#e9ebef] p-6">
            <img
              src={baseAppImage}
              alt="Base App"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="max-w-[520px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e5ea] px-4 py-2 text-[13px] font-medium text-[#5b616e]">
            <span className="h-4 w-4 rounded-full bg-black" />
            BASE APP
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-[44px] font-normal leading-[1.02] tracking-[-0.04em] text-black">
            Countless ways to earn
            <br />
            crypto with the Base App.
          </h2>

          {/* Paragraph */}
          <p className="mt-6 text-[18px] leading-[1.5] text-[#5b616e]">
            An everything app to trade, create, discover, and chat, all in one place.
          </p>

          {/* Button */}
          <button className="mt-8 h-[54px] rounded-full bg-black px-8 text-[16px] font-semibold text-white hover:bg-[#111]">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default BaseAppSection;
