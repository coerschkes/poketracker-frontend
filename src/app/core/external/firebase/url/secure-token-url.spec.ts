import {environment} from "../../../../../environments/environment";
import {InvalidArgumentsError} from "../../../../shared/error/invalid-arguments-error";
import {SecureTokenDomain, SecureTokenUrl} from "./secure-token-url";

describe('SecureTokenUrl', () => {
  it('should throw InvalidArgumentsError if apiKey is empty', () => {
    expect(function () {
      new SecureTokenUrl(SecureTokenDomain.TOKEN, "")
    }).toThrow(new InvalidArgumentsError(`ApiKey passed is not truthy: apikey=.`));
  });

  it('should return a valid secure token url with refresh token action', () => {
    const url = new SecureTokenUrl(SecureTokenDomain.TOKEN, environment.FIREBASE_API_KEY);
    expect(url.toString()).toEqual("https://securetoken.googleapis.com/v1/token?key=" + environment.FIREBASE_API_KEY)
  });
});

