"use client";

import { useEffect, useMemo, useState } from "react";
import AutocompleteInput, {
  Option,
} from "@/components/ui/inputs/AutocompleteInput";
import { regions } from "@/constants/regions";

type Props = {
  provinceId?: string;
  cityId?: string;
  onChange: (values: { province: string; city: string }) => void;
};

const ProvinceCitySelector = ({ provinceId, cityId, onChange }: Props) => {
  const [selectedProvince, setSelectedProvince] = useState(provinceId || "");
  const [selectedCity, setSelectedCity] = useState(cityId || "");

  // لیست استان‌ها (Option[]) برای ورودی بالا
  const provinceOptions: Option[] = useMemo(
    () =>
      regions.map((r: any) => ({
        id: r.province,
        title: r.province,
      })),
    []
  );

  // بر اساس استان انتخاب‌شده، شهرها رو فیلتر کن
  const cityOptions: Option[] = useMemo(() => {
    const found = regions.find((r) => r.province === selectedProvince);
    if (!found) return [];
    return found.cities.map((c) => ({ id: c, title: c }));
  }, [selectedProvince]);

  // هر تغییری رخ داد، به والد بفرست
  useEffect(() => {
    onChange({ province: selectedProvince, city: selectedCity });
  }, [selectedProvince, selectedCity]);

  return (
    <div className="flex flex-col gap-4">
      <AutocompleteInput
        label="استان"
        placeholder="انتخاب استان"
        options={provinceOptions}
        selectedId={selectedProvince}
        onChange={(id) => {
          setSelectedProvince(id);
          setSelectedCity(""); // ریست شهرها هنگام تغییر استان
        }}
      />

      <AutocompleteInput
        label="شهر"
        placeholder="انتخاب شهر"
        options={cityOptions}
        selectedId={selectedCity}
        onChange={(id) => setSelectedCity(id)}
      />
    </div>
  );
};

export default ProvinceCitySelector;
