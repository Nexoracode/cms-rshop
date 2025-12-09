"use client"

import { useGetOneGiftWrapping } from "@/core/hooks/api/useGiftWrapping";
import GiftWrappingForm from "@/components/features/store/gift-wrapping/GiftWrappingForm";
import { useFetchOnEdit } from "@/core/hooks/common/useFetchOnEdit";

const GiftWrappingCreate = () => {
  const { data, isLoading, editId } = useFetchOnEdit(useGetOneGiftWrapping);

  return <GiftWrappingForm data={data} isLoading={isLoading}  id={editId}/>;
};

export default GiftWrappingCreate;
