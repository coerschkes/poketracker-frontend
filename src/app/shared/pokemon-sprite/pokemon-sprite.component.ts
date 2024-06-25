import {Component, Input} from '@angular/core';
import {ResponsiveConfigurationService} from "../responsive-configuration.service";

@Component({
  selector: 'app-pokemon-sprite',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-sprite.component.html',
  styleUrl: './pokemon-sprite.component.scss'
})
export class PokemonSpriteComponent {
  @Input() spriteUrl: string | undefined = '';

  constructor(protected responsive: ResponsiveConfigurationService) {

  }
}
