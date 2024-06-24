import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {PokeapiService} from "../../core/external/pokeapi/pokeapi.service";
import {PokemonService} from "../pokemon.service";

@Injectable({providedIn: 'root'})
export class ValidatorsService {
  constructor(private _pokeapiService: PokeapiService, private _pokemonService: PokemonService) {
  }

  validatePokemonInput(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (control.dirty) {
        return this.searchPokemonNames(control.value)
      }
      return of();
    }
  }

  private searchPokemonNames(pokemonName: string) {
    if (this._pokemonService.pokemonList().indexOf(pokemonName) === -1) {
      return of({invalidPokemon: {value: pokemonName}});
    } else {
      return of()
    }
  }
}
