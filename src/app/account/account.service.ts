import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";
import {AccountStateService} from "./account-state.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {AuthService} from "../core/auth/auth.service";
import {catchError, finalize, Observable, of, switchMap, tap} from "rxjs";
import {FirebaseApiService, SignUpResponse} from "../core/external/firebase/firebase-api.service";
import {AuthStateService} from "../core/auth/auth-state.service";
import {PokeapiService} from "../core/external/pokeapi/pokeapi.service";

@Injectable({providedIn: 'root'})
export class AccountService {

  constructor(private _poketrackerService: PoketrackerApiService,
              private _snackbarService: SnackbarService,
              private _stateService: AccountStateService,
              private _authService: AuthService,
              private _firebaseService: FirebaseApiService,
              private _authState: AuthStateService,
              private _pokeapiService: PokeapiService) {

  }

  updateEmail() {
    if (this._stateService.emailValid()) {
      this.firebaseReauthenticatedCall(
        this.buildUpdatingObservable(
          this._firebaseService.updateEmail(this._stateService.emailForm.value!, this._authState.userInfo()?.idToken!)
        )
      )
    } else {
      this._snackbarService.showError('Email is not valid or unchanged')
    }
  }

  updatePassword() {
    if (this._stateService.passwordForm.valid) {
      this.firebaseReauthenticatedCall(
        this.buildUpdatingObservable(
          this._firebaseService.updatePassword(this._stateService.passwordForm.value!, this._authState.userInfo()?.idToken!)
        )
      )
    } else {
      this._snackbarService.showError('Password is not valid')
    }
  }

  deleteAccount() {
    this._authService.basicLogin(this._stateService.identity()!.email, this._stateService.currentPassword())
      .pipe(
        switchMap(() => {
          return this._poketrackerService.deleteAllPokemon()
        }),
        switchMap(() => {
          return this._poketrackerService.deleteUser()
        }),
        switchMap(() => {
          return this._firebaseService.deleteAccount(this._authState.userInfo()!.idToken)
        }),
        catchError((err) => {
          console.log(err)
          this._snackbarService.showError('Failed to delete account. Please contact the administrator for further help.')
          return of(err)
        })
      ).subscribe({
      next: () => {
        this._snackbarService.showSuccess('Account deleted')
        this._authState.invalidate()
      }
    })
  }

  updateAvatar() {
    this._poketrackerService.updateUser({
      avatarUrl: this._stateService.selectedAvatar(),
      bulkMode: this._stateService.bulkMode()
    }).subscribe({
      next: value => {
        if (value instanceof HttpErrorResponse) {
          this._snackbarService.showError('Failed to update avatar')
          console.log(value)
        } else {
          this._snackbarService.showSuccess('Avatar updated')
          this._stateService.selectedAvatar.update(() => '')
          this._authService.refreshUserInformation().subscribe()
        }
      }
    })
  }

  updateBulkMode() {
    this._poketrackerService.updateUser({
      avatarUrl: this._authState.userInfo()!.avatarUrl,
      bulkMode: this._stateService.bulkMode()
    }).subscribe({
      next: value => {
        if (value instanceof HttpErrorResponse) {
          this._snackbarService.showError('Failed to update bulk mode')
          console.log(value)
        } else {
          this._snackbarService.showSuccess('Bulk mode updated')
          this._authService.refreshUserInformation().subscribe()
        }
      }
    })
  }

  private firebaseReauthenticatedCall(firebaseCall: Observable<any>) {
    if (this._stateService.reauthenticationCredentialsValid()) {
      this._authService.basicLogin(this._stateService.identity()!.email, this._stateService.currentPassword())
        .pipe(
          switchMap(() => firebaseCall),
          catchError((err) => {
            console.log(err)
            this._snackbarService.showError('Authentication failed. Password may be incorrect.')
            return of(err)
          }),
          finalize(() => {
            this._stateService.currentPassword.update(() => '')
          })
        )
        .subscribe()
    } else {
      this._snackbarService.showError('Please enter your current password to proceed')
    }
  }

  private buildUpdatingObservable(observable: Observable<SignUpResponse>): Observable<SignUpResponse> {
    return observable.pipe(
      tap(value => {
        this.updateUserInfo(value)
        this._stateService.refreshIdentity()
      }),
      catchError((err) => {
        this.mapFirebaseHttpErrorResponse(err)
        return of()
      })
    )
  }

  private updateUserInfo(value: SignUpResponse) {
    this._authService.updateUserInfo(value.idToken, value.refreshToken, value.expiresIn)
    this._snackbarService.showSuccess('Update successful')
  }

  private mapFirebaseHttpErrorResponse(error: any) {
    console.log(error)
    if (error instanceof HttpErrorResponse && error.error.error.message === 'EMAIL_EXISTS') {
      this._stateService.emailForm.setErrors({'emailExists': true})
      this._snackbarService.showError('Email already exists')
    } else if (error instanceof HttpErrorResponse && error.error.error.message === 'INVALID_EMAIL') {
      this._stateService.emailForm.setErrors({'email': true})
      this._snackbarService.showError('Email is invalid')
    } else {
      this._snackbarService.showError('Update failed')
    }
  }
}
