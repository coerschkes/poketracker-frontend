import {Injectable} from "@angular/core";
import {
  FirebaseApiService,
  RefreshTokenResponse,
  SignInResponse,
  SignUpResponse
} from "../external/firebase/firebase-api.service";
import {catchError, of, tap} from "rxjs";
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
      .pipe(tap((value: SignUpResponse) =>
          this._authStateService.authenticate(
            this.buildUserInfo(value.idToken, value.refreshToken, value.expiresIn)
          )
        )
      )
  }

  basicLogin(email: string, password: string) {
    return this._firebaseApiService
      .basicLogin(email, password)
      .pipe(tap((value: SignInResponse) => {
            this._authStateService.authenticate(
              this.buildUserInfo(value.idToken,value.refreshToken, value.expiresIn)
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
      .pipe(
        tap((value: RefreshTokenResponse) => {
            this._authStateService.authenticate(
              this.buildUserInfo(value.id_token, value.refresh_token, value.expires_in)
            )
          }
        ),
        catchError((err: HttpErrorResponse) => {
          console.log(err)
          return of(err)
        })
      )
  }

  private buildUserInfo(idToken: string, refreshToken: string, expiresInSeconds: string): UserInfo {
    return {
      idToken: idToken,
      refreshToken: refreshToken,
      expiresIn: expiresInSeconds,
      createdAt: String(new Date().getTime() / 1000),
    }
  }
}
