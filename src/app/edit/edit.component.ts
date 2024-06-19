import {Component, signal, WritableSignal} from '@angular/core';
import {EditionSelectorComponent} from "../create-tracker-set/edition-selector/edition-selector.component";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {PokemonCardComponent} from "../create-tracker-set/pokemon-card/pokemon-card.component";
import {PokemonCardContentComponent} from "../create-tracker-set/pokemon-card-content/pokemon-card-content.component";
import {AbstractControl, AsyncValidatorFn, FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {map, Observable, of, startWith} from "rxjs";
import {Pokemon} from "../core/external/poketracker/poketracker-api";
import {HttpErrorResponse} from "@angular/common/http";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    EditionSelectorComponent,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressBar,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    PokemonCardComponent,
    PokemonCardContentComponent,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe,
    MatOption
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  private _poketrackerApi: any;
  pokemonNameControl: FormControl<string | null>;
  optionsSignal: WritableSignal<string[]> = signal([]);
  filteredOptions: Observable<string[]>;

  constructor(_poketrackerApi: PoketrackerApiService) {
    this._poketrackerApi = _poketrackerApi;
    this.pokemonNameControl = new FormControl('', {
      updateOn: 'change',
      asyncValidators: [this.validatePokemonInput()],
    });
  }

  ngOnInit() {
    this.loadAutocompleteList();
    this.filteredOptions = this.pokemonNameControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private validatePokemonInput(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (this.optionsSignal().indexOf(control.value) === -1) {
        return of({invalidPokemon: {value: control.value}});
      }
      return of();
    }
  }

  private loadAutocompleteList() {
    this._poketrackerApi.getAllPokemon().subscribe({
      next: (value: Pokemon[]) => {
        value.sort((a, b) => a.dex - b.dex);
        this.optionsSignal.update(() => value.map(pokemon => pokemon.name));
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsSignal().filter(option => option.toLowerCase().includes(filterValue));
  }
}
