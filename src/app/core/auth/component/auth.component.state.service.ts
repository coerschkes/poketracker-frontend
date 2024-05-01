import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {StateHelper} from "../../../shared/state.helper";

@Injectable({providedIn: "root"})
export class AuthComponentStateService {
  private readonly INITIAL_VALUE_IS_LOADING: boolean = false
  private readonly INITIAL_VALUE_IS_LOGIN_MODE: boolean = true
  private readonly _isLoading: WritableSignal<boolean>;
  private readonly _isLoginMode: WritableSignal<boolean>;

  constructor() {
    this._isLoading = signal(this.INITIAL_VALUE_IS_LOADING);
    this._isLoginMode = signal(this.INITIAL_VALUE_IS_LOGIN_MODE)
  }

  switchLoading() {
    this._isLoading.update(StateHelper.revertBool())
  }

  switchLoginMode() {
    this._isLoginMode.update(StateHelper.revertBool())
  }

  reset() {
    this._isLoading.update(() => this.INITIAL_VALUE_IS_LOADING);
    this._isLoginMode.update(() => this.INITIAL_VALUE_IS_LOGIN_MODE);
  }

  get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }

  get isLoginMode(): Signal<boolean> {
    return this._isLoginMode.asReadonly();
  }
}
