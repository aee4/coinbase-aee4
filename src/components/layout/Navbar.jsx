import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/coinbaseLogoNavigation-4.svg";
import coinbaseIcon from "../../assets/icons/coinbase-logo.svg";
import navigationUpsell from "../../assets/images/navigation-upsell.png";
import institutionsUpsell from "../../assets/images/institutions_upsell.png";
import developersUpsell from "../../assets/images/developers_upsell_cdxv2_2.jpg";
import companyUpsell from "../../assets/images/company_upsell.png";
import businessUpsell from "../../assets/images/onchain_payment_protocol.png";

import { 
    Search, 
    Globe, 
    Coins,
    LayoutGrid, 
    Percent, 
    Users, 
    Plug, 
    BookOpen, 
    CandlestickChart, 
    Wallet, 
    Building2, 
    CreditCard,
    Briefcase,
    Box,
    Banknote,
    ArrowLeftRight,
    Lock,
    LineChart,
    Building,
    FileText,
    Share2,
    HelpCircle,
    Shield,
    ChevronRight,
    Info,
    UserPlus,
    Newspaper,
    MessageSquare
} from "lucide-react";

// Custom Coinbase Icon component for the menu
const CoinbaseIcon = () => (
    <img src={coinbaseIcon} alt="" className="w-5 h-5 brightness-0" />
);

const menuData = {
    individuals: {
        columns: [
            [
                { title: "Individual", isHeader: true },
                { title: "Buy and sell", desc: "Buy, sell, and use crypto", icon: CoinbaseIcon },
                { title: "Base App", desc: "Post, earn, trade, and chat, all in one place", icon: LayoutGrid },
                { title: "Coinbase One", desc: "Get zero trading fees and more", icon: Percent },
                { title: "Private Client", desc: "For trusts, family offices, UHNWIs", icon: Users },
                { title: "Onchain", desc: "Dive into the world of onchain apps", icon: Plug },
                { title: "Learn", desc: "Crypto tips and guides", icon: BookOpen, path: "/learn" },
            ],
            [
                { title: "Advanced", isHeader: true, hasChevron: true },
                { title: "Advanced", desc: "Professional-grade trading tools", icon: CandlestickChart },
                { title: "Earn", desc: "Stake your crypto and earn rewards", icon: Percent },
                { title: "Coinbase Wealth", desc: "Institutional-grade services for UHNW", icon: Building2 },
                { title: "Credit Card", desc: "Earn up to 4% bitcoin back", icon: CreditCard },
                { title: "Debit Card", desc: "Spend crypto, get crypto back", icon: Wallet },
            ],
        ],
        promo: {
            heading: "System Update 2025",
            text: "The next chapter of Coinbase. Live on X 12/17.",
            cta: "Learn more",
            image: navigationUpsell
        },
    },
    businesses: {
        columns: [
            [
                { title: "Business", isHeader: true },
                { title: "Business", desc: "Crypto trading and payments for startups and SMBs", icon: Briefcase },
                { title: "Asset Listings", desc: "List your asset on Coinbase", icon: Box, path: "asset-details" },
            ],
            [
                { title: "Commerce", isHeader: true },
                { title: "Payments", desc: "The stablecoin payments stack for commerce platforms", icon: Banknote },
                { title: "Token Manager", desc: "The platform for token distributions, vesting, and lockups", icon: ArrowLeftRight },
            ],
        ],
        promo: {
            heading: "Commerce Payments Protocol",
            text: "A new standard for onchain payments.",
            cta: "Go to Payments",
            image: businessUpsell
        },
    },
    institutions: {
        columns: [
            [
                { title: "Prime", isHeader: true, hasChevron: true },
                { title: "Trading and Financing", desc: "Professional prime brokerage services", icon: CandlestickChart },
                { title: "Custody", desc: "Securely store all your digital assets", icon: Lock },
                { title: "Staking", desc: "Explore staking across our products", icon: Percent },
                { title: "Onchain Wallet", desc: "Institutional-grade wallet to get onchain", icon: Wallet },
            ],
            [
                { title: "Markets", isHeader: true },
                { title: "Exchange", desc: "Spot markets for high-frequency trading", icon: ArrowLeftRight },
                { title: "International Exchange", desc: "Access perpetual futures markets", icon: Globe },
                { title: "Derivatives Exchange", desc: "Trade an accessible futures market", icon: LineChart },
                { title: "Verified Pools", desc: "Transparent, verified liquidity pools", icon: Box },
            ],
        ],
        promo: {
            heading: "Institutional Grade",
            text: "Trusted by the world's largest institutions.",
            cta: "Explore Solutions",
            image: institutionsUpsell
        },
    },
    developers: {
        columns: [
            [
                { title: "Coinbase Developer Platform", isHeader: true, hasChevron: true },
                { title: "Payments", desc: "Fast and global stablecoin payments with a single integration", icon: Banknote },
                { title: "Trading", desc: "Launch crypto trading and custody for your users", icon: CandlestickChart },
                { title: "Wallets", desc: "Deploy customizable and scalable wallets for your business", icon: Wallet },
                { title: "Stablecoins", desc: "Access USDC and Coinbase Custom Stablecoins", icon: Coins },
            ],
            [
                { title: "Solutions for any company", isHeader: true },
                { title: "Banks & Brokerages", desc: "Secure, regulated offerings for retail, private banking, & institutional clients", icon: Building },
                { title: "Payment Firms", desc: "Near-instant, low-cost, global payment rails for modern providers", icon: CreditCard },
                { title: "Startups", desc: "Launch your business with the world's leader in crypto", icon: LayoutGrid },
            ],
        ],
        promo: {
            heading: "Build the Future",
            text: "World class crypto infrastructure at your fingertips.",
            cta: "View Docs",
            image: developersUpsell
        },
    },
    company: {
        columns: [
            [
                { title: "About", desc: "Powering the crypto economy", icon: Info },
                { title: "Affiliates", desc: "Help introduce the world to crypto", icon: UserPlus },
                { title: "Blog", desc: "Read the latest from Coinbase", icon: Newspaper },
            ],
            [
                { title: "Careers", desc: "Work with us", icon: Briefcase },
                { title: "Support", desc: "Find answers to your questions", icon: MessageSquare },
                { title: "Security", desc: "The most trusted & secure", icon: Shield },
            ],
        ],
        promo: {
            heading: "Our Mission",
            text: "We're building the open financial system for the world.",
            cta: "Join Us",
            image: companyUpsell
        },
    },
};

