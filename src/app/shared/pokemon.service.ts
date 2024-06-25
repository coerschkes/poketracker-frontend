import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {LookupTableService} from "./lookup-table.service";
import {PokeapiService} from "../core/external/pokeapi/pokeapi.service";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Pokemon} from "../core/external/poketracker/poketracker-api";
import {SnackbarService} from "./snackbar/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonLookupTablePath: string = "assets/pokemon-lookup-table-ger.csv";
  private readonly _pokemonNames: WritableSignal<string[]> = signal([]);
  private readonly _personalizedPokemon: WritableSignal<Pokemon[]> = signal([]);

  constructor(private _pokeapiService: PokeapiService,
              private _lookupTableService: LookupTableService,
              private _poketrackerApiService: PoketrackerApiService,
              private _snackbarService: SnackbarService) {
    this.loadPokemonNames()
    this.loadPersonalizedPokemon()
  }

  get pokemonNames(): Signal<string[]> {
    return this._pokemonNames.asReadonly();
  }

  get personalizedPokemon(): Signal<Pokemon[]> {
    return this._personalizedPokemon.asReadonly();
  }

  searchPersonalizedPokemon(pokemonName: string): Pokemon {
    let result = this._personalizedPokemon().filter(pokemon => pokemon.name === pokemonName);
    if (result.length > 1) {
      this._snackbarService.showError("Inconsistent state found: Multiple pokemon with the same name found: " + pokemonName)
      return result[0]
    } else {
      return result[0]
    }
  }

  private loadPokemonNames() {
    if (this._pokemonNames().length === 0) {
      this._lookupTableService.retrievePokemonNames(this.pokemonLookupTablePath).subscribe({
        next: value => {
          this._pokemonNames.set(value)
        }
      })
    }
  }

  private loadPersonalizedPokemon() {
    if (this._personalizedPokemon.length === 0) {
      this._poketrackerApiService.getAllPokemon().subscribe({
        next: value => {
          if (value instanceof HttpErrorResponse) {
            this._snackbarService.showError("Failed to load personalized pokemon")
            console.error(value)
          } else {
            this._personalizedPokemon.set(value)
          }
        }
      })
    }
  }
}
