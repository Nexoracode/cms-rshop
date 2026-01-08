"use client";

import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import CollectionWrappingForm from "@/components/features/store/(main-pages)/collections/CollectionWrappingForm";
import { useGetOneCollection } from "@/core/hooks/api/adminHome/useCollections";
import { useFetchOnEdit } from "@/core/hooks/common/useFetchOnEdit";

const GiftWrappingCreate = () => {
  const { data, isLoading, editId } = useFetchOnEdit(useGetOneCollection);

  return (
    <ProductsSelectionProvider initialProducts={data?.products ?? []}>
      <CollectionWrappingForm data={data} isLoading={isLoading} id={editId} />
    </ProductsSelectionProvider>
  );
};

export default GiftWrappingCreate;
