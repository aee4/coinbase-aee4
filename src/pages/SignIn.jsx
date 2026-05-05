import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { setAuthSession } from "../utils/auth";
import AuthLayout from "../components/layout/AuthLayout";
import AuthInput from "../components/common/AuthInput";
import AuthSocialButtons from "../components/common/AuthSocialButtons";
import Button from "../components/common/Button";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const getErrorMessage = (requestError) => {
    return (
      requestError.response?.data?.message ||
      requestError.response?.data?.error ||
      "Unable to sign in. Please check your email and password."
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/login", formData);
      const token =
        response.data?.token ||
        response.data?.jwt ||
        response.data?.accessToken ||
        response.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      setAuthSession();
      navigate("/dashboard");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Sign in to Coinbase">
      <p className="mt-3 mb-5 text-left text-[13px] font-medium text-amber-700">
        Demo app – do not use your real password.
      </p>

      <form onSubmit={handleSubmit}>
        <AuthInput 
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email address"
          required
        />

        <AuthInput 
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
          required
        />

        {error && (
          <p className="mt-4 text-[14px] font-medium text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="auth"
          className="mt-5 bg-[#86a7eb]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Continue"}
        </Button>
      </form>

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
