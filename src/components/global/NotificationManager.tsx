"use client";
import { useState, useEffect } from "react";

const NotificationManager = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isModalClosed, setIsModalClosed] = useState(true);
    const [permissionStatus, setPermissionStatus] = useState("default");
    const [disableMessage, setDisableMessage] = useState(false);

    useEffect(() => {
        if ("Notification" in window) {
            setPermissionStatus(Notification.permission);
            requestPermission();
        } else {
            console.warn("مرورگر شما از نوتیفیکیشن‌ها پشتیبانی نمی‌کند.");
        }

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then(registration => console.log("Service Worker registered:", registration))
                .catch(error => console.error("Service Worker registration failed:", error));
        } else {
            console.warn("مرورگر شما از Service Worker پشتیبانی نمی‌کند.");
        }
    }, []);

    const requestPermission = () => {
        if ("Notification" in window) {
            if (Notification.permission === "default") {
                Notification.requestPermission().then(result => {
                    setPermissionStatus(result);
                    if (result === "denied") {
                        alert("You have denied notifications. Please enable them from your browser settings.");
                    }
                    handleCloseModal();
                });
            } else if (Notification.permission === "denied") {
                alert("You have previously denied notifications. Please enable them from your browser settings.");
            }
        } else {
            alert("Your browser does not support notifications.");
        }
    };

    const sendNotification = async () => {
        if ("Notification" in window && Notification.permission === "granted" && "serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.ready;
                registration.showNotification("Hello World!", {
                    body: "This is a test notification! Click below to visit the link.",
                    icon: "/icons/icon-192x192.png",
                    badge: "/icons/icon-48x48.png",
                    data: "/",
                });
            } catch (error) {
                console.error("Failed to send notification:", error);
            }
        } else {
            requestPermission();
            setDisableMessage(true);
        }
    };

    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
            setDisableMessage(false);
            setIsModalClosed(true);
        }, 300);
    };

    const handleDisableNotifications = () => setDisableMessage(true);

    return (
        <div className="relative !z-[200]">
            <div className={`w-screen fixed ${isModalClosed ? '-top-6' : 'top-0'} hover:top-0 transition-global text-center !z-[100]`}>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setIsModalClosed(false);
                    }}
                    className={`bg-[var(--primary)] text-white px-4 pb-2 rounded-b-md shadow-md hover:opacity-75`}
                >
                    Notif
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[110]">
                    <div
                        className={`bg-[var(--background)] w-96 p-6 rounded-lg shadow-md shadow-[var(--gray)] transition-all duration-300 ease-in-out ${isClosing
                            ? "opacity-0 scale-90"
                            : "opacity-100 scale-100 animate-modal-open"
                            }`}
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Notification Settings
                        </h2>
                        <p className={`${disableMessage ? "text-red-500" : "text-[var(--gray)]"} mb-6 text-center`}>
                            {permissionStatus === "granted"
                                ? "Notifications are enabled."
                                : permissionStatus === "denied"
                                ? "You have denied notifications. Please enable them from your browser settings."
                                : "Manage your notification preferences below."}
                        </p>
                        <div className="flex justify-center gap-4">
                            {permissionStatus === "granted" ? (
                                <button
                                    onClick={handleDisableNotifications}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                                >
                                    Disable Notifications
                                </button>
                            ) : (
                                <button
                                    onClick={requestPermission}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                                >
                                    Enable Notifications
                                </button>
                            )}
                            <button
                                onClick={sendNotification}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                            >
                                Send Test Notification
                            </button>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="mt-6 text-gray-500 hover:text-gray-700 block mx-auto"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes modalOpen {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-modal-open {
                    animation: modalOpen 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default NotificationManager;