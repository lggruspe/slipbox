export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}
