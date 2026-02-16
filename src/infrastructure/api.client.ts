import axios from "axios";

export class ApiClient {
  private client;

  constructor(baseURL?: string) {
    this.client = axios.create({ baseURL, timeout: 5000 });
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    return (await this.client.post(url, data, config)).data;
  }
}
