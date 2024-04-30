import {InvalidArgumentsError} from "../../../../shared/error/invalid-arguments-error";
import {environment} from "../../../../../environments/environment";
import {
  IdentityToolkitActions,
  IdentityToolkitDomain, IdentityToolkitUrl
} from "./identity-toolkit-url";

describe('IdentityToolkitUrl', () => {
  it('should throw InvalidArgumentsError if apiKey is empty', () => {
    expect(function () {
      new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.LOGIN_WITH_CUSTOM_TOKEN, "");
    }).toThrow(new InvalidArgumentsError(`ApiKey passed is not truthy: apikey=.`));
  });

  it('should return a valid identity toolkit url with custom token login action', () => {
    const url = new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.LOGIN_WITH_CUSTOM_TOKEN, environment.FIREBASE_API_KEY);
    expect(url.toString()).toEqual("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=" + environment.FIREBASE_API_KEY)
  });

  it('should return a valid identity toolkit url with password login action', () => {
    const url = new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.LOGIN_WITH_PASSWORD, environment.FIREBASE_API_KEY);
    expect(url.toString()).toEqual("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.FIREBASE_API_KEY)
  });

  it('should return a valid identity toolkit url with sign up action', () => {
    const url = new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.SIGN_UP, environment.FIREBASE_API_KEY);
    expect(url.toString()).toEqual("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.FIREBASE_API_KEY)
  });
});
