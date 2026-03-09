import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ArticleCard from '../ui/ArticleCard';
import Button from '../ui/Button';

// Images
import futures1 from "../../assets/images/futures-1.png";
import futures2 from "../../assets/images/futures-2.png";
import futures3 from "../../assets/images/futures-3.png";
import futures4 from "../../assets/images/futures-4.png";

const LearnFutures = () => {
  return (
    <section className="border-t border-[#e5e7eb] px-6 md:px-10 py-[60px] md:py-[106px]">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader 
          title="Futures" 
          description="New to futures trading? Get up to speed on the basics." 
        />
        <div className="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[44px] md:grid-cols-2">
          <ArticleCard image={futures1} title="Futures: Introductions and origins" />
          <ArticleCard image={futures2} title="Futures fundamentals: Understanding the basics" />
          <ArticleCard image={futures3} title="Opening, holding, and closing a position in the futures market" />
          <ArticleCard image={futures4} title="Trading strategies: Speculating, hedging, and spreading in the futures market" />
        </div>
        <div className="mt-[40px] md:mt-[70px] flex justify-center">
          <Button variant="primary" size="sm">
            See more about futures
            <span className="ml-2 text-[18px]">›</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LearnFutures;
