type FetcherProps = {
  route: string;
  body?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  internal?: boolean;
  credentials?: "omit" | "same-origin" | "include";
  stringify?: boolean;
  isFormData?: boolean;
};

const fetcher = async ({
  route,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" },
  internal = true,
  credentials = "same-origin",
  stringify = true,
  isFormData = false,
}: FetcherProps) => {
  try {
    const baseUrl = !internal ? route : `${process.env.BASE_URL}${route}`;

    const fetchHeaders = isFormData
      ? Object.fromEntries(Object.entries(headers).filter(([key]) => key !== 'Content-Type'))
      : headers;

    const fetchOptions: RequestInit = {
      method,
      headers: fetchHeaders,
      body: body
        ? (isFormData
          ? body
          : (stringify ? JSON.stringify(body) : body)
        )
        : undefined,
      cache: "no-store",
      credentials,
    };

    const response = await fetch(String(baseUrl), fetchOptions).then((res) =>
      res.json()
    );

    return response;
  } catch (error) {
    return { success: false, message: "خطایی رخ داد. لطفاً دوباره تلاش کنید." };
  }
};

export default fetcher;
