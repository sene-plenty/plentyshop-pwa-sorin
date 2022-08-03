import { reactive } from '@nuxtjs/composition-api';

const cookieCache = reactive({});

export interface UseCookies {
  setCookies(cookies: string): void,
  getCookies(): string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCookies = (): UseCookies => {
  const setCookies = (cookies: string): void => {
    if (cookies) {
      cookies.split(';').forEach(cookie => {
        const keyValue = cookie.split('=');
        cookieCache[keyValue[0]] = keyValue[1];
      });
    }
  };

  const getCookies = () => {
    let result = '';
    if (Object.keys(cookieCache)) {
      Object.keys(cookieCache).forEach(cookieKey => {
        result += `${cookieKey}=${cookieCache[cookieKey]}; `;
      });
    }
    return result;
  };
  return {
    setCookies,
    getCookies
  };
};

export default useCookies;
