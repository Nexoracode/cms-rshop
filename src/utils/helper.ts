import toast from "react-hot-toast";

export const scrollToTop = () => scrollTo({ top: 0, behavior: "smooth" })

export const isOnline = () => {
    if (!window?.navigator?.onLine) {
        toast.error("شما آفلاین هستید. لطفا بعدا دوباره تلاش کنید", {
            duration: 4000,
        });
        return true;
    }
    return false
};

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