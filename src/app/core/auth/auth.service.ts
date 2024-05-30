import {Injectable} from "@angular/core";
import {FirebaseApiService} from "../external/firebase/firebase-api.service";
import {tap} from "rxjs";
import {AuthStateService} from "./auth-state.service";
import {UserInfo} from "./user-info";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class AuthService {
  private readonly _firebaseApiService: FirebaseApiService;
  private readonly _authStateService: AuthStateService;

  constructor(private firebaseApiService: FirebaseApiService,
              private authStateService: AuthStateService) {
    this._firebaseApiService = firebaseApiService;
    this._authStateService = authStateService;
  }

  signUp(email: string, password: string) {
    return this._firebaseApiService
      .signUp(email, password)
      .pipe(tap((value: any) =>
          this._authStateService.authenticate(
            this.buildUserInfo(value.idToken, value.email, value.refreshToken, value.expiresInSeconds)
          )
        )
      )
  }

  basicLogin(email: string, password: string) {
    return this._firebaseApiService
      .basicLogin(email, password)
      .pipe(tap((value: any) => {
            console.log(value)
            this._authStateService.authenticate(
              this.buildUserInfo(value.idToken, value.email, value.refreshToken, value.expiresInSeconds)
            )
          }
        )
      )
  }

  tryLoginWithStoredCredentials(): boolean {
    this._authStateService.tryLoginWithStoredCredentials()
    return this._authStateService.isLoggedIn();
  }

  refreshToken() {
    return this._firebaseApiService
      .refreshToken(this._authStateService.userInfo()?.refreshToken || "")
      .subscribe({
          next: (v) => {
            this.firebaseApiService.lookupUser(v.id_token).subscribe({
              next: (value: any) => {
                this._authStateService.authenticate(
                  this.buildUserInfo(v.id_token, value.email, v.refresh_token, v.expires_in)
                )
              }, error: (e: HttpErrorResponse) => {
                console.log(e)
              }
            })
          },
          error: (e: HttpErrorResponse) => {
            console.log(e)
          }
        }
      )
  }

  private buildUserInfo(idToken: string, email: string, refreshToken: string, expiresInSeconds: string): UserInfo {
    return {
      idToken: idToken,
      email: email,
      refreshToken: refreshToken,
      expiresIn: expiresInSeconds,
      createdAt: String(new Date().getTime() / 1000),
    }
  }
}
