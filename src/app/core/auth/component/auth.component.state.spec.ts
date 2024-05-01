import {AuthComponentState} from "./auth.component.state";

describe("AuthComponentState", () => {
  let state: AuthComponentState;

  beforeEach(async () => {
    state = new AuthComponentState()
  })

  it('should be created', () => {
    expect(state).toBeTruthy();
  });

  it('should initialize with isLoading() false', () => {
    expect(state.isLoading()).toBeFalse()
  });

  it('should initialize with isLoginMode() true', () => {
    expect(state.isLoginMode()).toBeTrue()
  });

  it('should revert isLoading on toggleLoading()', () => {
    state.toggleLoading()
    expect(state.isLoading()).toBeTrue()
  });

  it('should revert isLoginMode on toggleLoginMode()', () => {
    state.toggleLoginMode()
    expect(state.isLoginMode()).toBeFalse()
  });

  it('should revert isLoading and revert it back on toggleLoading() two times', () => {
    state.toggleLoading()
    state.toggleLoading()
    expect(state.isLoading()).toBeFalse()
  });

  it('should reset to initial state on reset()', () => {
    state.toggleLoading()
    state.toggleLoginMode()
    state.reset()
    expect(state.isLoading()).toBeFalse()
    expect(state.isLoginMode()).toBeTrue()
  });
})
