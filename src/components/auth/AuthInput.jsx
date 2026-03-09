import React from 'react';

const AuthInput = ({ label, type = "email", placeholder, className = "", ...props }) => {
  return (
    <div className={`mt-8 ${className}`}>
      <label className="mb-3 block text-[16px] font-semibold text-black">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="h-[62px] w-full rounded-[12px] border border-[#aeb4bf] px-5 text-[17px] text-[#4b5563] outline-none focus:border-[#1652f0]"
        {...props}
      />
    </div>
  );
};

export default AuthInput;
