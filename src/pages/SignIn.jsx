import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import AuthInput from "../components/common/AuthInput";
import AuthSocialButtons from "../components/common/AuthSocialButtons";
import Button from "../components/common/Button";

function SignIn() {
  return (
    <AuthLayout title="Sign in to Coinbase">
      <AuthInput 
        label="Email"
        placeholder="Your email address"
      />

      <Button variant="primary" size="auth" className="mt-5 bg-[#86a7eb]">
        Continue
      </Button>

      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-[14px] text-[#6b7280]">OR</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <AuthSocialButtons mode="signin" />

      <p className="mt-10 text-center text-[16px] font-semibold text-black">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#1652f0]">
          Sign up
        </Link>
      </p>

      <p className="mx-auto mt-10 max-w-[320px] text-center text-[14px] leading-[1.45] text-[#6b7280]">
        Not your device? Use a private window. See{" "}
        <button type="button" className="underline">
          Privacy Policy
        </button>{" "}
        for more info.
      </p>
    </AuthLayout>
  );
}

export default SignIn;
