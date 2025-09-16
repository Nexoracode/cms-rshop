// lib/reorderSwap.ts
export type ItemWithOrder = {
  id: number;
  display_order: number | null | undefined;
  [k: string]: any;
};

/**
 * swap دو آیتم داخل آرایه (با حفظ index ها)
 * و پس از swap مقادیر display_order داخلی هم بروزرسانی خواهد شد.
 */
export function swapArrayItems<T extends ItemWithOrder>(
  items: T[],
  idxA: number,
  idxB: number
): T[] {
  const copy = items.slice();
  const a = copy[idxA];
  const b = copy[idxB];
  copy[idxA] = { ...b };
  copy[idxB] = { ...a };
  // keep their display_order values swapped (we assume backend already accepted swap)
  const tmpOrder = copy[idxA].display_order;
  copy[idxA].display_order = copy[idxB].display_order;
  copy[idxB].display_order = tmpOrder;
  return copy;
}

/**
 * Generic swap & mutate helper.
 * - items: آرایه محلی
 * - activeId, overId: شناسه‌های دو آیتم که swap میشن
 * - mutateFn: تابعی که mutateAsync({id, display_order}) برمی‌گرداند
 * - setLocalState: تابع setState برای آرایه
 * - setIsBusy: (اختیاری) برای disable کردن UI هنگام درخواست‌ها
 *
 * نکته: فرض می‌کنیم هر دو آیتم display_order از backend داشته باشند.
 */
export async function performSwapAndMutate<T extends ItemWithOrder>({
  items,
  activeId,
  overId,
  mutateFn,
  setLocalState,
  setIsBusy,
}: {
  items: T[];
  activeId: number;
  overId: number;
  mutateFn: (payload: { id: number; display_order: number }) => Promise<any>;
  setLocalState: (next: T[]) => void;
  setIsBusy?: (v: boolean) => void;
}) {
  const iA = items.findIndex((it) => it.id === activeId);
  const iB = items.findIndex((it) => it.id === overId);
  if (iA === -1 || iB === -1) return;

  const itemA = items[iA];
  const itemB = items[iB];

  if (
    typeof itemA.display_order === "undefined" ||
    typeof itemB.display_order === "undefined"
  ) {
    throw new Error("display_order missing. cannot swap.");
  }

  const payloadA = {
    id: itemA.id,
    display_order: itemB.display_order as number,
  };
  const payloadB = {
    id: itemB.id,
    display_order: itemA.display_order as number,
  };

  setIsBusy?.(true);
  try {
    // دو درخواست موازی
    await Promise.all([mutateFn(payloadA), mutateFn(payloadB)]);
    // اگر هر دو موفق بودند، local swap را انجام بده
    const next = swapArrayItems(items, iA, iB);
    // بعد از swap، برای consistency، display_order های محلی را تنظیم کن
    next[iA] = { ...next[iA], display_order: payloadA.display_order };
    next[iB] = { ...next[iB], display_order: payloadB.display_order };
    setLocalState(next);
  } catch (err) {
    // اگر خطا رخ داد، هیچ کاری با state انجام نده (rollback ساده)
    console.error("Swap failed:", err);
    throw err;
  } finally {
    setIsBusy?.(false);
  }
}
