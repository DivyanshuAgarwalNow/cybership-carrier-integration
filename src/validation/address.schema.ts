import { z } from "zod";

export const addressSchema = z.object({
  addressLine1: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  countryCode: z.string()
});
