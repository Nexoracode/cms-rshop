import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirectToSignin = (req: NextRequest) => {
    const res = NextResponse.redirect(new URL('/signin', req.url));
    res.cookies.delete('access_token');
    res.cookies.delete('refresh_token');
    return res;
};

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get('access_token')?.value || false;

    // اگر کاربر در صفحه signin یا صفحات مشابه باشد و توکن ندارد، نباید کوکی‌ها پاک شوند
    if ((path === '/signin' || path === '/forget-password' || path === '/reset-password') && !token) {
        return NextResponse.next(); // اجازه می‌دهد که کاربر به این صفحات دسترسی پیدا کند
    }

    // اگر توکن معتبر است، درخواست بررسی نقش ارسال می‌شود
    if (token) {
        try {
            const response = await fetch(`${process.env.BASE_URL}/user/panel/me`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            // اگر توکن معتبر نباشد یا خطا در درخواست باشد، به صفحه signin هدایت می‌شود
            if (response.status !== 200) {
                return redirectToSignin(req);
            }

            const data = await response.json();

            // اگر داده‌ها معتبر باشد و نقش کاربر admin یا staff باشد
            if (data?.data[0]) {
                const { role } = data.data[0];

                // اگر کاربر وارد صفحه غیر از admin شده باشد و توکن معتبر باشد، باید به /admin/home هدایت شود
                if (role && (role === "admin" || role === "staff")) {

                    // اگر کاربر وارد صفحه admin نشده باشد، باید به /admin/home هدایت شود
                    if (!path.includes("/admin") || path === "/admin") {
                        return NextResponse.redirect(new URL('/admin/home', req.url));
                    }

                    // اگر کاربر در صفحه admin است، فقط کوکی ست شود 
                    const response = NextResponse.next();
                    response.cookies.set("infos", JSON.stringify(data.data[0]), { httpOnly: false, maxAge: 604800 });
                    return response;
                }

                // اگر نقش کاربر مناسب نبود، ریدایرکت به signin
                return redirectToSignin(req);
            } else {
                return redirectToSignin(req);
            }
        } catch (error) {
            return redirectToSignin(req);
        }
    }

    // اگر توکن موجود نباشد و کاربر به صفحه admin وارد شود، باید ریدایرکت به signin انجام شود
    if (!token && path.includes("/admin")) {
        return redirectToSignin(req);
    }

    // اگر توکن موجود نباشد و کاربر وارد admin نشده باشد، اجازه دسترسی به صفحه داده می‌شود
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/admin/:path*', '/reset-password:path*', '/signin:path*', '/forget-password:path*'],
};