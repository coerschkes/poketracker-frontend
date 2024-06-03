import {Component, Input, OnChanges, signal, WritableSignal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LookupTableService} from "../lookup-table.service";
import {PokemonTypeService} from "./pokemon-type.service";

@Component({
  selector: 'app-pokemon-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-type.component.html',
  styleUrl: './pokemon-type.component.scss'
})
export class PokemonTypeComponent implements OnChanges {
  @Input() types!: string[] | undefined;
  @Input() inputLanguage!: string | undefined;
  protected readonly _typesSignal: WritableSignal<string[]> = signal([]);

  constructor(private _lookupTableService: LookupTableService, protected _pokemonTypeService: PokemonTypeService) {
  }

  ngOnChanges(): void {
    this._typesSignal.update(() => []);
    this.types?.forEach(type =>
      this._pokemonTypeService.lookupType(type, this.inputLanguage!)
        .subscribe({
            next: value => this._typesSignal.update(types => [...types, value])
          }
        )
    );
  }
}
