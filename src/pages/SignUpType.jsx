import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icons/coinbase-logo.svg";
import { User, Briefcase, Code, Check } from "lucide-react";
import LoadingScreen from "../components/common/LoadingScreen";

function SignUpType() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("personal");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectType = (id) => {
    setSelectedType(id);
    // Add a slight delay for visual feedback if needed, or navigate immediately
    setTimeout(() => {
      navigate("/signup/details", { state: { type: id } });
    }, 300);
  };

  const options = [
    {
      id: "personal",
      title: "Personal",
      description: "Trade crypto as an individual.",
      icon: <User size={24} className="text-blue-600" />,
    },
    {
      id: "business",
      title: "Business",
      description: "Manage teams and portfolios, accept crypto payments, access APIs, and more",
      icon: <Briefcase size={24} className="text-blue-600" />,
    },
    {
      id: "developer",
      title: "Developer",
      description: "Build onchain using developer tooling.",
      icon: <Code size={24} className="text-blue-600" />,
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Top Logo */}
      <div className="px-8 pt-8">
        <Link to="/">
          <img src={logo} alt="Coinbase" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="mx-auto flex max-w-[500px] flex-col items-center px-6 pt-24 pb-20">
        <h1 className="text-center text-[32px] font-semibold leading-tight tracking-tight text-[#0a0b0d]">
          What kind of account are you creating?
        </h1>

        <div className="mt-12 flex w-full flex-col gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelectType(option.id)}
              className={`group flex items-center gap-6 rounded-[12px] border p-6 text-left transition-all duration-200 ${
                selectedType === option.id
                  ? "border-[#1652f0] ring-1 ring-[#1652f0]"
                  : "border-[#eceff1] hover:bg-[#f4f7f9]"
              }`}
            >
              {/* Icon Container with specific styling from image */}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#f4f7f9]">
                {option.icon}
                {selectedType === option.id && (
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white ring-2 ring-white">
                    <Check size={12} strokeWidth={4} />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <h3 className="text-[18px] font-bold text-[#0a0b0d]">{option.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-[#5b616e]">
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignUpType;
