import {Injectable} from "@angular/core";
import {UserInfo} from "../core/auth/user-info";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _userInfoToken = "userInfo"

  storeUserInfo(userInfo: UserInfo | undefined): void {
    if (userInfo !== undefined) {
      localStorage.setItem(this._userInfoToken, JSON.stringify(userInfo));
    } else {
      this.clearUser();
    }
  }

  retrieveUserInfo(): UserInfo | undefined {
    const userInfo = localStorage.getItem(this._userInfoToken);
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return undefined;
  }

  clearUser(){
    localStorage.removeItem(this._userInfoToken)
  }

  clear(): void {
    localStorage.clear();
  }
}
