import {environment} from "../../../../../environments/environment";
import {FirebaseUrlProvider} from "./firebase-url-provider";
import {IdentityToolkitActions, IdentityToolkitDomain, IdentityToolkitUrl} from "./identity-toolkit-url";

describe('FirebaseUrlProvider', () => {
  it('should return valid basicLogin url with valid api key', () => {
    const url = new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.LOGIN_WITH_PASSWORD, environment.FIREBASE_API_KEY).toString();
    expect(FirebaseUrlProvider.basicLogin()).toEqual(url)
  });

  it('should return valid tokenLogin url with valid api key', () => {
    const url = new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.LOGIN_WITH_CUSTOM_TOKEN, environment.FIREBASE_API_KEY).toString()
    expect(FirebaseUrlProvider.tokenLogin()).toEqual(url)
  });

  it('should return valid signUp url with valid api key', () => {
    const url = new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.SIGN_UP, environment.FIREBASE_API_KEY).toString();
    expect(FirebaseUrlProvider.signUp()).toEqual(url.toString())
  });
});
