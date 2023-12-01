import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

import { useEffect } from "react";

const HttpService = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
  });
  // Request Handler
  const requestHandler = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem("token");
    if (token != null) {
      switch (config.url) {
        case import.meta.env.VITE_GOOGLE_CLIENT_ID:
          return config;
        default:
          if (config.headers != null) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
      }
    }
    return config;
  };

  // Request Error Handler
  const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
    console.log("Here");
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
    return await Promise.reject(error);
  };

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      requestHandler,
      onRequestError
    );
    const responseInterceptor = instance.interceptors.response.use(
      responseHandler,
      onResponseError
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [instance.interceptors.request, instance.interceptors.response]);

  return instance;
};

export default HttpService;
