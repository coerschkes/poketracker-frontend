import {AuthService} from "./auth.service";
import {TestBed} from "@angular/core/testing";
import {AuthStateService} from "./auth-state.service";
import {FirebaseApiService} from "../external/firebase/firebase-api.service";
import {Observable} from "rxjs";
import {TestConstants, TestObjectProvider} from "../../util/test-object-provider.spec";

describe('AuthService', () => {
  let service: AuthService;
  let mockFirebaseApiService: any;
  let mockAuthStateService: any;

  beforeEach(async () => {
    mockFirebaseApiService = jasmine.createSpyObj('firebaseApiService', ['signUp', 'basicLogin', 'refreshToken']);
    mockAuthStateService = jasmine.createSpyObj('firebaseApiService', ['authenticate', 'buildUserInfo']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AuthStateService, useValue: mockAuthStateService},
        {provide: FirebaseApiService, useValue: mockFirebaseApiService}
      ]
    });

    service = TestBed.inject(AuthService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call authenticate if signUp call to firebase api is successful', () => {
    const expectedSignUpResponse = TestObjectProvider.signUpResponse()
    mockFirebaseApiService.signUp.and.returnValue(new Observable(subscriber => subscriber.next(expectedSignUpResponse)))

    service.signUp(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
      .subscribe(value => {
        expect(value).toEqual(expectedSignUpResponse)
        expect(mockFirebaseApiService.signUp).toHaveBeenCalled()
        expect(mockAuthStateService.authenticate).toHaveBeenCalledWith(jasmine.objectContaining({
          idToken: value.idToken,
          email: value.email,
          refreshToken: value.refreshToken,
          expiresIn: value.expiresInSeconds
        }))
      })
  })

  it('should not call authenticate if signUp call to firebase throws error', () => {
    mockFirebaseApiService.signUp.and.throwError(new Error())

    expect(() => service.signUp(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)).toThrow(new Error())
    expect(mockFirebaseApiService.signUp).toHaveBeenCalled()
    expect(mockAuthStateService.authenticate).not.toHaveBeenCalled()
  })

  it('should call authenticate if basicLogin call to firebase api is successful', () => {
    const expectedLoginResponse = TestObjectProvider.basicLoginResponse()
    mockFirebaseApiService.basicLogin.and.returnValue(new Observable(subscriber => subscriber.next(expectedLoginResponse)))

    service.basicLogin(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
      .subscribe(value => {
        expect(value).toEqual(expectedLoginResponse)
        expect(mockFirebaseApiService.basicLogin).toHaveBeenCalled()
        expect(mockAuthStateService.authenticate).toHaveBeenCalledWith(jasmine.objectContaining({
          idToken: value.idToken,
          email: value.email,
          refreshToken: value.refreshToken,
          expiresIn: value.expiresInSeconds
        }))
      })
  })

  it('should not call authenticate if basicLogin call to firebase throws error', () => {
    mockFirebaseApiService.basicLogin.and.throwError(new Error())

    expect(() => service.basicLogin(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)).toThrow(new Error())
    expect(mockFirebaseApiService.basicLogin).toHaveBeenCalled()
    expect(mockAuthStateService.authenticate).not.toHaveBeenCalled()
  })
});
