import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ArticleCard from '../ui/ArticleCard';
import Button from '../ui/Button';

// Images
import advanced1 from "../../assets/images/advanced-1.png";
import advanced2 from "../../assets/images/advanced-2.png";
import advanced3 from "../../assets/images/advanced-3.png";
import advanced4 from "../../assets/images/advanced-4.png";

const LearnAdvancedTrading = () => {
  return (
    <section className="border-t border-[#e5e7eb] px-6 md:px-10 py-[60px] md:py-[106px]">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader 
          title="Advanced trading" 
          description="Ready to advance? Learn the tools and terminology you need to take control of your trades." 
        />
        <div className="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[44px] md:grid-cols-2">
          <ArticleCard image={advanced1} tag="KEY TERM" title="What is technical analysis?" />
          <ArticleCard image={advanced2} tag="ADVANCED GUIDE" title="How can I use crypto futures market data for spot trading?" />
          <ArticleCard image={advanced3} tag="ADVANCED GUIDE" title="How to read advanced trading charts" video />
          <ArticleCard image={advanced4} tag="KEY TERM" title="What is an order book?" />
        </div>
        <div className="mt-[40px] md:mt-[70px] flex justify-center">
          <Button variant="primary" size="sm">
            See more advanced trading
            <span className="ml-2 text-[18px]">›</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LearnAdvancedTrading;
