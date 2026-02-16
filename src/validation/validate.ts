import { ZodSchema } from "zod";
import { CarrierApiError } from "../errors/carrier-api.error";
import { ErrorCode } from "../errors/error.types";

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (e: any) {
    throw new CarrierApiError(
      ErrorCode.VALIDATION_ERROR,
      "invalid request",
      400,
      e.errors
    );
  }
}
