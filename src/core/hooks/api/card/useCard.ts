"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

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