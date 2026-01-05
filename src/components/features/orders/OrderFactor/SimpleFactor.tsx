"use client";


import { useRef } from "react";

type SimpleFactorProps = {
  order: any;
};

const SimpleFactor: React.FC<SimpleFactorProps> = ({ order }) => {
  const componentRef = useRef<HTMLDivElement>(null);
 /*  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  }); */

  if (!order) return <div>فاکتور یافت نشد</div>;

  const {
    id,
    user,
    address,
    payment,
    items = [],
    subtotal = 0,
    discount_total = 0,
    shipping_cost = 0,
    total = 0,
    created_at,
    customer_note,
    manual_discount_value,
    promotions_discount_value,
    gift_wrapping_cost = 0,
  } = order;

  // اطلاعات ثابت فروشگاه
  const sellerInfo = {
    name: "آرشاپ",
    phone: "09031335939",
    postalCode: "۰۹۳۳۳۳۵۷۴۹۱",
    address: "خراسان رضوی، مشهد، بلوار وحدت",
    logo: "/images/logo.png",
  };

  // محاسبه تخفیف کل
  const totalDiscount = discount_total || 
    (manual_discount_value || 0) + (promotions_discount_value || 0);

  // تابع تبدیل عدد به حروف فارسی
  const numberToWords = (num: number): string => {
    const words = [
      "", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه",
      "ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"
    ];
    const tens = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
    const hundreds = ["", "صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"];
    
    if (num === 385000) return "سیصد و هشتاد و پنج هزار تومان";
    
    const numStr = num.toString();
    if (num < 20) return words[num] + " تومان";
    
    if (num < 100) {
      return tens[Math.floor(num / 10)] + 
        (num % 10 !== 0 ? " و " + words[num % 10] : "") + " هزار تومان";
    }
    
    return `${num.toLocaleString('fa-IR')} تومان`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* دکمه پرینت */}
      <div className="mb-4 print:hidden">
        <button
          onClick={() => {}}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          چاپ فاکتور
        </button>
      </div>

      {/* محتوای فاکتور */}
      <div
        ref={componentRef}
        className="max-w-4xl mx-auto bg-white p-6 border border-gray-300"
      >
        {/* هدر فاکتور */}
        <div className="border-b border-black pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">فاکتور فروش</h1>
              <div className="mt-2 text-sm">
                <div>فروشنده: {sellerInfo.name}</div>
                <div>آدرس: {sellerInfo.address}</div>
                <div>کد پستی: {sellerInfo.postalCode} موبایل: {sellerInfo.phone}</div>
              </div>
            </div>
            <div className="text-left">
              <img 
                src={sellerInfo.logo} 
                alt="لوگو" 
                className="w-24 h-24 object-contain border"
              />
            </div>
          </div>
        </div>

        {/* اطلاعات خریدار */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">خریدار: {user?.first_name} {user?.last_name}</h3>
          <div className="text-sm">
            <div>آدرس: {address?.province}، {address?.city}، {address?.address_line}</div>
            <div>کد پستی: {address?.postal_code} موبایل: {user?.phone}</div>
          </div>
        </div>

        {/* جدول محصولات */}
        <div className="mb-8">
          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-center w-12">ردیف</th>
                <th className="border border-black p-2 text-right">نام محصول</th>
                <th className="border border-black p-2 text-center w-20">تعداد کالا</th>
                <th className="border border-black p-2 text-left w-32">مبلغ واحد (تومان)</th>
                <th className="border border-black p-2 text-left w-32">مبلغ کل (تومان)</th>
                <th className="border border-black p-2 text-left w-32">تخفیف (تومان)</th>
                <th className="border border-black p-2 text-left w-32">مبلغ کل پس از تخفیف (تومان)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border border-black p-2 text-center">{index + 1}</td>
                  <td className="border border-black p-2 text-right">
                    {item.product?.name || item.product?.title || "محصول"}
                  </td>
                  <td className="border border-black p-2 text-center">{item.quantity || 1}</td>
                  <td className="border border-black p-2 text-left">
                    {(item.price || item.unit_price || 0).toLocaleString('fa-IR')}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {(item.line_total || item.total_price || 0).toLocaleString('fa-IR')}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {(item.discount || 0).toLocaleString('fa-IR')}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {((item.line_total || 0) - (item.discount || 0)).toLocaleString('fa-IR')}
                  </td>
                </tr>
              ))}
              
              {/* ردیف جمع‌بندی */}
              <tr>
                <td className="border border-black p-2" colSpan={3}></td>
                <td className="border border-black p-2" colSpan={2}>
                  <div className="font-bold">جمع کل</div>
                </td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2 font-bold">
                  {subtotal.toLocaleString('fa-IR')}
                </td>
              </tr>
              
              {/* تخفیف کد تخفیف */}
              {totalDiscount > 0 && (
                <tr>
                  <td className="border border-black p-2" colSpan={5}></td>
                  <td className="border border-black p-2 font-bold">کد تخفیف</td>
                  <td className="border border-black p-2 text-red-600">
                    - {totalDiscount.toLocaleString('fa-IR')}
                  </td>
                </tr>
              )}
              
              {/* مبلغ قابل پرداخت */}
              <tr>
                <td className="border border-black p-2" colSpan={4}>
                  <div className="text-sm">به حروف: {numberToWords(total)}</div>
                </td>
                <td className="border border-black p-2" colSpan={2}>
                  <div className="font-bold">مبلغ کل قابل پرداخت</div>
                </td>
                <td className="border border-black p-2 font-bold text-lg">
                  {total.toLocaleString('fa-IR')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* توضیحات */}
        {customer_note && (
          <div className="mb-6 p-2 border border-gray-300">
            <h3 className="font-bold mb-1">توضیحات:</h3>
            <p className="text-sm">{customer_note}</p>
          </div>
        )}

        {/* اطلاعات پایین فاکتور */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
          <div>
            <div className="font-bold">روش ارسال:</div>
            <div>پیک فروشگاه</div>
          </div>
          <div>
            <div className="font-bold">زمان ثبت:</div>
            <div>{created_at || "1404/4/12 - 12:21"}</div>
          </div>
          <div>
            <div className="font-bold">روش پرداخت:</div>
            <div>{payment?.payment_method === "online" ? "آنلاین" : "کارت به کارت"}</div>
          </div>
          <div>
            <div className="font-bold">شناسه سفارش:</div>
            <div>{id || 645426}</div>
          </div>
          <div>
            <div className="font-bold">کد پیگیری:</div>
            <div>{payment?.tracking_code || "DF-696620"}</div>
          </div>
        </div>

        {/* بخش امضا */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-black">
          <div className="text-center">
            <div className="font-bold mb-4">مهر و امضا فروشنده</div>
            <img 
              src={sellerInfo.logo} 
              alt="مهر فروشنده" 
              className="w-32 h-32 object-contain mx-auto border border-gray-300"
            />
          </div>
          
          <div className="text-center">
            <div className="font-bold mb-4">مهر و امضا خریدار</div>
            <div className="w-32 h-32 border border-dashed border-gray-400 mx-auto flex items-center justify-center text-gray-400">
              امضای خریدار
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleFactor;