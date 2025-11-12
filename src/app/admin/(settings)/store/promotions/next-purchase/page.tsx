"use client";

import {
  Button,
  Divider,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";

const NextPurchase = () => {
  const deadline = [
    { key: "2_day", label: "2 روز" },
    { key: "1_week", label: "1 هفته" },
    { key: "2_week", label: "2 هفته" },
    { key: "3_week", label: "3 هفته" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl p-4 py-6 flex flex-col items-center gap-4">
        <div className="w-full flex flex-col gap-6 text-start">
          <div className="flex flex-col gap-2">
            <Select labelPlacement="outside" label="مهلت استفاده از کد تخفیف">
              {deadline.map((deadline) => (
                <SelectItem key={deadline.key}>{deadline.label}</SelectItem>
              ))}
            </Select>
            <small className="text-gray-600">
              در این گزینه شما انتخاب می‌کنید که کد تخفیف بعد از ارسال شدن تا چه
              مدت زمانی برای کاربر قابل استفاده و در دسترس باشد.
            </small>
          </div>
          <div>
            <Divider />
            <div className="flex flex-col gap-6 mt-6">
              <p>تعریف کد تخفیف</p>
              <NumberInput
                isRequired
                label="تخفیف"
                labelPlacement={"outside"}
                placeholder="10"
                minValue={1}
                endContent={
                  <div className="flex items-center">
                    <label className="sr-only" htmlFor="stock">
                      stock
                    </label>
                    <select
                      aria-label="Select stock"
                      className="outline-none border-0 bg-transparent text-default-400 text-small"
                      defaultValue="percent"
                      id="stock"
                      name="stock"
                      onChange={(e: any) => {}}
                    >
                      <option aria-label="percent" value="percent">
                        درصد
                      </option>
                      <option aria-label="money" value="money">
                        مبلغ ثابت (تومان)
                      </option>
                    </select>
                  </div>
                }
                onValueChange={(value: any) => {}}
              />
              <NumberInput
                label="تعیین حداقل مبلغ خرید"
                labelPlacement={"outside"}
                placeholder="100,000"
                minValue={1}
                endContent={<p>تومان</p>}
                onValueChange={(value: any) => {}}
              />
            </div>
          </div>
        </div>

        <div className="w-full text-end">
          <Button color="secondary" variant="flat">
            ایجاد پروموشن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NextPurchase;
