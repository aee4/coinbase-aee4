import React from 'react';
import ArticleCard from '../ui/ArticleCard';

const LearnFeatured = ({ featured, popular }) => {
  return (
    <section className="px-6 md:px-10 pb-[40px] md:pb-[88px] pt-0">
      <div className="grid grid-cols-1 gap-[40px] lg:gap-[88px] lg:grid-cols-[1.5fr_0.5fr]">
        {/* LEFT SIDE: FEATURED */}
        <div>
          <h2 className="mb-[20px] md:mb-[35px] text-[20px] md:text-[22px] font-semibold text-black">
            Featured
          </h2>
          <ArticleCard 
            image={featured.image}
            tag={featured.tag}
            title={featured.title}
            description={featured.description}
            imageHeight="h-[240px] md:h-[440px]"
            featured
          />
        </div>

        {/* RIGHT SIDE: POPULAR */}
        <div>
          <h2 className="mb-[20px] md:mb-[35px] text-[20px] md:text-[22px] font-semibold text-black mt-8 lg:mt-0">
            Popular
          </h2>
          <div className="space-y-[24px] md:space-y-[44px]">
            {popular.map((item, index) => (
              <div key={index} className="cursor-pointer group">
                <p className="text-[11px] md:text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  {item.tag}
                </p>
                <h3 className="mt-[8px] md:mt-[13px] text-[16px] md:text-[20px] font-semibold leading-tight text-black group-hover:text-[#1652f0] transition-colors">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnFeatured;
