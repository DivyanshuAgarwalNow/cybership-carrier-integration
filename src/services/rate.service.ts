import { carrierRegistry } from "../carriers/carrier-registry";
import { CarrierType } from "../carriers/carrier.types";
import { RateRequest } from "../domain/models/rate-request";
import { validate } from "../validation/validate";
import { rateRequestSchema } from "../validation/rate-request.schema";

export class RateService {
  async getRates(type: CarrierType, req: RateRequest) {
    validate(rateRequestSchema, req);
    const carrier = carrierRegistry.get(type);
    return carrier.getRates(req);
  }
}
