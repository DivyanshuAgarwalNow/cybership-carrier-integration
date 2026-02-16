import { CarrierType } from "./carrier.types";
import { UPSCarrier } from "./ups/ups.carrier";

class CarrierRegistry {
  private carriers = {
    [CarrierType.UPS]: new UPSCarrier()
  };

  get(type: CarrierType) {
    const carrier = this.carriers[type];
    if (!carrier) throw new Error("carrier not supported");
    return carrier;
  }
}

export const carrierRegistry = new CarrierRegistry();
