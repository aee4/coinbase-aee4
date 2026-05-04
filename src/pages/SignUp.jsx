import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import AuthLayout from "../components/layout/AuthLayout";
import AuthInput from "../components/common/AuthInput";
import AuthSocialButtons from "../components/common/AuthSocialButtons";
import Button from "../components/common/Button";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
      "Unable to create your account. Please check your details and try again."
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await api.post("/auth/register", formData);
      setSuccessMessage("Account created successfully. You can now sign in.");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Create your account" 
      description="Access all that Coinbase has to offer with a single account."
    >
      <p className="mt-3 mb-5 text-left text-[13px] font-medium text-amber-700">
        Demo app – do not use your real password.
      </p>

      <form onSubmit={handleSubmit}>
        <AuthInput 
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />

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
          placeholder="Create a password"
          required
        />

        {successMessage && (
          <p className="mt-4 text-[14px] font-medium text-green-700">
            {successMessage}
          </p>
        )}

        {error && (
          <p className="mt-4 text-[14px] font-medium text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="auth"
          className="mt-7 bg-[#86a7eb]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Continue"}
        </Button>
      </form>

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
