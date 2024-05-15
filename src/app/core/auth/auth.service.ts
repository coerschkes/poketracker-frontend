import {Injectable} from "@angular/core";
import {FirebaseApiService} from "../external/firebase/firebase-api.service";
import {tap} from "rxjs";
import {AuthStateService} from "./auth-state.service";
import {UserInfo} from "./user-info";
import {BasicLoginResponse, SignUpResponse} from "../external/firebase/firebase-api";

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
      .signUp({email: email, password: password, returnToken: true})
      .pipe(tap((value: SignUpResponse) =>
          this._authStateService.authenticate(
            this.buildUserInfo(value.idToken, value.email, value.refreshToken, value.expiresInSeconds)
          )
        )
      )
  }

  basicLogin(email: string, password: string) {
    return this._firebaseApiService
      .basicLogin({email: email, password: password, returnToken: true})
      .pipe(tap((value: BasicLoginResponse) =>
          this._authStateService.authenticate(
            this.buildUserInfo(value.idToken, value.email, value.refreshToken, value.expiresInSeconds)
          )
        )
      )
  }

  tryLoginWithStoredCredentials(): boolean {
    this._authStateService.tryLoginWithStoredCredentials()
    return this._authStateService.isLoggedIn();
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
