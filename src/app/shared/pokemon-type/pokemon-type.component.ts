import {Component, Input, OnChanges, signal, WritableSignal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {tap} from "rxjs";
import {LookupTableService} from "../lookup-table.service";

@Component({
  selector: 'app-pokemon-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-type.component.html',
  styleUrl: './pokemon-type.component.scss'
})
export class PokemonTypeComponent implements OnChanges {
  private readonly pokemonTypeLookupTablePath: string = "assets/pokemon-type-lookup-table-ger.csv";
  @Input() types!: string[] | undefined;
  @Input() inputLanguage!: string | undefined;
  protected readonly typesSignal: WritableSignal<string[]> = signal([]);

  constructor(private _lookupTableService: LookupTableService) {
  }

  ngOnChanges(): void {
    this.typesSignal.update(() => []);
    this.types?.forEach(type => this.lookupType(type));
  }

  protected lookupType(type: string): void {
    type = type.toLowerCase()
    if (this.inputLanguage === "en") {
      this._lookupTableService.translateTypeToGerman(this.pokemonTypeLookupTablePath, type)
        .pipe(
          tap(value => this.typesSignal.update(types => types.concat(value[0]))),
        ).subscribe();
    } else if (this.inputLanguage === "de") {
      this.typesSignal.update(types => types.concat(type));
    }
  }
}
