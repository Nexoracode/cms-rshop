"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/react";
import { useRef } from "react";

type VariantDropdownProps = {
  triggerBtn: React.ReactNode;
};

const VariantDropdown: React.FC<VariantDropdownProps> = ({ triggerBtn }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()} // جلوگیری از bubble در هر شرایط
      onMouseDown={(e) => e.stopPropagation()} // مخصوص بستن dropdown
    >
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <div onClick={(e) => e.stopPropagation()}>{triggerBtn}</div>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Variant Actions"
          variant="faded"
          onAction={(key) => console.log("Action:", key)}
        >
          <DropdownSection showDivider title="Actions">
            <DropdownItem key="new" description="Create a new variant">
              New Variant
            </DropdownItem>
            <DropdownItem key="edit" description="Edit this variant">
              Edit Variant
            </DropdownItem>
            <DropdownItem key="delete" className="text-danger">
              Delete Variant
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default VariantDropdown;
