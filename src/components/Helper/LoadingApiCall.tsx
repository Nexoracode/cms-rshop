"use client";

import { Spinner } from "@heroui/react";

const LoadingApiCall: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-14">
      <Spinner color="secondary" labelColor="secondary" variant="gradient" size="lg" className="bg-gray-50 rounded-full p-6"/>
    </div>
  );
};

export default LoadingApiCall;
