// useListFormHandler.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

type Item = Record<string, any>;

interface UseListFormHandlerOptions<T extends Item> {
  runValidationOnChange?: boolean;
  /**
   * باید یک ارایه از خطاها برگردونه، هر ایندکس متناظر با آیتم همون ایندکس.
   * یعنی: (items) => Record<string,string>[]
   */
  onValidate?: (items: T[]) => Record<string, string>[];
  /**
   * اگر آیتم‌ها کلید (id) دارن، مقدار اینو بذار (مثلاً "id") تا هوک تغییرات رو با کلید مستقل از ایندکس مدیریت کنه.
   * اگر null باشه، از ایندکس به عنوان کلید استفاده می‌شه.
   */
  idKey?: keyof T | null;
}

export function useListFormHandler<T extends Item>(
  initialItems: T[] = [],
  options: UseListFormHandlerOptions<T> = {}
) {
  const { runValidationOnChange = true, onValidate, idKey = "id" as any } =
    options;

  const [items, setItems] = useState<T[]>(() => initialItems.slice());
  const [errors, setErrors] = useState<Record<string, string>[]>(() =>
    initialItems.map(() => ({}))
  );
  const [touched, setTouched] = useState<Record<string, boolean>[]>(() =>
    initialItems.map(() => ({}))
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // changedMap keyed by stable key (id if exists, otherwise index string)
  const [changedMap, setChangedMap] = useState<Record<string, T>>({});

  // helper to produce stable key for an item (use idKey if present and item has it)
  const getKeyFor = useCallback(
    (it: T, idx: number) =>
      idKey && it && it[idKey] !== undefined && it[idKey] !== null
        ? String(it[idKey])
        : String(idx),
    [idKey]
  );

  // run validation for whole list and setErrors
  const validateList = useCallback(() => {
    if (!onValidate) return [];
    const res = onValidate(items) || [];
    // ensure length matches items length — normalize if necessary
    const normalized = items.map((_, i) => res[i] ?? {});
    setErrors(normalized);
    return normalized;
  }, [items, onValidate]);

  // convenience: validate specific item by index
  const validateItem = useCallback(
    (index: number) => {
      if (!onValidate) return {};
      const copy = items.slice();
      const res = onValidate(copy) || [];
      const err = res[index] ?? {};
      setErrors(prev => {
        const next = prev.slice();
        next[index] = err;
        return next;
      });
      return err;
    },
    [items, onValidate]
  );

  // update item and track changed
  const updateItem = useCallback(
    (index: number, patch: Partial<T>) => {
      setItems(prev => {
        const next = prev.slice();
        next[index] = { ...(next[index] || {}), ...patch };

        // update errors if needed (live validation after submit attempt)
        if (runValidationOnChange && onValidate && hasSubmitted) {
          const validation = onValidate(next) || [];
          setErrors(nextErr => {
            // normalize
            const normalized = next.map((_, i) => validation[i] ?? {});
            return normalized;
          });
        }

        // update touched
        setTouched(prevTouched => {
          const nt = prevTouched.slice();
          nt[index] = { ...(nt[index] || {}) };
          Object.keys(patch).forEach(k => {
            nt[index][k] = true;
          });
          return nt;
        });

        // update changedMap (use stable key)
        const key = getKeyFor(next[index], index);
        setChangedMap(prev => ({ ...prev, [key]: next[index] }));

        return next;
      });
    },
    [getKeyFor, hasSubmitted, onValidate, runValidationOnChange]
  );

  const addItem = useCallback(
    (item: T, atIndex?: number) => {
      setItems(prev => {
        const next = prev.slice();
        if (typeof atIndex === "number") next.splice(atIndex, 0, item);
        else next.push(item);

        // errors/touched arrays adjust
        setTouched(prevTouched => {
          const nt = prevTouched.slice();
          if (typeof atIndex === "number") nt.splice(atIndex, 0, {});
          else nt.push({});
          return nt;
        });
        setErrors(prevErrors => {
          const ne = prevErrors.slice();
          if (typeof atIndex === "number") ne.splice(atIndex, 0, {});
          else ne.push({});
          return ne;
        });

        // mark added item as changed
        const idx = typeof atIndex === "number" ? atIndex : next.length - 1;
        const key = getKeyFor(next[idx], idx);
        setChangedMap(prev => ({ ...prev, [key]: next[idx] }));

        // optional live validation
        if (runValidationOnChange && onValidate && hasSubmitted) {
          const validation = onValidate(next) || [];
          setErrors(validation.map((v, i) => v ?? {}));
        }

        return next;
      });
    },
    [getKeyFor, hasSubmitted, onValidate, runValidationOnChange]
  );

  const removeItem = useCallback(
    (index: number) => {
      setItems(prev => {
        const next = prev.filter((_, i) => i !== index);

        // adjust touched/errors
        setTouched(prevTouched => prevTouched.filter((_, i) => i !== index));
        setErrors(prevErrors => prevErrors.filter((_, i) => i !== index));

        // remove changedMap entry for that item if keyed by id (or by index key)
        const removedKey = getKeyFor(prev[index], index);
        setChangedMap(prevCh => {
          const clone = { ...prevCh };
          delete clone[removedKey];
          return clone;
        });

        // if idKey is absent and indices shift, changedMap keys are string(index) — we won't remap them,
        // but items with ids (recommended) are stable. For index-keyed lists caller should avoid reordering
        // or rely on setList to re-sync.
        return next;
      });
    },
    [getKeyFor]
  );

  // set the whole list (replacement)
  const setList = useCallback(
    (nextItems: T[]) => {
      setItems(nextItems.slice());
      setTouched(nextItems.map(() => ({})));
      setErrors(nextItems.map(() => ({})));
      setHasSubmitted(false);
      setChangedMap({}); // clear changed buffer when replacing whole list
    },
    []
  );

  // get array of changed items (deduped)
  const getChangedItems = useCallback(() => {
    return Object.values(changedMap);
  }, [changedMap]);

  // validate and return boolean
  const canSubmit = useCallback(() => {
    setHasSubmitted(true);
    const validation = validateList();
    const hasAny = validation.some(err => Object.keys(err).length > 0);
    if (hasAny) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      toast.error("لطفا مقادیر لازم را کامل کنید.");
    }
    return !hasAny;
  }, [validateList]);

  // expose lightweight memoized api
  const api = useMemo(
    () => ({
      list: items,
      items,
      setList,
      updateItem,
      addItem,
      removeItem,
      errors,
      touched,
      hasSubmitted,
      validateList,
      validateItem,
      validateAll: validateList,
      canSubmit,
      getChangedItems,
      // raw map in case caller wants keys
      changedMap,
      setChangedMap,
      setErrors,
      setHasSubmitted,
    }),
    [
      items,
      setList,
      updateItem,
      addItem,
      removeItem,
      errors,
      touched,
      hasSubmitted,
      validateList,
      validateItem,
      canSubmit,
      getChangedItems,
      changedMap,
      setChangedMap,
      setErrors,
      setHasSubmitted,
    ]
  );

  return api;
}
