import {Injectable} from "@angular/core";
import {UserInfo} from "../core/auth/user-info";

export interface UserPreferences {
  theme: string
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _userInfoToken = "userInfo"
  private readonly _userPreferences = "userPreferences"

  storeUserPreferences(preferences: UserPreferences) {
    this.store(preferences, this._userPreferences, this.clearUserPreferences)
  }

  retrieveUserPreferences() {
    return this.retrieve(this._userPreferences)
  }

  storeUserInfo(userInfo: UserInfo | undefined): void {
    this.store(userInfo, this._userInfoToken, this.clearUser)
  }

  retrieveUserInfo(): UserInfo | undefined {
    return this.retrieve(this._userInfoToken)
  }

  clearUser() {
    localStorage.removeItem(this._userInfoToken)
  }

  clearUserPreferences() {
    localStorage.removeItem(this._userPreferences)
  }

  clear(): void {
    localStorage.clear();
  }

  private store(object: any, key: string, undefinedCallback: () => void) {
    if (object !== undefined) {
      localStorage.setItem(key, JSON.stringify(object))
    } else {
      undefinedCallback()
    }
  }

  private retrieve(key: string) {
    const object = localStorage.getItem(key)
    if (object) {
      return JSON.parse(object)
    }
    return undefined
  }
}
