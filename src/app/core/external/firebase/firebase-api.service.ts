import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  BasicAuthenticationPayload,
  RefreshTokenPayload,
  RefreshTokenResponse,
  BasicLoginResponse,
  SignUpResponse, TokenAuthenticationPayload, TokenLoginResponse
} from "./firebase-api";
import {FirebaseUrlProvider} from "./url/firebase-url-provider";

@Injectable({providedIn: "root"})
export class FirebaseApiService {
  private readonly _httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public signUp(payload: BasicAuthenticationPayload) {
    return this._httpClient.post<SignUpResponse>(FirebaseUrlProvider.signUp(), payload)
  }

  public tokenLogin(payload: TokenAuthenticationPayload){
    return this._httpClient.post<TokenLoginResponse>(FirebaseUrlProvider.tokenLogin(), payload)
  }

  public basicLogin(payload: BasicAuthenticationPayload) {
    return this._httpClient.post<BasicLoginResponse>(FirebaseUrlProvider.basicLogin(), payload)
  }

  public refreshToken(payload: RefreshTokenPayload) {
    return this._httpClient.post<RefreshTokenResponse>(FirebaseUrlProvider.refreshToken(), payload)
  }

}
