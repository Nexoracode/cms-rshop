"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

/* ---------------------- Get All Payments (with status filter) ---------------------- */
export const useGetCardToCardPayments = (status?: string) => {
  return useQuery({
    queryKey: ["card-to-card-payments", status],
    queryFn: () =>
      fetcher({
        route: status
          ? `/admin/card-to-card?status=${status}`
          : `/admin/card-to-card`,
        isActiveToast: false,
      }),
  });
};

/* ---------------------- Get One Payment Details ---------------------- */
export const useGetOneCardToCardPayment = (paymentId?: number) => {
  return useQuery({
    queryKey: ["card-to-card-payment", paymentId],
    queryFn: () =>
      fetcher({
        route: `/admin/card-to-card/${paymentId}`,
        isActiveToast: true,
        loadingText: "در حال دریافت اطلاعات پرداخت...",
        successText: "اطلاعات پرداخت دریافت شد",
      }),
    enabled: !!paymentId,
  });
};

/* ---------------------- Review Payment (Approve / Reject) ---------------------- */
export const useReviewCardToCardPayment = (paymentId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { status: string; admin_note?: string }) =>
      fetcher({
        route: `/admin/card-to-card/${paymentId}/review`,
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال بررسی پرداخت...",
        successText: "رسید بررسی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["card-to-card-payments"] });
      qc.invalidateQueries({ queryKey: ["card-to-card-payment", paymentId] });
      qc.invalidateQueries({ queryKey: ["card-to-card-pending"] });
    },
  });
};

/* ---------------------- Get Pending Payments (awaiting approval) ---------------------- */
export const useGetPendingCardToCardPayments = () => {
  return useQuery({
    queryKey: ["card-to-card-pending"],
    queryFn: () =>
      fetcher({
        route: "/admin/card-to-card/pending/list",
        isActiveToast: false,
      }),
  });
};
