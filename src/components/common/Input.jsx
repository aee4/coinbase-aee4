const Input = ({ label, id, type = "text", className = "", ...props }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">{label}</label>}
            <input
                id={id}
                type={type}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                {...props}
            />
        </div>
    );
};

export default Input;
