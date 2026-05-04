import LearnContentSection from './LearnContentSection';

import futures1 from "../../../assets/images/futures-1.png";
import futures2 from "../../../assets/images/futures-2.png";
import futures3 from "../../../assets/images/futures-3.png";
import futures4 from "../../../assets/images/futures-4.png";

const LearnFutures = () => (
  <LearnContentSection
    title="Futures"
    description="New to futures trading? Get up to speed on the basics."
    buttonText="See more about futures"
    buttonTo={null}
    maxWidth="max-w-[1100px]"
    gridClassName="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[44px] md:grid-cols-2"
    gridArticles={[
      { image: futures1, title: "Futures: Introductions and origins" },
      { image: futures2, title: "Futures fundamentals: Understanding the basics" },
      { image: futures3, title: "Opening, holding, and closing a position in the futures market" },
      { image: futures4, title: "Trading strategies: Speculating, hedging, and spreading in the futures market" },
    ]}
  />
);

export default LearnFutures;
