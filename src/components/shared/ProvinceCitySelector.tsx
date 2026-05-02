"use client";

import { useEffect, useMemo, useState } from "react";
import AutocompleteInput, { Option } from "@/components/ui/inputs/AutocompleteInput";
import { useGetProvinces, useGetCities } from "@/core/hooks/api/useLocation";

type Props = {
  provinceId?: string;          // شناسه استان (ورودی از والد)
  cityId?: string;              // شناسه شهر (ورودی از والد)
  onChange: (values: { province: string; city: string }) => void; // خروجی: عنوان استان و شهر
};

const ProvinceCitySelector = ({ provinceId, cityId, onChange }: Props) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | undefined>(
    provinceId ? Number(provinceId) : undefined
  );
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(
    cityId ? Number(cityId) : undefined
  );

  const { data: provincesData, isLoading: provincesLoading } = useGetProvinces();
  const { data: citiesData, isLoading: citiesLoading } = useGetCities(selectedProvinceId);

  const provinceOptions: Option[] = useMemo(() => {
    if (!provincesData?.data) return [];
    return provincesData.data.map((province: any) => ({
      id: String(province.id),
      title: province.title,
    }));
  }, [provincesData]);

  const cityOptions: Option[] = useMemo(() => {
    if (!citiesData?.data) return [];
    return citiesData.data.map((city: any) => ({
      id: String(city.id),
      title: city.title,
    }));
  }, [citiesData]);

  // اطلاع‌رسانی به والد با ارسال عنوان به جای شناسه
  useEffect(() => {
    // پیدا کردن عنوان استان متناسب با selectedProvinceId
    const provinceTitle = selectedProvinceId !== undefined
      ? provinceOptions.find(opt => opt.id === String(selectedProvinceId))?.title || ""
      : "";
    
    // پیدا کردن عنوان شهر متناسب با selectedCityId
    const cityTitle = selectedCityId !== undefined
      ? cityOptions.find(opt => opt.id === String(selectedCityId))?.title || ""
      : "";

    onChange({
      province: provinceTitle,
      city: cityTitle,
    });
  }, [selectedProvinceId, selectedCityId, provinceOptions, cityOptions]);

  return (
    <div className="flex gap-2">
      <AutocompleteInput
        label="استان"
        placeholder="انتخاب استان"
        options={provinceOptions}
        selectedId={selectedProvinceId !== undefined ? String(selectedProvinceId) : undefined}
        onChange={(id: string | null) => {
          const numId = id ? Number(id) : undefined;
          setSelectedProvinceId(numId);
          setSelectedCityId(undefined); // ریست شهر هنگام تغییر استان
        }}
      />

      <AutocompleteInput
        label="شهر"
        placeholder="انتخاب شهر"
        options={cityOptions}
        selectedId={selectedCityId !== undefined ? String(selectedCityId) : undefined}
        onChange={(id: string | null) => {
          const numId = id ? Number(id) : undefined;
          setSelectedCityId(numId);
        }}
      />
    </div>
  );
};

export default ProvinceCitySelector;