"use client";

import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import CollectionWrappingForm from "@/components/features/store/(main-pages)/collections/CollectionWrappingForm";
import { useGetOneHomeSection } from "@/core/hooks/api/adminHome/useHomeSections";
import { useFetchOnEdit } from "@/core/hooks/common/useFetchOnEdit";

const GiftWrappingCreate = () => {
  const { data, isLoading, editId } = useFetchOnEdit(useGetOneHomeSection);

  return (
    <ProductsSelectionProvider initialProducts={data?.products ?? []}>
      <CollectionWrappingForm data={data} isLoading={isLoading} id={editId} />
    </ProductsSelectionProvider>
  );
};

export default GiftWrappingCreate;
