"use client";

import { toast } from "react-hot-toast";

type FetcherProps = {
  route: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: HeadersInit;
  loadingText?: string;
  successText?: string;
  credentials?: "same-origin" | "omit" | "include";
};

export const fetcher = async ({
  route,
  method = "GET",
  body,
  headers,
  loadingText = "در حال ارسال...",
  successText,
  credentials = "include"
}: FetcherProps): Promise<{ data: any; ok: boolean } | undefined> => {
  const toastId = toast.loading(loadingText);

  try {
    const res = await fetch(`/api${route}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials
    });

    const data = await res.json();
    toast.dismiss(toastId);

    if (!res.ok) {
      toast.error(data.message || "خطا در عملیات");
      return { data: null, ok: false };
    }

    toast.success(successText || data.message || "عملیات موفق");
    return { data: data.data, ok: true };
  } catch (err: any) {
    toast.dismiss(toastId);
    toast.error(err.message || "خطای اتصال به سرور");
  }
};
