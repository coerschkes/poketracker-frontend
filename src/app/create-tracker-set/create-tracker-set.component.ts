import {Component} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
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
    MatStepLabel
  ],
  templateUrl: './create-tracker-set.component.html',
  styleUrl: './create-tracker-set.component.scss'
})
export class CreateTrackerSetComponent {
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
      console.log("calling ")
      return this._pokeapi.getPokemon(this.pokemonNameFormGroup.controls.pokemonName.value!)
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
          return of({pokemonLoadError: {value: control.value}})
        }),
        finalize(() => this._stateService.loading = false)
      );
    }
  }
}
