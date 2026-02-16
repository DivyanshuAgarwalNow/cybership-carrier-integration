import { z } from "zod";
import { addressSchema } from "./address.schema";
import { parcelSchema } from "./parcel.schema";

export const rateRequestSchema = z.object({
  origin: addressSchema,
  destination: addressSchema,
  parcels: z.array(parcelSchema).min(1)
});
