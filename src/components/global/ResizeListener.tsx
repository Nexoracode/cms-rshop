"use client";
import { useState, useEffect } from 'react';

type ResizeListenerProps = {
  onResize: (val: number) => void;
};

const ResizeListener = ({ onResize }: ResizeListenerProps) => {
  const [width, setWidth] = useState(0); // مقدار پیش‌فرض ۰ یا یک مقدار مناسب دیگر

  useEffect(() => {
    // بررسی وجود `window` قبل از استفاده
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth); // مقداردهی اولیه عرض پنجره

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      // تمیز کردن event listener هنگام unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    onResize(width); // فراخوانی تابع onResize هنگام تغییر عرض
  }, [width]);

  return null; // این کامپوننت هیچ چیزی رندر نمی‌کند
};

export default ResizeListener;