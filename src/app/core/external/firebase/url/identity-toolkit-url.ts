import {InvalidArgumentsError} from "../../../../shared/error/invalid-arguments-error";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/"

export enum IdentityToolkitDomain {
  ACCOUNTS = "accounts",
}

export enum IdentityToolkitActions {
  SIGN_UP = "signUp",
  LOGIN_WITH_PASSWORD = "signInWithPassword",
  LOGIN_WITH_CUSTOM_TOKEN = "signInWithCustomToken",
}

export class IdentityToolkitUrl {
  private readonly _domain: IdentityToolkitDomain;
  private readonly _action: IdentityToolkitActions;
  private readonly _apiKey: string;

  constructor(domain: IdentityToolkitDomain, action: IdentityToolkitActions, apiKey: string) {
    if (apiKey) {
      this._domain = domain;
      this._action = action;
      this._apiKey = apiKey;
    } else {
      throw new InvalidArgumentsError(`ApiKey passed is not truthy: apikey=${apiKey}.`);
    }
  }

  public toString = (): string => {
    return BASE_URL + this._domain + ":" + this._action + "?key=" + this._apiKey;
  }
}
