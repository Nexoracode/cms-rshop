"use client";

import SelectBox from "@/components/global/SelectBox";
import { useEffect, useMemo, useState } from "react";
import CountryFlag from "react-country-flag";
import countries from "world-countries";

type Country = { id?: number, name: string; short_name: string; calling_code: string }

type Props = {
  onChoosedCountry: (country: Country) => void;
  defaultCountry?: string;
  label?: string,
  isLoading?: any,
  datas?: Country[]
};

export default function CountrySelect({ onChoosedCountry, datas, defaultCountry, label = "Select Country", isLoading }: Props) {
  const initialCountry = countries.some((c) => c.cca2 === defaultCountry)
    ? defaultCountry!
    : "CA";

  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);

  useEffect(() => {
    const countrySelected = countries.find((country) => country.cca2 === selectedCountry);

    if (countrySelected) {
      const { cca2, idd, name } = countrySelected;
      onChoosedCountry({
        calling_code: idd?.root && idd?.suffixes?.[0] ? `${idd.root}${idd.suffixes[0]}` : "",
        name: name.common,
        short_name: cca2,
      });
    }
  }, [selectedCountry]);

  const countriesList = useMemo(() => {
    return (datas?.length ? datas : countries).map((country: any) => ({
      id: country.cca2 || country.short_name,
      icon: (
        <CountryFlag
          countryCode={country.cca2 || country.short_name}
          svg
          style={{ width: "1em", height: "1em", marginBottom: ".3rem", borderRadius: ".3em" }}
        />
      ),
      title: country.name.common || country.name,
    }));
  }, []);

  return (
    <div>
      <SelectBox
        label={label.length ? label : ""}
        fields={countriesList}
        onChoosedItem={(val) => setSelectedCountry(String(val))}
        defaultSelectedId={selectedCountry}
        activeSearch
        isLoading={isLoading}
      />
    </div>
  );
}
