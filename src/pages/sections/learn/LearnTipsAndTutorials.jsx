import LearnContentSection from './LearnContentSection';

import tips1 from "../../../assets/images/tips-1.png";
import tips2 from "../../../assets/images/tips-2.png";
import tips3 from "../../../assets/images/tips-3.png";
import tips4 from "../../../assets/images/tips-4.png";

const LearnTipsAndTutorials = () => (
  <LearnContentSection
    title="Tips and tutorials"
    description="Get practical, step-by-step answers to all things crypto"
    buttonText="See more tips and tutorials"
    buttonTo={null}
    maxWidth="max-w-[1100px]"
    gridClassName="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[44px] md:grid-cols-2"
    gridArticles={[
      { image: tips1, tag: "GETTING STARTED", title: "How to donate crypto" },
      { image: tips2, tag: "VIDEO TUTORIAL", title: "How to set up a crypto wallet", video: true },
      { image: tips3, tag: "VIDEO TUTORIAL", title: "When is the best time to invest in crypto?", video: true },
      { image: tips4, tag: "YOUR CRYPTO", title: "How to invest in crypto via your retirement account" },
    ]}
  />
);

export default LearnTipsAndTutorials;
