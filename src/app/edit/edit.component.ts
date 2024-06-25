import {ChangeDetectionStrategy, Component, OnInit, Signal, viewChild, ViewEncapsulation} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {Pokemon} from "../core/external/poketracker/poketracker-api";
import {HttpErrorResponse} from "@angular/common/http";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";
import {MatAccordion} from "@angular/material/expansion";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";
import {EditAccordionComponent} from "./edit-accordion/edit-accordion.component";
import {MatInput} from "@angular/material/input";
import {EditStateService} from "./edit-state.service";
import {MatButton} from "@angular/material/button";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {Router} from "@angular/router";
import {PokemonTypeComponent} from "../shared/pokemon-type/pokemon-type.component";
import {Animations} from "../shared/animations";
import {ValidatorsService} from "../shared/validators/validators-service";
import {PokemonInputFilterService} from "../shared/filter/pokemon-input-filter.service";
import {PokemonService} from "../shared/pokemon.service";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatLabel,
    MatOption,
    AsyncPipe,
    EditAccordionComponent,
    MatInput,
    MatButton,
    PokemonTypeComponent
  ],
  animations: Animations.flyInOut,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class EditComponent implements OnInit{
  protected pokemonNameControl: FormControl<string | null>;
  protected accordion: Signal<MatAccordion> = viewChild.required(MatAccordion);
  protected filteredOptions: Observable<string[]>;

  constructor(private _poketrackerApi: PoketrackerApiService,
              protected responsive: ResponsiveConfigurationService,
              protected stateService: EditStateService,
              private _snackbarService: SnackbarService,
              private _router: Router,
              private _validatorsService: ValidatorsService,
              private _pokemonInputFilterService: PokemonInputFilterService,
              private _pokemonService: PokemonService) {
    this._poketrackerApi = _poketrackerApi;
    this.pokemonNameControl = new FormControl('', {
      updateOn: 'change',
      asyncValidators: [_validatorsService.validatePokemonInput()],
    });
  }

  ngOnInit() {
    this.filteredOptions = this._pokemonInputFilterService.registerPokemonInputFilterWithPokemonList(this.pokemonNameControl.valueChanges,);
    if (this.stateService.hasSelectedPokemon()) {
      this.pokemonNameControl.setValue(this.stateService.selectedPokemon()!.name);
    }
  }

  updatePokemonState() {
    if (!this.pokemonNameControl.hasError('invalidPokemon')) {
      this.stateService.selectedPokemon.update(() => this._pokemonService.searchPersonalizedPokemon(this.pokemonNameControl.value!))
    } else {
      this.stateService.selectedPokemon.update(() => undefined);
    }
  }

  updatePokemon() {
    if (!this.stateService.hasSelectedPokemon()) {
      this._snackbarService.showError('Form is invalid');
    } else {
      this._poketrackerApi.updatePokemon(this.stateService.selectedPokemon()!).subscribe({
        next: (value: Pokemon | HttpErrorResponse) => {
          if (value instanceof HttpErrorResponse) {
            this._snackbarService.showError('Unable to update pokemon');
            console.log(value);
            return;
          } else {
            this._snackbarService.showSuccess('Pokemon ' + value.name + ' updated successfully');
            this.stateService.reset();
            this.pokemonNameControl.reset();
            this._router.navigate(['/dashboard']);
          }
        }
      });
    }
  }
}
