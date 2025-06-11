import axios from 'axios';
import toast from 'react-hot-toast';
import getCookie from '@utils/getCookie';
import { signOutUser } from '../helper';

const api = axios.create({
  baseURL: process.env.BASE_URL,
});

api.interceptors.response.use(
  response => {
    if (response.config?.activeLoading) toast.success(response.data.message, { duration: 4000 });
    return response;
  },
  error => {
    if (error.code !== "ERR_NETWORK") {
      const res = error.response?.data;
      const errorMessage = res?.message ? res.message : "Unknown error. Please try again later";
      toast.error(errorMessage, { duration: 4000 });
      return Promise.reject(error);
    }
    toast.error("You are offline. Please try again later", { duration: 4000 });
    return Promise.reject(error);
  }
);

export const sendRequestWithLoading = async (
  url: string,
  data: object | FormData = {},
  type: 'get' | 'post' | 'put' | 'delete' | 'patch' = 'get',
  textLoading: string = 'Loading',
  isApiPublic: boolean = false,
  withCredentials?: boolean,
  activeLoading: boolean = true,
  contentType: "application/json" | "multipart/form-data" = "application/json",
  responseType: "json" | "blob" | "arraybuffer" | "text" = "json"
) => {
  if (!navigator.onLine) {
    toast.error("You're offline. Please try again later.");
    return null;
  }

  const loadingToast = activeLoading ? toast.loading(`${textLoading}...`, { duration: Infinity }) : null;

  try {
    let response;
    const accessToken = getCookie("access_token");

    const config: any = {
      withCredentials,
      activeLoading,
      headers: {
        'Content-Type': contentType,
      },
      responseType,
    };

    if (!isApiPublic) {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        signOutUser();
        if (activeLoading) toast.dismiss(loadingToast);
        return null;
      }
    }

    const isFormData = data instanceof FormData;

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
        if (activeLoading) toast.dismiss(loadingToast);
        console.error('Unsupported request type:', type);
        return null;
    }

    if (activeLoading) toast.dismiss(loadingToast);
    return response;
  } catch (error: any) {
    if (activeLoading) toast.dismiss(loadingToast);
    console.error('API Client Request Error:', error?.message || error);
    return null;
  }
};

export default api;
