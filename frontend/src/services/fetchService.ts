export const API_URL = import.meta.env.VITE_APP_API_URL;

export async function fetchService(url: string, options = {}) {
  const response = await fetch(`${API_URL}${url}`, options);

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`HTTP error, status = ${response.status}`);
  }

  // If the response status code is 204, return null because there is no body
  if (response.status === 204) {
    return null;
  }

  // If the content type is JSON, attempt to parse the response as JSON
  if (response.headers.get("content-type")?.includes("application/json")) {
    try {
      return await response.json();
    } catch (error) {
      console.error("Failed to parse response as JSON", error);
      throw error;
    }
  } else {
    // If the content type isn't JSON, return the raw response
    return response;
  }
}
