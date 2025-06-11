if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('New version of Service Worker found, updating...');
                                window.location.reload(); // ریفرش صفحه برای آپدیت سرویس‌ورکر
                            }
                        };
                    }
                };
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}  