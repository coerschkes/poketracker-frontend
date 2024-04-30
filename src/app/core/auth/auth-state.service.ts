import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {UserInfo} from "./user-info";

@Injectable({providedIn: "root"})
export class AuthStateService {
  private readonly _userInfo: WritableSignal<UserInfo | undefined>;

  constructor() {
    this._userInfo = signal<UserInfo | undefined>(undefined);
  }

  public authenticate(userInfo: UserInfo) {
    this._userInfo.update(() => userInfo)
  }

  public invalidate() {
    this._userInfo.update(() => undefined)
  }

  public isLoggedIn() {
    return this.userInfo() != undefined
  }

  get userInfo(): Signal<UserInfo | undefined> {
    return this._userInfo.asReadonly()
  }
}
