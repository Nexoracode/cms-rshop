type EmptyStateCardProps = {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
};

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  message = "هنوز موردی اضافه نشده است!!",
  icon = <img src="/images/box.png" width={170} className="mb-4"/>,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-10 bg-slate-50 rounded-2xl text-gray-600 gap-2 ${className}`}
    >
      <span className="text-[80px]">{icon}</span>
      <p className="text-center text-sm sm:text-base animate-pulse font-medium">{message}</p>
    </div>
  );
};

export default EmptyStateCard;
