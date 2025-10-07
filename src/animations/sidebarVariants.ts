// src/animations/sidebarVariants.ts
import { Variants } from "framer-motion";

/** ورود نرم کل سایدبار (بدون تداخل؛ فقط این المان initial/animate می‌گیرد) */
export const asideEnterMotion = {
  initial: { x: 16, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.45, ease: "easeOut" },
};

/** لوگوی بالا */
export const logoVariants: Variants = {
  hidden: { y: -8, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

/** کانتینر ناوبری: فقط این المان initial/animate دارد */
export const navVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1, y: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

/** آیتم‌ها (Stagger زیرمجموعه navVariants) */
export const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 16 },
  },
};

/** افکت hover/tap برای هر آیتم */
export const itemHoverTap = {
  whileHover: { scale: 1.02, x: -2 },
  whileTap: { scale: 0.985, x: 0 },
  transition: { type: "spring", stiffness: 300, damping: 22 },
};

/** آیکن: تکان و تیلت کوتاه روی hover والد */
export const iconFloat = {
  whileHover: { rotate: [-2, 2, 0], y: [-1, 1, 0] },
  transition: { duration: 0.35, ease: "easeInOut" },
};

/** گلوو پس‌زمینه آیتم (پالس لطیف) */
export const glowPulse = {
  initial: { opacity: 0.15, scale: 0.98 },
  animate: { opacity: [0.12, 0.3, 0.12], scale: [0.98, 1.03, 0.98] },
  transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
};

/** اندیکاتور فعال (با layoutId برای جابه‌جایی روان) */
export const activePillMotion = {
  layoutId: "sbActive",
  transition: { type: "spring", stiffness: 500, damping: 40, mass: 0.6 },
};
