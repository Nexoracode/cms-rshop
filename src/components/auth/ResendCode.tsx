interface ResendCodeProps {
  time: number;
  isRunning: boolean;
  onResend: () => Promise<void>;
}

const ResendCode: React.FC<ResendCodeProps> = ({
  time,
  isRunning,
  onResend,
}) => {
  const handleResend = async () => onResend();

  return (
    <div className="mt-6 flex items-center justify-between text-gray-500">
      <p>کد برایتان ارسال نشده؟</p>
      {isRunning ? (
        <p className="text-(--primary)">
          {`${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60} ارسال دوباره`}
        </p>
      ) : (
        <p
          className="transition-global cursor-pointer text-(--primary) underline hover:opacity-75"
          onClick={handleResend}
        >
          ارسال دوباره
        </p>
      )}
    </div>
  );
};

export default ResendCode;
