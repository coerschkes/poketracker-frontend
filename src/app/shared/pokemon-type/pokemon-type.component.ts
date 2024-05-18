import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
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
export class PokemonTypeComponent implements OnInit {
  private readonly pokemonTypeLookupTablePath: string = "assets/pokemon-type-lookup-table-ger.csv";
  @Input() types!: string[] | undefined;
  protected readonly typesSignal: WritableSignal<string[]> = signal([]);

  constructor(private _lookupTableService: LookupTableService) {
  }

  ngOnInit(): void {
    this.types?.forEach(type => this.lookupType(type));
  }

  protected lookupType(type: string): void {
    this._lookupTableService.lookup(this.pokemonTypeLookupTablePath, type)
      .pipe(
        tap(value => this.typesSignal.update(types => types.concat(value[0]))),
      ).subscribe();
  }
}
