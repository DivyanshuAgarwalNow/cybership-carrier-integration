import { RateRequest } from "../domain/models/rate-request";
import { RateQuote } from "../domain/models/rate-quote";

export interface Carrier {
  getRates(req: RateRequest): Promise<RateQuote[]>;
}
