export async function fetchJson(url: string): Promise<object> {
    const response = await fetch(url);
    return response.json();
}
