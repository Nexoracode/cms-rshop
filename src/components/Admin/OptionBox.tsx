"use client";

import { Button } from "@heroui/react";
import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  style?: React.ReactNode
};

const OptionBox: React.FC<Props> = ({ icon, onClick, title, style }) => {
  return (
    <Button
      color="primary"
      className={`pl-5 ${style}`}
      variant="flat"
      size="sm"
      onPress={onClick}
    >
      <div>
        {icon}
      </div>
      {title}
    </Button>
  );
};

export default OptionBox;
