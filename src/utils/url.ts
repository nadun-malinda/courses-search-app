/**
 * Normalizes a query string by sorting its parameters alphabetically.
 *
 * @param {string} queryString - The raw query string (e.g., "b=2&a=1").
 * @returns {string} - The normalized query string (e.g., "a=1&b=2").
 */
export function normalizeQueryString(queryString: string): string {
  const params = new URLSearchParams(queryString);
  const sortedParams = getSortedParams(params);
  return sortedParams.toString();
}

/**
 * Sorts URLSearchParams alphabetically by key.
 *
 * @param {URLSearchParams} params - The parameters to sort.
 * @returns {URLSearchParams} - The sorted parameters.
 */
function getSortedParams(params: URLSearchParams): URLSearchParams {
  const sortedParams = new URLSearchParams();
  const sortedKeys = [...params.keys()].sort();

  for (const key of sortedKeys) {
    sortedParams.set(key, params.get(key) as string);
  }

  return sortedParams;
}
