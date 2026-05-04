const LearnHero = ({ title, description }) => {
  return (
    <section className="px-6 md:px-10 pb-[30px] md:pb-[53px] pt-[60px] md:pt-[106px] text-center">
      <h1 className="mx-auto max-w-[1100px] text-[36px] md:text-[53px] font-semibold leading-tight tracking-[-0.03em] text-black">
        {title}
      </h1>
      <p className="mx-auto mt-[12px] md:mt-[18px] text-[16px] md:text-[20px] text-[#5b616e] px-4">
        {description}
      </p>
    </section>
  );
};

export default LearnHero;
