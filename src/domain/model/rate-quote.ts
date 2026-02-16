export interface RateQuote {
  carrier: string;
  service: string;
  totalCharge: number;
  currency: string;
  estimatedDeliveryDays?: number;
}
