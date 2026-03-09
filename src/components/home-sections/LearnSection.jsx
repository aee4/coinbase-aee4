import { Link } from "react-router-dom";
import learnCardOne from "../../assets/images/learn-card-1.png";
import learnCardTwo from "../../assets/images/learn-card-2.png";
import learnCardThree from "../../assets/images/learn-card-3.png";

const LearnSection = () => {
  return (
    <section className="w-full bg-[#f5f5f2] px-6 md:px-10 py-16 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Top row */}
        <div className="flex flex-col lg:grid items-start gap-8 lg:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="w-full max-w-[620px] text-center lg:text-left mx-auto lg:mx-0">
            <h2 className="text-[42px] sm:text-[56px] lg:text-[72px] font-normal leading-[1.05] lg:leading-[0.98] tracking-[-0.04em] text-black">
              New to crypto?
              <br className="hidden sm:block" />
              {" "}Learn some
              <br className="hidden sm:block" />
              {" "}crypto basics
            </h2>
          </div>

          <div className="w-full max-w-[560px] text-center lg:text-left mx-auto lg:mx-0">
            <p className="mt-4 lg:mt-0 text-[18px] lg:text-[20px] leading-[1.5] text-[#5b616e]">
              Beginner guides, practical tips, and market updates for
              first-timers, experienced investors, and everyone in
              between
            </p>

            <Link 
              to="/learn"
              className="mt-6 md:mt-8 inline-flex items-center justify-center w-full sm:w-auto h-[54px] md:h-[60px] rounded-full bg-black px-10 text-[16px] md:text-[18px] font-semibold text-white hover:bg-[#111] transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Cards row */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <article>
            <div className="overflow-hidden rounded-[24px] md:rounded-[36px]">
              <img
                src={learnCardOne}
                alt="USDC article"
                loading="lazy"
                className="h-[200px] md:h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-5 md:mt-6 text-[24px] md:text-[36px] font-normal leading-[1.1] md:leading-[1.02] tracking-[-0.04em] text-black">
              USDC: The digital
              <br className="hidden md:block" />
              {" "}dollar for the global
              <br className="hidden md:block" />
              {" "}crypto economy
            </h3>

            <p className="mt-4 md:mt-6 max-w-[410px] text-[15px] md:text-[16px] leading-[1.5] text-[#5b616e]">
              Coinbase believes crypto will be part of the
              solution for creating an open financial system
              that is both more efficient and more...
            </p>
          </article>

          {/* Card 2 */}
          <article>
            <div className="overflow-hidden rounded-[24px] md:rounded-[36px]">
              <img
                src={learnCardTwo}
                alt="Bank account article"
                loading="lazy"
                className="h-[200px] md:h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-5 md:mt-6 text-[24px] md:text-[36px] font-normal leading-[1.1] md:leading-[1.02] tracking-[-0.04em] text-black">
              Can crypto really
              <br className="hidden md:block" />
              {" "}replace your
              <br className="hidden md:block" />
              {" "}bank account?
            </h3>

            <p className="mt-4 md:mt-6 max-w-[410px] text-[15px] md:text-[16px] leading-[1.5] text-[#5b616e]">
              If you’re a big enough fan of crypto, you’ve
              probably heard the phrase “be your own bank”
              or the term “bankless” — the idea being that...
            </p>
          </article>

          {/* Card 3 */}
          <article>
            <div className="overflow-hidden rounded-[24px] md:rounded-[36px]">
              <img
                src={learnCardThree}
                alt="Best time to invest article"
                loading="lazy"
                className="h-[200px] md:h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-5 md:mt-6 text-[24px] md:text-[36px] font-normal leading-[1.1] md:leading-[1.02] tracking-[-0.04em] text-black underline decoration-[2px] underline-offset-[6px]">
              When is the best time
              <br className="hidden md:block" />
              {" "}to invest in crypto?
            </h3>

            <p className="mt-4 md:mt-6 max-w-[410px] text-[15px] md:text-[16px] leading-[1.5] text-[#5b616e]">
              Cryptocurrencies like Bitcoin can experience
              daily (or even hourly) price volatility. As with
              any kind of investment, volatility may cause...
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default LearnSection;
