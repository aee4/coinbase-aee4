import React from 'react';
import { ArrowRight } from 'lucide-react';

const LearnCategories = ({ categories }) => {
  return (
    <section className="px-10 pb-[88px]">
      <div className="grid grid-cols-2 gap-[44px] md:grid-cols-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center gap-[22px] cursor-pointer group">
            <div className="flex h-[88px] w-[88px] items-center justify-center">
              <img src={cat.icon} alt="" className="h-auto w-full" />
            </div>
            <div>
              <p className="text-[26px] font-semibold group-hover:text-[#1652f0] transition-colors">{cat.name}</p>
              <p className="flex items-center gap-1 text-[22px] text-[#6b7280]">
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
