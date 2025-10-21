// components/ui/modals/FilterModal.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectItem,
  DateRangePicker,
  NumberInput,
} from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import DynamicModal from "./Modal";
import OptionButton from "../buttons/OptionButton";
import { IoFilter } from "react-icons/io5";
import NumberWithSelect from "@/components/forms/Inputs/NumberWithSelect";
import AnimatedMultiSelect from "@/components/forms/Inputs/SearchableMultiSelect";
import { calToJs } from "@/utils/dateHelpers";
import { add, eqBool10, eqId, rangeDate, rangeNum } from "@/utils/queryFilters";
import { FieldOption, FilterField, ModalSize } from ".";

type Props = {
  title?: React.ReactNode;
  fields: FilterField[]; // if absent, children mode (backwards compatible)
  size?: ModalSize;
};

const makeInitialState = (fields?: FilterField[]) => {
  const initial: Record<string, any> = {};
  if (!fields) return initial;

  for (const f of fields) {
    switch (f.type) {
      case "boolean01":
        initial[f.key] = (f as any).default ?? "";
        break;
      case "numberRange":
        initial[`${f.key}Min`] = "";
        initial[`${f.key}Max`] = "";
        break;
      case "unitNumber":
        initial[`${f.key}Min`] = "";
        initial[`${f.key}Max`] = "";
        initial[`${f.key}Unit`] = String(
          (f as any).unitOptions?.[0]?.key ?? ""
        );
        break;
      case "discount":
        initial[`discountType`] = "percent";
        initial[`${f.key}Min`] = "";
        initial[`${f.key}Max`] = "";
        break;
      case "dateRange":
        initial[`${f.key}Range`] = null;
        break;
      case "multiSelect":
        initial[f.key] = [] as string[];
        break;
      default:
        initial[f.key] = "";
    }
  }

  return initial;
};

