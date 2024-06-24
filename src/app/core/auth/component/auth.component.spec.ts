// noinspection TypeScriptValidateTypes

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthComponent} from "./auth.component";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

let component: AuthComponent;
let fixture: ComponentFixture<AuthComponent>;
let httpClient: HttpClient;
let httpTestingController: HttpTestingController;
let mockAuthService: any;
let mockRouter: any;

// describe('AuthComponent', () => {
//
//   beforeEach(async () => {
//     await configureTestBed()
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('onSwitchMode() should switch loginMode in AuthComponentStateService', () => {
  //   expect(component.loginMode()).toBeTrue()
  //   component.onSwitchMode()
  //   expect(component.loginMode()).toBeFalse()
  //   component.onSwitchMode()
  //   expect(component.loginMode()).toBeTrue()
  // });
  //
  // it('should call basicLogin on authService on basicLogin() with email and password', () => {
  //   mockAuthService.basicLogin.and.returnValue(mockLoginResponse())
  //   component.basicLogin(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  //   expect(mockAuthService.basicLogin).toHaveBeenCalledWith(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  // });
  //
  // it('should call signUp on authService on signUp() with email and password', () => {
  //   mockAuthService.signUp.and.returnValue(mockSignUpResponse())
  //   component.signUp(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  //   expect(mockAuthService.signUp).toHaveBeenCalledWith(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  // });
  //
  // it('should redirect to dashboard if basicLogin() with email and password is successful', () => {
  //   mockAuthService.basicLogin.and.returnValue(mockLoginResponse())
  //   component.basicLogin(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard'])
  // });

  // it('should switch to login mode if signUp() with email and password is successful', () => {
  //   mockAuthService.signUp.and.returnValue(mockSignUpResponse())
  //   component.signUp(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  //   expect(component.loginMode()).toBeTrue()
  //   expect(mockRouter.navigate).not.toHaveBeenCalledWith(['/dashboard'])
  // });

  // it('should reset the auth component state if the authForm is valid and the signup is successful', () => {
  //   mockAuthService.signUp.and.returnValue(mockSignUpResponse())
  //   const form = new NgForm([], []);
  //   component.onSubmit(form)
  //   expect(stateService.authForm()).toBeUndefined();
  // })

  // it('should reset login form and auth component state if the loginForm is valid and the basicLogin is successful', () => {
  //   component.onSwitchMode()
  //   mockAuthService.basicLogin.and.returnValue(mockSignUpResponse())
  //   component.onSubmitLogin();
  //   const form = new NgForm([], []);
  //   component.onSubmit(form)
  //   expect(stateService.authForm()).toBeUndefined();
  // })
  //
  // it('should not reset the state service if the authForm is valid but the signup is not successful', () => {
  //   mockAuthService.signUp.and.returnValue(throwError(() => 'test'))
  //   const form = new NgForm([], []);
  //   component.onSubmit(form)
  //   expect(stateService.authForm()).toEqual(form)
  // });
  //
  // it('should not reset the state service if the authForm is valid but the basicLogin is not successful', () => {
  //   stateService.switchLoginMode()
  //   mockAuthService.basicLogin.and.returnValue(throwError(() => 'test'))
  //   const form = new NgForm([], []);
  //   component.onSubmit(form)
  //   expect(stateService.authForm()).toEqual(form)
  // });
  //
  // it('should not interact with the auth service if the authForm is not valid', () => {
  //   mockAuthService.signUp.and.returnValue(throwError(() => 'test'))
  //   const form = new NgForm([], [])
  //   form.control.setErrors({'incorrect': true})
  //   component.onSubmit(form)
  //   expect(mockAuthService.signUp).not.toHaveBeenCalled()
  // })
  //
  // it('should switch the loading state when calling the auth service in signUp()', async () => {
  //   TestBed.resetTestingModule()
  //   stateService = jasmine.createSpyObj('authComponentStateService', ['switchLoading', 'isLoginMode', 'reset'])
  //   await configureTestBed({provide: AuthComponentStateService, useValue: stateService})
  //
  //   stateService.isLoginMode.and.returnValue(false)
  //   mockAuthService.signUp.and.returnValue(mockSignUpResponse())
  //   const form = new NgForm([], []);
  //   component.onSubmit(form)
  //   expect(stateService.switchLoading).toHaveBeenCalledTimes(2)
  // });
  //
  // it('should switch the loading state when calling the auth service in signUp() with err', async () => {
  //   TestBed.resetTestingModule()
  //   stateService = jasmine.createSpyObj('authComponentStateService', ['switchLoading', 'isLoginMode', 'reset'])
  //   await configureTestBed({provide: AuthComponentStateService, useValue: stateService})
  //
  //   stateService.isLoginMode.and.returnValue(false)
  //   mockAuthService.signUp.and.returnValue(throwError(() => 'test'))
  //   const form = new NgForm([], []);
  //   component.onSubmit(form)
  //   expect(stateService.switchLoading).toHaveBeenCalledTimes(2)
  //   expect(stateService.reset).not.toHaveBeenCalled()
  // })
  //
  // it('should switch the loading state when calling the auth service in basicLogin() via onSubmit()', async () => {
  //   TestBed.resetTestingModule()
  //   stateService = jasmine.createSpyObj('authComponentStateService', ['switchLoading', 'isLoginMode', 'reset'])
  //   await configureTestBed({provide: AuthComponentStateService, useValue: stateService})
  //
  //   stateService.isLoginMode.and.returnValue(true)
  //   mockAuthService.basicLogin.and.returnValue(mockSignUpResponse())
  //   const form = new NgForm([], []);
  //   component.onSubmit(form)
  //   expect(stateService.switchLoading).toHaveBeenCalledTimes(2)
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard'])
  // });
  //
  // it('should switch the loading state when calling the auth service in basicLogin() via onSubmit() with err', async () => {
  //   TestBed.resetTestingModule()
  //   stateService = jasmine.createSpyObj('authComponentStateService', ['switchLoading', 'isLoginMode', 'reset'])
  //   await configureTestBed({provide: AuthComponentStateService, useValue: stateService})
  //
  //   stateService.isLoginMode.and.returnValue(true)
  //   mockAuthService.basicLogin.and.returnValue(throwError(() => 'test'))
  //   const form = new NgForm([], []);
  //   component.onSubmit(form)
  //   expect(stateService.switchLoading).toHaveBeenCalledTimes(2)
  //   expect(stateService.reset).not.toHaveBeenCalled()
  // })
// });

async function configureTestBed(stateServiceProvider?: any) {
  mockAuthService = jasmine.createSpyObj('authService', ['basicLogin', 'signUp']);
  mockRouter = jasmine.createSpyObj('router', ['navigate'])
  let providers: any[] = [
    {provide: AuthService, useValue: mockAuthService},
    {provide: Router, useValue: mockRouter}
  ]
  if (stateServiceProvider !== undefined) {
    providers.push(stateServiceProvider)
  }
  await TestBed.configureTestingModule({
    providers: providers,
    imports: [AuthComponent, HttpClientTestingModule, NoopAnimationsModule]
  })
    .compileComponents();

  fixture = TestBed.createComponent(AuthComponent);
  component = fixture.componentInstance;
  httpClient = TestBed.inject(HttpClient);
  httpTestingController = TestBed.inject(HttpTestingController);
  fixture.detectChanges();
}
//
// function mockLoginResponse(): Observable<BasicLoginResponse> {
//   return new Observable<BasicLoginResponse>(subscriber => subscriber.next(TestObjectProvider.basicLoginResponse()));
// }
//
// function mockSignUpResponse(): Observable<SignUpResponse> {
//   return new Observable<SignUpResponse>(subscriber => subscriber.next(TestObjectProvider.signUpResponse()))
// }
