import { UPSCarrier } from "../carriers/ups/ups.carrier";
import { FakeApiClient } from "./fakes/fake-api.client";
import { FakeAuthService } from "./fakes/fake-auth.service";

describe("UPS rate integration", () => {
  it("maps UPS response to internal rate format", async () => {
    const carrier = new UPSCarrier(
      new FakeAuthService() as any,
      new FakeApiClient({
        RateResponse: {
          RatedShipment: [
            {
              Service: { Code: "03" },
              TotalCharges: { MonetaryValue: "120", CurrencyCode: "USD" }
            }
          ]
        }
      }) as any
    );

    const res = await carrier.getRates({
      origin: {} as any,
      destination: {} as any,
      parcels: [{ weight: 1, length: 1, width: 1, height: 1 }]
    });

    expect(res[0].totalCharge).toBe(120);
  });
});
