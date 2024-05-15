import {Injectable} from "@angular/core";
import {UserInfo} from "./user-info";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _userInfoToken = "userInfo"

  storeUserInfo(userInfo: UserInfo | undefined): void {
    if (userInfo !== undefined) {
      localStorage.setItem(this._userInfoToken, JSON.stringify(userInfo));
    } else {
      this.clear();
    }
  }

  retrieveUserInfo(): UserInfo | undefined {
    const userInfo = localStorage.getItem(this._userInfoToken);
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return undefined;
  }

  clear(): void {
    localStorage.clear();
  }
}
