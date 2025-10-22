"use client";

import { Card, CardBody } from "@heroui/react";
import React from "react";
import DebouncedSearchURL from "@/components/widgets/DebouncedSearchInput";
import OptionButton from "@/components/ui/buttons/OptionButton";
import { GoArrowUpRight } from "react-icons/go";

type RelatedPage = {
  title: string;
  href: string;
};

type SearchFilterCardProps = {
  relatedTitle?: string;
  relatedPages?: RelatedPage[];
  searchPlaceholder?: string;
  children?: React.ReactNode;
};

const SearchFilterCard: React.FC<SearchFilterCardProps> = ({
  relatedTitle = "دسترسی سریع",
  relatedPages = [],
  searchPlaceholder = "جستجو...",
  children,
}) => {
  return (
    <Card className="shadow-md">
      <CardBody className="flex flex-col gap-4">
        {relatedPages.length > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start bg-slate-50 rounded-xl p-2">
            <p className="pr-2">{relatedTitle}</p>
            <div className="flex flex-wrap xs:flex-nowrap gap-2 w-full sm:w-fit">
              {relatedPages.map((page) => (
                <OptionButton
                  key={page.href}
                  title={page.title}
                  icon={<GoArrowUpRight className="text-xl" />}
                  href={page.href}
                  className="pl-5 w-full sm:w-fit"
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-50 rounded-xl p-2">
          <DebouncedSearchURL placeholder={searchPlaceholder} />
          <div className="w-full sm:w-fit flex items-center gap-2">
            {children}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SearchFilterCard;
