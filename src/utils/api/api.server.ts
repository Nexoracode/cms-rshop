import axios from 'axios';
import getCookie from '@utils/getCookie';

const api = axios.create({
  baseURL: process.env.BASE_URL,
});

export const sendRequestServerOnly = async (
  url: string,
  data: object | FormData = {},
  type: 'get' | 'post' | 'put' | 'delete' | 'patch' = 'get',
  isApiPublic: boolean = false,
  withCredentials?: boolean,
  contentType: "application/json" | "multipart/form-data" = "application/json",
  responseType: "json" | "blob" | "arraybuffer" | "text" = "json"
) => {
  try {
    const accessToken = getCookie("access_token");

    const config: any = {
      withCredentials,
      headers: {
        'Content-Type': contentType,
      },
      responseType,
    };

    if (!isApiPublic && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const isFormData = data instanceof FormData;

    let response;
    switch (type) {
      case 'get':
        response = await api.get(url, { params: data, ...config });
        break;
      case 'post':
        response = await api.post(url, isFormData ? data : JSON.stringify(data), config);
        break;
      case 'put':
        response = await api.put(url, isFormData ? data : JSON.stringify(data), config);
        break;
      case 'delete':
        response = await api.delete(url, { params: data, ...config });
        break;
      case 'patch':
        response = await api.patch(url, isFormData ? data : JSON.stringify(data), config);
        break;
      default:
        console.error('Unsupported request type:', type);
        return null;
    }

    return response;
  } catch (error: any) {
    console.error('API Server Request Error:', error?.message || error);
    return null;
  }
};
