interface ImportMetaEnv {
  readonly VITE_USE_MOCK_LOGIN: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_ENV: string;
  readonly VITE_DAILY_API_KEY: string;
  readonly VITE_DAI_TEST_KEY: string;
  readonly VITE_BACKEND_BASE_URL_SHORT: string;
  readonly VITE_WORKOS_SECRETKEY: string;
  readonly VITE_WORKOS_CLIENTID: string;
  readonly VITE_WORKOS_REDIRECTURI: string;
  readonly VITE_BACKEND_BASE_URL_SHORT: string;
  readonly VITE_OPENAI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
