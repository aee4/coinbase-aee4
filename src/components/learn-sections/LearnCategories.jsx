import React from 'react';
import { ArrowRight } from 'lucide-react';

const LearnCategories = ({ categories }) => {
  return (
    <section className="px-6 md:px-10 pb-[40px] md:pb-[88px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] md:gap-[44px] lg:grid-cols-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center gap-[16px] md:gap-[22px] cursor-pointer group bg-[#f8f9fa] sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none">
            <div className="flex h-[60px] w-[60px] md:h-[88px] md:w-[88px] items-center justify-center shrink-0">
              <img src={cat.icon} alt="" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-[18px] md:text-[26px] font-semibold group-hover:text-[#1652f0] transition-colors leading-tight">{cat.name}</p>
              <p className="mt-1 md:mt-2 flex items-center gap-1 text-[16px] md:text-[22px] text-[#6b7280]">
                See more <ArrowRight size={18} className="md:w-[22px] md:h-[22px] group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearnCategories;
