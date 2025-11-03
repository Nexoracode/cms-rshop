// utils/sanitizeInput.ts

/** تنظیمات اعتبارسنجی و پاک‌سازی ورودی */
export interface SanitizeOptions {
  allowEnglishOnly?: boolean;      // فقط A-Z a-z؟
  allowSpaces?: boolean;           // فاصله مجازه؟
  allowSpecialChars?: boolean;     // نمادها مجازند؟
  allowedSpecialChars?: string[];  // اگر نماد مجازه، فقط اینا؟
  allowNumbers?: boolean;          // آیا عدد مجازه؟
}

/** نتیجه‌ی پاک‌سازی */
export interface SanitizeResult {
  out: string;
  firstError: string;
}

/** توابع کمکی */
const isDigit = (ch: string) => /[0-9]/.test(ch);
const isSpace = (ch: string) => /\s/.test(ch);
const isEnglishLetter = (ch: string) => /^[A-Za-z]$/.test(ch);
const isLetterUnicode = (ch: string) => /\p{L}/u.test(ch);

/**
 * پاک‌سازی و فیلتر ورودی کاربر با قوانین سفارشی
 * @param input متن ورودی خام
 * @param options تنظیمات محدودکننده‌ی مجاز
 */
export function sanitizeInput(
  input: string,
  options: SanitizeOptions = {}
): SanitizeResult {
  const {
    allowEnglishOnly = true,
    allowSpaces = true,
    allowSpecialChars = false,
    allowedSpecialChars = [],
    allowNumbers = true, // ← پیش‌فرض عدد مجازه
  } = options;

  const specialsWhitelist = new Set(allowedSpecialChars);
  let out = "";
  let firstError = "";

  for (const ch of input) {
    // فاصله‌ها
    if (isSpace(ch)) {
      if (allowSpaces) {
        out += ch;
      } else if (!firstError) {
        firstError = "کاراکتر فاصله مجاز نیست.";
      }
      continue;
    }

    // اعداد
    if (isDigit(ch)) {
      if (allowNumbers) {
        out += ch;
      } else if (!firstError) {
        firstError = "استفاده از عدد مجاز نیست.";
      }
      continue;
    }

    // حروف
    if (allowEnglishOnly) {
      if (isEnglishLetter(ch)) {
        out += ch;
      } else if (!firstError) {
        firstError = "فقط حروف انگلیسی مجاز است.";
      }
      continue;
    } else {
      if (isLetterUnicode(ch)) {
        out += ch;
        continue;
      }
    }

    // نمادها
    if (!allowSpecialChars) {
      if (!firstError) firstError = "استفاده از نمادها مجاز نیست.";
      continue;
    } else {
      if (allowedSpecialChars.length > 0) {
        if (specialsWhitelist.has(ch)) {
          out += ch;
        } else if (!firstError) {
          firstError = `این نماد مجاز نیست: «${ch}». نمادهای مجاز: ${allowedSpecialChars.join(
            " "
          )}`;
        }
      } else {
        out += ch; // همه‌ی نمادها مجازند
      }
    }
  }

  return { out, firstError };
}
