import React from 'react';
import LearnHero from '../components/learn-sections/LearnHero';
import LearnFeatured from '../components/learn-sections/LearnFeatured';
import LearnCategories from '../components/learn-sections/LearnCategories';
import WhatIsGrid from '../components/learn-sections/WhatIsGrid';
import LearnContentSection from '../components/learn-sections/LearnContentSection';
import ArticleCard from '../components/ui/ArticleCard';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';

// Image Imports
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
import tips1 from "../assets/images/tips-1.png";
import tips2 from "../assets/images/tips-2.png";
import tips3 from "../assets/images/tips-3.png";
import tips4 from "../assets/images/tips-4.png";
import advanced1 from "../assets/images/advanced-1.png";
import advanced2 from "../assets/images/advanced-2.png";
import advanced3 from "../assets/images/advanced-3.png";
import advanced4 from "../assets/images/advanced-4.png";
import futures1 from "../assets/images/futures-1.png";
import futures2 from "../assets/images/futures-2.png";
import futures3 from "../assets/images/futures-3.png";
import futures4 from "../assets/images/futures-4.png";
import wallet1 from "../assets/images/wallet-1.png";
import wallet2 from "../assets/images/wallet-2.png";
import wallet3 from "../assets/images/wallet-3.png";
import wallet4 from "../assets/images/wallet-4.png";

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

        {/* CRYPTO BASICS */}
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
        {/* TIPS AND TUTORIALS - Special 2x2 Layout */}
        <section className="border-t border-[#e5e7eb] px-10 py-[106px]">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeader 
              title="Tips and tutorials" 
              description="Get practical, step-by-step answers to all things crypto" 
            />
            <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
              <ArticleCard image={tips1} tag="GETTING STARTED" title="How to donate crypto" />
              <ArticleCard image={tips2} tag="VIDEO TUTORIAL" title="How to set up a crypto wallet" video />
              <ArticleCard image={tips3} tag="VIDEO TUTORIAL" title="When is the best time to invest in crypto?" video />
              <ArticleCard image={tips4} tag="YOUR CRYPTO" title="How to invest in crypto via your retirement account" />
            </div>
            <div className="mt-[70px] flex justify-center">
              <Button variant="primary" size="sm">
                See more tips and tutorials
                <span className="ml-2 text-[18px]">›</span>
              </Button>
            </div>
          </div>
        </section>

        {/* ADVANCED TRADING - Special 2x2 Layout */}
        <section className="border-t border-[#e5e7eb] px-10 py-[106px]">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeader 
              title="Advanced trading" 
              description="Ready to advance? Learn the tools and terminology you need to take control of your trades." 
            />
            <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
              <ArticleCard image={advanced1} tag="KEY TERM" title="What is technical analysis?" />
              <ArticleCard image={advanced2} tag="ADVANCED GUIDE" title="How can I use crypto futures market data for spot trading?" />
              <ArticleCard image={advanced3} tag="ADVANCED GUIDE" title="How to read advanced trading charts" video />
              <ArticleCard image={advanced4} tag="KEY TERM" title="What is an order book?" />
            </div>
            <div className="mt-[70px] flex justify-center">
              <Button variant="primary" size="sm">
                See more advanced trading
                <span className="ml-2 text-[18px]">›</span>
              </Button>
            </div>
          </div>
        </section>

        {/* FUTURES - Special 2x2 Layout */}
        <section className="border-t border-[#e5e7eb] px-10 py-[106px]">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeader 
              title="Futures" 
              description="New to futures trading? Get up to speed on the basics." 
            />
            <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
              <ArticleCard image={futures1} title="Futures: Introductions and origins" />
              <ArticleCard image={futures2} title="Futures fundamentals: Understanding the basics" />
              <ArticleCard image={futures3} title="Opening, holding, and closing a position in the futures market" />
              <ArticleCard image={futures4} title="Trading strategies: Speculating, hedging, and spreading in the futures market" />
            </div>
            <div className="mt-[70px] flex justify-center">
              <Button variant="primary" size="sm">
                See more about futures
                <span className="ml-2 text-[18px]">›</span>
              </Button>
            </div>
          </div>
        </section>

        {/* ALL THINGS WALLET */}
        <section className="border-t border-[#e5e7eb] px-10 py-[106px]">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeader 
              title="All Things Wallet" 
              description="Earn yield, dive into crypto apps, control your holdings, and much more" 
            />
            <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
              <ArticleCard 
                image={wallet1} 
                title="What’s the difference between Coinbase and Coinbase Wallet?" 
                description="And how can a wallet help me access NFTs or DeFi? Your self-custody wallet questions, answered"
              />
              <ArticleCard 
                image={wallet2} 
                tag="VIDEO TUTORIAL" 
                title="How to set up a crypto wallet" 
                description="Learn how to setup and get started with a crypto wallet." 
                video 
              />
              <ArticleCard 
                image={wallet3} 
                tag="GETTING STARTED" 
                title="How to add crypto to your Coinbase Wallet" 
                description="A quick guide on how to add crypto to your Coinbase self-custody wallet." 
              />
              <ArticleCard 
                image={wallet4} 
                title="How to send or receive crypto using Coinbase Wallet" 
                description="Coinbase Wallet helps you unlock one of the most significant features of crypto: the ability to send or receive peer-to-peer transfers without any financial intermediaries." 
              />
            </div>
            <div className="mt-[70px] flex justify-center">
              <Button to="/learn" variant="primary" size="sm">
                See more Wallet articles
                <span className="ml-2 text-[18px]">›</span>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Learn;