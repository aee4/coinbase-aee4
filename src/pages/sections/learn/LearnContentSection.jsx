import SectionHeader from '../../../components/common/SectionHeader';
import ArticleCard from '../../../components/common/ArticleCard';
import Button from '../../../components/common/Button';

const LearnContentSection = ({ 
  title, 
  description, 
  featuredArticles = [], 
  gridArticles = [], 
  buttonText,
  buttonTo = "/learn",
  background = "white",
  topBorder = true,
  maxWidth = "max-w-[1430px]",
  gridClassName = "mt-[40px] md:mt-[62px] grid grid-cols-1 gap-[32px] md:gap-[35px] md:grid-cols-2 lg:grid-cols-4",
  gridImageHeight = "h-[220px] md:h-[300px]"
}) => {
  return (
    <section className={`${topBorder ? 'border-t border-[#e5e7eb]' : ''} ${background === 'gray' ? 'bg-[#f4f6f8]' : 'bg-white'} px-6 md:px-10 py-[60px] md:py-[106px]`}>
      <div className={`mx-auto ${maxWidth}`}>
        <SectionHeader title={title} description={description} />

        {featuredArticles.length > 0 && (
          <div className="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[53px] lg:grid-cols-2">
            {featuredArticles.map((article, index) => (
              <ArticleCard 
                key={index}
                image={article.image}
                tag={article.tag}
                title={article.title}
                description={article.description}
                imageHeight="h-[220px] md:h-[330px]"
              />
            ))}
          </div>
        )}

        {gridArticles.length > 0 && (
          <div className={gridClassName}>
            {gridArticles.map((article, index) => (
              <ArticleCard 
                key={index}
                image={article.image}
                tag={article.tag}
                title={article.title}
                description={article.description}
                imageHeight={gridImageHeight}
                video={article.video}
              />
            ))}
          </div>
        )}

        {buttonText && (
          <div className="mt-[40px] md:mt-[70px] flex justify-center">
            <Button to={buttonTo} variant="primary" size="sm">
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
