import { Link } from "react-router-dom";
import learnCardOne from "../../assets/images/learn-card-1.png";
import learnCardTwo from "../../assets/images/learn-card-2.png";
import learnCardThree from "../../assets/images/learn-card-3.png";

const LearnSection = () => {
  return (
    <section className="w-full bg-[#f5f5f2] px-10 py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Top row */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-[620px]">
            <h2 className="text-[72px] font-normal leading-[0.98] tracking-[-0.04em] text-black">
              New to crypto?
              <br />
              Learn some
              <br />
              crypto basics
            </h2>
          </div>

          <div className="max-w-[560px]">
            <p className="text-[20px] leading-[1.5] text-[#5b616e]">
              Beginner guides, practical tips, and market updates for
              first-timers, experienced investors, and everyone in
              between
            </p>

            <Link 
              to="/learn"
              className="mt-8 inline-flex items-center h-[60px] rounded-full bg-black px-10 text-[18px] font-semibold text-white hover:bg-[#111] transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Cards row */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Card 1 */}
          <article>
            <div className="overflow-hidden rounded-[36px]">
              <img
                src={learnCardOne}
                alt="USDC article"
                className="h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-6 text-[36px] font-normal leading-[1.02] tracking-[-0.04em] text-black">
              USDC: The digital
              <br />
              dollar for the global
              <br />
              crypto economy
            </h3>

            <p className="mt-6 max-w-[410px] text-[16px] leading-[1.5] text-[#5b616e]">
              Coinbase believes crypto will be part of the
              solution for creating an open financial system
              that is both more efficient and more...
            </p>
          </article>

          {/* Card 2 */}
          <article>
            <div className="overflow-hidden rounded-[36px]">
              <img
                src={learnCardTwo}
                alt="Bank account article"
                className="h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-6 text-[36px] font-normal leading-[1.02] tracking-[-0.04em] text-black">
              Can crypto really
              <br />
              replace your
              <br />
              bank account?
            </h3>

            <p className="mt-6 max-w-[410px] text-[16px] leading-[1.5] text-[#5b616e]">
              If you’re a big enough fan of crypto, you’ve
              probably heard the phrase “be your own bank”
              or the term “bankless” — the idea being that...
            </p>
          </article>

          {/* Card 3 */}
          <article>
            <div className="overflow-hidden rounded-[36px]">
              <img
                src={learnCardThree}
                alt="Best time to invest article"
                className="h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-6 text-[36px] font-normal leading-[1.02] tracking-[-0.04em] text-black underline decoration-[2px] underline-offset-[6px]">
              When is the best time
              <br />
              to invest in crypto?
            </h3>

            <p className="mt-6 max-w-[410px] text-[16px] leading-[1.5] text-[#5b616e]">
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
