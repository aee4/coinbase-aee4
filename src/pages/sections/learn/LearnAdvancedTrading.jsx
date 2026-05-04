import LearnContentSection from './LearnContentSection';

import advanced1 from "../../../assets/images/advanced-1.png";
import advanced2 from "../../../assets/images/advanced-2.png";
import advanced3 from "../../../assets/images/advanced-3.png";
import advanced4 from "../../../assets/images/advanced-4.png";

const LearnAdvancedTrading = () => (
  <LearnContentSection
    title="Advanced trading"
    description="Ready to advance? Learn the tools and terminology you need to take control of your trades."
    buttonText="See more advanced trading"
    buttonTo={null}
    maxWidth="max-w-[1100px]"
    gridClassName="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[44px] md:grid-cols-2"
    gridArticles={[
      { image: advanced1, tag: "KEY TERM", title: "What is technical analysis?" },
      { image: advanced2, tag: "ADVANCED GUIDE", title: "How can I use crypto futures market data for spot trading?" },
      { image: advanced3, tag: "ADVANCED GUIDE", title: "How to read advanced trading charts", video: true },
      { image: advanced4, tag: "KEY TERM", title: "What is an order book?" },
    ]}
  />
);

export default LearnAdvancedTrading;
