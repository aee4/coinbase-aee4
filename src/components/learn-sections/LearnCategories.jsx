import React from 'react';
import { ArrowRight } from 'lucide-react';

const LearnCategories = ({ categories }) => {
  return (
    <section className="px-5 md:px-10 pb-[50px] md:pb-[88px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] md:gap-[44px] lg:grid-cols-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-[15px] md:gap-[22px] cursor-pointer group">
            <div className="flex h-[60px] w-[60px] md:h-[88px] md:w-[88px] items-center justify-center shrink-0">
              <img src={cat.icon} alt="" className="h-auto w-full" />
            </div>
            <div>
              <p className="text-[20px] md:text-[26px] font-semibold group-hover:text-[#1652f0] transition-colors">{cat.name}</p>
              <p className="flex items-center justify-center sm:justify-start gap-1 text-[18px] md:text-[22px] text-[#6b7280]">
                See more <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearnCategories;
