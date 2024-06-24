import {Injectable} from "@angular/core";
import {map, Observable, startWith} from "rxjs";
import {PokemonService} from "../pokemon.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonInputFilterService {

  constructor(private _pokemonService: PokemonService) {
  }

  registerPokemonInputFilter(obs: Observable<string | null>): Observable<string[]> {
    return obs.pipe(
      startWith(''),
      map(value => {
        if (value !== null && value.length >= 2) {
          return this._filter(this._pokemonService.pokemonList(), value || '')
        } else {
          return []
        }
      }),
    );
  }


  private _filter(values: string[], searchString: string): string[] {
    const filterValue = searchString.toLowerCase();
    return values.filter(pokemon => pokemon.toLowerCase().startsWith(filterValue));
  }
}
