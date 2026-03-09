const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
