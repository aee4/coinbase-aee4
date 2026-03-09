import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  to, 
  onClick, 
  className = "", 
  variant = "primary", // primary, secondary, outline, ghost
  size = "md",      // sm, md, lg
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-colors duration-200 rounded-[10px]";
  
  const variants = {
    primary: "bg-[#1652f0] text-white hover:bg-[#0a46e1]",
    secondary: "bg-[#f1f3f5] text-black hover:bg-[#e2e4e6]",
    outline: "border border-gray-200 text-black hover:bg-gray-50",
    ghost: "text-[#1652f0] hover:text-[#0a46e1] bg-transparent"
  };

  const sizes = {
    sm: "px-[24px] py-[10px] text-[15px]",
    md: "px-6 py-3 text-[16px]",
    lg: "px-8 py-4 text-[18px]",
    auth: "h-[64px] w-full text-[18px]"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
