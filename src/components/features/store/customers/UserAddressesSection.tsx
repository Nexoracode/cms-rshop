"use client";

import { LuMapPinHouse } from "react-icons/lu";
import UserAddressCard from "./UserAddress/UserAddressCard";
import UserAddressModal from "./modals/UserAddressModal";

type UserAddress = {
  // تایپ آدرس رو اینجا تعریف کن یا import کن
  id: string;
  // ... سایر فیلدها
};

type Props = {
  addresses?: UserAddress[];
  userId?: string | number;
  form?: any; // تایپ دقیق‌تر رو جایگزین کن
};

const UserAddressesSection = ({ addresses, userId, form }: Props) => {
  const hasAddresses = addresses && addresses.length > 0;

  return (
    <div className="-mb-4">
      {form?.addresses ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p>آدرس های کاربر</p>
            <UserAddressModal userId={userId} />
          </div>
        </div>
      ) : null}

      <div
        className={`grid grid-cols-1 ${
          hasAddresses ? "sm:grid-cols-2" : ""
        } gap-4 pb-4`}
      >
        {hasAddresses ? (
          addresses.map((addr, index) => (
            <UserAddressCard key={addr.id || index} address={addr} userId={userId} />
          ))
        ) : (
          <div className="w-full flex flex-col items-center gap-4 rounded-xl border-3 border-dashed px-4 py-6">
            <LuMapPinHouse className="text-5xl text-gray-600" />
            <p>آدرسی از سمت کاربر هنوز ثبت نشده!!</p>
            <UserAddressModal userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAddressesSection;