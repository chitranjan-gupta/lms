export async function getItem<T>(key: string): Promise<T> {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export async function setItem<T>(key: string, value: T) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  return localStorage.removeItem(key);
}
