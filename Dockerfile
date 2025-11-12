# ---------- build ----------
FROM node:20-bookworm AS builder
WORKDIR /app

# نصب وابستگی‌ها
COPY package*.json ./
RUN npm ci

# کد پروژه
COPY . .
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NODE_ENV=production

# مطمئن شوید که next.config.js شما output: 'standalone' نداشته باشد
RUN npm run build

# ---------- runtime ----------
FROM node:20-bookworm-slim
WORKDIR /app

# تنظیمات محیط اجرا
ENV NODE_ENV=production
ENV PORT=3000

# نصب وابستگی‌های تولیدی
COPY package*.json ./
RUN npm ci --omit=dev

# === بخش حیاتی: کپی کردن فایل‌های بیلد استاندارد ===
# به جای /app/.next/standalone، ما خود /app/.next را کپی می‌کنیم
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# فایل next.config.js برای اجرای سرور next start نیاز است
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

# === بخش حیاتی: تغییر دستور اجرا ===
# به جای "node standalone/server.js"، ما از "next start" استفاده می‌کنیم
CMD ["npm", "start"]