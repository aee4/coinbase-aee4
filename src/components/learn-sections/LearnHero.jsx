import React from 'react';

const LearnHero = ({ title, description }) => {
  return (
    <section className="px-10 pb-[53px] pt-[106px] text-center">
      <h1 className="mx-auto max-w-[1100px] text-[53px] font-semibold leading-tight tracking-[-0.03em] text-black">
        {title}
      </h1>
      <p className="mx-auto mt-[18px] text-[20px] text-[#5b616e]">
        {description}
      </p>
    </section>
  );
};

export default LearnHero;
