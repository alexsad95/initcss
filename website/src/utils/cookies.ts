/**
 * Function for setting a cookie
 * @param name Cookie name
 * @param value Cookie value
 * @param days Number of days before the cookie expires
 */
export function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

/**
 * Function for getting a cookie value
 * @param name Cookie name
 * @returns Cookie value or `undefined` if the cookie is not found
 */
export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    // Get the last part of the array (it contains cookie value)
    const lastPart = parts.pop();

    // If the last part is not undefined, return the first part of it (the cookie value)
    // after splitting it by `;` (which is a separator for cookies)
    if (lastPart) {
      return lastPart.split(';').shift() ?? null;
    }
  }

  return null;
}
