import {AuthComponentStateService} from "./auth.component.state.service";
import {TestBed} from "@angular/core/testing";
import {NgForm} from "@angular/forms";


describe("AuthComponentStateService", () => {
  let service: AuthComponentStateService;

  beforeEach(async () => {
    service = TestBed.inject(AuthComponentStateService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with isLoading() false', () => {
    expect(service.isLoading()).toBeFalse()
  });

  it('should initialize with isLoginMode() false', () => {
    expect(service.isLoginMode()).toBeFalse()
  });

  it('should initialize with authForm() undefined', () =>{
    expect(service.authForm()).toBeUndefined()
  })

  it('should revert isLoading on switchLoading()', () => {
    service.switchLoading()
    expect(service.isLoading()).toBeTrue()
  });

  it('should revert isLoginMode on switchLoginMode()', () => {
    service.switchLoginMode()
    expect(service.isLoginMode()).toBeTrue()
  });

  it('should revert isLoading and revert it back on switchLoading() two times', () => {
    service.switchLoading()
    service.switchLoading()
    expect(service.isLoading()).toBeFalse()
  });

  it('should reset to initial state on reset()', () => {
    service.switchLoading()
    service.switchLoginMode()
    service.authForm = new NgForm([], []);
    service.reset()
    expect(service.isLoading()).toBeFalse()
    expect(service.isLoginMode()).toBeFalse()
    expect(service.authForm()).toBeUndefined()
  });
})
