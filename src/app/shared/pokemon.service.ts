import {Injectable} from "@angular/core";
import {LookupTableService} from "./lookup-table.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonLookupTablePath: string = "assets/pokemon-lookup-table-ger.csv";

  constructor(private _lookupTableService: LookupTableService) {
  }

  lookupPokemonNames(): Observable<string[]> {
    return this._lookupTableService.retrievePokemonNames(this.pokemonLookupTablePath)
  }
}
