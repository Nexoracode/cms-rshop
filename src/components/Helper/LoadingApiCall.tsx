"use client";

import { Spinner } from "@heroui/react";

const LoadingApiCall: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-14">
      <Spinner color="secondary" labelColor="secondary" variant="gradient" size="lg"/>
    </div>
  );
};

export default LoadingApiCall;
