import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Signal,
  ViewChild,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
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
import {PokemonService} from "../shared/pokemon.service";
import {PokemonSelectorMode} from "../shared/pokemon-selector/pokemon-selector-mode";
import {PokemonSelectorComponent} from "../shared/pokemon-selector/pokemon-selector.component";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PokemonSpriteComponent} from "../shared/pokemon-sprite/pokemon-sprite.component";


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
    PokemonTypeComponent,
    PokemonSelectorComponent,
    MatProgressBar,
    PokemonSpriteComponent
  ],
  animations: Animations.flyInOut,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class EditComponent implements AfterViewInit {
  protected accordion: Signal<MatAccordion> = viewChild.required(MatAccordion);
  protected readonly mode = PokemonSelectorMode.PERSONALIZED;
  @ViewChild('selector') private selector: PokemonSelectorComponent;

  constructor(private _poketrackerApi: PoketrackerApiService,
              protected responsive: ResponsiveConfigurationService,
              protected stateService: EditStateService,
              private _snackbarService: SnackbarService,
              private _router: Router,
              private _pokemonService: PokemonService) {
    this._poketrackerApi = _poketrackerApi;
  }

  ngAfterViewInit() {
    if (this.stateService.hasSelectedPokemon) {
      this.selector.value = this.stateService.selectedPokemon()!.name;
    }
  }

  updatePokemonState(value: string) {
    this.stateService.selectedPokemon.update(() => this._pokemonService.searchPersonalizedPokemon(value));
    this.stateService.loading = false;
  }

  onChange() {
    this.stateService.selectedPokemon.update(() => undefined);
    this.stateService.loading = true;
  }

  updatePokemon() {
    if (!this.stateService.hasSelectedPokemon) {
      this._snackbarService.showError('Form is invalid');
    } else {
      this._poketrackerApi.updatePokemon(this.stateService.selectedPokemon()!).subscribe({
        next: (value: Pokemon | HttpErrorResponse) => {
          if (value instanceof HttpErrorResponse) {
            this._snackbarService.showError('Unable to update pokemon');
            return;
          } else {
            this._snackbarService.showSuccess('Pokemon ' + value.name + ' updated successfully');
            this.selector.reset()
            this.stateService.selectedPokemon.update(() => undefined);
            this._router.navigate(['/dashboard']);
          }
        }
      });
    }
  }
}
