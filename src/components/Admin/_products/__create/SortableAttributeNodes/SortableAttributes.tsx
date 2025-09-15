"use client"

import { Attribute } from "../attribute-tree ";
import SortableAttributeValues from "./SortableAttributeValues";


type Props = {
  attributes: Attribute[];
};

const SortableAttributes: React.FC<Props> = ({ attributes }) => {
  return (
    <div className="ml-4 mt-2">
      {attributes.map((attr) => (
        <div key={attr.id} className="mb-2 p-2 border rounded">
          <strong>{attr.name}</strong> ({attr.type})
          <SortableAttributeValues values={attr.values} />
        </div>
      ))}
    </div>
  );
};

export default SortableAttributes;
