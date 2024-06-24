import {ChangeDetectionStrategy, Component, Signal, viewChild, ViewEncapsulation} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {AbstractControl, AsyncValidatorFn, FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {map, Observable, of, startWith} from "rxjs";
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
export class EditComponent {
  protected pokemonNameControl: FormControl<string | null>;
  protected accordion: Signal<MatAccordion> = viewChild.required(MatAccordion);
  protected filteredOptions: Observable<string[]>;

  constructor(private _poketrackerApi: PoketrackerApiService,
              protected _responsive: ResponsiveConfigurationService,
              protected _stateService: EditStateService,
              private _snackbarService: SnackbarService,
              private _router: Router) {
    this._poketrackerApi = _poketrackerApi;
    this.pokemonNameControl = new FormControl('', {
      updateOn: 'change',
      asyncValidators: [this.validatePokemonInput()],
    });
  }

  ngOnInit() {
    this.loadPokemonList();
    if (this._stateService.hasSelectedPokemon()) {
      this.pokemonNameControl.setValue(this._stateService.selectedPokemon()!.name);
    }
  }

  updatePokemon() {
    if (!this._stateService.hasSelectedPokemon()) {
      this._snackbarService.showError('Form is invalid');
    } else {
      this._poketrackerApi.updatePokemon(this._stateService.selectedPokemon()!).subscribe({
        next: (value: Pokemon | HttpErrorResponse) => {
          if (value instanceof HttpErrorResponse) {
            this._snackbarService.showError('Unable to update pokemon');
            console.log(value);
            return;
          } else {
            this._snackbarService.showSuccess('Pokemon ' + value.name + ' updated successfully');
            this._stateService.reset();
            this.pokemonNameControl.reset();
            this._router.navigate(['/dashboard']);
          }
        }
      });
    }
  }

  private validatePokemonInput(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (control.dirty) {
        if (this._stateService.pokemonSignal().map(pokemon => pokemon.name).indexOf(control.value) === -1) {
          this._stateService.selectedPokemon.update(() => undefined);
          return of({invalidPokemon: {value: control.value}});
        }
        this._stateService.selectedPokemon.update(() => this._stateService.pokemonSignal().find(pokemon => pokemon.name === control.value));
      }
      return of();
    }
  }

  private loadPokemonList() {
    this._poketrackerApi.getAllPokemon().subscribe({
      next: (value: Pokemon[] | HttpErrorResponse) => {
        if (value instanceof HttpErrorResponse) {
          this._snackbarService.showError('Unable load autocomplete pokemon list');
          console.log(value);
          return;
        }
        value.sort((a, b) => a.dex - b.dex);
        this._stateService.pokemonSignal.update(() => value);
        this.filteredOptions = this.pokemonNameControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this._stateService.pokemonSignal().map(pokemon => pokemon.name).filter(pokemon => pokemon.toLowerCase().includes(filterValue));
  }
}
