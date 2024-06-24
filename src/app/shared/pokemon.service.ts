import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {LookupTableService} from "./lookup-table.service";
import {PokeapiService} from "../core/external/pokeapi/pokeapi.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonLookupTablePath: string = "assets/pokemon-lookup-table-ger.csv";
  private readonly _pokemonList: WritableSignal<string[]> = signal([]);

  constructor(private _pokeapiService: PokeapiService, private _lookupTableService: LookupTableService) {
    if (this._pokemonList().length === 0) {
      this._lookupTableService.retrievePokemonNames(this.pokemonLookupTablePath).subscribe({
        next: value => {
          this._pokemonList.set(value)
        }
      })
    }
  }

  get pokemonList(): Signal<string[]> {
    return this._pokemonList.asReadonly();
  }
}
