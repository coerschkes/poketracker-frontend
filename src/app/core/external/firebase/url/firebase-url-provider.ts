import {IdentityToolkitActions, IdentityToolkitDomain, IdentityToolkitUrl} from "./identity-toolkit-url";
import {environment} from "../../../../../environments/environment";
import {SecureTokenDomain, SecureTokenUrl} from "./secure-token-url";

export class FirebaseUrlProvider {

  public static tokenLogin(): string {
    return new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.LOGIN_WITH_CUSTOM_TOKEN, environment.FIREBASE_API_KEY).toString()
  }

  public static basicLogin(): string {
    return new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.LOGIN_WITH_PASSWORD, environment.FIREBASE_API_KEY).toString()
  }

  public static signUp(): string {
    return new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.SIGN_UP, environment.FIREBASE_API_KEY).toString()
  }

  public static refreshToken(): string {
    return new SecureTokenUrl(SecureTokenDomain.TOKEN, environment.FIREBASE_API_KEY).toString()
  }
}
