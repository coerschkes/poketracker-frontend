import {AuthStateService} from "./auth-state.service";
import {UserInfo} from "./user-info";
import {TestObjectProvider} from "../../util/test-object-provider.spec";
import {LocalStorageService} from "../../shared/localStorage.service";

describe('AuthStateService', () => {
  it('isLoggedIn should return false as initial value', () => {
    const service = new AuthStateService(new LocalStorageService());

    expect(service.isLoggedIn()).toBeFalse()
  });

  it('isLoggedIn should return true if user is authenticated', () => {
    const userInfo: UserInfo = TestObjectProvider.userInfo()
    const service = new AuthStateService(new LocalStorageService());
    service.authenticate(userInfo)

    expect(service.isLoggedIn()).toBeTrue()
  });

  it('isLoggedIn should return false if user is invalidated after being logged in', () => {
    const userInfo: UserInfo = TestObjectProvider.userInfo()
    const service = new AuthStateService(new LocalStorageService());
    service.authenticate(userInfo)
    service.invalidate()

    expect(service.isLoggedIn()).toBeFalse()
  });

  it('userInfo should return undefined as initial value', () => {
    const service = new AuthStateService(new LocalStorageService());

    expect(service.userInfo()).toBeUndefined()
  });

  it('userInfo should return userInfo if user is authenticated', () => {
    const userInfo: UserInfo = TestObjectProvider.userInfo()
    const service = new AuthStateService(new LocalStorageService());
    service.authenticate(userInfo)

    expect(service.userInfo()).toEqual(userInfo)
  });

  it('authenticate should update userInfo with given value', () => {
    const firstUserInfo: UserInfo = TestObjectProvider.userInfo()
    const secondUserInfo: UserInfo = TestObjectProvider.userInfoWithEmail("another@email.com")
    const service = new AuthStateService(new LocalStorageService());
    service.authenticate(firstUserInfo)
    service.authenticate(secondUserInfo)

    expect(service.userInfo()).toEqual(secondUserInfo)
  });

});
