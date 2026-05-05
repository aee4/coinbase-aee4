import { ArrowLeft, ArrowRight } from "lucide-react";

const TopMovers = ({ topMovers, scrollRef, onScroll, title = "Top movers" }) => {
  return (
    <div className="px-6 md:px-10 py-8 md:py-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[20px] md:text-[25px] font-semibold tracking-[-0.02em] text-black">
            {title}
          </h3>
          <p className="mt-2 md:mt-4 text-[13px] text-[#5b616e]">
            24hr change
          </p>
        </div>

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
        className="mt-5 grid grid-cols-1 gap-4 pb-2 sm:grid-cols-2 md:mt-7 md:flex md:overflow-x-auto md:scroll-smooth md:gap-5"
      >
        {topMovers.map((mover) => (
          <div
            key={mover.symbol}
            className="rounded-[20px] bg-[#f1f3f5] px-4 py-4 md:min-w-[170px] md:shrink-0 md:rounded-[24px] md:px-5 md:py-5"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${mover.logoBg}`}
            >
              {mover.logo && (
                <img
                  src={mover.logo}
                  alt={mover.symbol}
                  className="h-6 w-6 object-contain"
                />
              )}
            </div>

            <p className="mt-5 md:mt-7 text-[13px] text-[#6b7280]">
              {mover.symbol}
            </p>

            {mover.name && (
              <p className="mt-1 text-[14px] md:text-[15px] font-semibold text-black">
                {mover.name}
              </p>
            )}

            <p
              className={`mt-1 md:mt-2 text-[14px] md:text-[15px] font-medium ${mover.changeColor}`}
            >
              {mover.change}
            </p>

            <p className="mt-1 md:mt-2 text-[13px] text-black">
              {mover.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
