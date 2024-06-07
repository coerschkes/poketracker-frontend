import {Component} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {CreateStateService} from "../create-state.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {PokemonCardContentComponent} from "../pokemon-card-content/pokemon-card-content.component";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    MatCard,
    PokemonCardContentComponent
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

  constructor(protected _stateService: CreateStateService) {
  }

}
