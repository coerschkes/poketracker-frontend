import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {AddStateService} from "./add-state.service";
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
import {ValidatorsService} from "../shared/validators/validators-service";
import {PokemonInputFilterService} from '../shared/filter/pokemon-input-filter.service';

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
  styleUrl: './add.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {
  protected pokemonNameControl: FormControl<string | null>;
  protected filteredOptions: Observable<string[]>;

  @ViewChild('stepper') private stepper: MatStepper;

  constructor(protected stateService: AddStateService,
              protected responsive: ResponsiveConfigurationService,
              protected addService: AddService,
              private _pokeapiService: PokeapiService,
              private _validatorsService: ValidatorsService,
              private _pokemonInputFilterService: PokemonInputFilterService) {
    this.pokemonNameControl = new FormControl('', {
      updateOn: 'change',
      asyncValidators: [this._validatorsService.validatePokemonInput()],
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this._pokemonInputFilterService.registerPokemonInputFilter(this.pokemonNameControl.valueChanges)
    this.addService.resetCallback = () => this.pokemonNameControl.reset();
  }

  goBack() {
    this.stepper.previous();
  }

  goForward() {
    this.stepper.next();
  }

  updatePokemonState() {
    if (!this.pokemonNameControl.hasError('invalidPokemon')) {
      this.stateService.loadedPokemon = this._pokeapiService.getPokemon(this.pokemonNameControl.value!.toLowerCase().trim())
        .pipe(
          finalize(() => this.stateService.loading = false),
        );
    } else {
      this.stateService.loadedPokemon = undefined;
    }
  }
}
