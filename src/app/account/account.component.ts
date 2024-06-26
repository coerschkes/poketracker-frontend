import {Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {AuthStateService} from "../core/auth/auth-state.service";
import {FirebaseApiService} from "../core/external/firebase/firebase-api.service";
import {AsyncPipe} from "@angular/common";
import {merge, Observable, tap} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatError} from "@angular/material/form-field";
import {AccountStateService} from "./account-state.service";
import {MatButton} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";
import {PokemonSelectorInputFilterService} from "../shared/pokemon-selector/pokemon-selector-input-filter.service";
import {PokemonSelectorValidatorService} from "../shared/pokemon-selector/pokemon-selector-validator.service";
import {PokemonSelectorComponent} from "../shared/pokemon-selector/pokemon-selector.component";
import {PokemonSelectorMode} from "../shared/pokemon-selector/pokemon-selector-mode";
import {PokeapiService} from "../core/external/pokeapi/pokeapi.service";
import {PokemonSpriteComponent} from "../shared/pokemon-sprite/pokemon-sprite.component";
import {MatCardModule} from "@angular/material/card";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../core/auth/auth.service";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatInput,
    MatLabel,
    MatCardModule,
    MatAccordion,
    MatExpansionModule,
    MatIcon,
    MatFormField,
    MatError,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatAutocompleteModule,
    PokemonSelectorComponent,
    PokemonSpriteComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  protected readonly emailForm = new FormControl('', [Validators.required, Validators.email]);
  protected readonly passwordForm = new FormControl('', [Validators.required, Validators.minLength(6)]);
  protected pokemonNameControl: FormControl<string | null>;
  protected filteredOptions: Observable<string[]>;

  constructor(protected authState: AuthStateService,
              protected firebase: FirebaseApiService,
              protected stateService: AccountStateService,
              protected responsive: ResponsiveConfigurationService,
              private _filterService: PokemonSelectorInputFilterService,
              private _validatorService: PokemonSelectorValidatorService,
              private _pokeapiService: PokeapiService,
              protected _poketrackerService: PoketrackerApiService,
              private _snackbarService: SnackbarService,
              private _authService: AuthService) {
    merge(this.emailForm.statusChanges, this.emailForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    this.pokemonNameControl = new FormControl('', {
      updateOn: 'change',
      asyncValidators: [this._validatorService.validatePokemonInput(PokemonSelectorMode.ALL)],
    });
  }

  ngOnInit(): void {
    this.firebase.lookupIdentity(this.authState.userInfo()!.idToken).pipe(
      tap(value => {
        this.stateService.identity.update(() => value)
        this.emailForm.setValue(value.email);
      })
    ).subscribe()
    this.filteredOptions = this._filterService.registerPokemonInputFilter(this.pokemonNameControl.valueChanges)
  }

  updateErrorMessage() {
    if (this.emailForm.hasError('required')) {
      this.stateService.errorMessage.set('You must enter a value');
    } else if (this.emailForm.hasError('email')) {
      this.stateService.errorMessage.set('Not a valid email');
    } else {
      this.stateService.errorMessage.set('');
    }
  }

  test() {
    this._poketrackerService.getUser().subscribe({
      next: value => {
        console.log(value)
      }
    })
  }

//   theme -> backend endpoint and table needed (or local storage? -> not needed since account is needed to access the app)

  updatePokemonState($event: string) {
    this._pokeapiService.getPokemon($event).subscribe({
      next: value => {
        this.stateService.selectedAvatar.update(() => value.spriteUrl)
      }
    })
  }

  updateAvatar() {
    this._poketrackerService.updateUser({
      userId: this.stateService.identity()!.localId,
      avatarUrl: this.stateService.selectedAvatar()
    }).subscribe({
      next: value => {
        if (value instanceof HttpErrorResponse) {
          this._snackbarService.showError('Failed to update avatar')
          console.log(value)
        } else {
          this._snackbarService.showSuccess('Avatar updated')
          this._authService.refreshUserInformation().subscribe()
        }
      }
    })
  }
}
