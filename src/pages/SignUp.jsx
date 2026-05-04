import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import AuthInput from "../components/common/AuthInput";
import AuthSocialButtons from "../components/common/AuthSocialButtons";
import Button from "../components/common/Button";

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

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-[14px] text-[#6b7280]">OR</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <AuthSocialButtons mode="signup" />

      <p className="mt-8 text-center text-[16px] font-semibold text-black">
        Already have an account?{" "}
        <Link to="/signin" className="text-[#1652f0]">
          Sign in
        </Link>
      </p>

      <p className="mx-auto mt-8 max-w-[380px] text-center text-[14px] leading-[1.45] text-[#6b7280]">
        By creating an account you certify that you are over the
        age of 18 and agree to our{" "}
        <button type="button" className="underline">
          Privacy Policy
        </button>{" "}
        and{" "}
        <button type="button" className="underline">
          Cookie Policy
        </button>
        .
      </p>
    </AuthLayout>
  );
}

export default SignUp;
