import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {finalize, map, Observable, of, startWith} from "rxjs";
import {AddStateService} from "./add-state.service";
import {PokemonService} from "../shared/pokemon.service";
import {PokeapiService} from "../core/external/pokeapi/pokeapi.service";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {AddService} from "./add.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {PokemonTypeComponent} from "../shared/pokemon-type/pokemon-type.component";
import {EditionSelectorComponent} from "../shared/edition-selector/edition-selector.component";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Animations} from "../shared/animations";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    AsyncPipe,
    PokemonTypeComponent,
    EditionSelectorComponent,
    MatProgressBar,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  animations: Animations.flyInOut,
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  protected pokemonNameControl: FormControl<string | null>;
  protected filteredOptions: Observable<string[]>;

  @ViewChild('stepper') private stepper: MatStepper;

  constructor(protected stateService: AddStateService,
              protected responsive: ResponsiveConfigurationService,
              protected addService: AddService,
              private _pokemonService: PokemonService,
              private _pokeapiService: PokeapiService) {
    this.pokemonNameControl = new FormControl('', {
      updateOn: 'change',
      asyncValidators: [this.validatePokemonInput()],
    });
  }

  ngOnInit(): void {
    this.loadPokemonList()
    this.addService.resetCallback = () => this.pokemonNameControl.reset();
  }

  goBack() {
    this.stepper.previous();
  }

  goForward() {
    this.stepper.next();
  }

  private loadPokemonList() {
    this._pokemonService.lookupPokemonNames().subscribe({
      next: value => {
        this.filteredOptions = this.pokemonNameControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            if (value !== null && value.length >= 2) {
              return this._filter(value || '')
            } else {
              return []
            }
          }),
        );
        this.stateService.pokemonNames = value;
      },
    });
  }

  private validatePokemonInput(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (control.dirty) {
        this.stateService.loading = true;
        if (this.stateService.state().pokemonNames.indexOf(control.value) === -1) {
          this.stateService.loadedPokemon = undefined;
          return of({invalidPokemon: {value: control.value}});
        }
        this.stateService.loadedPokemon = this._pokeapiService.getPokemon(control.value.toLowerCase().trim())
          .pipe(
            finalize(() => this.stateService.loading = false),
          );
      }
      return of();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateService.state().pokemonNames.filter(pokemon => pokemon.toLowerCase().startsWith(filterValue));
  }
}
