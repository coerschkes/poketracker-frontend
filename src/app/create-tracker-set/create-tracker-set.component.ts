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
import {catchError, finalize, map, Observable, of, tap} from "rxjs";
import {CreateTrackerSetStateService} from "./create-tracker-set.state.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {animate, style, transition, trigger} from "@angular/animations";
import {PokemonTypeComponent} from "../shared/pokemon-type/pokemon-type.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatChipGrid, MatChipInput, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {EditionSelectorComponent} from "./edition-selector/edition-selector.component";

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
            animate('300ms ease-out',
              style({height: '100%', opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({height: '100%', opacity: 1}),
            animate('300ms ease-in',
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
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private _pokeapi: PokeapiService, protected _stateService: CreateTrackerSetStateService) {
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

  setLoading() {
    if (!this._stateService.loading()) {
      this._stateService.loading = true
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
}
