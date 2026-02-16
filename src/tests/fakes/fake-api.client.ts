export class FakeApiClient {
  constructor(private response: any) {}
  async post() {
    return this.response;
  }
}
