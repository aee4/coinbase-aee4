import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthSocialButtons from "../components/auth/AuthSocialButtons";
import Button from "../components/ui/Button";

function SignIn() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthLayout title="Sign in to Coinbase">
      <AuthInput 
        label="Email"
        placeholder="Your email address"
      />

      <Button variant="primary" size="auth" className="mt-5 bg-[#86a7eb]">
        Continue
      </Button>

      {/* OR */}
      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-[14px] text-[#6b7280]">OR</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <AuthSocialButtons mode="signin" />

      {/* Signup link */}
      <p className="mt-10 text-center text-[16px] font-semibold text-black">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#1652f0]">
          Sign up
        </Link>
      </p>

      {/* Footer text */}
      <p className="mx-auto mt-10 max-w-[320px] text-center text-[14px] leading-[1.45] text-[#6b7280]">
        Not your device? Use a private window. See{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        for more info.
      </p>
    </AuthLayout>
  );
}

export default SignIn;
