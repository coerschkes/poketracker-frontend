import {Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {AuthStateService} from "../core/auth/auth-state.service";
import {FirebaseApiService} from "../core/external/firebase/firebase-api.service";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {AuthService} from "../core/auth/auth.service";
import {DialogService} from "../shared/dialog.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {AccountService} from "./account.service";
import {
  PasswordConfirmationDialog
} from "../shared/password-confirmation-dialog/password-confirmation-dialog.component";

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
    PokemonSpriteComponent,
    MatSlideToggle
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
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
              private _authService: AuthService,
              private dialogService: DialogService,
              protected accountService: AccountService) {
    this.pokemonNameControl = new FormControl('', {
      updateOn: 'change',
      asyncValidators: [this._validatorService.validatePokemonInput(PokemonSelectorMode.ALL)],
    });
  }

  ngOnInit(): void {
    this.stateService.bulkMode.update(() => this.authState.userInfo()?.bulkMode || false)
    this.filteredOptions = this._filterService.registerPokemonInputFilter(this.pokemonNameControl.valueChanges)
  }

  onDeleteAccount() {
    this.dialogService.openDialog<PasswordConfirmationDialog>(this.createPasswordConfirmationDialog('Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      () => {
        this.accountService.deleteAccount()
      }))
  }

  onUpdateEmail() {
    this.dialogService.openDialog<PasswordConfirmationDialog>(this.createPasswordConfirmationDialog('Change Email',
      'To confirm the change of your email, please enter your current password:',
      () => {
        this.accountService.updateEmail()
      }))
  }

  onUpdatePassword() {
    this.dialogService.openDialog<PasswordConfirmationDialog>(this.createPasswordConfirmationDialog('Change Email',
      'To confirm the change of your password, please enter your current password:',
      () => {
        this.accountService.updatePassword()
      }))
  }

  private createPasswordConfirmationDialog(title: string, content: string, callback: () => void) {
    return new PasswordConfirmationDialog(
      title,
      content + "\n\nPlease enter your current password to confirm the action:",
      (passwordEntered: string) => {
        this.stateService.currentPassword.update(() => passwordEntered)
        callback()
      }
    );
  }
}
