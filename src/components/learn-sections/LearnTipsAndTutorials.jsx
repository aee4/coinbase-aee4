import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ArticleCard from '../ui/ArticleCard';
import Button from '../ui/Button';

// Images
import tips1 from "../../assets/images/tips-1.png";
import tips2 from "../../assets/images/tips-2.png";
import tips3 from "../../assets/images/tips-3.png";
import tips4 from "../../assets/images/tips-4.png";

const LearnTipsAndTutorials = () => {
  return (
    <section className="border-t border-[#e5e7eb] px-6 md:px-10 py-[60px] md:py-[106px]">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader 
          title="Tips and tutorials" 
          description="Get practical, step-by-step answers to all things crypto" 
        />
        <div className="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[44px] md:grid-cols-2">
          <ArticleCard image={tips1} tag="GETTING STARTED" title="How to donate crypto" />
          <ArticleCard image={tips2} tag="VIDEO TUTORIAL" title="How to set up a crypto wallet" video />
          <ArticleCard image={tips3} tag="VIDEO TUTORIAL" title="When is the best time to invest in crypto?" video />
          <ArticleCard image={tips4} tag="YOUR CRYPTO" title="How to invest in crypto via your retirement account" />
        </div>
        <div className="mt-[40px] md:mt-[70px] flex justify-center">
          <Button variant="primary" size="sm">
            See more tips and tutorials
            <span className="ml-2 text-[18px]">›</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LearnTipsAndTutorials;
