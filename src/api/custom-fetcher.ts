interface FetchParams {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export const customFetch = async (
  params: FetchParams
): Promise<FetchParams> => {
  const { url, method, headers = {}, body } = params;
  console.log('url', url);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  console.log('baseurl: ', baseUrl);
  const fullUrl = `${baseUrl}${url}`;

  console.log('Fetch URL 2:', fullUrl);

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json();
};
