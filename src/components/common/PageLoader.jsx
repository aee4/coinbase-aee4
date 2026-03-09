import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1652f0]" />
        <p className="text-[16px] font-medium text-[#5b616e]">
          Loading Coinbase clone...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
