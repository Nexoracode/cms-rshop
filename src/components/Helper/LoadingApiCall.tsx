"use client";

import { Spinner } from "@heroui/react";

type Props = {
  loadingText?: string;
};

const LoadingApiCall: React.FC<Props> = ({ loadingText }) => {
  return (
    <div className="flex items-center flex-col gap-2">
      <Spinner
        classNames={{ label: "text-foreground mt-4" }}
        variant="wave"
        size="lg"
      />
      <p className="text-center animate-pulse py-4">
        {loadingText || "در حال دریافت اطلاعات..."}  
        <span className="text-blue-500 bg-blue-500/20 rounded-lg p-1.5">
          یا هنوز در حال لود است
        </span>
      </p>
    </div>
  );
};

export default LoadingApiCall;
