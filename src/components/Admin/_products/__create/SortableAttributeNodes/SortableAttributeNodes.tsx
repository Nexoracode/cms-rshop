"use client"

import { AttributeNode } from "../attribute-tree ";
import SortableAttributes from "./SortableAttributes";

type Props = {
  attributeNodes: AttributeNode[];
};

const SortableAttributeNodes: React.FC<Props> = ({ attributeNodes }) => {
  return (
    <div>
      {attributeNodes.map((group) => (
        <div key={group.id} className="mb-6 p-4 border rounded">
          <h3 className="font-bold">{group.name}</h3>
          <SortableAttributes attributes={group.attributes} />
        </div>
      ))}
    </div>
  );
};

export default SortableAttributeNodes;
