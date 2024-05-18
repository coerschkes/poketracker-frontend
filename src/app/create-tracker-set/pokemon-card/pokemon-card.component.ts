import {Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {PokemonTypeComponent} from "../../shared/pokemon-type/pokemon-type.component";
import {TitleCasePipe} from "@angular/common";
import {CreateTrackerSetStateService} from "../create-tracker-set.state.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatDivider,
        PokemonTypeComponent,
        TitleCasePipe
    ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
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
export class PokemonCardComponent {

  constructor(protected _stateService: CreateTrackerSetStateService) {
  }

}