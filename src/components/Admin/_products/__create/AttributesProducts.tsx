"use client";

import {
  Button,
  Card,
  CardBody,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import {
  TbCategory2,
  TbSortAscendingSmallBig,
  TbSortDescendingShapes,
} from "react-icons/tb";
import BoxHeader from "./helpers/BoxHeader";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import VariantRowEditor from "./AttributesProduct/VariantRowEditor";
import {
  useUpdateVariantProduct,
} from "@/hooks/api/attributes/useVariantProduct";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetOneProduct } from "@/hooks/api/products/useProduct";
import { useAttributeContext } from "../context/AttributeContext";
import SortableAttributeNodes from "./SortableAttributeNodes/SortableAttributeNodes";
import { useEffect, useState } from "react";
import { replaceOrAddById } from "@/utils/replaceOrAddById";
import toast from "react-hot-toast";
import SectionCard from "./helpers/SectionCard";
import SpecTree from "./helpers/SpecTree";
import { MdOutlineCategory } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);
  const { setAttrInfos } = useAttributeContext();
  const [variants, setVariants] = useState<any[]>([]);
  ///
  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get("tab") ?? "variants"
  );
  //? Api Calls
  const { data: productData } = useGetOneProduct(page);
  const updateVariantProductMutation = useUpdateVariantProduct();

  useEffect(() => {
    if (!productData?.data?.category_id) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("category_id", String(productData.data.category_id));

    router.replace(`${pathname}?${params.toString()}`);
  }, [productData?.data, router, pathname, searchParams]);

  useEffect(() => {
    console.log("All Product Data =>", productData?.data);

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
  }, [productData?.data]);

  const updateVariantProduct = async () => {
    Promise.all(
      variants.map((val) =>
        updateVariantProductMutation.mutateAsync({ id: val.id, data: val })
      )
    )
      .then(() => {
        toast.success("متغیرها با موفقیت بروزرسانی شدند");
        router.push("/admin/products");
      })
      .catch((err) => {
        toast.error("مشکلی در آپدیت یکی از واریانت‌ها پیش اومد");
        console.error(err);
      });
  };

  return (
    <>
      <Card className="w-full shadow-md">
        <BoxHeader
          title="ویژگی های محصول"
          color="bg-purple-700/10 text-purple-700"
          icon={<TbCategory2 className="text-3xl" />}
        />
        <CardBody dir="rtl" className="flex flex-col gap-6 text-start">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start bg-slate-50 rounded-xl p-3">
            <p className="pr-2">مدیریت ویژگی‌ها</p>
            <div className="flex flex-wrap gap-2 w-full sm:w-fit">
              <Button
                className="pl-5"
                variant="flat"
                size="sm"
                as={Link}
                href={"/admin/products/variants"}
              >
                <GoArrowUpRight className="text-xl" />
                ویژگی ها
              </Button>
              <Button
                className="pl-5"
                color="primary"
                variant="flat"
                size="sm"
                onPress={onOpen}
              >
                <LuPlus className="text-xl" />
                افزودن
              </Button>
            </div>
          </div>

          <div className="bg-slate-50 p-4 pt-6 rounded-xl">
            <Tabs
              aria-label="options"
              color="secondary"
              variant="bordered"
              fullWidth
              classNames={{
                tabList: "flex-wrap md:flex-nowrap mb-4",
              }}
              selectedKey={activeTab}
              onSelectionChange={(key) => {
                const k = String(key);
                setActiveTab(k);
                const params = new URLSearchParams(searchParams.toString()); // ← کپی قابل‌نوشتن
                params.set("tab", k);
                router.replace(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });
              }}
            >
              {/* تب 1: لیست متغیرها */}
              <Tab
                key="variants"
                title={
                  <div className="flex justify-center items-center gap-2">
                    <MdOutlineCategory className="text-xl" />
                    <span>لیست متغیرها</span>
                  </div>
                }
              >
                <SectionCard
                  show={!productData?.data?.variants?.length}
                  empty="هنوز متغیری انتخاب نکرده اید!!"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {productData?.data?.variants?.length
                      ? productData.data.variants.map((variant: any) => (
                          <VariantRowEditor
                            key={variant.id}
                            variantName={variant?.name}
                            onHandleSubmit={(data) =>
                              setVariants((prev) =>
                                replaceOrAddById(prev, data)
                              )
                            }
                            defaultValues={variant}
                          />
                        ))
                      : null}
                  </div>

                  {productData?.data?.variants?.length || variants.length ? (
                    <Button
                      color="success"
                      className="mt-4 text-white"
                      onPress={updateVariantProduct}
                    >
                      ثبت تغیرات ویژگی ها
                    </Button>
                  ) : null}
                </SectionCard>
              </Tab>

              {/* تب 2: مرتب‌سازی متغیرها */}
              <Tab
                key="sort-variants"
                title={
                  <div className="flex justify-center items-center gap-2">
                    <TbSortDescendingShapes className="text-xl" />
                    <span>مرتب سازی متغیرها</span>
                  </div>
                }
              >
                <SectionCard
                  show={!productData?.data?.attribute_nodes?.length}
                  empty="پس از انتخاب متغیر میتوانید مرتب سازی انجام دهید!!"
                >
                  {productData?.data?.attribute_nodes?.length ? (
                    <SortableAttributeNodes
                      attributeNodes={productData.data.attribute_nodes}
                    />
                  ) : null}
                </SectionCard>
              </Tab>

              {/* تب 3: لیست ویژگی‌ها (specifications tree) */}
              <Tab
                key="attributes"
                title={
                  <div className="flex justify-center items-center gap-2">
                    <BiCategoryAlt className="text-xl" />
                    <span>لیست ویژگی ها</span>
                  </div>
                }
              >
                <SectionCard
                  show={!productData?.data?.specifications?.length}
                  empty="هنوز ویژگی انتخاب نکرده اید!!"
                >
                  <SpecTree specs={productData?.data?.specifications} />
                </SectionCard>
              </Tab>

              {/* تب 4: مرتب‌سازی ویژگی‌ها */}
              <Tab
                key="sort-attributes"
                title={
                  <div className="flex justify-center items-center gap-2">
                    <TbSortAscendingSmallBig className="text-xl" />
                    <span>مرتب سازی ویژگی ها</span>
                  </div>
                }
              >
                <SectionCard
                  show={!productData?.data?.specifications?.length}
                  empty="پس از انتخاب ویژگی میتوانید مرتب سازی انجام دهید!!"
                >
                  {productData?.data?.specifications?.length ? (
                    <SortableAttributeNodes
                      attributeNodes={productData.data.specifications}
                    />
                  ) : null}
                </SectionCard>
              </Tab>
            </Tabs>
          </div>
        </CardBody>
      </Card>

      <AddNewAttributesModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default AttributesProducts;
