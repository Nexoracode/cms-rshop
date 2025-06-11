// نصب Service Worker و فورس کردن آن برای فعال شدن بلافاصله بعد از نصب
self.addEventListener('install', (event) => {
    self.skipWaiting(); // اجباری برای نصب سرویس ورکر جدید و نادیده گرفتن ورژن‌های قدیمی
});

// فعال‌سازی فوری و دسترسی به تمام تب‌های باز
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim()); // به طور فوری کنترل تمام صفحات باز را به دست می‌گیرد
    console.log('Service Worker activated');
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const options = {
        body: data.body || 'You have a new notification!',
        icon: data.icon || '/icons/icon-192x192.png',
        badge: data.badge || '/icons/icon-48x48.png',
        data: data.url || '/', // داده‌ای که حاوی URL مقصد است
        actions: [
            {
                action: "openLink", // عمل کلیک روی لینک
                title: "Go to Admin Users", // عنوان دکمه
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Notification', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // بستن نوتیفیکیشن

    // بررسی عمل انجام شده (در اینجا "openLink")
    if (event.action === "openLink") {
        const targetUrl = event.notification.data || '/'; // URL مقصد
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
                const hadWindowToFocus = clientsArr.some((windowClient) =>
                    windowClient.url === targetUrl ? (windowClient.focus(), true) : false
                );

                // اگر تب موجودی با لینک مقصد وجود نداشته باشد، آن را در یک تب جدید باز می‌کند
                if (!hadWindowToFocus) {
                    clients.openWindow(targetUrl); // باز کردن URL در یک تب جدید
                }
            })
        );
    } else {
        // اگر کلیک روی نوتیفیکیشن بدون انتخاب دکمه "openLink" باشد، فقط URL داده شده باز می‌شود
        const targetUrl = event.notification.data || '/';
        event.waitUntil(
            clients.openWindow(targetUrl) // باز کردن URL در تب جدید
        );
    }
});