export default class TokenModel {
  private token: string;
  private refreshToken: string;

  public constructor(token?: string, refreshToken?: string) {
    this.token = token || '';
    this.refreshToken = refreshToken || '';
  }

  public getToken(): string {
    return this.token;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public setToken(value: string) {
    this.token = value;
  }

  public setRefreshToken(value: string) {
    this.refreshToken = value;
  }
}
