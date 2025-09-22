"use client";

type Props = {
  name: any;
  icon?: React.ReactNode;
};

const MiniBoxInfo: React.FC<Props> = ({ name, icon }) => {
  return (
    <span className="bg-slate-100 rounded-xl p-2 px-4 flex-grow flex items-center gap-1">
      {icon}
      {name}
    </span>
  );
};

export default MiniBoxInfo;
