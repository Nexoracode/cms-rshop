"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useFetchOnEdit = <T = any>(
  queryFn: (id: number) => any,
  paramName = "edit_id"
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get(paramName);

  const editId = useMemo<number | null>(() => {
    if (!idParam || idParam.trim() === "") return null;
    const num = Number(idParam);
    return isNaN(num) || num <= 0 ? null : num;
  }, [idParam]);

  useEffect(() => {
    if (editId === null) {
      router.back();
    }
  }, [editId, router]);

  const query = editId !== null ? queryFn(editId) : null;

  return {
    data: query?.data?.data as T | null,
    isLoading: query?.isLoading ?? false,
    isError: query?.isError ?? false,
    error: query?.error ?? null,
    editId,
  };
};