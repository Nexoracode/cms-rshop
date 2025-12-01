"use client";

import { useCallback, useRef, useState } from "react";
import { useFormCore } from "./useFormCore";

type UseListForm = <T extends Record<string, any>>(
  initialItems?: T[],
  options?: {
    runValidationOnChange?: boolean;
    onValidate?: (items: T[]) => Record<string, string>[];
    idKey?: keyof T | null;
  }
) => {
  items: T[];
  errors: Record<string, string>[];
  hasSubmitted: boolean;
  updateItem: (index: number, patch: Partial<T>) => void;
  setList: (nextItems: T[]) => void;
  getChangedItems: () => T[];
  canSubmit: () => boolean;
  reset: (items?: T[]) => void;
};

export const useListForm: UseListForm = (initialItems = [], options = {}) => {
  const { idKey = null, ...coreOptions } = options;
  const core = useFormCore(initialItems, coreOptions);

  const initialItemsRef = useRef(initialItems);
  const [changedMap, setChangedMap] = useState<Record<string, any>>({});

  const updateItem = useCallback((index: number, patch: Partial<any>) => {
    core.setData((prev: any[]) => {
      const next = [...prev];
      const newItem = { ...next[index], ...patch };
      next[index] = newItem;

      Object.keys(patch).forEach((field) => {
        core.markFieldAsTouched(index, field);
      });

      if (idKey && newItem[idKey] != null) {
        setChangedMap((c) => ({
          ...c,
          [String(newItem[idKey])]: newItem,
        }));
      }

      if (core.shouldValidateLive) {
        core.runValidation(next);
      }

      return next;
    });
  }, [core, idKey]);

  const reset = useCallback((items?: any[]) => {
    core.setData(items ?? initialItemsRef.current);
    setChangedMap({});
    core.resetForm();
  }, [core]);

  const setList = useCallback((nextItems: any[]) => {
    core.setData(nextItems);
    setChangedMap({});
    core.resetForm();
  }, [core]);

  const getChangedItems = useCallback(() => Object.values(changedMap), [changedMap]);

  return {
    items: core.data,
    errors: core.errors as Record<string, string>[],
    hasSubmitted: core.hasSubmitted,
    updateItem,
    setList,
    getChangedItems,
    canSubmit: core.triggerValidation,
    reset,
  };
};