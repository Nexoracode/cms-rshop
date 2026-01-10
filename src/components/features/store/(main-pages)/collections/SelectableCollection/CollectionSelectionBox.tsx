"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import CollectionsModal from "./CollectionsModal";
import { useCollectionsSelection } from "./CollectionsSelectionContext";
import { TbPackages } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CollectionCard from "../CollectionCard";

const InnerCollectionVariantSelectionBox: React.FC<{
  onChange?: (data: any) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedCollections, removeCollection } = useCollectionsSelection();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log(selectedCollections);

    const collections = selectedCollections.map((p: any) => ({
      collection_id: p.id,
      variant_ids: p.variants?.map((v: any) => v.id) ?? [],
    }));

    onChange?.(collections);
  }, [selectedCollections]);

  return (
    <SelectionBox
      title="مجموعه های انتخاب‌شده"
      icon={<TbPackages className="text-5xl" />}
      initial={selectedCollections}
      modal={<CollectionsModal />}
      error={error}
    >
      <div className="flex flex-col gap-4">
        {selectedCollections.map((selectedCollection) => (
          <CollectionCard
            key={selectedCollection.id}
            collection={selectedCollection}
            contentCollection={
              <div className="deselect-icon !-mt-8 !-left-4">
                <AiOutlineCloseCircle
                  onClick={() => removeCollection(selectedCollection.id)}
                />
              </div>
            }
          />
        ))}
      </div>
    </SelectionBox>
  );
};

type CollectionSelectionBoxProps = {
  onChange?: (data: any) => void;
  error?: boolean;
};

const CollectionSelectionBox: React.FC<CollectionSelectionBoxProps> = ({
  onChange,
  error,
}) => {
  return <InnerCollectionVariantSelectionBox onChange={onChange} error={error} />;
};

export default CollectionSelectionBox;
