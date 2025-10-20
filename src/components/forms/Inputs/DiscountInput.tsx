"use client";

import NumberWithSelect from "./NumberWithSelect";

type DiscountType = "percent" | "amount";

type Props = {
  value: number;
  onValueChange: (val: number) => void;
  selectedKey?: DiscountType;
  onSelectChange: (val: DiscountType) => void;
};

const DiscountInput = ({
  value,
  onValueChange,
  selectedKey = "percent",
  onSelectChange,
}: Props) => {
  return (
    <NumberWithSelect
      label="تخفیف"
      placeholder="10"
      value={value}
      maxValue={selectedKey === "percent" ? 100 : undefined}
      selectedKey={selectedKey}
      formatWithCommas
      onValueChange={(val) => onValueChange(val ?? 0)}
      onSelectChange={(val) => onSelectChange(val as DiscountType)}
      options={[
        { key: "percent", title: "درصد" },
        { key: "amount", title: "مبلغ ثابت" },
      ]}
    />
  );
};

export default DiscountInput;
