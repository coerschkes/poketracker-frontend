import {Injectable} from "@angular/core";
import {map, Observable, switchMap} from "rxjs";
import {Pokemon} from "../core/external/poketracker/poketracker-api";
import {HttpErrorResponse} from "@angular/common/http";
import {PokeapiPokemon} from "../core/external/pokeapi/url/pokeapi-pokemon";
import {PokemonTypeService} from "../shared/pokemon-type/pokemon-type.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";
import {AddStateService} from "./add-state.service";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class AddService {
  private _resetCallback: () => void;

  constructor(private _stateService: AddStateService,
              private _poketrackerApiService: PoketrackerApiService,
              private _snackbarService: SnackbarService,
              private _pokemonTypeService: PokemonTypeService,
              private _router: Router) {
  }

  reset() {
    this._resetCallback();
  }

  addEntry() {
    if (this._stateService.loadedPokemon !== undefined) {
      this._stateService.loading = true;
      this._stateService.loadedPokemon.pipe(
        switchMap(value => this.buildPokemon(value)),
        switchMap(value => this._poketrackerApiService.createPokemon(value)),
      ).subscribe({
        next: (value: Pokemon | HttpErrorResponse) => {
          if (value instanceof HttpErrorResponse) {
            console.error(value)
            this._snackbarService.message = "Pokemon already exists"
            this._snackbarService.colorClass = "snackbar-error"
          } else {
            this._snackbarService.message = "Pokemon created"
            this._snackbarService.colorClass = "snackbar-success"
            this._stateService.reset()
            this._router.navigate(["/"])
          }
        },
        complete: () => {
          this._stateService.loading = false
          this._snackbarService.show()
        }
      })
    }
  }

  set resetCallback(callback: () => void) {
    this._resetCallback = callback;
  }

  private buildPokemon(pokeapiPokemon: PokeapiPokemon): Observable<Pokemon> {
    return this._pokemonTypeService.lookupTypes(pokeapiPokemon.types, "en")
      .pipe(
        map(types => {
          return {
            dex: pokeapiPokemon.dexNumber,
            name: pokeapiPokemon.name,
            types: types,
            shiny: this._stateService.state().isShiny,
            normal: this._stateService.state().isNormal,
            universal: this._stateService.state().isUniversal,
            regional: this._stateService.state().isRegional,
            editions: this._stateService.state().editions,
            normalSpriteUrl: pokeapiPokemon.spriteUrl,
            shinySpriteUrl: pokeapiPokemon.spriteShinyUrl
          }
        })
      )
  }
}
