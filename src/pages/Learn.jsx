import LearnHero from './sections/learn/LearnHero';
import LearnFeatured from './sections/learn/LearnFeatured';
import LearnCategories from './sections/learn/LearnCategories';
import WhatIsGrid from './sections/learn/WhatIsGrid';
import LearnContentSection from './sections/learn/LearnContentSection';
import LearnTipsAndTutorials from './sections/learn/LearnTipsAndTutorials';
import LearnAdvancedTrading from './sections/learn/LearnAdvancedTrading';
import LearnFutures from './sections/learn/LearnFutures';
import LearnWallet from './sections/learn/LearnWallet';

import featuredVideo from "../assets/images/featured-video.png";
import headWithStar from "../assets/images/head-with-star.png";
import halfWithHalf from "../assets/images/half-with-half.png";
import hydraulics from "../assets/images/hydraulics.png";
import futuresIcon from "../assets/images/futures.png";

import cryptoBasics1 from "../assets/images/crypto-basics-1.png";
import cryptoBasics2 from "../assets/images/crypto-basics-2.png";
import cryptoBasics3 from "../assets/images/crypto-basics-3.png";
import cryptoBasics4 from "../assets/images/crypto-basics-4.png";
import cryptoBasics5 from "../assets/images/crypto-basics-5.png";
import cryptoBasics6 from "../assets/images/crypto-basics-6.png";

function Learn() {
  const categories = [
    { name: "Crypto basics", icon: headWithStar },
    { name: "Tips and tutorials", icon: halfWithHalf },
    { name: "Advanced trading", icon: hydraulics },
    { name: "Futures", icon: futuresIcon },
  ];

  const popularArticles = [
    { tag: "BEGINNER'S GUIDE", title: "What is cryptocurrency?" },
    { tag: "GETTING STARTED", title: "How to earn crypto rewards" },
    { tag: "GETTING STARTED", title: "How to add crypto to your Coinbase Wallet" },
    { tag: "YOUR CRYPTO", title: "Tax forms, explained: A guide to U.S. tax forms and crypto reports" },
    { tag: "GETTING STARTED", title: "Beginner’s guide to dapps" },
    { tag: "MARKET UPDATE", title: "Everything you need to know about the first-ever U.S. Bitcoin ETF" },
  ];

  const terms = [
    "Bitcoin", "Blockchain", "Cardano", "Crypto wallet", "DeFi", "Ethereum", "Fork", "Inflation",
    "Market cap", "NFT", "Private key", "Protocol", "Smart contract", "Token", "Volatility memecoin", "Web3"
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1260px]">
        <LearnHero 
          title="Crypto questions, answered"
          description="Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between"
        />

        <LearnFeatured 
          featured={{
            image: featuredVideo,
            tag: "VIDEO TUTORIAL",
            title: "When is the best time to invest in crypto?",
            description: "When prices are fluctuating, how do you know when to buy? Learn more about using dollar-cost averaging to weather price volatility."
          }}
          popular={popularArticles}
        />

        <LearnCategories categories={categories} />

        <LearnContentSection 
          title="Crypto basics"
          description="New to crypto? Not for long — start with these guides and explainers"
          buttonText="See more crypto basics"
          featuredArticles={[
            {
              image: cryptoBasics1,
              tag: "BEGINNER'S GUIDE",
              title: "What is Bitcoin?",
              description: "Bitcoin is the world's first widely adopted cryptocurrency — it allows for secure and seamless peer-to-peer transactions on the internet."
            },
            {
              image: cryptoBasics2,
              tag: "BEGINNER'S GUIDE",
              title: "Guide to DeFi tokens and altcoins",
              description: "From Aave to Zcash, decide what to trade with our beginner's guide."
            }
          ]}
          gridArticles={[
            { image: cryptoBasics3, tag: "BEGINNER'S GUIDE", title: "What is Ethereum?" },
            { image: cryptoBasics4, tag: "KEY TERM", title: "What is DeFi?" },
            { image: cryptoBasics5, tag: "BEGINNER'S GUIDE", title: "What is a stablecoin?" },
            { image: cryptoBasics6, tag: "GLOSSARY", title: "Don’t let FUD give you FOMO or you’ll end up REKT — crypto slang, explained" },
          ]}
        />
      </div>

      <WhatIsGrid terms={terms} />

      <div className="mx-auto max-w-[1260px]">
        <LearnTipsAndTutorials />
        <LearnAdvancedTrading />
        <LearnFutures />
        <LearnWallet />
      </div>
    </div>
  );
}

export default Learn;
