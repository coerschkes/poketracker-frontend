import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

export interface RefreshTokenResponse {
  access_token: string
  expires_in: string
  token_type: string
  refresh_token: string
  id_token: string
  user_id: string
  project_id: string
}

export interface SignUpResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export interface SignInResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
}

@Injectable({providedIn: "root"})
export class FirebaseApiService {
  private readonly accountsUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts"
  private readonly secureTokenUrl: string = "https://securetoken.googleapis.com/v1/token"
  private readonly signUpPath: string = "signUp"
  private readonly signInPath: string = "signInWithPassword"
  private readonly lookupPath: string = "lookup"
  private readonly _httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public signUp(email: string, password: string) {
    let url: string = this.buildUrlWithApiToken(this.accountsUrl + ":" + this.signUpPath);
    return this.postApiRequest<SignUpResponse>(url, `{"email":"${email}","password":"${password}","returnSecureToken":true}`)
  }

  public basicLogin(email: string, password: string) {
    let url: string = this.buildUrlWithApiToken(this.accountsUrl + ":" + this.signInPath);
    return this.postApiRequest<SignInResponse>(url, `{"email":"${email}","password":"${password}","returnSecureToken":true}`)
  }


  public refreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    let url: string = this.buildUrlWithApiToken(this.secureTokenUrl)
    return this.postApiRequest<RefreshTokenResponse>(url, `{"grant_type":"refresh_token","refresh_token":"${refreshToken}"}`)
  }

  public lookupUser(idToken: string): Observable<{ email: string }> {
    let url: string = this.buildUrlWithApiToken(this.accountsUrl + ":" + this.lookupPath)
    return this.postApiRequest<{ email: string }>(url, `{"idToken":"${idToken}"}`)
  }

  private postApiRequest<T>(url: string, body: string) {
    return this._httpClient.post<T>(url, body, {headers: {'Content-Type': 'application/json'}})
  }

  private buildUrlWithApiToken(url: string) {
    return url + "?key=" + environment.FIREBASE_API_KEY
  }
}
