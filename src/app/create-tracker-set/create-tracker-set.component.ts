import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AsyncPipe, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PokeapiService} from "../core/external/pokeapi/pokeapi.service";
import {catchError, finalize, map, Observable, of, switchMap, tap} from "rxjs";
import {CreateStateService} from "./create-state.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {PokemonTypeComponent} from "../shared/pokemon-type/pokemon-type.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {EditionSelectorComponent} from "./edition-selector/edition-selector.component";
import {PokemonCardComponent} from "./pokemon-card/pokemon-card.component";
import {Pokemon} from "../core/external/poketracker/poketracker-api";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {PokemonTypeService} from "../shared/pokemon-type/pokemon-type.service";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {PokemonCardContentComponent} from "./pokemon-card-content/pokemon-card-content.component";

@Component({
  selector: 'app-create-tracker-set',
  standalone: true,
  imports: [
    AsyncPipe,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    MatLabel,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatCardActions,
    MatCardFooter,
    MatProgressBar,
    MatError,
    MatStepLabel,
    NgOptimizedImage,
    MatGridList,
    MatGridTile,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    TitleCasePipe,
    PokemonTypeComponent,
    MatSlideToggleModule,
    MatCheckbox,
    FormsModule,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    MatChipInput,
    EditionSelectorComponent,
    PokemonCardComponent,
    MatChipRemove,
    PokemonCardContentComponent
  ],
  templateUrl: './create-tracker-set.component.html',
  styleUrl: './create-tracker-set.component.scss',
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({height: 0, opacity: 0}),
            animate('500ms ease-out',
              style({height: '100%', opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({height: '100%', opacity: 1}),
            animate('500ms ease-in',
              style({height: 0, opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class CreateTrackerSetComponent {
  @ViewChild('pokemonName') input: ElementRef<HTMLInputElement>;
  pokemonNameFormGroup = this._formBuilder.group({
    pokemonName: ['', Validators.required, this.pokemonNotFoundValidator()],
  }, {updateOn: "blur"});

  constructor(private _formBuilder: FormBuilder,
              private _pokeapi: PokeapiService,
              private _poketrackerApi: PoketrackerApiService,
              private _snackbarService: SnackbarService,
              private _pokemonTypeService: PokemonTypeService,
              protected _stateService: CreateStateService,
              protected _responsiveConfigurationService: ResponsiveConfigurationService) {
  }

  loadPokemon() {
    if (this.pokemonNameFormGroup.controls.pokemonName.value !== null &&
      this.pokemonNameFormGroup.controls.pokemonName.value !== undefined &&
      this.pokemonNameFormGroup.controls.pokemonName.value !== "") {
      this._stateService.loading = true
      return this._pokeapi.getPokemon(this.pokemonNameFormGroup.controls.pokemonName.value!.toLowerCase())
        .pipe(
          tap(value => {
            this._stateService.pokemon = value
            return value
          }),
          finalize(() => this._stateService.loading = false)
        );
    } else {
      return of()
    }
  }

  pokemonNotFoundValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.loadPokemon().pipe(
        map(() => null),
        catchError(() => {
          this._stateService.pokemon = undefined
          return of({pokemonLoadError: {value: control.value}})
        }),
        finalize(() => this._stateService.loading = false)
      );
    }
  }

  triggerUpdate() {
    this.input.nativeElement.blur()
  }

  createTrackerEntry() {
    let pokemon = this.buildPokemonFromStepper();
    pokemon.pipe(
      switchMap(value => this._poketrackerApi.createPokemon(value))
    )
      .subscribe(
        {
          next: (value: Pokemon | HttpErrorResponse) => {
            if (value instanceof HttpErrorResponse) {
              console.error(value)
              this._snackbarService.message = value.error.Message
              this._snackbarService.colorClass = "snackbar-error"
            } else {
              this._snackbarService.message = "Pokemon created"
              this._snackbarService.colorClass = "snackbar-success"
              this._stateService.pokemon = undefined
              this._stateService.reset()
              this.pokemonNameFormGroup.reset()
            }
          },
          complete: () => {
            this._snackbarService.show()
          }
        }
      )
  }

  buildPokemonFromStepper(): Observable<Pokemon> {
    return this._pokemonTypeService.lookupTypes(this._stateService.pokemon()!.types, "en")
      .pipe(
        map(types => {
          return {
            dex: this._stateService.pokemon()!.dexNumber,
            name: this._stateService.pokemon()!.name,
            types: types,
            shiny: this._stateService.isShiny(),
            normal: !this._stateService.isShiny(),
            universal: !this._stateService.isRegional(),
            regional: this._stateService.isRegional(),
            editions: this._stateService.editions(),
            normalSpriteUrl: this._stateService.pokemon()!.spriteUrl,
            shinySpriteUrl: this._stateService.pokemon()!.spriteShinyUrl
          }
        })
      )
  }
}
