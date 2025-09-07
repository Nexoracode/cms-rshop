"use client";

import { useSearchParams } from "next/navigation";

export const usePaginationParams = (defaultPage: number = 1) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || defaultPage;
  return { page };
};
