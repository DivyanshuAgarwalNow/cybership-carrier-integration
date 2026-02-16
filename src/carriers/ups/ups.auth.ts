import { ApiClient } from "../../infrastructure/api.client";
import { config } from "../../infrastructure/config";
import { UPSToken } from "./ups.types";
import { CarrierApiError } from "../../errors/carrier-api.error";
import { ErrorCode } from "../../errors/error.types";

export class UPSAuthService {
  private api = new ApiClient(config.upsBaseUrl);
  private token: UPSToken | null = null;

  async getAccessToken(): Promise<string> {
    if (this.token && Date.now() < this.token.expiresAt) {
      return this.token.accessToken;
    }
    return this.fetchToken();
  }

  private async fetchToken(): Promise<string> {
    try {
      const res = await this.api.post<any>(
        "/security/v1/oauth/token",
        "grant_type=client_credentials",
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          auth: {
            username: config.upsClientId,
            password: config.upsClientSecret
          }
        }
      );

      this.token = {
        accessToken: res.access_token,
        expiresAt: Date.now() + (res.expires_in || 3600) * 1000
      };

      return this.token.accessToken;
    } catch {
      throw new CarrierApiError(ErrorCode.AUTH_FAILED, "UPS auth failed");
    }
  }
}
