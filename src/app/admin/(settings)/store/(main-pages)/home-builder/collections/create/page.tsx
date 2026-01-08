"use client"

import CollectionWrappingForm from "@/components/features/store/(main-pages)/collections/CollectionWrappingForm";
import { useGetOneGiftWrapping } from "@/core/hooks/api/useGiftWrapping";
import { useFetchOnEdit } from "@/core/hooks/common/useFetchOnEdit";

const GiftWrappingCreate = () => {
  const { data, isLoading, editId } = useFetchOnEdit(useGetOneGiftWrapping);

  return <CollectionWrappingForm data={data} isLoading={isLoading} id={editId}/>;
};

export default GiftWrappingCreate;
