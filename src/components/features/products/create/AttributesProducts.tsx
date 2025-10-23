"use client";

import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import VariantEditorCard from "./AttributesProduct/VariantEditorCard";
import { useUpdateVariantProduct } from "@/hooks/api/attributes/useVariantProduct";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetOneProduct } from "@/hooks/api/products/useProduct";
import { useAttributeContext } from "./context/AttributeContext";
import SortableAttributeNodes from "./SortableAttributeNodes/SortableAttributeNodes";
import { useEffect, useState } from "react";
import { replaceOrAddById } from "@/utils/replaceOrAddById";
import SpecTree from "./helpers/SpecTree";
import { BiCategoryAlt } from "react-icons/bi";
import { scrollToFirstErrorField } from "@/utils/scrollToErrorField";
import BaseTabs, { BaseTabItem } from "@/components/ui/BaseTabs";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import AttributesModal from "./AttributesProduct/AttributesModal";

type VariantValidity = {
  hasPrice: boolean;
  hasStock: boolean;
  hasSku: boolean;
};

const AttributesProducts = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);
  const { setAttrInfos } = useAttributeContext();

  const [variants, setVariants] = useState<any[]>([]);
  const [variantErrors, setVariantErrors] = useState<
    Record<number, VariantValidity>
  >({});
  const [isVariantsSubmitAttempted, setIsVariantsSubmitAttempted] =
    useState(false);

  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get("tab") ?? "variants"
  );

  const { data: productData } = useGetOneProduct(page);
  const updateVariantProductMutation = useUpdateVariantProduct();

  useEffect(() => {
    if (!productData?.data?.category_id) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("category_id", String(productData.data.category_id));
    router.replace(`${pathname}?${params.toString()}`);
  }, [productData?.data, router, pathname, searchParams]);

  useEffect(() => {
    setVariants([]);
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

  const updateVariantProduct = async () => {
    setIsVariantsSubmitAttempted(true);

    const currentVariants: any[] = productData?.data?.variants ?? [];

    const invalid = currentVariants.filter((v) => {
      const e = variantErrors[v.id];
      return !e || !e.hasPrice || !e.hasStock || !e.hasSku;
    });

    if (invalid.length) {
      toast.error("لطفاً فیلدهای الزامی واریانت‌های ناقص را تکمیل کنید.");
      setTimeout(() => scrollToFirstErrorField(), 0);
      return;
    }

    Promise.all(
      variants.map((val) =>
        updateVariantProductMutation.mutateAsync({ id: val.id, data: val })
      )
    )
      .then(() => {
        toast.success("متغیرها با موفقیت بروزرسانی شدند");
        setIsVariantsSubmitAttempted(false);
        router.push("/admin/products");
      })
      .catch((err) => {
        toast.error("مشکلی در آپدیت یکی از واریانت‌ها پیش آمد");
        console.error(err);
      });
  };

  const tabItems: BaseTabItem[] = [
    {
      key: "variants",
      title: "تنوع ها محصول",
      showEmpty: !productData?.data?.variants?.length,
      content: (
        <>
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            data-scroll-parent="true"
          >
            {productData?.data?.variants?.map((variant: any) => (
              <VariantEditorCard
                key={variant.id}
                variantName={variant?.name}
                defaultValues={variant}
                onHandleSubmit={(data) =>
                  setVariants((prev) => replaceOrAddById(prev, data))
                }
                isSubmitAttempted={isVariantsSubmitAttempted}
                onValidityChange={(id, valid) =>
                  setVariantErrors((prev) => ({ ...prev, [id]: valid }))
                }
              />
            ))}
          </div>

          {(productData?.data?.variants?.length || variants.length) && (
            <Button
              color="success"
              className="mt-4 text-white"
              onPress={updateVariantProduct}
            >
              ثبت تغیرات ویژگی ها
            </Button>
          )}
        </>
      ),
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
      searchFilterProps={{
        relatedPages: [
          {
            title: "مدیریت ویژگی ها",
            href: "/admin/products/variants",
          },
          {
            title: "مدیریت تنوع محصولات",
            href: "/admin/products/variants/",
          },
        ],
      }}
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
