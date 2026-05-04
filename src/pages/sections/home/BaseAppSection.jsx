import baseAppImage from "../../../assets/images/base-app.png";

const BaseAppSection = () => {
  return (
    <section className="w-full bg-white px-6 md:px-10 py-16 md:py-28">
      <div className="mx-auto flex flex-col-reverse lg:grid max-w-[1300px] items-center gap-12 lg:gap-16 lg:grid-cols-[0.95fr_1fr]">
        {/* LEFT IMAGE */}
        <div className="flex justify-center w-full mt-8 lg:mt-0">
          <div className="w-full max-w-[520px] rounded-[24px] md:rounded-[36px] bg-[#e9ebef] p-4 md:p-6">
            <img
              src={baseAppImage}
              loading="lazy"
              alt="Base App"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="w-full max-w-[520px] text-center lg:text-left mx-auto lg:mx-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e5ea] px-4 py-2 text-[12px] md:text-[13px] font-medium text-[#5b616e]">
            <span className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-[#0052ff]" />
            BASE APP
          </div>

          {/* Heading */}
          <h2 className="mt-5 md:mt-6 text-[32px] md:text-[44px] font-normal leading-[1.1] md:leading-[1.02] tracking-[-0.04em] text-black">
            Countless ways to earn
            <br className="hidden md:block" />
            {" "}crypto with the Base App.
          </h2>

          {/* Paragraph */}
          <p className="mt-5 md:mt-6 text-[16px] md:text-[18px] leading-[1.5] text-[#5b616e]">
            An everything app to trade, create, discover, and chat, all in one place.
          </p>

          {/* Button */}
          <button className="mt-6 md:mt-8 w-full sm:w-auto h-[54px] rounded-full bg-black px-8 text-[16px] font-semibold text-white hover:bg-[#111]">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default BaseAppSection;
