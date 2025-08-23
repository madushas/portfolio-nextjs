import * as Sentry from "@sentry/nextjs";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export function handleApiError(error: unknown): ApiError {
  let apiError: ApiError = { message: "Unknown error occurred" };

  if (error instanceof Error) {
    apiError.message = error.message;
    // Optionally extract more info from custom errors
    if ((error as any).status) apiError.status = (error as any).status;
    if ((error as any).code) apiError.code = (error as any).code;
    if ((error as any).details) apiError.details = (error as any).details;
  } else if (typeof error === "string") {
    apiError.message = error;
  }

  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error);
  } else {
    console.error("API Error:", error);
  }

  return apiError;
}

export async function retryFetch(
  url: string,
  options?: RequestInit,
  retries = 3,
  delay = 500
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
    }
  }
  throw new Error("Max retries reached");
}
