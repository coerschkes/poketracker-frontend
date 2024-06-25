import {Injectable, Signal} from "@angular/core";
import {map, Observable, startWith} from "rxjs";
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../../core/external/poketracker/poketracker-api";

@Injectable({
  providedIn: 'root'
})
export class PokemonInputFilterService {

  constructor(private _pokemonService: PokemonService) {
  }

  registerPokemonInputFilter(obs: Observable<string | null>): Observable<string[]> {
    return this.registerPokemonInputFilterWithProvidedPokemonList(obs, this._pokemonService.pokemonNames, (value: string[]) => value);
  }

  registerPokemonInputFilterWithPokemonList(obs: Observable<string | null>): Observable<string[]> {
    return this.registerPokemonInputFilterWithProvidedPokemonList(obs, this._pokemonService.personalizedPokemon, (value: Pokemon[]) => value.map(pokemon => pokemon.name));
  }

  private registerPokemonInputFilterWithProvidedPokemonList(obs: Observable<string | null>, pokemonList: Signal<any[]>, listTransformer: (value: any[]) => string[]): Observable<string[]> {
    return obs.pipe(
      startWith(''),
      map(value => {
        if (value !== null && value.length >= 2) {
          return this._filter(listTransformer(pokemonList()), value || '')
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
