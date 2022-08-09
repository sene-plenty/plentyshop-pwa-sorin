let globalCookies;

export const setCookies = (cookies: string): void => {
  if (cookies) {
    globalCookies = cookies;
  }
};

export const getCookies = (): string => {
  return globalCookies;
};

export const getCookieByKey = (key: string, cookies: string): {key: string, value: string} | null => {
  if (!cookies.includes(key)) {
    return null;
  }
  const keyValuePair = cookies.split(';').find(cookie => cookie.includes(key));
  const value = keyValuePair.split('=')[1];
  return { key, value };
};
