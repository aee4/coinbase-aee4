import { useState } from "react";
import api from "../api/api";
import Button from "../components/common/Button";

const initialFormData = {
  name: "",
  symbol: "",
  price: "",
  image: "",
  change24h: "",
};

function AddCrypto() {
  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState("");
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
      "Unable to add this cryptocurrency. Please check the details and try again."
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await api.post("/crypto", {
        ...formData,
        price: Number(formData.price),
        change24h: Number(formData.change24h),
      });

      setSuccessMessage("Cryptocurrency added successfully.");
      setFormData(initialFormData);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-5xl px-6 py-16 md:px-14 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-[14px] font-semibold text-[#1652f0]">
            Crypto
          </p>
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-black md:text-[48px]">
            Add cryptocurrency
          </h1>
          <p className="mt-4 text-[16px] leading-[1.45] text-[#5b616e]">
            Add a demo tradable asset to the crypto market list.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl border-t border-[#e5e7eb] pt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-3 block text-[16px] font-semibold text-black">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bitcoin"
                required
                className="h-[58px] w-full rounded-[12px] border border-[#aeb4bf] px-5 text-[17px] text-[#4b5563] outline-none focus:border-[#1652f0]"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-[16px] font-semibold text-black">
                Symbol
              </span>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                placeholder="BTC"
                required
                className="h-[58px] w-full rounded-[12px] border border-[#aeb4bf] px-5 text-[17px] uppercase text-[#4b5563] outline-none focus:border-[#1652f0]"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-[16px] font-semibold text-black">
                Price
              </span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="65000"
                step="any"
                min="0"
                required
                className="h-[58px] w-full rounded-[12px] border border-[#aeb4bf] px-5 text-[17px] text-[#4b5563] outline-none focus:border-[#1652f0]"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-[16px] font-semibold text-black">
                Change 24h
              </span>
              <input
                type="number"
                name="change24h"
                value={formData.change24h}
                onChange={handleChange}
                placeholder="2.5"
                step="any"
                required
                className="h-[58px] w-full rounded-[12px] border border-[#aeb4bf] px-5 text-[17px] text-[#4b5563] outline-none focus:border-[#1652f0]"
              />
            </label>
          </div>

          <label className="mt-6 block">
            <span className="mb-3 block text-[16px] font-semibold text-black">
              Image URL
            </span>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/coin.png"
              required
              className="h-[58px] w-full rounded-[12px] border border-[#aeb4bf] px-5 text-[17px] text-[#4b5563] outline-none focus:border-[#1652f0]"
            />
          </label>

          {successMessage && (
            <p className="mt-5 text-[14px] font-medium text-green-700">
              {successMessage}
            </p>
          )}

          {error && (
            <p className="mt-5 text-[14px] font-medium text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-8 min-w-[180px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add crypto"}
          </Button>
        </form>
      </section>
    </div>
  );
}

export default AddCrypto;
