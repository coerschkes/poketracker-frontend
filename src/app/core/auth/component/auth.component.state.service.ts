import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {StateHelper} from "../../../shared/state.helper";
import {NgForm} from "@angular/forms";

@Injectable({providedIn: "root"})
export class AuthComponentStateService {
  private readonly INITIAL_VALUE_IS_LOADING: boolean = false
  private readonly INITIAL_VALUE_IS_LOGIN_MODE: boolean = false
  private readonly _isLoading: WritableSignal<boolean>;
  private readonly _isLoginMode: WritableSignal<boolean>;
  private readonly _authForm: WritableSignal<NgForm | undefined>

  constructor() {
    this._isLoading = signal(this.INITIAL_VALUE_IS_LOADING);
    this._isLoginMode = signal(this.INITIAL_VALUE_IS_LOGIN_MODE)
    this._authForm = signal(undefined)
  }

  switchLoading() {
    this._isLoading.update(StateHelper.revertBool())
  }

  switchLoginMode() {
    this._isLoginMode.update(StateHelper.revertBool())
  }

  set authForm(authForm: NgForm){
    this._authForm.update(() => authForm)
  }

  reset() {
    this._isLoading.update(() => this.INITIAL_VALUE_IS_LOADING);
    this._isLoginMode.update(() => this.INITIAL_VALUE_IS_LOGIN_MODE);
    this._authForm.update(() => undefined);
  }

  get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }

  get isLoginMode(): Signal<boolean> {
    return this._isLoginMode.asReadonly();
  }

  get authForm(): Signal<NgForm | undefined> {
    return this._authForm.asReadonly();
  }
}
