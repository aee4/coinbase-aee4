import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "coinbase_cookie_consent";

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!savedPreference) {
      const revealTimer = window.setTimeout(() => setIsVisible(true), 500);
      return () => window.clearTimeout(revealTimer);
    }

    return undefined;
  }, []);

  const savePreference = (preference) => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, preference);
    setIsLeaving(true);
    window.setTimeout(() => setIsVisible(false), 240);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8">
      <div
        className={`mx-auto max-w-[980px] rounded-[24px] border border-white/70 bg-white/92 p-4 text-[#0a0b0d] shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-all duration-300 sm:p-5 md:flex md:items-center md:gap-6 ${
          isLeaving ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
        }`}
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[20px] font-bold text-[#0052ff]">
          C
        </div>

        <div className="mt-3 min-w-0 flex-1 md:mt-0">
          <h2 className="text-[17px] font-bold tracking-[-0.02em] sm:text-[19px]">
            Make your visit smoother
          </h2>
          <p className="mt-1 max-w-[680px] text-[13px] leading-5 text-[#5b616e] sm:text-[14px]">
            We use cookies to improve your experience, remember preferences, and keep this site feeling fast and useful.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:justify-end md:mt-0">
          <button
            type="button"
            onClick={() => savePreference("declined")}
            className="min-h-11 rounded-full bg-[#f1f3f5] px-5 text-[14px] font-bold text-black transition hover:bg-[#e7eaee] active:scale-[0.98]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => savePreference("accepted")}
            className="min-h-11 rounded-full bg-[#0052ff] px-5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(0,82,255,0.28)] transition hover:bg-[#0047df] active:scale-[0.98]"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
