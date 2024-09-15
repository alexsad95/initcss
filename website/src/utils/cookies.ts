/**
 * Function for setting a cookie
 */
export function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

/**
 * Function for getting a cookie value
 */
export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  const lastPart = parts.pop(); // Contains cookie value

  if (parts.length !== 2 || !lastPart) {
    return null;
  }

  // If the last part is not undefined, return the first part of it (the cookie value)
  // after splitting it by `;` (which is a separator for cookies)
  return lastPart.split(';').shift() ?? null;
}
