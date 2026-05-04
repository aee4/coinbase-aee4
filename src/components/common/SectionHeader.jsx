const SectionHeader = ({ 
  title, 
  description, 
  centered = true, 
  titleClassName = "text-[32px] md:text-[53px] font-semibold tracking-[-0.02em]",
  descClassName = "mx-auto mt-[10px] md:mt-[13px] max-w-[800px] text-[16px] md:text-[20px] text-[#5b616e]",
  containerClassName = "mb-[40px] md:mb-[70px]"
}) => {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${containerClassName}`}>
      <h2 className={`${titleClassName} text-black leading-tight`}>
        {title}
      </h2>
      {description && (
        <p className={descClassName}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
