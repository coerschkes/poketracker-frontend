import {Component, ViewChild} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {AddStateService} from "./add-state.service";
import {PokeapiService} from "../core/external/pokeapi/pokeapi.service";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {AddService} from "./add.service";
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
import {PokemonSelectorValidatorService} from "../shared/pokemon-selector/pokemon-selector-validator.service";
import {PokemonSelectorComponent,} from "../shared/pokemon-selector/pokemon-selector.component";
import {PokemonSelectorMode} from "../shared/pokemon-selector/pokemon-selector-mode";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatStepperModule,
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
    PokemonSelectorComponent,
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
export class AddComponent {
  protected readonly mode = PokemonSelectorMode.ALL;
  protected filteredOptions: Observable<string[]>;
  @ViewChild('stepper') private stepper: MatStepper;

  constructor(protected stateService: AddStateService,
              protected responsive: ResponsiveConfigurationService,
              protected addService: AddService,
              private _pokeapiService: PokeapiService,
              private _validatorsService: PokemonSelectorValidatorService) {
  }

  goBack() {
    this.stepper.previous();
  }

  goForward() {
    this.stepper.next();
  }

  updatePokemonState(value: string) {
    if (this.stepper !== undefined) {
      this.stateService.reset();
      this.stepper.reset();
    }
    this.stateService.loadedPokemon = this._pokeapiService.getPokemon(value)
      .pipe(
        finalize(() => this.stateService.loading = false),
      );
  }

  onChange() {
    this.stateService.loadedPokemon = undefined;
    this.stateService.loading = true;
  }
}
