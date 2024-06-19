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
export class EditComponent {
  private _poketrackerApi: any;
  protected pokemonNameControl: FormControl<string | null>;
  protected accordion: Signal<MatAccordion> = viewChild.required(MatAccordion);
  protected filteredOptions: Observable<string[]>;

  constructor(_poketrackerApi: PoketrackerApiService, protected _responsive: ResponsiveConfigurationService, protected _stateService: EditStateService) {
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
    // todo: save to server
    this._stateService.reset();
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
      next: (value: Pokemon[]) => {
        value.sort((a, b) => a.dex - b.dex);
        this._stateService.pokemonSignal.update(() => value);
        this.filteredOptions = this.pokemonNameControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this._stateService.pokemonSignal().map(pokemon => pokemon.name).filter(pokemon => pokemon.toLowerCase().includes(filterValue));
  }
}
