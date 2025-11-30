"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetOneProduct } from "@/core/hooks/api/products/useProduct";
import { useAttributeContext } from "./context/AttributeContext";
import SortableAttributeNodes from "./SortableAttributeNodes/SortableAttributeNodes";
import { useEffect, useState } from "react";
import SpecTree from "./helpers/SpecTree";
import { BiCategoryAlt } from "react-icons/bi";
import BaseTabs, { BaseTabItem } from "@/components/ui/BaseTabs";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import AttributesModal from "./AttributesProduct/AttributesModal";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import VaraintsForm from "./VaraintsForm";

const AttributesProducts = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);
  const { setAttrInfos } = useAttributeContext();

  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get("tab") ?? "variants"
  );

  const { data: productData } = useGetOneProduct(page);

  useEffect(() => {
    if (!productData?.data?.category_id) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("category_id", String(productData.data.category_id));
    router.replace(`${pathname}?${params.toString()}`);
  }, [productData?.data, router, pathname, searchParams]);

  useEffect(() => {
    let attrValues: any[] = [];

    if (productData?.data?.attribute_nodes) {
      const nodeValues = productData.data.attribute_nodes.flatMap(
        (group: any) =>
          group.attributes.flatMap((attr: any) => attr.values ?? [])
      );
      attrValues = [...attrValues, ...nodeValues];
    }

    if (productData?.data?.specifications) {
      const specValues = productData.data.specifications.flatMap((group: any) =>
        group.attributes.flatMap((attr: any) => attr.values ?? [])
      );
      attrValues = [...attrValues, ...specValues];
    }

    setAttrInfos(attrValues);
  }, [productData?.data, setAttrInfos]);

  const tabItems: BaseTabItem[] = [
    {
      key: "variants",
      title: "تنوع ها محصول",
      showEmpty: !productData?.data?.variants?.length,
      content: <VaraintsForm productData={productData} />,
    },
    {
      key: "sort-variants",
      title: "مرتب سازی تنوع ها محصول",
      showEmpty: !productData?.data?.variants?.length,
      content: productData?.data?.attribute_nodes?.length && (
        <SortableAttributeNodes
          attributeNodes={productData.data.attribute_nodes}
        />
      ),
    },
    {
      key: "attributes",
      title: "لیست ویژگی ها",
      showEmpty: !productData?.data?.specifications.length,
      content: <SpecTree specs={productData?.data?.specifications} />,
    },
    {
      key: "sort-attributes",
      title: "مرتب سازی ویژگی ها",
      showEmpty: !productData?.data?.specifications.length,
      content: productData?.data?.specifications?.length && (
        <SortableAttributeNodes
          attributeNodes={productData.data.specifications}
        />
      ),
    },
  ];

  return (
    <UnifiedCard
      searchFilter={
        <SearchFilterCard
          relatedPages={[
            {
              title: "مدیریت ویژگی ها",
              href: "/admin/products/variants",
            },
            {
              title: "مدیریت تنوع محصولات",
              href: "/admin/products/variants/",
            },
          ]}
        />
      }
      headerProps={{
        icon: <BiCategoryAlt className="text-xl" />,
        title: "ویژگی ها و تنوع محصولات",
        children: <AttributesModal />,
      }}
      tabsComponent={
        <BaseTabs
          items={tabItems}
          activeKey={activeTab}
          variant="light"
          onTabChange={(key) => {
            const k = String(key);
            setActiveTab(k);
            const params = new URLSearchParams(searchParams.toString());
            params.set("tab", k);
            router.replace(`${pathname}?${params.toString()}`, {
              scroll: false,
            });
          }}
          tabListClassName="flex-wrap md:flex-nowrap mb-4"
        />
      }
    />
  );
};

export default AttributesProducts;
