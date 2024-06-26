import {Injectable} from "@angular/core";
import {
  FirebaseApiService,
  RefreshTokenResponse,
  SignInResponse,
  SignUpResponse
} from "../external/firebase/firebase-api.service";
import {switchMap, tap} from "rxjs";
import {AuthStateService} from "./auth-state.service";
import {UserInfo} from "./user-info";
import {HttpErrorResponse} from "@angular/common/http";
import {PoketrackerApiService} from "../external/poketracker/poketracker-api.service";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(private _firebaseApiService: FirebaseApiService,
              private _authStateService: AuthStateService,
              private _poketrackerApi: PoketrackerApiService,
              private _snackbarService: SnackbarService) {
    this._poketrackerApi.registerRefreshCallback(() => this.refreshToken())
  }

  signUp(email: string, password: string) {
    return this._firebaseApiService
      .signUp(email, password)
      .pipe(
        tap((value: SignUpResponse) => {
          this._authStateService.authenticate(
            this.buildUserInfo(value.idToken, value.refreshToken, value.expiresIn)
          )
        }),
        switchMap(() => {
          return this.createUserInformation();
        })
      )
  }

  basicLogin(email: string, password: string) {
    return this._firebaseApiService
      .basicLogin(email, password)
      .pipe(
        tap((value: SignInResponse) => {
          this._authStateService.authenticate(
            this.buildUserInfo(value.idToken, value.refreshToken, value.expiresIn)
          )
        }),
        switchMap(() => {
          return this.refreshUserInformation();
        })
      )
  }

  tryLoginWithStoredCredentials(): boolean {
    this._authStateService.tryLoginWithStoredCredentials();
    this.refreshUserInformation().subscribe()
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
        }),
        switchMap(() => {
          return this.refreshUserInformation();
        })
      )
  }

  refreshUserInformation() {
    return this._poketrackerApi.getUser()
      .pipe(
        tap((user) => {
          if (user instanceof HttpErrorResponse) {
            this._snackbarService.showError("Unable to retrieve user information")
            console.log(user)
          } else {
            this._authStateService.userInfo.update(value => {
              if (value === undefined) {
                return value
              } else {
                return {
                  ...value,
                  avatarUrl: user.avatarUrl
                }
              }
            })
          }
        }),
      )
  }

  updateUserInfo(idToken: string, refreshToken: string, expiresInSeconds: string) {
    this._authStateService.authenticate(this.buildUserInfo(idToken, refreshToken, expiresInSeconds))
    this.refreshUserInformation().subscribe()
  }

  private buildUserInfo(idToken: string, refreshToken: string, expiresInSeconds: string): UserInfo {
    return {
      idToken: idToken,
      refreshToken: refreshToken,
      expiresIn: expiresInSeconds,
      createdAt: String(new Date().getTime() / 1000),
      avatarUrl: ""
    }
  }

  private createUserInformation() {
    return this._firebaseApiService.lookupIdentity(this._authStateService.userInfo()?.idToken || "")
      .pipe(
        switchMap(value => {
          return this._poketrackerApi.createUser({
            userId: value.localId,
            avatarUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
          })
        }),
        switchMap(() => {
            return this.refreshUserInformation();
          }
        ))
  }
}
