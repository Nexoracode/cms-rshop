import { toast } from 'react-hot-toast'

type FetcherProps = {
    route: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: HeadersInit;
    loadingText?: string
    successText?: string
};

export const fetcher = async ({ route, method = "GET", body, headers, loadingText = "درحال ارسال", successText }: FetcherProps) => {
    const sending = toast.loading(loadingText)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${route}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    toast.dismiss(sending)
    const data = await res.json();
    if (!res.ok) {
        toast.error(data.message)
        return
    }
    toast.success(successText ? successText : data.message)
    return {data: data.data, ok: res.ok};
};
