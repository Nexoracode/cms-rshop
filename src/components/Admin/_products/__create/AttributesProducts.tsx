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
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import AddNewAttributesModal from "./AttributesProduct/AttributesModal";
import VariantRowEditor from "./AttributesProduct/VariantRowEditor";
import {
  useDeleteVariant,
  useUpdateVariantProduct,
} from "@/hooks/attributes/useVariantProduct";
import { useRouter } from "next/navigation";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useGetOneProduct } from "@/hooks/products/useProduct";
import { useAttributeContext } from "../context/AttributeContext";
import SortableAttributeNodes from "./SortableAttributeNodes/SortableAttributeNodes";
import { useEffect, useState } from "react";
import { replaceOrAddById } from "@/utils/replaceOrAddById";
import toast from "react-hot-toast";
import SectionCard from "./helpers/SectionCard";
import SpecTree from "./helpers/SpecTree";
import { MdOutlineCategory } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";

const AttributesProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { page } = usePaginationParams("edit_id");
  const { setAttrInfos } = useAttributeContext();
  const [variants, setVariants] = useState<any[]>([]);
  ///
  //? Api Calls
  const { data: productData } = useGetOneProduct(page);
  const { mutate: deleteVariant } = useDeleteVariant();
  const updateVariantProductMutation = useUpdateVariantProduct();

  useEffect(() => {
    console.log("All Attributes Nodes =>", productData?.data);
    setVariants([]);
    if (productData?.data?.attribute_nodes) {
      const attrValues = productData?.data.attribute_nodes.flatMap(
        (group: any) => group.attributes.flatMap((attr: any) => attr.values)
      );
      setAttrInfos(attrValues);
    }
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
          <HeaderAction
            title="ویژگی ها"
            textBtn={"+ افزودن ویژگی"}
            onPress={onOpen}
          />

          {/* تب‌ها + محتوای هر تب داخل خودش */}
          <Tabs
            aria-label="options"
            color="secondary"
            variant="bordered"
            fullWidth
            className="w-full"
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
                title="لیست متغیرها"
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
                            setVariants((prev) => replaceOrAddById(prev, data))
                          }
                          onRemove={(id) => deleteVariant(id)}
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
                title="مرتب سازی متغیرها"
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
              <SpecTree specs={productData?.data?.specifications} />
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
                title="مرتب سازی ویژگی ها"
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
        </CardBody>
      </Card>

      <AddNewAttributesModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default AttributesProducts;
