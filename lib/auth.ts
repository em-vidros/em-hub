const AUTH_KEY = "emhub_auth";

export function setAuthFlag() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_KEY, "true");
}

export function clearAuthFlag() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "true";
}

