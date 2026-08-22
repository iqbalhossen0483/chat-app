import ToasErrorMessage from "@/components/ui/ToasErrorMessage";
import { ApiErrorResponse } from "@/types/type";
import { toast } from "react-toastify";

export function isApiError(error: unknown): error is ApiErrorResponse {
  if (!error || typeof error !== "object") {
    return false;
  }

  const value = error as Record<string, unknown>;

  if (typeof value.status !== "number") {
    return false;
  }

  if (!value.data || typeof value.data !== "object") {
    return false;
  }

  const data = value.data as Record<string, unknown>;

  if (!data.error || typeof data.error !== "object") {
    return false;
  }

  const apiError = data.error as Record<string, unknown>;

  return (
    typeof apiError.message === "string" && typeof apiError.code === "string"
  );
}

export function errorHandler(error: unknown, defaultMessage: string): void {
  let title = defaultMessage;
  let description = "";

  if (isApiError(error)) {
    title = error.data.error.message;
    description = error.data.error.details
      .map((item) => item.message)
      .join(", ");
  } else if (error instanceof Error) {
    title = error.message;
  }

  toast.error(<ToasErrorMessage title={title} description={description} />);
}
