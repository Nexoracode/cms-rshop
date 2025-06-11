type FetcherProps = {
    route: string;
    body?: any;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: HeadersInit;
};

const fetcher = async ({
    route,
    body,
    method = "POST",
    headers = { "Content-Type": "application/json" },
}: FetcherProps) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}${route}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            cache: "no-store",
        }).then((res) => res.json());

        if (response.error) {
            return {
                success: false,
                message: response.message || "Request failed",
            };
        }

        return response;
    } catch (error) {
        return { success: false, message: "An error occurred. Please try again." };
    }
};

export default fetcher;
