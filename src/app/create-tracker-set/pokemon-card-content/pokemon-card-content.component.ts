import {Component} from '@angular/core';
import {MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {PokemonTypeComponent} from "../../shared/pokemon-type/pokemon-type.component";
import {TitleCasePipe} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";
import {CreateStateService} from "../create-state.service";

@Component({
  selector: 'app-pokemon-card-content',
  standalone: true,
    imports: [
        MatCardContent,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatChipRemove,
        MatChipRow,
        MatDivider,
        MatIcon,
        PokemonTypeComponent,
        TitleCasePipe
    ],
  templateUrl: './pokemon-card-content.component.html',
  styleUrl: './pokemon-card-content.component.scss',
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
export class PokemonCardContentComponent {

  constructor(protected _stateService: CreateStateService) {
  }
}
