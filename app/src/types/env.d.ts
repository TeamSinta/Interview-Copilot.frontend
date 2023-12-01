interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_AUTH_CALLBACK_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_OAUTH_CALLBACK_URL: string;
  readonly VITE_ENV: string;
  readonly VITE_DAILY_API_KEY: string;
  readonly VITE_DAI_TEST_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
