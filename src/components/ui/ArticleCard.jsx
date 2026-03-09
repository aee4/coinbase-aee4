import React from 'react';

const ArticleCard = ({ 
  image, 
  tag, 
  title, 
  description, 
  imageHeight = "h-[283px]",
  video = false,
  featured = false
}) => {
  return (
    <div className={featured ? "group cursor-pointer" : "cursor-pointer"}>
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`${imageHeight} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
        />
        {video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/35 text-[28px] text-white">
              ▶
            </div>
          </div>
        )}
      </div>

      {tag && (
        <p className={`mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]`}>
          {tag}
        </p>
      )}

      <h3 className={`${featured ? "mt-[18px] text-[31px]" : "mt-2 text-[26px]"} font-semibold leading-[1.3] text-black`}>
        {title}
      </h3>

      {description && (
        <p className="mt-[22px] max-w-[650px] text-[18px] leading-[1.5] text-[#5b616e]">
          {description}
        </p>
      )}
    </div>
  );
};

export default ArticleCard;
