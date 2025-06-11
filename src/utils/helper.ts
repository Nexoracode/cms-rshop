import { redirect } from "next/navigation";
import { sendRequestWithLoading } from "./configs/axios";
import toast from "react-hot-toast";

export const scrollToTop = () => scrollTo({ top: 0, behavior: "smooth" })

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const isOnline = () => {
    if (!window?.navigator?.onLine) {
        toast.error("You are offline. Please try again later", {
            duration: 4000,
        });
        return;
    }
};

export const getFile = async (profile_picture: string) => {
    const response = await sendRequestWithLoading(`/admin/files/${profile_picture}`, {}, "get", "Get Picture", false, false, false, "application/json", 'blob');

    if (response?.data) {
        if (response.headers && typeof response.headers.get === 'function') {
            const contentType = response.headers.get('content-type') || "";

            if (
                contentType === 'image/png' ||
                contentType === 'image/jpeg' ||
                contentType === 'image/jpg' ||
                contentType === 'video/mp4' ||
                contentType === 'application/pdf'
            ) {
                const fileUrl = URL.createObjectURL(response.data);
                return { url: fileUrl, type: contentType };
            }
        }
    }

    return null;
};

export const signOutUser = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    deleteCookie("infos");
    redirect("/signin")
}

export function objectToFormData(
    obj: Record<string, any>,
    formData: FormData = new FormData(),
    conditions: Record<string, (value: any) => boolean> = {}
): FormData {
    for (const key in obj) {
        if (obj[key] === null || obj[key] === undefined) {
            continue; // عدم افزودن null/undefined
        }

        const value = obj[key];

        // بررسی شرط خاص برای این فیلد (اگر وجود داشته باشد)
        if (conditions[key] && !conditions[key](value)) {
            continue; // اگر شرط برقرار نباشد، این فیلد اضافه نشود
        }

        // اگر مقدار یک فایل یا Blob باشد، مستقیماً اضافه شود
        if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
        }
        // اگر مقدار یک آبجکت باشد (غیر از فایل/Blob)، به صورت JSON تبدیل شود
        else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
        }
        // مقادیر ساده (رشته، عدد، بولین و ...)
        else {
            formData.append(key, value.toString());
        }
    }
    return formData;
}