const FilterModal: React.FC<Props> = ({
  title = "فیلتر",
  fields,
  size = "2xl",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setIsOpen(open);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // remote options cache
  const [remoteCache, setRemoteCache] = useState<Record<string, FieldOption[]>>(
    {}
  );

  // state for the fields — important: DO NOT reset on modal close.
  // initialize state once (when fields change AND state is empty)
  const initialStateMemo = useMemo(() => makeInitialState(fields), [fields]);
  const [state, setState] = useState<Record<string, any>>(initialStateMemo);

  // if fields change (new set of fields), and current state is "empty-ish",
  // re-init. We consider empty-ish when none of initial keys exist.
  useEffect(() => {
    if (!fields) return;
    const hasAnyKey = Object.keys(state).length > 0;
    if (!hasAnyKey) {
      setState(initialStateMemo);
    } else {
      // if fields changed drastically, ensure missing keys are added (without wiping existing values)
      const needAdd: Record<string, any> = {};
      for (const k in initialStateMemo) {
        if (!(k in state)) needAdd[k] = initialStateMemo[k];
      }
      if (Object.keys(needAdd).length) setState((p) => ({ ...needAdd, ...p }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields?.map((f) => f.key).join(","), initialStateMemo]);

  // lazy load remoteOptions when modal opens
  useEffect(() => {
    if (!isOpen || !fields) return;
    fields.forEach((f) => {
      if ("remoteOptions" in f && f.remoteOptions && !remoteCache[f.key]) {
        f.remoteOptions!().then((opts) =>
          setRemoteCache((p) => ({ ...p, [f.key]: opts || [] }))
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, fields]);

  const setField = (k: string, v: any) => setState((p) => ({ ...p, [k]: v }));

  // build params using helper utils
  const buildParams = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (!fields) return params;

    for (const f of fields) {
      switch (f.type) {
        case "boolean01": {
          const v: "" | "1" | "0" = state[f.key] ?? "";
          eqBool10(params, f.key, v);
          break;
        }
        case "select": {
          const v = state[f.key];
          eqId(params, f.key, v);
          break;
        }
        case "multiSelect": {
          const arr: string[] = state[f.key] ?? [];
          (arr || []).forEach((val) => add(params, f.key, `$eq:${val}`));
          break;
        }
        case "numberRange": {
          const min = state[`${f.key}Min`];
          const max = state[`${f.key}Max`];
          rangeNum(params, f.key, min === "" ? "" : min, max === "" ? "" : max);
          break;
        }
        case "unitNumber": {
          const min = state[`${f.key}Min`];
          const max = state[`${f.key}Max`];
          const unit = state[`${f.key}Unit`];
          const keyName =
            String(unit) === "گرم" || String(unit) === "g"
              ? `${f.key}_g`
              : `${f.key}_kg`;
          rangeNum(
            params,
            keyName,
            min === "" ? "" : min,
            max === "" ? "" : max
          );
          break;
        }
        case "discount": {
          const min = state[`${f.key}Min`];
          const max = state[`${f.key}Max`];
          const t = state["discountType"] ?? "percent";
          const name = t === "percent" ? "discount_percent" : "discount_amount";
          rangeNum(params, name, min === "" ? "" : min, max === "" ? "" : max);
          break;
        }
        case "dateRange": {
          const range = state[`${f.key}Range`];
          const s = calToJs(range?.start);
          const e = calToJs(range?.end);
          rangeDate(params, f.key, s, e);
          break;
        }
        case "text": {
          const v = state[f.key];
          if (v !== "" && v != null) add(params, f.key, `$like:${v}`);
          break;
        }
      }
    }

    return params;
  };

  const handleApply = () => {
    const p = buildParams();
    const q = p.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
    // DO NOT clear local state on apply — keep values (user asked this behavior)
    closeModal();
  };

  const handleClear = () => {
    // reset to initial defaults
    const init = makeInitialState(fields);
    setState(init);
    router.push(pathname);
    closeModal();
  };

  // rendering logic
  const renderField = (f: FilterField) => {
    switch (f.type) {
      case "boolean01":
        return (
          <Select
            dir="rtl"
            label={f.label}
            selectedKeys={state[f.key] ? [state[f.key]] : []}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as "" | "1" | "0";
              setField(f.key, val ?? "");
            }}
          >
            <SelectItem key="">همه</SelectItem>
            <SelectItem key="1">دارد</SelectItem>
            <SelectItem key="0">ندارد</SelectItem>
          </Select>
        );

      case "select": {
        const opts = f.options ?? remoteCache[f.key] ?? [];
        return (
          <Select
            dir="rtl"
            label={f.label}
            placeholder={(f as any).placeholder ?? "انتخاب کنید"}
            selectedKeys={state[f.key] ? [String(state[f.key])] : []}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as string;
              setField(f.key, val ?? "");
            }}
          >
            {opts.length ? (
              opts.map((o) => (
                <SelectItem key={String(o.key)}>{o.title}</SelectItem>
              ))
            ) : (
              <SelectItem key="-1" isDisabled>
                آیتمی موجود نیست
              </SelectItem>
            )}
          </Select>
        );
      }

      case "multiSelect": {
        const opts = f.options ?? remoteCache[f.key] ?? [];
        return (
          <AnimatedMultiSelect
            label={f.label}
            options={opts.map((o) => ({ value: o.key, label: o.title }))}
            selectedValues={state[f.key] ?? []}
            onChange={(vals) => setField(f.key, vals)}
            placeholder={(f as any).placeholder ?? "جستجو یا انتخاب کنید..."}
          />
        );
      }

      case "numberRange":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              label={`${f.label} از`}
              placeholder={(f as any).placeholderMin ?? ""}
              min={0}
              value={
                state[`${f.key}Min`] === ""
                  ? undefined
                  : Number(state[`${f.key}Min`])
              }
              onChange={(v) =>
                setField(`${f.key}Min`, v === undefined ? "" : v)
              }
            />
            <NumberInput
              label={`${f.label} تا`}
              placeholder={(f as any).placeholderMax ?? ""}
              min={0}
              value={
                state[`${f.key}Max`] === ""
                  ? undefined
                  : Number(state[`${f.key}Max`])
              }
              onChange={(v) =>
                setField(`${f.key}Max`, v === undefined ? "" : v)
              }
            />
          </div>
        );

      case "unitNumber":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberWithSelect
              label={`${f.label} از`}
              placeholder={(f as any).placeholderMin ?? ""}
              value={
                state[`${f.key}Min`] === ""
                  ? undefined
                  : Number(state[`${f.key}Min`])
              }
              onValueChange={(val) => setField(`${f.key}Min`, val ?? "")}
              selectedKey={String(
                state[`${f.key}Unit`] ?? String(f.unitOptions[0]?.key ?? "")
              )}
              onSelectChange={(val) => setField(`${f.key}Unit`, val)}
              options={f.unitOptions.map((o) => ({
                key: String(o.key),
                title: o.title,
              }))}
            />
            <NumberWithSelect
              label={`${f.label} تا`}
              placeholder={(f as any).placeholderMax ?? ""}
              value={
                state[`${f.key}Max`] === ""
                  ? undefined
                  : Number(state[`${f.key}Max`])
              }
              onValueChange={(val) => setField(`${f.key}Max`, val ?? "")}
              selectedKey={String(
                state[`${f.key}Unit`] ?? String(f.unitOptions[0]?.key ?? "")
              )}
              onSelectChange={(val) => setField(`${f.key}Unit`, val)}
              options={f.unitOptions.map((o) => ({
                key: String(o.key),
                title: o.title,
              }))}
            />
          </div>
        );

      case "discount":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberWithSelect
              label={`${f.label} از`}
              placeholder={(f as any).placeholderMin ?? ""}
              value={
                state[`${f.key}Min`] === ""
                  ? undefined
                  : Number(state[`${f.key}Min`])
              }
              onValueChange={(val) => setField(`${f.key}Min`, val ?? "")}
              selectedKey={state["discountType"] ?? "percent"}
              onSelectChange={(val) => setField("discountType", val)}
              options={[
                { key: "percent", title: "درصد" },
                { key: "amount", title: "مبلغ ثابت" },
              ]}
            />
            <NumberWithSelect
              label={`${f.label} تا`}
              placeholder={(f as any).placeholderMax ?? ""}
              value={
                state[`${f.key}Max`] === ""
                  ? undefined
                  : Number(state[`${f.key}Max`])
              }
              onValueChange={(val) => setField(`${f.key}Max`, val ?? "")}
              selectedKey={state["discountType"] ?? "percent"}
              onSelectChange={(val) => setField("discountType", val)}
              options={[
                { key: "percent", title: "درصد" },
                { key: "amount", title: "مبلغ ثابت" },
              ]}
            />
          </div>
        );

      case "dateRange":
        return (
          <DateRangePicker
            label={f.label}
            labelPlacement="outside"
            value={
              state[`${f.key}Range`] &&
              (state[`${f.key}Range`].start || state[`${f.key}Range`].end)
                ? {
                    start: state[`${f.key}Range`].start,
                    end: state[`${f.key}Range`].end,
                  }
                : undefined
            }
            onChange={(range: any) => setField(`${f.key}Range`, range ?? null)}
          />
        );

      case "text":
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {f.label}
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 text-right"
              placeholder={(f as any).placeholder ?? ""}
              value={state[f.key] ?? ""}
              onChange={(e) => setField(f.key, e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <OptionButton
        title="فیلتر"
        icon={<IoFilter className="!text-[16px]" />}
        className="w-full sm:w-fit text-sky-600 bg-sky-100"
        onClick={openModal}
      />

      <DynamicModal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title={title}
        confirmText={"اعمال فیلتر"}
        cancelText={"حذف فیلتر"}
        onConfirm={handleApply}
        onCancel={handleClear}
        icon={
          <IoFilter className="text-3xl text-sky-600 bg-sky-100 rounded-lg p-1" />
        }
        size={size}
      >
        <div className="flex flex-col gap-6">
          {fields.map((f) => (
            <div key={f.key}>{renderField(f)}</div>
          ))}
        </div>
      </DynamicModal>
    </>
  );
};

export default FilterModal;
