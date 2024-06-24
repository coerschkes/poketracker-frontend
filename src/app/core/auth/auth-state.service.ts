import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {UserInfo} from "./user-info";
import {LocalStorageService} from "../../shared/localStorage.service";

@Injectable({providedIn: "root"})
export class AuthStateService {
  private readonly _localStorageService: LocalStorageService;
  private readonly _userInfo: WritableSignal<UserInfo | undefined>;

  constructor(private localStorageService: LocalStorageService) {
    this._userInfo = signal<UserInfo | undefined>(undefined);
    this._localStorageService = localStorageService;
  }

  public authenticate(userInfo: UserInfo) {
    this._userInfo.update(() => userInfo)
    if (userInfo.refreshToken !== undefined) {
      this.localStorageService.storeUserInfo(userInfo)
    }
  }

  public invalidate() {
    this.localStorageService.clear()
    this._userInfo.update(() => undefined)
  }

  public isLoggedIn() {
    return this.userInfo() !== undefined;
  }

  get userInfo(): Signal<UserInfo | undefined> {
    return this._userInfo.asReadonly()
  }

  tryLoginWithStoredCredentials(): void {
    if (this.userInfo() === undefined) {
      this._userInfo.update(() => this._localStorageService.retrieveUserInfo());
    }
  }
}
