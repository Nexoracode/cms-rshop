"use client";

import { Input } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  placeholder: string;
};

const DebouncedSearchURL: React.FC<Props> = ({ placeholder }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(
    () => searchParams.get("search") ?? "",
    [searchParams]
  );
  const [value, setValue] = useState(initial);

  useEffect(() => setValue(initial), [initial]);

  useEffect(() => {
    const t = setTimeout(() => {
      const p = new URLSearchParams(searchParams.toString());
      const currentSearch = searchParams.get("search") ?? "";

      const searchChanged = currentSearch.trim() !== value.trim();

      if (searchChanged) {
        if (value.trim()) {
          p.set("search", value.trim());
        } else {
          p.delete("search");
        }

        // فقط در صورت تغییر سرچ، page رو ریست کن
        if (p.has("page")) p.set("page", "1");

        router.replace(`${pathname}?${p.toString()}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(t);
  }, [value, router, pathname, searchParams]);

  return (
    <Input
      dir="rtl"
      variant="bordered"
      labelPlacement="outside"
      startContent={<FiSearch className="text-lg pointer-events-none" />}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  );
};

export default DebouncedSearchURL;
