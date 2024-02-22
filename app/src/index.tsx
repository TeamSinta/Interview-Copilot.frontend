import GlobalFont from '@/styles/GlobalFont';
import GlobalStyle from '@/styles/GlobalStyle';
import { DefaultTheme } from '@/styles/StyleType';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  // uncomment stric mode while deployment
  // it is causing issue in sign in process as because of this
  // useEffect is running twice which is causing workos authentication failure
  // it will work fine in production
  // <React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={DefaultTheme}>
        <Theme>
          <GlobalStyle />
          <GlobalFont />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Theme>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </Provider>
  // </React.StrictMode>
);
