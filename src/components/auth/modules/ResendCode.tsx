import React from "react";
import toast from "react-hot-toast";

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
  const handleResend = async () => {
    if (!window?.navigator?.onLine) {
      toast.error("You are offline. Please try again later", {
        duration: 4000,
      });
      return;
    }

    const toastId = toast.loading("Sending...");
    await onResend();
    toast.dismiss(toastId);
  };

  return (
    <div className="mt-6 flex items-center justify-between text-gray-500">
      <p>Didn't receive the code?</p>
      {isRunning ? (
        <p className="text-(--primary)">
          {`Resend in ${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`}
        </p>
      ) : (
        <p
          className="transition-global cursor-pointer text-(--primary) underline hover:opacity-75"
          onClick={handleResend}
        >
          Resend Code
        </p>
      )}
    </div>
  );
};

export default ResendCode;
