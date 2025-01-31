import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AccessToken,
  GoogleCode,
  RefreshToken,
  UserReadSerializer,
  Token,
} from './authenticationInterface';

export const authAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
  }),
  endpoints: (builder) => ({
    googleLogin: builder.mutation<Token, GoogleCode>({
      query: (code) => {
        const urlPath = import.meta.env.VITE_USE_MOCK_LOGIN
          ? '/auth/mocklogin/'
          : '/auth/login/';
        return {
          url: urlPath,
          method: 'POST',
          body: { code: code.code },
          credentials: 'include',
        };
      },
    }),
    authKitLogin: builder.mutation<any, any>({
      query: (data) => {
        const urlPath = import.meta.env.VITE_USE_MOCK_LOGIN
          ? '/auth/login/'
          : '/auth/login-with-code/';
        return {
          url: urlPath,
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
    getUser: builder.mutation<UserReadSerializer, AccessToken>({
      query: (access) => {
        return {
          url: '/user/userdetails/',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access.access}`,
          },
        };
      },
    }),
    validateToken: builder.mutation<void, AccessToken>({
      query: (access) => ({
        url: '/auth/token/verify/',
        method: 'POST',
        body: { token: access.access },
      }),
    }),
    getAccessToken: builder.mutation<void, RefreshToken>({
      query: (refresh) => {
        return {
          url: '/auth/token/refresh/',
          method: 'POST',
          body: { refresh: refresh.refresh },
        };
      },
    }),
    checkRefreshTokenValidity: builder.mutation<
      { valid: boolean },
      RefreshToken
    >({
      query: (refresh) => ({
        url: '/auth/check-refresh-token-validity/',
        method: 'POST',
        body: { refresh: refresh.refresh },
      }),
    }),
  }),
});

export const {
  useGoogleLoginMutation,
  useAuthKitLoginMutation,
  useGetUserMutation,
  useValidateTokenMutation,
  useGetAccessTokenMutation,
  useCheckRefreshTokenValidityMutation,
} = authAPI;
