"use client";

import { Spinner } from "@heroui/react";

const LoadingApiCall: React.FC = () => {
  return (
    <div className="flex items-center flex-col gap-2">
      <Spinner
        classNames={{ label: "text-foreground mt-4" }}
        variant="wave"
        size="lg"
      />
      <p className="text-center animate-pulse py-4">
        درحال بارگزاری اطلاعات...
      </p>
    </div>
  );
};

export default LoadingApiCall;
