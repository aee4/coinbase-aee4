import { ArrowLeft, ArrowRight } from "lucide-react";

const NewOnCoinbase = ({ newOnCoinbase, scrollRef, onScroll, title = "New on Coinbase" }) => {
  return (
    <div className="px-6 md:px-10 py-8 md:py-12">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] md:text-[25px] font-semibold tracking-[-0.02em] text-black">
          {title}
        </h3>

        <div className="flex items-center gap-4 md:gap-7 pt-1 text-black">
          <button type="button" onClick={() => onScroll(scrollRef, "left")}>
            <ArrowLeft size={24} />
          </button>
          <button type="button" onClick={() => onScroll(scrollRef, "right")}>
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="mt-5 flex gap-4 overflow-x-auto pb-2 scroll-smooth md:mt-7 md:gap-5"
      >
        {newOnCoinbase.map((coin) => (
          <div
            key={coin.name}
            className="min-w-[160px] shrink-0 rounded-[20px] bg-[#f1f3f5] px-4 py-4 md:min-w-[170px] md:rounded-[24px] md:px-5 md:py-5"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${coin.logoBg}`}
            >
              {coin.logo && (
                <img
                  src={coin.logo}
                  alt={coin.name}
                  className="h-6 w-6 object-contain"
                />
              )}
            </div>

            <p className="mt-5 md:mt-7 text-[13px] text-[#6b7280]">
              {coin.symbol}
            </p>

            <p className="mt-1 md:mt-2 text-[14px] md:text-[15px] font-semibold text-black">
              {coin.name}
            </p>

            {coin.change && (
              <p className={`mt-1 md:mt-2 text-[14px] md:text-[15px] font-medium ${coin.changeColor}`}>
                {coin.change}
              </p>
            )}

            <p className="mt-1 md:mt-2 text-[13px] text-black">
              {coin.price || coin.added}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOnCoinbase;
