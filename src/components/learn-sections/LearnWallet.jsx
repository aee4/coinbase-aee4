import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ArticleCard from '../ui/ArticleCard';
import Button from '../ui/Button';

// Images
import wallet1 from "../../assets/images/wallet-1.png";
import wallet2 from "../../assets/images/wallet-2.png";
import wallet3 from "../../assets/images/wallet-3.png";
import wallet4 from "../../assets/images/wallet-4.png";

const LearnWallet = () => {
  return (
    <section className="border-t border-[#e5e7eb] px-6 md:px-10 py-[60px] md:py-[106px]">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader 
          title="All Things Wallet" 
          description="Earn yield, dive into crypto apps, control your holdings, and much more" 
        />
        <div className="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[44px] md:grid-cols-2">
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
        <div className="mt-[40px] md:mt-[70px] flex justify-center">
          <Button to="/learn" variant="primary" size="sm">
            See more Wallet articles
            <span className="ml-2 text-[18px]">›</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LearnWallet;
