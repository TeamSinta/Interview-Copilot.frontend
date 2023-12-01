import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const instance = axios.create({
  //Temporary suspension of service due to the current utilization of Mock API.
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

enum Env {
  STORY = "story",
  MOCK = "mock",
  DEVELOPE = "develope",
}

//Temporary suspension of service due to the incomplete implementation of the login function.
const requestHandler = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  if (import.meta.env.VITE_ENV === Env.DEVELOPE) {
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
  }
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
  return await Promise.reject(error);
};

instance.interceptors.request.use(requestHandler, onRequestError);
instance.interceptors.response.use(responseHandler, onResponseError);
