"use client";

import { useCallback, useState } from "react";
import { useFormCore } from "./useFormCore";

export function useListForm<T extends Record<string, any>>(
  initialItems: T[] = [],
  options: {
    runValidationOnChange?: boolean;
    onValidate?: (items: T[]) => Record<string, string>[];
    idKey?: keyof T | null;
  } = {}
) {
  const { idKey = null, ...coreOptions } = options;
  const core = useFormCore(initialItems, coreOptions);
  const canSubmit = core.validateAndShowErrors;

  const [touched, setTouched] = useState<Record<string, boolean>[]>(() =>
    initialItems.map(() => ({}))
  );
  const [changedMap, setChangedMap] = useState<Record<string, T>>({});

  const getKeyFor = useCallback(
    (item: T, index: number) =>
      idKey != null && item?.[idKey] != null
        ? String(item[idKey])
        : String(index),
    [idKey]
  );

  const updateItem = useCallback(
    (index: number, patch: Partial<T>) => {
      core.setData((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], ...patch };

        // touched
        setTouched((t) => {
          const nt = [...t];
          nt[index] = {
            ...nt[index],
            ...Object.keys(patch).reduce(
              (acc, k) => ({ ...acc, [k]: true }),
              {}
            ),
          };
          return nt;
        });

        // changedMap
        const key = getKeyFor(next[index], index);
        setChangedMap((c) => ({ ...c, [key]: next[index] }));

        // live validation
        if (core.shouldValidateLive) {
          const result = core.runValidation(next);
          core.setErrors(result);
        }

        return next;
      });
    },
    [core, getKeyFor]
  );

  const setList = useCallback(
    (nextItems: T[]) => {
      core.setData(nextItems);
      setTouched(nextItems.map(() => ({})));
      setChangedMap({});
      core.setHasSubmitted(false);
    },
    [core]
  );

  const getChangedItems = useCallback(
    () => Object.values(changedMap),
    [changedMap]
  );

  const reset = useCallback(
    (items?: T[]) => {
      const newItems = items ?? [];
      core.setData(newItems);
      setTouched(newItems.map(() => ({})));
      setChangedMap({});
      core.setErrors([]);
      core.setHasSubmitted(false);
    },
    [core]
  );

  return {
    items: core.data as T[],
    errors: core.errors as Record<string, string>[],
    touched,
    hasSubmitted: core.hasSubmitted,
    updateItem,
    setList,
    getChangedItems,
    canSubmit: canSubmit,
    reset,
  };
}