function MegaMenu({ menu }) {
    if (!menu) return null;

    return (
        <div className="absolute left-0 top-full z-50 w-full border-t border-gray-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="mx-auto grid max-w-[1240px] gap-8 px-8 py-10 lg:grid-cols-[1fr_1fr_1.5fr]">
                {menu.columns.map((column, colIndex) => (
                    <div key={colIndex} className="space-y-1">
                        {column.map((item, idx) => {
                            if (item.isHeader) {
                                return (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-4 mb-2">
                                        <span className="text-xl font-bold text-black">{item.title}</span>
                                        {item.hasChevron && <ChevronRight size={20} className="mt-1" />}
                                    </div>
                                );
                            }

                            const Icon = item.icon;
                            return (
                                <Link
                                    key={idx}
                                    to={item.path || "#"}
                                    className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50 group"
                                >
                                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gray-100 text-gray-900 transition-colors group-hover:bg-gray-200">
                                        {Icon && <Icon size={20} />}
                                    </div>

                                    <div>
                                        <p className="text-[15px] font-bold text-gray-900 leading-tight">
                                            {item.title}
                                        </p>
                                        {item.desc && <p className="mt-1 text-[13px] text-gray-500 leading-snug">{item.desc}</p>}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ))}

                <div className="flex flex-row items-start gap-6 border-l border-gray-100 pl-10">
                    <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-[24px]">
                        {menu.promo.image ? (
                            <img 
                                src={menu.promo.image} 
                                alt="" 
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-blue-600 text-white">
                                <Search size={48} strokeWidth={1} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 pt-1">
                        <h3 className="text-[24px] font-bold text-gray-900 tracking-tight leading-tight">
                            {menu.promo.heading}
                        </h3>
                        <p className="text-[22px] font-normal text-gray-500 leading-tight">
                            {menu.promo.text}
                        </p>
                        <Link
                            to="#"
                            className="mt-4 w-fit text-xl font-bold text-black border-b-2 border-black hover:border-gray-500 hover:text-gray-700 transition-all font-inter"
                        >
                            {menu.promo.cta}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav 
            className={`w-full border-b border-gray-100 bg-white sticky top-0 z-50 transition-all duration-300 ${
                isScrolled ? "shadow-md bg-white/95 backdrop-blur-md h-16" : "h-20"
            }`}
            onMouseLeave={() => setActiveMenu(null)}
        >

            <div className="w-full px-10 h-full flex items-center justify-between">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-12">

                    {/* Logo */}
                    <Link to="/">
                        <img src={logo} alt="Coinbase" className="h-10" />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-4 text-base font-bold text-gray-800">

                        <Link 
                            to="/explore" 
                            className="px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
                            onMouseEnter={() => setActiveMenu(null)}
                        >
                            Cryptocurrencies
                        </Link>

                        {Object.keys(menuData).map((key) => (
                            <Link 
                                key={key}
                                to="#" 
                                className={`px-4 py-2 rounded-full transition-colors ${
                                    activeMenu === key ? "bg-gray-100 text-black" : "hover:bg-gray-50"
                                }`}
                                onMouseEnter={() => setActiveMenu(key)}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        ))}

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">

                    {/* Search */}
                    <button className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                        <Search size={20} />
                    </button>

                    {/* Globe */}
                    <button className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                        <Globe size={20} />
                    </button>

                    {/* Sign in */}
                    <Link
                        to="/signin"
                        className="px-5 py-2.5 rounded-full bg-gray-100 text-base font-bold hover:bg-gray-200"
                    >
                        Sign in
                    </Link>

                    {/* Sign up */}
                    <Link
                        to="/signup"
                        className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-base font-bold hover:bg-blue-700 transition-all active:scale-95"
                    >
                        Sign up
                    </Link>

                </div>
            </div>

            {activeMenu && <MegaMenu menu={menuData[activeMenu]} />}

        </nav>
    );
}

export default Navbar;