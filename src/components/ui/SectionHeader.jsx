import React from 'react';

const SectionHeader = ({ 
  title, 
  description, 
  centered = true, 
  titleClassName = "text-[53px] font-semibold tracking-[-0.02em]",
  descClassName = "mx-auto mt-[13px] max-w-[800px] text-[20px] text-[#5b616e]",
  containerClassName = "mb-[70px]"
}) => {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${containerClassName}`}>
      <h2 className={`${titleClassName} text-black`}>
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
