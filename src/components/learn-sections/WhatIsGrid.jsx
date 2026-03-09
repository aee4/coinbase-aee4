import React from 'react';
import Button from '../ui/Button';

const WhatIsGrid = ({ terms, to }) => {
  return (
    <section className="bg-[#f4f6f8] px-10 py-[106px]">
      <div className="mx-auto max-w-[1430px] text-center">
        <h2 className="text-[53px] font-semibold tracking-[-0.02em] text-black">
          What is...
        </h2>

        <div className="mx-auto mt-[62px] grid max-w-[1430px] grid-cols-2 gap-[16px] md:grid-cols-4 lg:grid-cols-8">
          {terms.map((term) => (
            <button
              key={term}
              className="flex h-[76px] w-full items-center justify-center rounded-[12px] bg-white px-2 text-center text-[17px] font-medium text-black shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all hover:bg-[#fcfcfc] hover:shadow-[0_6px_28px_rgba(0,0,0,0.08)]"
            >
              {term}
            </button>
          ))}
        </div>

        <div className="mt-[70px]">
          <Button to={to || "/learn"} variant="primary" size="sm">
            See more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatIsGrid;
