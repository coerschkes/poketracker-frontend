import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {PokeapiService} from "../../core/external/pokeapi/pokeapi.service";
import {PokemonService} from "../pokemon.service";
import {PokemonSelectorMode} from "./pokemon-selector-mode";

@Injectable({providedIn: 'root'})
export class PokemonSelectorValidatorService {
  constructor(private _pokeapiService: PokeapiService, private _pokemonService: PokemonService) {
  }

  validatePokemonInput(mode: PokemonSelectorMode): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (control.dirty) {
        return this.searchPokemonNames(control.value, mode)
      }
      return of();
    }
  }

  private searchPokemonNames(pokemonName: string, mode: PokemonSelectorMode) {
    if (this.determineFilterSlice(mode).indexOf(pokemonName) === -1) {
      return of({invalidPokemon: {value: pokemonName}});
    } else {
      return of()
    }
  }

  private determineFilterSlice(mode: PokemonSelectorMode): string[] {
    switch (mode) {
      case PokemonSelectorMode.PERSONALIZED:
        return this._pokemonService.personalizedPokemon().map(pokemon => pokemon.name);
      case PokemonSelectorMode.ALL:
        return this._pokemonService.pokemonNames();
      default:
        return this._pokemonService.pokemonNames();
    }
  }
}
