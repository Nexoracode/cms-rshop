"use client";

import { Button } from "@heroui/react";

type Props = {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
};

const OptionBox: React.FC<Props> = ({ icon, onClick, title }) => {
  return (
    <Button
      color="primary"
      className="pl-5"
      variant="flat"
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
