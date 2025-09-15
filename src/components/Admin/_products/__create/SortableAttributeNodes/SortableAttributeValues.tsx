"use client"

import { AttributeValue } from "../attribute-tree ";


type Props = {
  values: AttributeValue[];
};

const SortableAttributeValues: React.FC<Props> = ({ values }) => {
  return (
    <div className="ml-4 mt-1">
      {values.map((val) => (
        <div key={val.id} className="p-1 border rounded mb-1">
          {val.value}
        </div>
      ))}
    </div>
  );
};

export default SortableAttributeValues;
