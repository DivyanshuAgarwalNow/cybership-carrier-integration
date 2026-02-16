import { ErrorCode } from "./error.types";

export class CarrierApiError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message);
  }
}
