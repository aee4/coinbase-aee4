import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthSocialButtons from "../components/auth/AuthSocialButtons";
import Button from "../components/ui/Button";

function SignUp() {
  return (
    <AuthLayout 
      title="Create your account" 
      description="Access all that Coinbase has to offer with a single account."
    >
      <AuthInput 
        label="Email"
        placeholder="Your email address"
      />

      <Button variant="primary" size="auth" className="mt-7 bg-[#86a7eb]">
        Continue
      </Button>

      {/* OR */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-[14px] text-[#6b7280]">OR</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <AuthSocialButtons mode="signup" />

      {/* Sign in link */}
      <p className="mt-8 text-center text-[16px] font-semibold text-black">
        Already have an account?{" "}
        <Link to="/signin" className="text-[#1652f0]">
          Sign in
        </Link>
      </p>

      {/* Footer text */}
      <p className="mx-auto mt-8 max-w-[380px] text-center text-[14px] leading-[1.45] text-[#6b7280]">
        By creating an account you certify that you are over the
        age of 18 and agree to our{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Cookie Policy
        </a>
        .
      </p>
    </AuthLayout>
  );
}

export default SignUp;
