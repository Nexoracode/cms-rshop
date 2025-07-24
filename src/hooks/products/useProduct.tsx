import { fetcher } from "@/utils/fetcher"
import { useMutation } from "@tanstack/react-query"

export const useProductUpload = () => {
    return useMutation({
        mutationFn: (data: FormData) => {
            return fetcher({
                route: "/product/upload",
                method: "POST",
                body: data,
                successText: "فایل ها با موفقیت بارگذاری شدند",
                loadingText: "در حال بارگذاری فایل ها",
            })
        }
    })
}