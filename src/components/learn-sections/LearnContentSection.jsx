import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ArticleCard from '../ui/ArticleCard';
import Button from '../ui/Button';

const LearnContentSection = ({ 
  title, 
  description, 
  featuredArticles = [], 
  gridArticles = [], 
  buttonText,
  to,
  background = "white",
  topBorder = true
}) => {
  return (
    <section className={`${topBorder ? 'border-t border-[#e5e7eb]' : ''} ${background === 'gray' ? 'bg-[#f4f6f8]' : 'bg-white'} px-10 py-[106px]`}>
      <div className="mx-auto max-w-[1430px]">
        {/* Header */}
        <SectionHeader title={title} description={description} />

        {/* Featured Row (2 columns) */}
        {featuredArticles.length > 0 && (
          <div className="mt-[70px] grid grid-cols-1 gap-[53px] lg:grid-cols-2">
            {featuredArticles.map((article, index) => (
              <ArticleCard 
                key={index}
                image={article.image}
                tag={article.tag}
                title={article.title}
                description={article.description}
                imageHeight="h-[330px]"
              />
            ))}
          </div>
        )}

        {/* Grid Row (up to 4 columns) */}
        {gridArticles.length > 0 && (
          <div className="mt-[62px] grid grid-cols-1 gap-[35px] md:grid-cols-2 lg:grid-cols-4">
            {gridArticles.map((article, index) => (
              <ArticleCard 
                key={index}
                image={article.image}
                tag={article.tag}
                title={article.title}
                description={article.description} // Should be empty/undefined for small cards in most cases
                imageHeight="h-[300px]"
                video={article.video}
              />
            ))}
          </div>
        )}

        {/* Tips/Advanced 2x2 Grid (special case for 2 columns with larger cards) */}
        {(featuredArticles.length === 0 && gridArticles.length > 0 && gridArticles.length % 2 === 0 && gridArticles.length <= 4 && !title.includes("basics")) && (
           <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
             {/* Note: This is an alternative layout used in some sections of Learn.jsx */}
           </div>
        )}

        {/* Button */}
        {buttonText && (
          <div className="mt-[70px] flex justify-center">
            <Button to={to || "/learn"} variant="primary" size="sm">
              {buttonText}
              <span className="ml-2 text-[18px]">›</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LearnContentSection;
