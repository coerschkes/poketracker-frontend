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
    MatButton
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
// todo: implement a sort of navigation from the dashboard -> auto load in pokemon name
// todo: disable button if no pokemon is selected
// todo: improve styling of the dropdown (autocomplete) -> wrong text color in light mode atm if item is selected
export class EditComponent {
  protected pokemonNameControl: FormControl<string | null>;
  protected accordion: Signal<MatAccordion> = viewChild.required(MatAccordion);
  protected filteredOptions: Observable<string[]>;

  constructor(private _poketrackerApi: PoketrackerApiService, protected _responsive: ResponsiveConfigurationService,
              protected _stateService: EditStateService, private _snackbarService: SnackbarService) {
    this._poketrackerApi = _poketrackerApi;
    this.pokemonNameControl = new FormControl('', {
      updateOn: 'change',
      asyncValidators: [this.validatePokemonInput()],
    });
  }

  ngOnInit() {
    this.loadPokemonList();
  }

  updatePokemon() {
    if (this._stateService.selectedPokemon() === undefined) {
      this._snackbarService.message = 'Form is invalid';
      this._snackbarService.colorClass = "snackbar-error";
      this._snackbarService.show();
    } else {
      this._poketrackerApi.updatePokemon(this._stateService.selectedPokemon()!).subscribe({
        next: (value: Pokemon | HttpErrorResponse) => {
          if (value instanceof HttpErrorResponse) {
            this._snackbarService.message = 'Unable to update pokemon';
            this._snackbarService.colorClass = "snackbar-error"
            this._snackbarService.show();
            console.log(value);
            return;
          } else {
            this._snackbarService.message = 'Pokemon updated successfully';
            this._snackbarService.colorClass = "snackbar-success"
            this._snackbarService.show();
            //   maybe update dashboard?
            this._stateService.reset();
            this.pokemonNameControl.reset();
          }
        }
      });
    }
  }

  private validatePokemonInput(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (this._stateService.pokemonSignal().map(pokemon => pokemon.name).indexOf(control.value) === -1) {
        this._stateService.selectedPokemon.update(() => undefined);
        return of({invalidPokemon: {value: control.value}});
      }
      this._stateService.selectedPokemon.update(() => this._stateService.pokemonSignal().find(pokemon => pokemon.name === control.value));
      return of();
    }
  }

  private loadPokemonList() {
    this._poketrackerApi.getAllPokemon().subscribe({
      next: (value: Pokemon[] | HttpErrorResponse) => {
        if (value instanceof HttpErrorResponse) {
          this._snackbarService.message = 'Unable load autocomplete pokemon list';
          this._snackbarService.colorClass = "snackbar-error"
          this._snackbarService.show();
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
