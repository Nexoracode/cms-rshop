"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { BiPackage } from "react-icons/bi";
import EmptyStateCard from "../feedback/EmptyStateCard";

export type BaseTabItem = {
  key: string | number;
  title: React.ReactNode | string;
  content: React.ReactNode;
  showEmpty?: boolean;
};

export type BaseTabsProps = {
  items: BaseTabItem[];
  activeKey?: string | number;
  onTabChange?: (key: string | number) => void;
  variant?: "solid" | "light" | "underlined" | "bordered";
  fullWidth?: boolean;
  tabListClassName?: string;
  className?: string;
};

const BaseTabs: React.FC<BaseTabsProps> = ({
  items,
  activeKey,
  onTabChange,
  variant = "solid",
  fullWidth = true,
  tabListClassName = "",
  className = "",
}) => {
  return (
    <Tabs
      aria-label="base-tabs"
      variant={variant}
      fullWidth={fullWidth}
      classNames={{ tabList: tabListClassName }}
      selectedKey={activeKey}
      onSelectionChange={(key) => onTabChange?.(key)}
      className={className}
    >
      {items.map((tab) => (
        <Tab key={tab.key} title={tab.title}>
          {tab.showEmpty ? <EmptyStateCard /> : tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};

export default BaseTabs;
