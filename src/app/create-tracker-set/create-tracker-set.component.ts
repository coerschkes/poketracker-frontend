import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatFormField, MatLabel} from "@angular/material/form-field";
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
    MatStepLabel
  ],
  templateUrl: './create-tracker-set.component.html',
  styleUrl: './create-tracker-set.component.scss'
})
export class CreateTrackerSetComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {
  }

}
