import { RateRequest } from "../../domain/models/rate-request";
import { RateQuote } from "../../domain/models/rate-quote";
import { CarrierApiError } from "../../errors/carrier-api.error";
import { ErrorCode } from "../../errors/error.types";

export class upsRateTransformer {
  static toUpsPayload(req: RateRequest) {
    return {
      RateRequest: {
        Shipment: {
          Shipper: { Address: req.origin },
          ShipTo: { Address: req.destination },
          Package: req.parcels.map(p => ({
            PackagingType: { Code: "02" },
            Dimensions: {
              UnitOfMeasurement: { Code: "CM" },
              Length: String(p.length),
              Width: String(p.width),
              Height: String(p.height)
            },
            PackageWeight: {
              UnitOfMeasurement: { Code: "KGS" },
              Weight: String(p.weight)
            }
          }))
        }
      }
    };
  }

  static toRateQuotes(res: any): RateQuote[] {
    if (!res?.RateResponse)
      throw new CarrierApiError(
        ErrorCode.MALFORMED_RESPONSE,
        "invalid ups response"
      );

    return (res.RateResponse.RatedShipment || []).map((s: any) => ({
      carrier: "UPS",
      service: s.Service?.Code,
      totalCharge: Number(s.TotalCharges?.MonetaryValue || 0),
      currency: s.TotalCharges?.CurrencyCode
    }));
  }
}
