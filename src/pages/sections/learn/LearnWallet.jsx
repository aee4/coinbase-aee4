import LearnContentSection from './LearnContentSection';

import wallet1 from "../../../assets/images/wallet-1.png";
import wallet2 from "../../../assets/images/wallet-2.png";
import wallet3 from "../../../assets/images/wallet-3.png";
import wallet4 from "../../../assets/images/wallet-4.png";

const LearnWallet = () => (
  <LearnContentSection
    title="All Things Wallet"
    description="Earn yield, dive into crypto apps, control your holdings, and much more"
    buttonText="See more Wallet articles"
    maxWidth="max-w-[1100px]"
    gridClassName="mt-[40px] md:mt-[70px] grid grid-cols-1 gap-[32px] md:gap-[44px] md:grid-cols-2"
    gridArticles={[
      {
        image: wallet1,
        title: "Whatâ€™s the difference between Coinbase and Coinbase Wallet?",
        description: "And how can a wallet help me access NFTs or DeFi? Your self-custody wallet questions, answered",
      },
      {
        image: wallet2,
        tag: "VIDEO TUTORIAL",
        title: "How to set up a crypto wallet",
        description: "Learn how to setup and get started with a crypto wallet.",
        video: true,
      },
      {
        image: wallet3,
        tag: "GETTING STARTED",
        title: "How to add crypto to your Coinbase Wallet",
        description: "A quick guide on how to add crypto to your Coinbase self-custody wallet.",
      },
      {
        image: wallet4,
        title: "How to send or receive crypto using Coinbase Wallet",
        description: "Coinbase Wallet helps you unlock one of the most significant features of crypto: the ability to send or receive peer-to-peer transfers without any financial intermediaries.",
      },
    ]}
  />
);

export default LearnWallet;
