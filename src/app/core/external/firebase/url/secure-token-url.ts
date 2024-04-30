import {InvalidArgumentsError} from "../../../../shared/error/invalid-arguments-error";

const BASE_URL = "https://securetoken.googleapis.com/v1/";

export enum SecureTokenDomain {
  TOKEN = "token"
}

export class SecureTokenUrl {
  private readonly _domain: SecureTokenDomain;
  private readonly _apiKey: string;

  constructor(domain: SecureTokenDomain, apiKey: string) {
    if (apiKey){
      this._domain = domain;
      this._apiKey = apiKey;
    } else {
      throw new InvalidArgumentsError(`ApiKey passed is not truthy: apikey=${apiKey}.`);
    }
  }

  public toString = (): string => {
    return BASE_URL + this._domain + "?key=" + this._apiKey;
  }
}
