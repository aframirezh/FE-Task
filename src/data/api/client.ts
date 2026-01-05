/**
 * Makes an HTTP request.
 * @param input - The request info or URL.
 * @returns The response data.
 */
export async function http<T>(input: RequestInfo): Promise<T> {
  const res = await fetch(input);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
