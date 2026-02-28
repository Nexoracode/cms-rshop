"use client";

import { Alert, Button } from "@heroui/react";
import Link from "next/link";

type StoreOnboarding = {
  className?: string;
};

const StoreOnboarding: React.FC<StoreOnboarding> = ({ className }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <Alert
        color={"warning"}
        title={"برای نمایش فروشگاه باید اطلاعات فروشگاه را کامل وارد کنید"}
        endContent={
          <Button color="warning" size="sm" variant="flat" as={Link} href="/admin/store/infos">
            تکمیل اطلاعات فروشگاه
          </Button>
        }
      />
    </div>
  );
};

export default StoreOnboarding;
