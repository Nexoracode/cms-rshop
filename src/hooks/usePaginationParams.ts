"use client";

import { useSearchParams } from "next/navigation";

export const usePaginationParams = (key = "page", defaultPage: number = 1) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get(key)) || defaultPage;
  return { page };
};
