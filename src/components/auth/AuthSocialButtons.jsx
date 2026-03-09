import React from 'react';
import { KeyRound } from 'lucide-react';
import appleIcon from '../../assets/icons/apple.svg';
import googleIcon from '../../assets/icons/google.svg';

const AuthSocialButtons = ({ mode = "signin" }) => {
  const isSignUp = mode === "signup";
  
  return (
    <div className="space-y-3">
      {!isSignUp && (
        <button className="flex h-[60px] w-full items-center rounded-full bg-[#f1f3f5] px-8 text-[16px] font-semibold text-black hover:bg-[#e2e4e6] transition-colors">
          <KeyRound size={20} className="mr-20 shrink-0" />
          <span>Sign in with Passkey</span>
        </button>
      )}

      <button className="flex h-[60px] w-full items-center rounded-full bg-[#f1f3f5] px-8 text-[16px] font-semibold text-black hover:bg-[#e2e4e6] transition-colors">
        <img src={googleIcon} alt="Google" className="mr-20 h-6 w-6 shrink-0" />
        <span>{isSignUp ? "Sign up with Google" : "Sign in with Google"}</span>
      </button>

      <button className="flex h-[60px] w-full items-center rounded-full bg-[#f1f3f5] px-8 text-[16px] font-semibold text-black hover:bg-[#e2e4e6] transition-colors">
        <img src={appleIcon} alt="Apple" className="mr-20 h-6 w-6 shrink-0" />
        <span>{isSignUp ? "Sign up with Apple" : "Sign in with Apple"}</span>
      </button>
    </div>
  );
};

export default AuthSocialButtons;
