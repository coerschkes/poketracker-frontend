import {Injectable, signal, WritableSignal} from "@angular/core";
import {FirebaseApiService, IdentityResponse} from "../core/external/firebase/firebase-api.service";
import {FormControl, Validators} from "@angular/forms";
import {PokeapiService} from "../core/external/pokeapi/pokeapi.service";
import {merge, tap} from "rxjs";
import {AuthStateService} from "../core/auth/auth-state.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({providedIn: 'root'})
export class AccountStateService {
  readonly emailForm = new FormControl('', [Validators.required, Validators.email]);
  readonly passwordForm = new FormControl('', [Validators.required, Validators.minLength(6)]);
  identity: WritableSignal<IdentityResponse | undefined> = signal(undefined);
  errorMessage: WritableSignal<string> = signal('');
  selectedAvatar: WritableSignal<string> = signal('');
  bulkMode: WritableSignal<boolean> = signal(false);
  currentPassword: WritableSignal<string> = signal('');

  constructor(private _pokeapiService: PokeapiService,
              private _firebaseService: FirebaseApiService,
              private _authState: AuthStateService) {
    this.init();
  }

  init() {
    this.identity.update(() => undefined)
    this.errorMessage.update(() => '')
    this.selectedAvatar.update(() => '')
    this.bulkMode.update(() => false)
    this.currentPassword.update(() => '')
    this.refreshIdentity()
    merge(this.emailForm.statusChanges, this.emailForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  toggleBulkMode() {
    this.bulkMode.update((bulkMode) => !bulkMode)
  }

  updatePokemonState($event: string) {
    this._pokeapiService.getPokemon($event).subscribe({
      next: value => {
        this.selectedAvatar.update(() => value.spriteUrl)
      }
    })
  }

  refreshIdentity() {
    this._firebaseService.lookupIdentity(this._authState.userInfo()!.idToken).pipe(
      tap(value => {
        this.identity.update(() => value)
      })
    ).subscribe({
      next: () => {
        this.updateEmailFormValue()
      },
      error: error => {
        console.log(error)
      }
    })
  }

  updateErrorMessage() {
    if (this.emailForm.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.emailForm.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else if (this.emailForm.hasError('emailExists')) {
      this.errorMessage.set('Email already exists');
    } else {
      this.errorMessage.set('');
    }
  }

  identityValid(): boolean {
    return this.identity() !== undefined
  }

  reauthenticationCredentialsValid(): boolean {
    return this.currentPassword() !== '' && this.identityValid() && this.identity()!.email !== ''
  }

  emailValid(): boolean {
    return this.identityValid() &&
      this.emailForm.valid &&
      this.identity()!.email !== this.emailForm.value!
  }

  passwordFormDisabled(): boolean {
    return this.passwordForm.invalid || !this.passwordForm.dirty
  }

  emailFormDisabled(): boolean {
    return this.emailForm.invalid || !this.emailForm.dirty || this.identity() === undefined || this.emailForm.value! === this.identity()!.email
  }

  private updateEmailFormValue() {
    this.emailForm.setValue(this.identity()!.email)
  }

}
