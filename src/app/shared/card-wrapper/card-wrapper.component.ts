import {Component} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ResponsiveConfigurationService} from "../responsive-configuration.service";
import {NgIf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-card-wrapper',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.scss'
})
export class CardWrapperComponent {

  constructor(protected responsive: ResponsiveConfigurationService) {
  }

}
