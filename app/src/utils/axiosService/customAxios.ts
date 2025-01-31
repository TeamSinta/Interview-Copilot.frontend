import axios, {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { clearAllCookies, getCookieValue } from '../cookieUtils';

export const instance = axios.create({});

//Temporary suspension of service due to the incomplete implementation of the login function.
const requestHandler = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const access_token = await getCookieValue('access_token');
  config.headers = {
    Authorization: `Bearer ${access_token}`,
  } as AxiosRequestHeaders;
  //  Todo: Need to confirm with @mohamed shegow
  // if (import.meta.env.VITE_ENV === Env.DEVELOPE) {
  //   const token = localStorage.getItem("token");
  //   if (token != null) {
  //     switch (config.url) {
  //       case import.meta.env.VITE_GOOGLE_CLIENT_ID:
  //         return config;
  //       default:
  //         if (config.headers != null) {
  //           config.headers.Authorization = `Bearer ${token}`;
  //         }
  //         return config;
  //     }
  //   }
  // }
  return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return await Promise.reject(error);
};

// Response Handler
const responseHandler = (response: any): any => {
  return response;
};

// Response Error Handler
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  if (error.response?.status === 401) {
    clearAllCookies();
    window.location.href = '/login';
  }
  return await Promise.reject(error);
};

instance.interceptors.request.use(requestHandler, onRequestError);
instance.interceptors.response.use(responseHandler, onResponseError);
