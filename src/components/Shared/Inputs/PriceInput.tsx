"use client";

import NumberInput from "./Base/NumberInput";

type PriceInputProps = {
  value: number | null | undefined;
  onChange: (val: number | undefined) => void;
  isActiveError?: boolean;
};

const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChange,
  isActiveError,
}) => {
  return (
    <NumberInput
      label="قیمت"
      placeholder="10,000"
      suffix="تومان"
      min={0}
      isRequired
      value={value}
      onChange={onChange}
      isActiveError={isActiveError}
    />
  );
};

export default PriceInput;
