import { Carrier } from "../carrier.interface";
import { RateRequest } from "../../domain/models/rate-request";
import { RateQuote } from "../../domain/models/rate-quote";
import { UPSAuthService } from "./ups.auth";
import { ApiClient } from "../../infrastructure/api.client";
import { config } from "../../infrastructure/config";
import { upsRateTransformer } from "./ups.rate-transformer";
import { CarrierApiError } from "../../errors/carrier-api.error";
import { ErrorCode } from "../../errors/error.types";

export class UPSCarrier implements Carrier {
  constructor(
    private auth = new UPSAuthService(),
    private api = new ApiClient(config.upsBaseUrl)
  ) {}

  async getRates(req: RateRequest): Promise<RateQuote[]> {
    try {
      const token = await this.auth.getAccessToken();

      const upsBody = upsRateTransformer.toUpsPayload(req);

      const res = await this.api.post<any>(
        "/api/rating/v1/Shop",
        upsBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return upsRateTransformer.toRateQuotes(res);
    } catch (e: any) {
      if (e instanceof CarrierApiError) throw e;
      throw new CarrierApiError(ErrorCode.RATE_FAILED, "rate fetch failed");
    }
  }
}
