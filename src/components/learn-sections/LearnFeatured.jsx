import React from 'react';
import ArticleCard from '../ui/ArticleCard';

const LearnFeatured = ({ featured, popular }) => {
  return (
    <section className="px-10 pb-[88px] pt-0">
      <div className="grid grid-cols-1 gap-[88px] lg:grid-cols-[1.5fr_0.5fr]">
        {/* LEFT SIDE: FEATURED */}
        <div>
          <h2 className="mb-[35px] text-[22px] font-semibold text-black">
            Featured
          </h2>
          <ArticleCard 
            image={featured.image}
            tag={featured.tag}
            title={featured.title}
            description={featured.description}
            imageHeight="h-[440px]"
            featured
          />
        </div>

        {/* RIGHT SIDE: POPULAR */}
        <div>
          <h2 className="mb-[35px] text-[22px] font-semibold text-black">
            Popular
          </h2>
          <div className="space-y-[44px]">
            {popular.map((item, index) => (
              <div key={index} className="cursor-pointer group">
                <p className="text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  {item.tag}
                </p>
                <h3 className="mt-[13px] text-[20px] font-semibold leading-tight text-black group-hover:text-[#1652f0] transition-colors">
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
