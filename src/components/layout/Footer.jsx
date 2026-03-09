import logo from "../../assets/icons/coinbaseLogoNavigation-4.svg";
import xLight from "../../assets/icons/x-light.svg";
import linkedinLight from "../../assets/icons/linkedin-light.svg";
import instagramLight from "../../assets/icons/instagram-light.svg";
import tiktokLight from "../../assets/icons/tiktok-light.svg";
import downloadApp from "../../assets/images/download-app.png";
import googlePlay from "../../assets/images/google-play.png";
import appStore from "../../assets/images/app-store.png";
import { Globe } from "lucide-react";
import { useLocation } from "react-router-dom";
import { footerColumns } from "../../data/footerData";

function FooterSection({ title, links }) {
    return (
        <div className="mb-7">
            <h3 className="mb-2 text-[13px] font-semibold text-black">
                {title}
            </h3>

            <div className="flex flex-col gap-1">
                {links.map((link) => (
                    <a
                        key={link}
                        href="#"
                        className="text-[13px] leading-6 text-slate-600 hover:text-black"
                    >
                        {link}
                    </a>
                ))}
            </div>
        </div>
    );
}

function Footer() {
    const location = useLocation();
    const isLearnPage = location.pathname === "/learn";

    return (
        <footer className="mt-0 border-t border-gray-200 bg-white">
            <div className={`mx-auto w-full max-w-7xl px-14 pt-20 ${isLearnPage ? "pb-0" : "pb-20"}`}>

                {/* Main Footer */}
                <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-14">

                    {/* Logo */}
                    <div className="pt-1">
                        <img src={logo} alt="Coinbase" className="h-14 w-auto" />
                    </div>

                    {/* Footer Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 max-w-6xl">

                        {footerColumns.map((column, index) => (
                            <div key={index}>
                                {column.map((section) => (
                                    <FooterSection
                                        key={section.title}
                                        title={section.title}
                                        links={section.links}
                                    />
                                ))}
                            </div>
                        ))}

                    </div>

                </div>

                {/* Social Icons */}
                <div className="mt-8 mb-6 flex items-center gap-8">
                    <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                        <img src={xLight} alt="X" className="h-[14px] w-auto" />
                    </a>
                    <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                        <img src={linkedinLight} alt="LinkedIn" className="h-[14px] w-auto" />
                    </a>
                    <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                        <img src={instagramLight} alt="Instagram" className="h-[14px] w-auto" />
                    </a>
                    <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                        <img src={tiktokLight} alt="TikTok" className="h-[14px] w-auto" />
                    </a>
                </div>

                {/* Bottom Bar: Copyright & Language */}
                <div className="border-t border-gray-200 pt-8 flex items-center justify-between">

                    {/* Copyright */}
                    <div className="text-sm text-gray-600">
                        © 2026 Coinbase
                        <span className="mx-2">•</span>
                        <a href="#" className="hover:text-black">Privacy</a>
                        <span className="mx-2">•</span>
                        <a href="#" className="hover:text-black">Terms &amp; Conditions</a>
                    </div>

                    {/* Language */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe size={16} />
                        <span>Global</span>
                        <span>•</span>
                        <span>English</span>
                    </div>
                </div>

                {/* Absolute Bottom: Legal Disclaimer + Download App (ONLY ON LEARN PAGE) */}
                {isLearnPage && (
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 items-start border-t border-gray-200 pt-8">

                        {/* Left: Download the App */}
                        <div>
                            <img src={downloadApp} alt="Download the App" className="h-[18px] w-auto mb-4" />
                            <div className="flex flex-col gap-4">
                                <a href="#">
                                    <img src={googlePlay} alt="Get it on Google Play" className="h-[30px] w-auto rounded-[6px]" />
                                </a>
                                <a href="#">
                                    <img src={appStore} alt="Download on the App Store" className="h-[30px] w-auto rounded-[6px]" />
                                </a>
                            </div>
                        </div>

                        {/* Right: Legal Disclaimer */}
                        <p className="text-[13px] leading-[1.6] text-gray-500">
                            Information provided on this Site is for general educational purposes only and is not intended to constitute investment or other advice on financial products. Such information is not, and should not be read as, an offer or recommendation to buy or sell or a solicitation of an offer or recommendation to buy or sell any particular digital asset or to use any particular investment strategy. Coinbase and its affiliates (collectively "Coinbase") makes no representations as to the accuracy, completeness, timeliness, suitability, or validity of any information on this Site and will not be liable for any errors, omissions, or delays in this information or any losses, injuries, or damages arising from its display or use. Unless otherwise noted, all images are the property of Coinbase. Coinbase is not registered or licensed with the U.S. Securities and Exchange Commission or the U.S. Commodity Futures Trading Commission. Links provided to third-party sites are for informational purposes. Such sites are not under the control of Coinbase, and Coinbase is not responsible for the accuracy of the content on such third-party sites.
                        </p>

                    </div>
                )}
            </div>
        </footer>
    );
}

export default Footer;