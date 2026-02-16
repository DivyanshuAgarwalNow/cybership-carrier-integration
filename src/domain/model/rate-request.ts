import { Address } from "./address";
import { Parcel } from "./parcel";

export interface RateRequest {
  origin: Address;
  destination: Address;
  parcels: Parcel[];
  serviceLevel?: string;
}
