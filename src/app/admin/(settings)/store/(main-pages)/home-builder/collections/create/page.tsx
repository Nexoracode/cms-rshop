"use client";

import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import CollectionWrappingForm from "@/components/features/store/(main-pages)/collections/CollectionWrappingForm";
import { useGetOneGiftWrapping } from "@/core/hooks/api/useGiftWrapping";
import { useFetchOnEdit } from "@/core/hooks/common/useFetchOnEdit";

const GiftWrappingCreate = () => {
  const { data, isLoading, editId } = useFetchOnEdit(useGetOneGiftWrapping);

  return (
    <ProductsSelectionProvider initialProducts={data?.data?.products ?? []}>
      <CollectionWrappingForm data={data} isLoading={isLoading} id={editId} />
    </ProductsSelectionProvider>
  );
};

export default GiftWrappingCreate;
