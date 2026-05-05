const AuthInput = ({
  label,
  type = "email",
  placeholder,
  className = "",
  trailingElement,
  ...props
}) => {
  return (
    <div className={`mt-8 ${className}`}>
      <label className="mb-3 block text-[16px] font-semibold text-black">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`h-[62px] w-full rounded-[12px] border border-[#aeb4bf] px-5 text-[17px] text-[#4b5563] outline-none focus:border-[#1652f0] ${
            trailingElement ? "pr-14" : ""
          }`}
          {...props}
        />
        {trailingElement && (
          <div className="absolute inset-y-0 right-4 flex items-center">
            {trailingElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
