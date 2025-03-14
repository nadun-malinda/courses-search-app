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

/**
 * Parses the query string and extracts the `category`, `location`, and `q` parameters.
 *
 * @param {string} queryString - The query string to be parsed (e.g., "category=Media,Tech&location=stockholm&q=journ").
 * @returns {object} An object containing:
 *   - `category`: An array of categories (split by commas), or `null` if not found.
 *   - `location`: An array of locations (split by commas), or `null` if not found.
 *   - `q`: The search query string, or `null` if not found.
 */
export function getQueryParams(queryString: string) {
  // Create a new URLSearchParams instance with the provided query string
  const params = new URLSearchParams(queryString);

  // Extract values for category, location, and q, and split by commas if present
  const category = params.get("category")?.split(",") || null;
  const location = params.get("location")?.split(",") || null;
  const q = params.get("q") || null;

  return { category, location, q };
}
