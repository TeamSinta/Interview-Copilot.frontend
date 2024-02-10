import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookieValue = async (
  cookieName: string
): Promise<string | undefined> => {
  return cookies.get(cookieName);
};
export const clearAllCookies = async () => {
  cookies.remove('access_token');
  cookies.remove('refresh_token');
};
